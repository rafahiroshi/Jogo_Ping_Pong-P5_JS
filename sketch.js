//Coordenadas da bolinha.
let xBall = 300;
let yBall = 200;
//Diâmetro e raio (tamanho) da bolinha.
let diameter = 20;
let radius = diameter / 2;
//Velocidade de movimento da bolinha.
let xSpeed = 5;
let ySpeed = 5;

//Largura e altura (tamanho) da raquete.
let rectXScale = 20;
let rectYScale = 80;
//Coordenadas da raquete.
let xRectangle = 0;
let yRectangle = 160; //Meio da tela, subtraido a metade do tamanho da raquete.

//Largura e altura (tamanho) da raqueteAI.
let rectAIXScale = 20;
let rectAIYScale = 80;
//Coordenadas da raqueteAI.
let xRectangleAI = 580; //Largura da tela menos a largura da raqueteAI.
let yRectangleAI = 160;

//FPS inicial
let fs = 60;

//Contagem até 2 para limitar toques que a bolinha pode dar
let countBall = 0; //Contagem de toques que a bolinha da, 0 é o inicial valor de toques.

//Contagrem regressiva - bordas
let countUntil = 500; //500 milissegundos.
let countCurrentTime = 0; //Tempo atual, 0 é o inicial valor do tempo atual.
let countDown; //Contagem regressiva, definida na função de resetar a contagem da bolinha.

//Variável referente à função moveRacketAI().
let passed; //Variável que controla se passou e voltou.

//Variáveis para a função placarNPontos().
let myPoints; //Meus pontos.
let AIPoints; //Pontos da IA.

//Tempo regressivo da bolinha.
let pointsCountDown; //Contagem regressiva.
let pointsCountUntil = 1800; //Contar at
let pointsCurrentTime = 0; //Tempo atual, utilizado para quando inicia a contagem regressiva.
let pointAllowed; //Permição para pontuar.
let startCountDown; //Condição que inicia a contagem regressiva.

//Efeitos sonoros do jogo.
let ambientSound; //Som ambiente.
let myPointSound; //Meus pontos.
let AIPointSound; //Pontos da I.A..
let ballHitSound; //Som da raquete.

function preload () {
  ambientSound = loadSound ('ambient.mp3');
  myPointSound = loadSound ('myPoint.mp3');
  AIPointSound = loadSound ('AIPoint.mp3');
  ballHitSound = loadSound ('ballHit.mp3');
}

function setup () {
  createCanvas (600, 400);
  
  ambientSound.loop();
  
  textAlign(CENTER);
  
  stroke(0);
  textSize(32);
  
  frameRate (fs);
  
  passed = 0;
  
  myPoints = 0;
  AIPoints = 0;
  
  pointAllowed = boolean(true);
  startCountDown = boolean(true);
}

function draw () {
  background (0); //Desenha o background.
  
  placarNPontos (); //Placar e contagem de pontos.
  
  showBall (); //Desenha a bolinha.
  moveBall (); //Movimenta a bolinha.
  
  showRacket (xRectangle, yRectangle); //Desenhar raquete.
  moveRacket (); //Controles da raquete.
  
  //textsNLines (); //Textos e linhas guias sobre algumas coisas técnicas.
  
  countBallReset (); //Reset da contagem de toques da bolinha.
  
  showRacketAI (xRectangleAI, yRectangleAI); //Mostrar a raqueteAI.
  moveRacketAI (); //Movimento da raqueteAI.
  //moveRacketAIOppo (); //Movimento da raqueteAI por um oponente real.
  
  limitsBall (); //Coloca limites para a bolinha e a manda para a direção oposta.
  
  //Volta para o início da função draw.
}

function showBall () {
  fill('orange');
  strokeWeight(3);
  stroke(0);
  
  circle (xBall, yBall, diameter);
}

function moveBall () {
  xBall += xSpeed;
  yBall += ySpeed;
}

