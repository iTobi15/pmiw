class Tronco {

  constructor() {
    this.ancho = 75;
    this.alto = 28;
    this.x = random(90, width - 90 - this.ancho);
    this.y = random(-300, -50);
    this.velocidad = 5;
  }

  dibujarTronco() {
    image(imgTronco, this.x, this.y, this.ancho, this.alto);
  }

  moverTronco() {
    if (this.y > height) {
      this.x = random(90, width - 90 - this.ancho);
      this.y = random(-300, -50);
    }
    this.y += this.velocidad;
  }

  colision(yacare) {
    let distancia = dist(yacare.x + yacare.ancho / 2, yacare.y + yacare.alto / 2, this.x + this.ancho / 2, this.y + this.alto / 2);
    return distancia < yacare.alto / 2 + this.alto;
  }

  reiniciarTronco() {
    this.x = random(90, width - 90 - this.ancho);
    this.y = random(-300, -50);
  }
}
