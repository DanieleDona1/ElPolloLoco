class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  /**
   * Loads an image from the given path URL.
   * @param {string} path The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image on the given context (Canvas).
   * @param {CanvasRenderingContext2D} ctx The 2D context of the canvas where the image will be drawn.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {}
  }

  /**
   * Draws a frame around the object if it is an instance of certain classes.
   * @param {CanvasRenderingContext2D} ctx The 2D context of the canvas where the frame will be drawn.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
      const offsetX = this.x + this.offset.left;
      const offsetY = this.y + this.offset.top;

      ctx.beginPath();
      ctx.lineWidth = '1';
      ctx.strokeStyle = 'blue';
      ctx.rect(offsetX, offsetY, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
      ctx.stroke();
    }
  }


  /**
   * Loads multiple images and stores them in the image cache.
   * @param {string[]} arr An array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Sets the percentage and loads the corresponding image from the cache.
   * @param {number} percentage The percentage (between 0 and 100) that determines the image selection.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the image index based on the percentage.
   * @returns {number} The image index in the IMAGES array (between 0 and 5).
   */
  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    else if (this.percentage >= 80) return 4;
    else if (this.percentage >= 60) return 3;
    else if (this.percentage >= 40) return 2;
    else if (this.percentage >= 20) return 1;
    else if (this.percentage >= 0) return 0;
  }
}
