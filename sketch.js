var trexRun, trex, xyz, ground, ground1, groundI, cloud, cactusImg1, cactusImg2, cactusImg3, cactusImg4, cactusImg5, cactusImg6, trexstopping,diesound,checksound,jumpsound;

var restart,restart1,gameover,gameover1;
var score, viratkohli;
var cactusGroup,cloudGroup;

const SERVE = 1;
const PLAY = 10;

function preload() {
  trexRun = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground = loadImage("ground2.png");
  cloud = loadImage("cloud.png");
  cactusImg1 = loadImage("obstacle1.png");
  cactusImg2 = loadImage("obstacle2.png");
  cactusImg3 = loadImage("obstacle3.png");
  cactusImg4 = loadImage("obstacle4.png");
  cactusImg5 = loadImage("obstacle5.png");
  cactusImg6 = loadImage("obstacle6.png");
  trexstopping = loadAnimation("trex_collided.png");
  gameover1 = loadImage("gameOver.png");
  restart1 = loadImage("restart.png");
  jumpsound  = loadSound("jump.mp3");
  checksound = loadSound("Checkpoint.mp3");
  diesound = loadSound("die.mp3");
  
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(70, 190, 20, 20);
  trex.debug = true;
  trex.addAnimation("Ronak", trexRun);
  trex.addAnimation("ronak", trexstopping);
  trex.scale = 0.5;
  //trex.setCollider("circle",0,0,50)
  trex.setCollider("rectangle",0,0,100,100)
  
  ground1 = createSprite(300, 190, 600, 2);
  ground1.addImage(ground);

  groundI = createSprite(300, 200, 600, 20);
  groundI.visible = false;
  
  score = 0;

  xyz = createEdgeSprites();

  viratkohli = SERVE;
 
  cactusGroup = new Group();
  cloudGroup = createGroup();

  restart = createSprite(300,100,20,20);
  restart.addImage(restart1);
  restart.scale = 0.5;
  restart.visible = false;
  
  gameover = createSprite(300,60,20,20);
  gameover.addImage(gameover1);
  gameover.scale = 0.5;
  gameover.visible = false;
  
}

function draw() {
  background("yellow");

  if (trex.y > 160 && keyDown("space")) {
    //nested IF Condition
    trex.velocityY = -5;
    viratkohli = PLAY;
    jumpsound.play();
  }

  // For gravity
  trex.velocityY = trex.velocityY + 0.2;

  // console.log(trex.y);

  trex.collide(groundI);



  console.log(frameCount, score);

  text("score = " + score, 520, 50)


  if (viratkohli === SERVE) {
    trex.setVelocity(0, 0);
    ground1.velocityX = 0;
    trex.changeAnimation("ronak", trexstopping);
    cactusGroup.setLifetimeEach(-150);
    cloudGroup.setLifetimeEach(-10000000000000);
    if(mousePressedOver(restart)){
      reset();
      
    }
    
  }
  
  if (viratkohli === PLAY) {
    trex.changeAnimation("Ronak", trexRun);

    if (frameCount % 40 === 0) {
      clouds();
    }


    if (frameCount % 50 === 0) {
      cactus();
    }

    ground1.velocityX = -5;
    if (ground1.x < 0) {
      ground1.x = 300;
    }
    if (frameCount % 10 === 0) {
      score = score + 1;
    }
    if(trex.isTouching(cactusGroup)){
      text("game over",200,100);
      cactusGroup.setVelocityXEach(0);
      cloudGroup.setVelocityXEach(0);
      viratkohli = SERVE;
      gameover.visible = true;
      restart.visible = true;
      diesound.play();
      // trex.velocityY = -5;
      //  jumpsound.play();
      
    }
    if( score >0   &&  score % 50 === 0){
      checksound.play();
      
    }
    
    
    
  }
  
  
  
  drawSprites();
}

function clouds() {



  var clouds1 = createSprite(600, random(5, 100), 20, 20);
  clouds1.velocityX = -5;
  clouds1.addImage(cloud)
  clouds1.scale = 0.8
  //console.log(trex.depth, clouds1.depth)
  clouds1.depth = trex.depth
  trex.depth = trex.depth + 1
  clouds1.lifetime = 120
  cloudGroup.add(clouds1);
   
}

function cactus() {

  var cactus1 = createSprite(550, 175, 20, 20);
  cactus1.debug = true;
  cactus1.scale = 0.5;
  var x = Math.round(random(1, 6));
  cactus1.lifetime = 120;
  cactusGroup.add(cactus1);
  
  switch (x) {

    case 1:
      cactus1.addImage(cactusImg1);
      break;
    case 2:
      cactus1.addImage(cactusImg2);
      break;
    case 3:
      cactus1.addImage(cactusImg3);
      break;
    case 4:
      cactus1.addImage(cactusImg4);
      break;
    case 5:
      cactus1.addImage(cactusImg5);
      break;
    case 6:
      cactus1.addImage(cactusImg6);
      break;
    default:
      break;

  }



  cactus1.velocityX = -5;

}

function reset(){
cactusGroup.destroyEach();
cloudGroup.destroyEach();
score = 0;
gameover.visible = false;
restart.visible = false;
  

}






