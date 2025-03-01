class Drawer {
  constructor(world) {
    this.world = world;
  }

  /**
   * Starts the drawing loop, clearing the canvas and rendering the game world.
   */
  draw() {
    this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    this.world.ctx.translate(this.world.camera_x, 0);
    this.drawBackgroundbjects();
    this.drawStatic();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draws background and cloud objects on the canvas.
   */
  drawBackgroundbjects() {
    this.addObjectsToMap(this.world.level.backgroundObjects);
    this.addObjectsToMap(this.world.level.clouds);
  }

  /**
   * Draws static elements like status bars and the character on the canvas.
   */
  drawStatic() {
    const ctx = this.world.ctx;
    const camera_x = this.world.camera_x;
    ctx.translate(-camera_x, 0);
    this.drawStatusBars();
    ctx.translate(camera_x, 0);
    this.drawEnemiesAndItems();
    this.addToMap(this.world.character);
    ctx.translate(-camera_x, 0);
  }

  /**
   * Draws status bars (health, coins, bottles, and boss health) on the canvas.
   */
  drawStatusBars() {
    this.addToMap(this.world.healthStatusBar);
    this.addToMap(this.world.coinStatusBar);
    this.addToMap(this.world.bottleStatusBar);

    if (this.world.endbossHealthStatusBar.otherDirection) {
      this.world.endbossHealthStatusBar.flipImage();
    } else {
      this.addToMap(this.world.endbossHealthStatusBar);
    }
  }

  /**
   * Draws enemies, items, and throwable objects on the canvas.
   */
  drawEnemiesAndItems() {
    this.addObjectsToMap(this.world.level.items);
    this.addObjectsToMap(this.world.level.enemies);
    this.addObjectsToMap(this.world.throwableObjects);
  }

  /**
   * Adds multiple objects to the map (canvas) by calling `addToMap` for each object.
   * @param {Array} objects - The objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map by drawing it and its frame.
   * Flips the image if needed.
   * @param {Object} mo - The object to be drawn on the canvas.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.world.ctx);
    mo.drawFrame(this.world.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an image horizontally for an object.
   * @param {Object} mo - The object whose image needs to be flipped.
   */
  flipImage(mo) {
    const ctx = this.world.ctx;
    ctx.save();
    ctx.translate(mo.width, 0);
    ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the object's position after the horizontal flip.
   * @param {Object} mo - The object to restore its original position.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.world.ctx.restore();
  }
}
