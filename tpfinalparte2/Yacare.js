class Yacare {

  constructor(anchoInicial) {
    this.ancho = anchoInicial;
    this.alto = 65;
    this.x = width / 2 - this.ancho / 2;
    this.y = height - this.alto - 22;
    this.velocidad = 8;
    this.direccion = 1;
  }

  dibujarYacare() {
    if (this.direccion === 1) {
      image(imgYacareDer, this.x, this.y, this.ancho, this.alto);
    } else {
      image(imgYacareIzq, this.x, this.y, this.ancho, this.alto);
    }
  }

  moverIzquierda() {
    if (this.x > 0) {
      this.x -= this.velocidad;
      this.direccion = -1;
    }
  }

  moverDerecha() {
    if (this.x < width - this.ancho) {
      this.x += this.velocidad;
      this.direccion = 1;
    }
  }

  reiniciarYacare() {
    this.x = width / 2 - this.ancho / 2;
    this.direccion = 1;
  }
}
