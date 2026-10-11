//grupo: Lucas Fabbro y Tobias Bellido
//historia: LaGuerra de los Yacares
//video: https://youtube.com/watch?v=bJQdOkRHKAA&si=gM-kiI7kOVD0v1D4
let imagenes = [];
let pantalla = 0;
let efectoCredito = 0;
let fuente;
let sonidoFondo,click;

function preload() {
  imagenes[0] = loadImage("data/Inicio.jpg");
  sonidoFondo = loadSound('data/fondo.mp3');
  click = loadSound('data/boton.mp3');
  
  for (let i = 1; i <= 14; i++) {
    imagenes[i] = loadImage("data/pantalla" + i + ".jpg");
  }
  
  imagenes[15] = loadImage("data/alternativo1.jpg");
  imagenes[16] = loadImage("data/alternativo2.jpg");
  imagenes[17] = loadImage("data/fin.jpg");
  imagenes[18] = loadImage("data/creditos.jpg");
  
  fuente = loadFont("data/ComicNeueSansID.ttf");
}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  mostrarPantalla(pantalla, imagenes);
}

function mostrarPantalla(p, imgs) {
  image(imgs[p], 0, 0, width, height);
  if (p == 18) { 
    mostrarCreditos();
    mostrarCartel();
  }
}

function mostrarCreditos() {
  if (efectoCredito < 255) {
    efectoCredito += 0.8;
  }
  textFont(fuente);
  textAlign(CENTER);
  textSize(35);
  noStroke();
  fill(40, 25, 10, efectoCredito);
  text("Lucas Fabbro", width / 2, 220);
  text("Tobias Bellido", width / 2, 270);
}

function mostrarCartel() {
  stroke(90, 50, 2);
  strokeWeight(2);
  fill(220, 170, 110);
  rect(10, 400, 220, 40, 6);
  fill(40, 70, 30);
  noStroke();
  textFont(fuente);
  textSize(13);
  textAlign(LEFT, TOP);
  text("ESPACIO = Reiniciar", 18, 412)
}

function decidirPantalla(p, mx, mitad) {
  
  // Inicio y pantallas lineales
  if (p == 0) { return 1; }
  else if (p == 1) { return 2; }
  else if (p == 2) { return 3; }
  
  // Decisión 1
  else if (p == 3) {
    if (mx < mitad) { return 4; }
    else { return 5; }
  }
  else if (p == 4) { return 5; }
  else if (p == 5) { return 6; }

  // Decisión 2
  else if (p == 6) {
    if (mx < mitad) { return 7; }
    else { return 8; }
  }
  else if (p == 7) { return 9; }
  else if (p == 8) { return 11; }
  else if (p == 9) { return 10; }

  // Decisión 3
  else if (p == 10) {
    if (mx < mitad) { return 15; }
    else { return 8; }
  }
  else if (p == 11) { return 12; }

  // Decisión 4
  else if (p == 12) {
    if (mx < mitad) { return 13; }
    else { return 14; }
  }
  else if (p == 13) { return 17; }
  else if (p == 14) { return 16; }

  // Finales y créditos
  else if (p == 15) { return 18; }
  else if (p == 16) { return 18; }
  else if (p == 17) { return 18; }
  else { return p; }
}

function mouseClicked() {
  click.play();
  if (!sonidoFondo.isPlaying()) {
  sonidoFondo.loop(true);
  }
  pantalla = decidirPantalla(pantalla, mouseX, width / 2);
}

function keyPressed() {
  if (key == " ") {
    if(pantalla == 18){
      click.play();
    }
    pantalla = reiniciar(pantalla);
  }
}

function reiniciar(p) {
  if (p == 18) {
    efectoCredito = 0;
    return 0;
  } else {
    return p;
  }
}
