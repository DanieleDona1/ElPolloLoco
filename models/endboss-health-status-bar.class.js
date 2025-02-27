class EndbossHealthStatusBar extends DrawableObject {
  IMAGES = [
    './img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
    './img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
    './img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
    './img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
    './img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
    './img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
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

  /**
   * Flips the image horizontally and draws it on the canvas.
   * This method saves the current canvas state, translates the context to the
   * image's position, scales the context to flip the image, draws the flipped image,
   * and then restores the canvas state.
   */
  flipImage() {
    this.ctx.save();
    this.ctx.translate(this.x + this.width, this.y);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(this.image, -this.width, 0, this.width, this.height);
    this.ctx.restore();
  }
}
