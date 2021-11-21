var PLAY=1;
var END=0;
var gameState=PLAY;

var bg,bgImg;
var earth,earth2,earthImg;
var virus,virusImg,virusGroup;
var heart1Img,heart2Img,heart3Img,heart1,heart2,heart3;
var heartImg2;
var live=4;

var distance=0;

function preload(){
  bgImg=loadImage("space.jpg");
  earthImg=loadImage("earth.png");
  earth2=loadImage("earth2.jpg");
  virusImg=loadImage("Covid-19.png");
  heart1Img=loadImage("heart.png");
  heart2Img=loadImage("heart.png");
  heart3Img=loadImage("heart.png");
  heartImg2=loadImage("heart2.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  //Fondo
  bg=createSprite(500,200,800,400);
  bg.addImage("fondo",bgImg);
  bg.scale=5;
  
  //Tierra(jugador)
  earth=createSprite(displayWidth/50,200,50,50);
  earth.addImage("jugador", earthImg);
  earth.scale=0.08;
  //Colisionador a la Tierra
  earth.setCollider("circle",0,0,500);
  
  virusGroup=new Group();
  
  //Insertar corazones
  heart1=createSprite(displayWidth/1.5,displayHeight/1.1);
  heart1.addImage("corazon1",heart3Img);
  heart1.scale=0.1;

  heart2=createSprite(displayWidth/1.35,displayHeight/1.1);
  heart2.addImage("corazon2",heart2Img);
  heart2.scale=0.1;

  heart3=createSprite(displayWidth/1.225,displayHeight/1.1);
  heart3.addImage("corazon3",heart1Img);
  heart3.scale=0.1;
}
function draw() {
  background(0);
  drawSprites();
  
  fill("Gold");
  textSize(25);
  text("Recorrido: "+distance,300,80);
  fill("blue");
  textSize(30);
  text("Vidas:",displayWidth/1.8,displayHeight/1.1);
  if(gameState===PLAY){
    //Contando distancia
    distance = distance + Math.round(getFrameRate()/40);
    earth.y=World.mouseY;
    //Fondo moviendose
    if(bg.x < 195 ){
      bg.x = width/2;
    }
    //Objetos se muevan con la cámara
    camera.x=bg.x;
    spawnVirus();
    if(virusGroup.isTouching(earth)){
      //Animación de perder corazón
      heart1.addImage("roto1",heartImg2);
      heart1.changeImage("roto1");
      heart1.scale=0.05;
      heart1.lifetime=20;
      live=live-1;
      virusGroup.destroyEach();
    } else if(live===2){
      //Animación de perder 2° corazón
      heart2.addImage("roto_2",heartImg2);
      heart2.changeImage("roto_2");
      heart2.scale=0.05;
      heart2.lifetime=18;
    } else if(live===1){
      //3° y el estado del juego es END
      heart3.addImage("final3",heartImg2);
      heart3.changeImage("final3");
      heart3.scale=0.05;
      heart3.lifetime=21;
      gameState=END;
    }
  } else if(gameState===END){
    fill("brown");
    text("¡Vuelve a jugar! Tecla espacio para recomenzar",displayWidth/2,displayHeight/2);
    virusGroup.velocityX=0;
    virusGroup.destroyEach();
    earth.addImage("enferma",earth2);
    earth.changeImage("enferma");
    earth.scale=0.15;
    earth.velocityY=0;
    bg.velocityX=0;
    if(keyDown("space") && gameState===END){
      reset();
    }
  }
}
function reset(){
  gameState=PLAY;
  
  heart1=createSprite(displayWidth/1.5+160,displayHeight/1.1);
  heart1.addImage("reinicio1",heart3Img);
  heart1.scale=0.1;

  heart2=createSprite(displayWidth/1.5+270,displayHeight/1.1);
  heart2.addImage("reinicio2",heart2Img);
  heart2.scale=0.1;

  heart3=createSprite(displayWidth/1.5+370,displayHeight/1.1);
  heart3.addImage("reinicio3",heart1Img);
  heart3.scale=0.1;
  
  earth.addImage("reinicio",earthImg);
  earth.changeImage("reinicio");
  earth.scale=0.08;
  virusGroup.visible=true;
  bg.velocityX=-4;
  distance=0;
  live=4;
}
function spawnVirus(){
  if(frameCount%50===0){
    var virus=createSprite(displayWidth,50,50,50);
    virus.addImage("enemigo", virusImg);
    virus.scale=0.04;
    virus.y=Math.round(random(50,displayHeight));
    virus.lifetime=900;
    virusGroup.add(virus);
  }
}