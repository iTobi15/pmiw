let fondo, suelo, tituloimg, btnstart, btnrestart;
let rosacamina = [];
let rosaquieta = [];
let monstruoanim = [];
let fondox = 0;
let suelox = 0;
let velocidadcaminar = 90;
let velocidadquieta = 300;
let velocidadmonstruo = 70;
let fase = 1;
let monstruoposx = -300;
let rosaposx = -200;
let tituloposy = -200;
let estadorosa = 1;
let startancho, startalto, startposx;
let restartancho, restartalto, restartposx;
let botonesposy;

function preload() {
  fondo = loadImage("data/fondo.png");
  suelo = loadImage("data/suelo.png");
  tituloimg = loadImage("data/goldenaxe.png");
  btnstart = loadImage("data/start.png");
  btnrestart = loadImage("data/restart.png");
  
  for (let i = 0; i < 6; i++) {
    rosacamina[i] = loadImage("data/camina" + (i + 1) + ".png");
  }
  
  rosaquieta[0] = loadImage("data/camina1.png");
  
  for (let i = 0; i < 6; i++) {
    monstruoanim[i] = loadImage("data/amenaza" + (i + 1) + ".png");
  }
}

//setup programa//
function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  
  fondox = fondox - 2;
  if (fondox <= -width) fondox = 0;
  image(fondo, fondox, 0, width, height);
  image(fondo, fondox + width, 0, width, height);
  
  let nuevoalto = 150;
  let proporcion = nuevoalto / suelo.height;
  let nuevoancho = suelo.width * proporcion;
  
  suelox = suelox - 5;
  if (suelox <= -nuevoancho) suelox = 0;
  let posiciony = height - nuevoalto;
  
  for (let i = 0; i < 15; i++) {
    image(suelo, suelox + (i * nuevoancho), posiciony, nuevoancho, nuevoalto);
  }
  
  let escalarosa = 3.5;
  let pjancho = rosacamina[0].width * escalarosa;
  let pjalto = rosacamina[0].height * escalarosa;
  let centroexacto = (width / 2) - (pjancho / 2);
  let escalamonstruo = 3.5;
  let monstruoancho = monstruoanim[0].width * escalamonstruo;
  let monstruoalto = monstruoanim[0].height * escalamonstruo;

//monstruo camina//
  if (fase === 1) {
    monstruoposx = monstruoposx + 10;
    dibujarpersonajeanimado(monstruoanim, velocidadmonstruo, monstruoposx, posiciony - monstruoalto, monstruoancho, monstruoalto);
    
    if (monstruoposx > width) {
      fase = 2; 
    }
//rosa camina hacia el centro//
  } else if (fase === 2) {
    estadorosa = 1;
    rosaposx = rosaposx + 10;
    
    if (rosaposx >= centroexacto) {
      rosaposx = centroexacto;
      fase = 3; 
    }
//baja el titulo principal//
  } else if (fase === 3) {
    estadorosa = 0; 
    tituloposy = tituloposy + 10;
    
    let tituloancho = tituloimg.width / 2.5;
    let tituloalto = tituloimg.height / 2.5;
    let centrotitulo = (width / 2) - (tituloancho / 2);
    image(tituloimg, centrotitulo, tituloposy, tituloancho, tituloalto);
//aparecen los botones de start y restart//
    if (tituloposy >= 50) {
      tituloposy = 50;
      fase = 4; 
    }
    
  } else if (fase === 4) {
    estadorosa = 1; 
    
    let tituloancho = tituloimg.width / 2.5;
    let tituloalto = tituloimg.height / 2.5;
    let centrotitulo = (width / 2) - (tituloancho / 2);
    image(tituloimg, centrotitulo, tituloposy, tituloancho, tituloalto);
    startancho = 150;
    startalto = 55;
    restartancho = 150;
    restartalto = 55;
    botonesposy = 220;
    startposx = (width / 2) - startancho - 20;
    restartposx = (width / 2) + 20;
    image(btnstart, startposx, botonesposy, startancho, startalto);
    image(btnrestart, restartposx, botonesposy, restartancho, restartalto);
  }
  
//rosa se mantiene en mitad de pantalla//
  if (fase >= 2) {
    let animacionactual = rosacamina;
    let velocidadactual = velocidadcaminar;
    
    if (estadorosa === 0) {
      animacionactual = rosaquieta;
      velocidadactual = velocidadquieta;
    } else if (estadorosa === 1) {
      animacionactual = rosacamina;
      velocidadactual = velocidadcaminar;
    }
    
    dibujarpersonajeanimado(animacionactual, velocidadactual, rosaposx, posiciony - pjalto, pjancho, pjalto);
  }
}

//funcion de sprite//
function dibujarpersonajeanimado(animacion, velocidad, x, y, w, h) {
  let frameactual = obtenerframe(animacion.length, velocidad);
  image(animacion[frameactual], x, y, w, h);
}

function obtenerframe(totalframes, velocidad) {
  return int(frameCount / (velocidad / 10)) % totalframes;
}

//reinicio//
function reiniciarescena() {
  fase = 1;
  monstruoposx = -300;
  rosaposx = -200;
  tituloposy = -200;
  estadorosa = 1;
}

//presionar el boton de restart//
function mousePressed() {
  if (fase === 4 && tituloposy === 50) {
    if (mouseX >= restartposx && mouseX <= restartposx + restartancho && 
        mouseY >= botonesposy && mouseY <= botonesposy + restartalto) {
      reiniciarescena();
    }
  }
}
