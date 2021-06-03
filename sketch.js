//Create variables here
var dog, happyDog, database, foodS, foodStock; 
var  fedTime, lastFed;
var foodObj;
function preload()
{
  dog= loadImage(images/"dogImg.png");
	happyDog= loadImage(images/ "dogImg1.png" );
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock );

  var feedDog, addFood;

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87);

food.display();

  drawSprites();

  foodStock.update(food);
  
  
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if (lastFed >=15){
    text("Last Feed : "+ lastFed%12 + "PM" , 350, 30);
  }
  else if (lastFed == 0){
    text("Last Feed : 12 AM ", 350, 30);
  }
  else{
    text("Last Feed : "+ lastFed + "AM" , 350, 30);
  }
  }
  
  function addFoods(){
foodS++;
database.ref('/').update({
  Food:foodS
})
 }


 function feedDog(){
dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock,
  feedTime:hour()
})
 }
 
function readStock(data){
foodS.data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food : x
  })
}