function limitsBall () {
  let farPointField;
  let nearPointField;
  let goBackBall = boolean; //Quando ficar true, tem que voltar e ficar false.
  
  farPointField = (xBall >= 100 && xBall <= width - 100);
  nearPointField = (xBall < 100 || xBall > width - 100);
  
  strokeWeight(2);
  
  if (farPointField) stroke(255);
  if (nearPointField) stroke(255, 0, 0);
  
  //line(100, 0, 100, height);
  //line(width - 100, 0, width - 100, height);
  
  if (farPointField) goBackBall = false;
  if (nearPointField) goBackBall = true;
  
  //print(goBackBall);
  
  racketAreaCollision =
  (xBall - radius <= xRectangle + rectXScale) &&
  (xBall + radius >= xRectangle) &&
  (yBall - radius <= yRectangle + rectYScale) &&
  (yBall + radius >= yRectangle);
  
  racketAIAreaCollision =
  (xBall + radius >= xRectangleAI) &&
  (xBall - radius <= xRectangleAI + rectAIXScale) &&
  (yBall - radius <= yRectangleAI + rectAIYScale) &&
  (yBall + radius >= yRectangleAI);
  
  //Limites da tela x e raquetes.
  if
  (
  (xBall + radius >= width - 1) ||
  (racketAIAreaCollision) ||
  (xBall - radius <= 1) ||
  (racketAreaCollision)
  )
  {
    if (countBall < 1 && goBackBall == true) {
      countBall += 1;
      
      xSpeed *= -1;
      ballHitSound.play();
    }
  }
  
  //Limites da tela y.
  if
  (
  (yBall + radius >= height - 1) ||
  (yBall - radius <= 1)
  )
  {
    ySpeed *= -1;
    ballHitSound.play();
  }
  
  //print(countBall);
}

function showRacket (x, y) {
  fill(255, 255);
  noStroke();
  
  rect (x, y, rectXScale, rectYScale);
}

function moveRacket () {
  if (keyIsDown (87)) {
    if (yRectangle > 0) {
      yRectangle -= 4;
    }
  }
  if (keyIsDown (83)) {
    if (yRectangle + rectYScale < height) {
      yRectangle += 4;
    }
  }
}

function textsNLines () {
  textSize (32);
  
  //Altura da raquete a partir do topo.
  fill (255, 255, 255);
  strokeWeight (1); //Peso(grossura) das linhas.
  stroke (0); //Cor das linhas.
  text (yRectangle, 0, textSize());
  
  text (xBall, width / 2, height / 4, textSize());
  
  //Linhas da raquete.
  strokeWeight (1);
  stroke (255);
  line (xRectangle + rectXScale, 0, xRectangle + rectXScale, height);
  line (xRectangle, yRectangle, width, yRectangle);
  line (xRectangle, yRectangle + rectYScale, width, yRectangle + rectYScale);
  line (width / 2, 0, width / 2, height);
  
  //Quantidade de FPS que está sendo reproduzido.
  strokeWeight (0);
  text (int (frameRate()), width - 40, textSize());
  
  //Contagem de toques da bolinha.
  text (countBall, width - 60, height - 10);
  
  //Variável countDown (contagem regressiva de 500 milisegundos) em texto.
  //text (countDown, width - 60, height - 10 - textSize());
}

function countBallReset () {
  countDown = countUntil - countCurrentTime;
  
  //Resete de contagem de toques das bordas.
  if (countBall > 0) {
    countCurrentTime += int (1) * int (deltaTime);
    
    if (countDown <= 0) {
      countBall = 0;
    }
  }
  
  if (countBall == 0) {
    countCurrentTime = 0;
  }
  
  //print (countCurrentTime);
}

function showRacketAI (x, y) {
  fill('white');
  noStroke();
  
  //if (xBall <= 200) {
    //fill('red');
  //}
  
  rect (x, y, rectAIXScale, rectAIYScale);
}

