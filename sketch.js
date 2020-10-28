//Create variables here
var dog,happyDog,database,foodStock;
var foodS=20;
var Dog1, DogHappy;
var gameState;
var foodType = 0;
var happiness = 0;

function preload()
{
  //load images here
  Dog1 = loadImage("images/dogImg.png");
  DogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  gameState = "play";

  dog = createSprite(250,250,50,50);
  dog.addImage(Dog1);
  dog.scale=0.2;
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);

    if(keyWentDown(UP_ARROW) && foodS !== 0){
      foodS--;
      writeStock(foodS);
      happiness +=random(0, 5);
      dog.addImage(DogHappy);
    }

    //if(foodS !== undefined){
      textSize(33);
      fill("red");
      text("Food Remaining : "+foodS, 90, 50);
      text("Happiness Level : " + round(happiness), 90, 100)
    //}
  
    if(foodS === 0){
      textSize(30);
      fill("black");
      text("Press 'R' to Refill the Stock", 50, 450);     

      if(keyCode == 114){
        foodS = 20;
        gameState === "play";
      }
    }

  drawSprites();
}

function readStock(data){
  foodS =data.val();

}

function writeStock(x){

  if(x===0){
    x = 0; 
  }
  else{
    x -=1;
  }

  database.ref('/').update({
    Food:x
  })
}

function keyPressed(){
  if(keyCode === 114, foodS === 0){
    database.ref('/').update({
      Food: 20
    })
  }
}