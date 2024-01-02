var PLAY = 1;
var END = 0;
var gameState = PLAY;


var fc = 0
var score = 0;


function preload(){
 gunImage = loadImage("Gun.png")
 bImage = loadImage("bullet.png")
 Z1 = loadImage("Zombie 1.png")
 Z2 = loadImage("z2.png")
 Z3 = loadImage("z3.png")
 Z4 = loadImage("z4.png")
 go = loadImage("gameOver.png")
 re = loadImage("restart.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  Gun = createSprite(100,windowHeight/2)
  Gun.debug = true
  Gun.setCollider("rectangle",250,-250,100,100)
  Gun.addImage(gunImage)
  Gun.scale = (0.5)
  Zg = new Group()
  Zg2 = new Group()
  Zg3 = new Group()
  Bg = new Group()
  line = createSprite(300,windowHeight/2,4,windowHeight)
  Edge = createEdgeSprites()
  gOver = createSprite(windowWidth/2,windowHeight/2,10,20)
  gOver.addImage(go)
  gOver.visible = false
  res = createSprite(windowWidth/2,(windowHeight/2)+50,10,20)
  res.addImage(re)
  res.visible = false
}

function draw() {
  background(180);
  //displaying score
  textSize(30)
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    if(keyDown("LEFT_ARROW")&& Gun.rotation>-30){
      Gun.rotation -= 10
      
    }
    if(keyDown("RIGHT_ARROW")&& Gun.rotation<120){
      Gun.rotation += 10
      console.log(Gun.rotation)
    }
    if(keyDown("UP_ARROW")){
      Gun.y -= 10
    }
    if(keyDown("DOWN_ARROW")){
      Gun.y += 10
    }
    if(Bg.isTouching(Zg)){
      Zg.destroyEach()
      score += 5
    }
    if(Bg.isTouching(Zg3)){
      Zg3.destroyEach()
      score += 5
    }
    if(Bg.isTouching(Zg2)){
      Zg2.destroyEach()
      score +=  5
    }
    Random = (Math.round(random(1,3)))
    if (Random == 1){
      createZombie1()
    }
    if (Random == 2){
      createZombie2()
    }
    if (Random == 3){
      createZombie3()
    }
    createbullet()
    if(Zg.isTouching(line)){
      gameState = END
    }
    if(Zg2.isTouching(line)){
      gameState = END
    }
    if(Zg3.isTouching(line)){
      gameState = END
    }

  }
   else if (gameState === END) {
    Zg.setVelocityXEach(0)
    Zg.setLifetimeEach(-1)
    Zg2.setVelocityXEach(0)
    Zg2.setLifetimeEach(-1)
    Zg3.setVelocityXEach(0)
    Zg3.setLifetimeEach(-1)
    gOver.visible = true
    res.visible = true
    reset()
   }
  Gun.collide(Edge)
   
  drawSprites();
}

function createbullet(){
  if(keyDown("SPACE")&&frameCount>fc+20){
    fc = frameCount
    console.log(fc)
    bullet = createSprite(Gun.x+200,Gun.y)
    bullet.addImage(bImage)
    //bullet.rotation = Gun.rotation//
    bullet.scale = 0.2
    bullet.velocityX = 15
    Bg.add(bullet)
  }
}
function createZombie1(){
if(frameCount%60==0){
  Zombie = createSprite(width, Math.round(random(50,height)))
  //Zombie.debug = true
  Zombie.velocityX = -10
  Zombie.lifetime = 300
  //Random = (Math.round(random(1,3)))
     Zombie.addImage(Z1)
             Zombie.scale = 0.7
             Zombie.setCollider("rectangle",0,0,300,400)
             

  Zg.add(Zombie)
}
}
function createZombie3(){
  if(frameCount%60==0){
    Zombie = createSprite(width, Math.round(random(50,height)))
   // Zombie.debug = true
    Zombie.velocityX = -10
    Zombie.lifetime = 300
    //Random = (Math.round(random(1,3)))
     
       Zombie.addImage(Z2)
      
  
    Zg2.add(Zombie)
  }
  }
  function createZombie2(){
    if(frameCount%60==0){
      Zombie = createSprite(width, Math.round(random(50,height)))
      //Zombie.debug = true
      Zombie.velocityX = -10
      Zombie.lifetime = 300
      //Random = (Math.round(random(1,3)))
      
         Zombie.addImage(Z3)
                 Zombie.scale = 0.5
                 Zombie.setCollider("rectangle",0,0,300,650)
           
    
      Zg3.add(Zombie)
    }
    }
    function reset(){
      if(mousePressedOver(res)){
        gameState = PLAY
        Zg.destroyEach()
        Zg2.destroyEach()
        Zg3.destroyEach()
        res.visible = false
        gOver.visible = false
      }
    }