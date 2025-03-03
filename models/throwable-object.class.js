class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super();
    this.loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.angle = 0;
    this.throw();
  }

  /**
   * Initiates a throwing action for the object.
   * Sets the vertical speed (`speedY`) to simulate upward motion,
   * applies gravity, and moves the object horizontally while rotating it.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();

    setStoppableInterval(() => {
      this.x += (this.bottleSpeedX);
      this.angle += 10;
    }, 25);
  }

  /**
   * Draws the object on the canvas with rotation and position adjustments.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas to draw on.
   */
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}
