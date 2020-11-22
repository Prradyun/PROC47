var playerShip,attackerShip;
var playerShipImg,PlayerShipBlast,attackerShipImg;
var missileGroup,missileImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameover,restart,gameoverimg,restartimg;

var score;

function preload(){
   playerShipImg = loadImage("images/PlayerShip.png");
   PlayerShipBlast = loadImage("images/PlayerShipExplosion.png");
   attackerShipImg = loadImage("images/AttackerShip.png");
   missileImg = loadImage("images/Missile.png");
   gameoverimg = loadImage("images/GameOverImg.png");
   restartimg = loadImage("images/Restart.png");

}
function setup() {
  createCanvas(1000, 400);
   playerShip = createSprite(100,200,10,10);
   playerShip.addImage("PlayerShip",playerShipImg);
   playerShip.addImage("collided",PlayerShipBlast);
   attackerShip = createSprite(900,200,10,10);
   attackerShip.addImage("AttackerShip",attackerShipImg);

   gameover = createSprite(500,200,10,10);
   gameover.addImage ("GameOver",gameoverimg);
   gameover.visible = false;

   restart = createSprite(500,300,10,10);
   restart.addImage ("Resart",restartimg);
   restart.visible = false;


   missileGroup = new Group();
   score = 0;




}

function draw() {
  background("black");


  if (gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);

  if(keyDown("UP_ARROW")){
    playerShip.y = playerShip.y-10;
  }
  if(keyDown("DOWN_ARROW")){
    playerShip.y = playerShip.y+10;
  }
  spawnMissile();
  if(missileGroup.isTouching(playerShip)){
    
    gameState = END;
    
  }

  }

  else if (gameState === END){

    gameover.visible = true;
    restart.visible = true;
    
    missileGroup.setVelocityXEach(0);

    missileGroup.setLifetimeEach(-1);

    playerShip.changeAnimation("collided",PlayerShipBlast);

    text("Score: "+ score, 500,50);
    if(mousePressedOver(restart)) {
    reset();
  }
  }

  
  text("Score: "+ score, 800,50);

 
  playerShip.display();
  attackerShip.display();

  drawSprites();
}

function spawnMissile() {
  //write code here to spawn the missiles
  if (frameCount % 50 === 0) {
    var missile = createSprite(900,200,40,10);
    missile.y = Math.round(random(50,350));
    missile.addImage("Missile",missileImg);
    //missile.debug = true;
    missile.setCollider("rectangle",0,0,50,30);
    missile.velocityX = -4;
    
     //assign lifetime to the variable
    missile.lifetime = 900;
    
 
   
    
    //add each missile to the group
    missileGroup.add(missile);
  }

 
    
  
}
function reset(){
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  missileGroup.destroyEach();
 
  
  playerShip.changeAnimation("PlayerShip",playerShipImg);
  
  score = 0;
  
}
