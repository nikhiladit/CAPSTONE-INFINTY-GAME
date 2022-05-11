var background, backgroundImg;

var rocket1, rocket1Img;
var ufo1, ufo1Img;
var ufo2;
var ufo3;
var ufo1life = 10;
var ufo2life = 10;
var ufo3life = 10;
var rocket1life = 15;

var change1, change1Img;
var change2, change2Img;
var change3, change3Img;
var change4, change4Img;
var change5, change5Img;
var change6, change6Img;
var change7, change7Img;

var thunder, thunderImg;
var thunder2;
var thunder3;
var laser, laserImg;
var end, endImg;
var dieSound, playeraSound, startSound;

var gameState = "play";

function preload(){
  backgroundImg = loadImage("bg.png");
  rocket1Img = loadImage("rocket4.png");
  ufo1Img = loadImage("rocket5.png");
  thunderImg = loadImage("thunder.png"); 
  laserImg = loadImage("Laser.png")
  endImg = loadImage("gameOver.png");

  playeraSound = loadSound("playerrec.wav");
  dieSound = loadSound("end.wav");
  startSound = loadSound("start.mp3");
}

function setup() {
  createCanvas(400, 620);

  background("white");

  background = createSprite(200, 310);
  rocket1 = createSprite(200, 550);
  ufo1 = createSprite(80, 50);
  ufo2 = createSprite(200, 50);
  ufo3 = createSprite(320, 50);

  laserGroup = createGroup();
  thunderGroup = createGroup();
  thunder2Group = createGroup();
  thunder3Group = createGroup();
  
}

function draw() {
  if (gameState === "play") {
    background.addImage(backgroundImg);
    rocket1.addImage(rocket1Img);
    ufo1.addImage(ufo1Img);
    ufo2.addImage(ufo1Img);
    ufo3.addImage(ufo1Img);

    startSound.play();

    background.scale = 1.2;
    rocket1.scale = 0.3;
    ufo1.scale = 0.2;
    ufo2.scale = 0.2;
    ufo3.scale = 0.2;

    if (ufo1life === 0) {
      ufo1life = ufo1life+20;
    }

    if (ufo2life === 0) {
      ufo2life = ufo2life+20;
    }

    if (ufo3life === 0) {
      ufo3life = ufo3life+20;
    }

    if (ufo1life<1 || ufo2life<1 || ufo3life<1) {
      rocket1life = rocket1life*2;
      playeraSound.play();
    }

    if (rocket1life<0) {
      gameState = "end";
    }

    if (keyDown("right")) {
      rocket1.x = rocket1.x+2;
    }

    if (keyDown("left")) {
      rocket1.x = rocket1.x-2;
    }

    if (rocket1.x < 47) {
      rocket1.x = 47;
    }

    if (rocket1.x > 350) {
      rocket1.x = 350;
    }

    if(background.y > 360 ){
      background.y = height/2;
    }

    background.velocityY = 1;

    spawnThunder();
    spawnLaser();

  }else (gameState = "end")

  console.log(gameState);

  drawSprites();

  if (gameState === "end") {
    end = createSprite(200,300);
    end.addImage(endImg);
    end.scale = 0.8;
    dieSound.play();

    background.velocityY = 0;

    thunderGroup.destroyEach();
    thunder2Group.destroyEach();
    thunder3Group.destroyEach();
  }
}

function spawnThunder() {
  if(frameCount % (Math.round(random(60,180))) === 0) {
    thunder = createSprite(84,145);   
    thunder.addImage(thunderImg);
    thunder.scale = 0.5;
    thunder.velocityY = 5;

    thunderGroup.add(thunder);
    thunderGroup.setLifetimeEach(75);
  }

  if(frameCount % (Math.round(random(60,180))) === 0) {
    thunder2 = createSprite(204,145);   
    thunder2.addImage(thunderImg);
    thunder2.scale = 0.5;
    thunder2.velocityY = 5;

    thunder2Group.add(thunder2);
    thunder2Group.setLifetimeEach(75);
  }

  if(frameCount % (Math.round(random(60,180))) === 0) {
    thunder3 = createSprite(324,145);   
    thunder3.addImage(thunderImg);
    thunder3.scale = 0.5;
    thunder3.velocityY = 5;

    thunder3Group.add(thunder3);
    thunder3Group.setLifetimeEach(75);
  }

  if (thunder2Group.isTouching(rocket1)) {
    rocket1life = rocket1life-1;
  }
}

function spawnLaser () {
  if (frameCount % 75 === 0) {
    laser = createSprite(0,422);
    laser.addImage(laserImg);
    laser.x = rocket1.x;
    laser.scale = 0.75;
    laser.velocityY = -2;
    laser.lifetime = 160;
    
    laserGroup.add(laser);

    if (laserGroup.isTouching(ufo1)) {
      ufo1life = ufo1life-1;
    }

    if (laserGroup.isTouching(ufo2)) {
      ufo2life = ufo2life-1;
    }

    if (laserGroup.isTouching(ufo3)) {
      ufo3life = ufo3life-1;
    }

    if (laserGroup.isTouching(thunderGroup)) {
      laser.destroy();
      thunderGroup.destroyEach();
    }

    if (laserGroup.isTouching(thunder2Group)) {
      laser.destroy();
      thunder2Group.destroyEach();
    }

    if (laserGroup.isTouching(thunder3Group)) {
      laser.destroy();
      thunder3Group.destroyEach();
    }
  }
}