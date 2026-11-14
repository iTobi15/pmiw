//grupo: Lucas Fabbro y Tobias Bellido
//historia: LaGuerra de los Yacares
//video: https://youtube.com/watch?v=W-8uR4rhmVY&si=2B9o3R0pzO6_mTiN
let juego;
let cantidad = 5;
let imgFondo;
let imgYacareDer;
let imgYacareIzq;
let imgTronco;
let imgBala;
let sonidoFondo;
let sonidoTronco;
let sonidoBala;
let sonidoGanaste;
let sonidoPerdiste;

function preload() {
  imgFondo = loadImage("data/fondo.jpg");
  imgYacareDer = loadImage("data/yacare.png");
  imgYacareIzq = loadImage("data/yacareizq.png");
  imgTronco = loadImage("data/tronco.png");
  imgBala = loadImage("data/bala.png");
  sonidoFondo = loadSound("data/fondo.mp3");
  sonidoTronco = loadSound("data/tronco.mp3");
  sonidoBala = loadSound("data/bala.mp3");
  sonidoGanaste = loadSound("data/ganaste.mp3");
  sonidoPerdiste = loadSound("data/perdiste.mp3");
}

function setup() {
  createCanvas(800, 400);
  juego = new Juego(cantidad, 150);
}

function draw() {
  image(imgFondo, 0, 0, width, height);
  juego.dibujar();
  juego.moverYacare();
  juego.detectarColision();
}

function keyPressed() {
  juego.cambiarEstado();
}
