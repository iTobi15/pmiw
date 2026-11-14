class Obstaculo {

  constructor() {
    this.tamano = 55;
    this.x = random(90, width - 90 - this.tamano);
    this.y = random(-400, -100);
    this.velocidad = 6;
  }

  dibujarObstaculo() {
    image(imgBala, this.x, this.y, this.tamano, this.tamano);
  }

  moverObstaculo() {
    if (this.y > height) {
      this.x = random(90, width - 90 - this.tamano);
      this.y = random(-400, -100);
    }
    this.y += this.velocidad;
  }

  colision(yacare) {
    let distancia = dist(yacare.x + yacare.ancho / 2, yacare.y + yacare.alto / 2, this.x + this.tamano / 2, this.y + this.tamano / 2);
    return distancia < yacare.alto / 2 + this.tamano / 2;
  }

  reiniciarObstaculo() {
    this.x = random(90, width - 90 - this.tamano);
    this.y = random(-400, -100);
  }
}
