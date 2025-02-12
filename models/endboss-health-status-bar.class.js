class EndbossHealthStatusBar extends DrawableObject {
  IMAGES = [
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    './img/7_statusbars/2_statusbar_endboss/green.png',
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  flipImage() {
    this.ctx.save(); // Speichern des aktuellen Zustands des Canvas
    this.ctx.translate(this.x + this.width, this.y); // Verschiebung des Koordinatensystems
    this.ctx.scale(-1, 1); // Spiegeln des Bildes entlang der x-Achse
    this.ctx.drawImage(this.image, -this.width, 0, this.width, this.height); // Bild spiegeln
    this.ctx.restore(); // Zurücksetzen des Canvas-Zustands
  }
}
