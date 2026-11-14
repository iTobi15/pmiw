class Juego {

  constructor(cantTroncos, anchoYacare) {
    this.cantidadTroncos = cantTroncos;
    this.cantidadBalas = 2;
    this.troncos = [];
    this.obstaculos = [];
    this.yacare = new Yacare(anchoYacare);
    this.estado = "instrucciones";
    this.puntos = 0;
    this.metaPuntos = 30;
    this.tiempoMaximo = 25;
    this.frameInicio = 0;

    for (let i = 0; i < this.cantidadTroncos; i++) {
      this.troncos[i] = new Tronco();
    }
    for (let i = 0; i < this.cantidadBalas; i++) {
      this.obstaculos[i] = new Obstaculo();
    }
  }

  reiniciarJuego() {
    this.estado = "instrucciones";
    this.puntos = 0;
    this.frameInicio = 0;
    this.yacare.reiniciarYacare();

    for (let i = 0; i < this.cantidadTroncos; i++) {
      this.troncos[i].reiniciarTronco();
    }
    for (let i = 0; i < this.cantidadBalas; i++) {
      this.obstaculos[i].reiniciarObstaculo();
    }
  }

  dibujar() {
    if (this.estado === "instrucciones") {
      this.mostrarInstrucciones();
    } else if (this.estado === "jugando") {
      let tiempoTranscurrido = floor((frameCount - this.frameInicio) / 60);
      let tiempoRestante = this.tiempoMaximo - tiempoTranscurrido;

      for (let i = 0; i < this.cantidadTroncos; i++) {
        this.troncos[i].dibujarTronco();
        this.troncos[i].moverTronco();
      }
      for (let i = 0; i < this.cantidadBalas; i++) {
        this.obstaculos[i].dibujarObstaculo();
        this.obstaculos[i].moverObstaculo();
      }
      this.yacare.dibujarYacare();
      this.dibujarInterfaz(tiempoRestante);

      if (this.puntos >= this.metaPuntos) {
        this.estado = "ganaste";
        sonidoGanaste.play();
      } else if (tiempoRestante <= 0) {
        this.estado = "perdiste";
        sonidoPerdiste.play();
      }
    } else if (this.estado === "ganaste") {
      this.mostrarVictoria();
    } else if (this.estado === "perdiste") {
      this.mostrarDerrota();
    }
  }

  moverYacare() {
    if (this.estado === "jugando") {
      if (keyIsDown(LEFT_ARROW)) {
        this.yacare.moverIzquierda();
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.yacare.moverDerecha();
      }
    }
  }

  detectarColision() {
    if (this.estado === "jugando") {
      for (let i = 0; i < this.cantidadTroncos; i++) {
        if (this.troncos[i].colision(this.yacare)) {
          sonidoTronco.play();
          this.troncos[i].reiniciarTronco();
          this.puntos += 1;
        }
      }
      for (let i = 0; i < this.cantidadBalas; i++) {
        if (this.obstaculos[i].colision(this.yacare)) {
          sonidoBala.play();
          this.obstaculos[i].reiniciarObstaculo();
          if (this.puntos > 0) {
            this.puntos -= 1;
          }
        }
      }
    }
  }

  cambiarEstado() {
    if (this.estado === "instrucciones" && key === 'Enter') {
      this.estado = "jugando";
      if (!sonidoFondo.isPlaying()) {
        sonidoFondo.loop();
      }
    }
    if (this.estado === "ganaste" && (key === 'r' || key === 'R')) {
      this.reiniciarJuego();
    }
    if (this.estado === "perdiste" && (key === 'r' || key === 'R')) {
      this.reiniciarJuego();
    }
  }

  dibujarInterfaz(tiempo) {
    fill(90, 50, 20, 220);
    stroke(50, 25, 10);
    strokeWeight(3);
    rect(12, 12, 195, 40, 8);
    rect(width - 165, 12, 153, 40, 8);

    noStroke();
    fill(255, 245, 220);
    textSize(22);
    textAlign(LEFT, CENTER);
    text("Troncos: " + this.puntos + " / " + this.metaPuntos, 25, 32);
    textAlign(RIGHT, CENTER);
    text("Tiempo: " + tiempo, width - 25, 32);
  }

  mostrarInstrucciones() {
    fill(0, 160);
    noStroke();
    rect(0, 0, width, height);

    textAlign(CENTER, CENTER);
    fill(255, 245, 220);
    textSize(32);
    text("LLUVIA DE TRONCOS", width / 2, height / 2 - 60);
    textSize(20);
    text("Usá las flechas IZQUIERDA y DERECHA para mover al yacaré.", width / 2, height / 2 - 10);
    text("Agarrá " + this.metaPuntos + " troncos en " + this.tiempoMaximo + " segundos para armar el dique.", width / 2, height / 2 + 20);
    text("Las balas de cañon restan puntos.", width / 2, height / 2 + 50);

    fill(255, 200, 0);
    text("Presioná ENTER para empezar", width / 2, height / 2 + 100);

    textSize(14);
    fill(210);
    text("Minijuego desarrollado por Lucas Fabbro y Tobias Bellido", width / 2, height - 30);

    this.frameInicio = frameCount;
  }

  mostrarVictoria() {
    fill(0, 160);
    noStroke();
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    fill(100, 255, 100);
    textSize(40);
    text("¡DIQUE CONSTRUIDO!", width / 2, height / 2 - 20);
    fill(255, 200, 0);
    textSize(20);
    text("Presiona la tecla 'R' para reiniciar", width / 2, height / 2 + 30);
  }

  mostrarDerrota() {
    fill(0, 160);
    noStroke();
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    fill(255, 80, 80);
    textSize(40);
    text("¡SE TERMINÓ EL TIEMPO!", width / 2, height / 2 - 20);
    fill(255, 200, 0);
    textSize(20);
    text("Presioná la tecla 'R' para reiniciar", width / 2, height / 2 + 30);
  }
}
