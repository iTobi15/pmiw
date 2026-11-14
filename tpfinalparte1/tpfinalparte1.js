//grupo: Lucas Fabbro y Tobias Bellido
//historia: LaGuerra de los Yacares
//video: https://youtube.com/watch?v=bJQdOkRHKAA&si=gM-kiI7kOVD0v1D4
let imagenes = [];
let textos = [];
let ajustes = [];
let lineasTexto;
let pantalla = 0;
let efectoCredito = 0;
let fuente;
let sonidoFondo, click;

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
  lineasTexto = loadStrings("data/textos.txt");
}

function setup() {
  createCanvas(800, 450);

  textos = armarTextos(lineasTexto, 19, 5);

  // Cada fila es una pantalla:
  // [numDx, numDy, grandeDx, grandeDy, grandeTam, preguntaDy, aDx, aDy, bDx, bDy, aAncho, bAncho]
  ajustes = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],            // 0
    [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],            // 1
    [0, 4, 12, 0, 2, 0, 0, 0, 0, 0, 0, 0],           // 2
    [0, -4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],           // 3
    [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],            // 4
    [0, 0, 12, -4, 0, 0, 0, 0, 0, 0, 0, 0],          // 5
    [-8, -6, 0, -12, 0, 0, 0, 0, 0, 0, 0, 0],        // 6
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],            // 7
    [0, 4, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0],           // 8
    [0, 4, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],            // 9
    [0, 4, 0, 0, 0, 37, -6, 27, -6, 27, 0, 0],       // 10
    [0, 4, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0],           // 11
    [0, 4, 12, 0, 0, 0, 52, 14, -9, 13, -52, -19],   // 12
    [0, 4, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0],           // 13
    [0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0],           // 14
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],            // 15
    [0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0],           // 16
    [0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0],           // 17
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]             // 18
  ];
}

// Arma el array de textos a partir de las líneas del txt.
// Recibe las líneas, la cantidad de pantallas y los campos por pantalla.
function armarTextos(lineas, cantPantallas, camposPorPantalla) {
  let resultado = [];

  for (let i = 0; i < cantPantallas; i++) {
    resultado[i] = [];
    for (let j = 0; j < camposPorPantalla; j++) {
      resultado[i][j] = lineas[i * camposPorPantalla + j];
    }
  }

  return resultado;
}

// Devuelve el texto del cartel de arriba a la izquierda
function obtenerEtiqueta(p) {
  if (p === 15) { return "Final alternativo 1"; }
  else if (p === 16) { return "Final alternativo 2"; }
  else if (p === 17) { return "Fin"; }
  else { return "Pantalla " + p; }
}

function draw() {
  if (pantalla === 18 && efectoCredito < 255) {
    efectoCredito += 0.8;
  }
  mostrarPantalla(pantalla, imagenes, textos, fuente, efectoCredito, ajustes);
}

function mostrarPantalla(p, imgs, txts, f, alfa, ajs) {
  image(imgs[p], 0, 0, width, height);

  if (p === 0) {
    mostrarTexto(f, txts[p][0], 208, 30, 401, 36, 30, CENTER, 255);
    mostrarTexto(f, txts[p][1], 208, 66, 401, 62, 58, CENTER, 255);
    mostrarTexto(f, txts[p][2], 208, 130, 401, 32, 20, CENTER, 255);
    mostrarTexto(f, txts[p][3], 281, 222, 237, 59, 24, CENTER, 255);
    mostrarTexto(f, txts[p][4], 592, 340, 170, 62, 15, CENTER, 255);
  } else if (p === 18) {
    // Título arriba y los dos nombres abajo
    mostrarTexto(f, txts[p][1], 231, 64, 343, 89, 40, CENTER, alfa);
    mostrarTexto(f, txts[p][0] + "\n" + txts[p][4], 230, 190, 340, 150, 30, CENTER, alfa);
    mostrarCartel(f, "ESPACIO = Reiniciar");
  } else {
    let a = ajs[p];
    let esAlternativo = (p === 15 || p === 16);

    // Texto del cartel grande: en los finales alternativos lleva título arriba
    let principal = txts[p][0];
    if (esAlternativo) {
      principal = txts[p][4] + "\n" + txts[p][0];
    }

    let tam = 14;
    if (esAlternativo) {
      tam = 13;
    }
    tam = tam + a[4];

    let tamEtq = 15;
    if (esAlternativo) {
      tamEtq = 13;
    } else if (p === 17) {
      tamEtq = 17;
    }

    // Cartel de arriba a la izquierda
    mostrarTexto(f, obtenerEtiqueta(p), 30 + a[0], 16 + a[1], 150, 34, tamEtq, CENTER, 255);

    // Cartel grande
    mostrarTexto(f, principal, 205 + a[2], 36 + a[3], 390 - a[2], 100, tam, CENTER, 255);

    // Pantallas con decisión (las que no tienen decisión traen "-" en la opción A)
    if (txts[p][2] !== "-") {
      mostrarTexto(f, txts[p][1], 248, 312 + a[5], 309, 24, 15, CENTER, 255);
      mostrarTexto(f, txts[p][2], 156 + a[6], 348 + a[7], 229 + a[10], 70, 13, LEFT, 255);
      mostrarTexto(f, txts[p][3], 529 + a[8], 348 + a[9], 184 + a[11], 70, 13, LEFT, 255);
    }
  }
}

// Dibuja texto dentro de un cuadro (x, y, ancho, alto)
function mostrarTexto(f, txt, x, y, w, h, tam, alineacion, alfa) {
  textFont(f);
  textAlign(alineacion, CENTER);
  textSize(tam);
  noStroke();
  fill(40, 25, 10, alfa);
  text(txt, x, y, w, h);
}

// Cartel de reinicio
function mostrarCartel(f, txt) {
  stroke(90, 50, 2);
  strokeWeight(2);
  fill(220, 170, 110);
  rect(10, 400, 220, 40, 6);
  mostrarTexto(f, txt, 18, 400, 205, 40, 15, LEFT, 255);
}

function decidirPantalla(p, mx, mitad) {

  // Inicio y pantallas lineales
  if (p === 0) { return 1; }
  else if (p === 1) { return 2; }
  else if (p === 2) { return 3; }

  // Decisión 1
  else if (p === 3) {
    if (mx < mitad) { return 4; }
    else { return 5; }
  }
  else if (p === 4) { return 5; }
  else if (p === 5) { return 6; }

  // Decisión 2
  else if (p === 6) {
    if (mx < mitad) { return 7; }
    else { return 8; }
  }
  else if (p === 7) { return 9; }
  else if (p === 8) { return 11; }
  else if (p === 9) { return 10; }

  // Decisión 3
  else if (p === 10) {
    if (mx < mitad) { return 15; }
    else { return 8; }
  }
  else if (p === 11) { return 12; }

  // Decisión 4
  else if (p === 12) {
    if (mx < mitad) { return 13; }
    else { return 14; }
  }
  else if (p === 13) { return 17; }
  else if (p === 14) { return 16; }

  // Finales y créditos
  else if (p === 15) { return 18; }
  else if (p === 16) { return 18; }
  else if (p === 17) { return 18; }
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
  if (key === " ") {
    if (pantalla === 18) {
      click.play();
    }
    pantalla = reiniciar(pantalla);
  }
}

function reiniciar(p) {
  if (p === 18) {
    efectoCredito = 0;
    return 0;
  } else {
    return p;
  }
}
