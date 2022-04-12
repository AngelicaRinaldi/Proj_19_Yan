var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  
  //criar sprite do ghost e da torre 
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  //==> Colocar o fantasma na frente da torre (ou criar a torre primeiro)
  ghost.depth = tower.depth;
  ghost.depth +=1;

  //criar os grupos
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(0);
  //se o estado do jogo for play
  if (gameState === "play") {
    // 3 ifs para movimentar para direita pra esquerda e pra cima 
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x +5
    }
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x -5
    }
    if (keyDown ("space")) {
      //==> VELOCIDADE SEM SOMAR, SE NÃO FICA AUMENTANDO DIRETO
      //ghost.velocityY = ghost.velocityY -5
      ghost.velocityY = -5;
    }
    // atribuir gravidade
    //==> SOMAR 1 NA VELOCIDADE NÃO "= 0.1"
    //ghost.velocityY = ghost.velocityY = 0.1
    ghost.velocityY = ghost.velocityY + 0.1
    if (tower.y > 400) {
      tower.y = 300;
    }
    //descansar fantasma se tocar na grade 
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    //mudar status para fim se bloco invisivel tocar no fantasma ou o y for maior que 600
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
    //chamar função de geração de portas //spawndoors()
    spawndoors();
    drawSprites();
  }
  //se o estado de jogo for fim
  if (gameState === "end") {
    fill("cyan");
    textSize (80);
    //mensagem de texto fim de jogo
    text("Fim De Jogo",100,250);
  } 
}
//função de gerar portas
function spawndoors(){
  if (frameCount % 200 === 0 ){
    //criar objetos portas,grades e bloco invisivel
    var door = createSprite(200,-50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    //carregar imagens ? precisa mesmo?
    door.addImage(doorImg);
    climber.addImage(climberImg);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //gerar objetos nas posições randomicas de x entre 120 e 400
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = climber.x;
    //atribuir velocidade
    door.velocityY = 1
    climber.velocityY = 1
    invisibleBlock.velocityY = 1
    //atribuir profundidade
    //==> DEPHT ESCRITO ERRADO: CORRETO É DEPTH
    //ghost.depht = door.depht;
    //ghost.depht +=1
    ghost.depth = door.depth;
    ghost.depth +=1;
    //definir tempo de vida
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    //adicionar aos grupos
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}