function moveRacketAI () {
  //"Comandos" de ir para cima e para baixo.
  let commandUD = int(random(0, 2));
  
  if (xBall == 200 && passed == 0) {
    storeItem ('commandUD', commandUD);
    
    passed += 1;
  }
  
  if (xBall > 200 && passed == 1) {
    passed = 0;
  }
  
  //print(getItem('commandUD'));
  //print(getItem('commandUD'));
  
  if (xBall > 200) {
    if (yBall < yRectangleAI + rectAIYScale / 2) {
      if (yRectangleAI > 0) {
        yRectangleAI -= 4;
      }
    }
    
    if (yBall > yRectangleAI + rectAIYScale / 2) {
      if (yRectangleAI + rectAIYScale < height - 4) {
        yRectangleAI += 4;
      }
    }
  }
  else {
    if (getItem('commandUD') == 0) {
      if (yRectangleAI > 0) {
        yRectangleAI -= 4;
      }
    }
    if (getItem('commandUD') == 1) {
      if (yRectangleAI + rectAIYScale < height) {
        yRectangleAI += 4;
      }
    }
  }
}

function moveRacketAIOppo () {
  if (keyIsDown (UP_ARROW)) {
    if (yRectangleAI > 0) {
      yRectangleAI -= 4;
    }
  }
  if (keyIsDown (DOWN_ARROW)) {
    if (yRectangleAI + rectAIYScale < height) {
      yRectangleAI += 4;
    }
  }
}

function placarNPontos () {
  //A contagem regressiva(pointsCountDown) é igual a um valor(pointsCountUntil) que será subtraído por outro valor(pointsCurrentTime).
  pointsCountDown = pointsCountUntil - pointsCurrentTime;
  
  //Se a contagem regressiva ser menor ou igual a zero, reseta a contagem fazendo a startCountDown ser falsa e consequentemente tornando a pointsCurrentTime igual a zero.
  if (pointsCountDown <= 0) {
    startCountDown = false;
  }
  
  //Inicia a contagem regressiva pointsCountDown se for liberada a contagem com a pointsCurrentTime subindo, sendo ela uma subtração para a pointsCountUntil e assim fazendo a contagem regressiva funcionar.
  if (startCountDown == true) {
    pointsCurrentTime += int(1) * int(deltaTime);
  }
  else {
    //Quando a startCountDown se torna falsa, a variável pointsCurrentTime zera, fazendo com que a pointsCountDown volte a ter o valor da pointsCountUntil para que a contagem possa recomeçar.
    pointsCurrentTime = 0;
  }
  
  //Se a contagem regressiva(pointsCountDown) for zerada(igual a zero), é permitido pontuar(pointAllowed), se não, não.
  if (pointsCountDown == 1800) {
    pointAllowed = true;
  }
  else {
    pointAllowed = false;
  }
  
  //Se a coordenada x da bolinha for maior que a largura da tela menos um e se for permitido pontuar, iniciará uma contagem regressiva e pontuará.
  if
  (
  xBall + radius > width - 1 &&
  xBall + radius < width + 4
  ) {
    if (pointAllowed == true) {
      startCountDown = true;
      
      myPoints += 1;
      
      myPointSound.play();
    }
  }
  
  //Se a coordenada x da bolinha for menor que um e se for permitido pontuar, iniciará uma contagem regressiva e pontuará.
  if
  (
  xBall - radius > -4 &&
  xBall - radius < 1
  ) {
    if (pointAllowed == true) {
      startCountDown = true;
      
      AIPoints += 1;
      
      myPointSound.play();
    }
  }
  
  //print(startCountDown);
  //print(pointsCountDown);
  
  //Mostrando placar na tela do jogo.
  fill('white');
  noStroke();
  rect (width / 2 - 100, 25, 200, 50, 10);
  
  textSize(32);
  textAlign(CENTER, CENTER);
  
  fill('black');
  text (myPoints, width / 2 - 50, 50);
  
  fill('black');
  text (AIPoints, width / 2 + 50, 50);
}