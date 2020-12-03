//Create variables here
var dog, happyDog, dogImg;
var database;
var foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();
  console.log(database);

  canvas = createCanvas(500, 500);
  
  dog = createSprite(250,250,30,30);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  //readStock();
 // writeStock();

  textSize(12);
  fill("white");
  stroke("black");
  text("Note: Press UP_ARROW Key To Feed Buzo Milk",150,50);

  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

