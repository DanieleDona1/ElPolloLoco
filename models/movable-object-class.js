class MovableObject extends DrawableObject {
  //Supclass MovableObject dynamische img
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  lastHit = 0;
  wallet = 0;
  collectedBottle = 0;
  movingLeftIntervallId;
  playAnimationId;
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  /**
   * Applies gravity to the object by updating its position and speed over time.
   * It decreases the vertical speed (`speedY`) and moves the object down if it's not above the ground.
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground or it's an instance of `ThrowableObject`, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 150;
    }
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {Object} mo - The other object to check for collision.
   * @returns {boolean} True if the objects are colliding, otherwise false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right >= mo.x + mo.offset.left && // R -->
      this.x + this.offset.left <= mo.x + mo.width - mo.offset.right && // T --> B
      this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top && // L --> B
      this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom //B --> T
    );
  }

  /**
   * Reduces the object's energy by 20 and updates the time of the last hit.
   * If the energy drops below 0, it is set to 0.
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Collects an item from the world.
   * Increases the wallet count and, if the wallet reaches 5, increases energy by 20.
   * Removes the item from the world.
   * @param {number} index - The index of the item in the world to be collected.
   */
  collectItem(index) {
    this.wallet += 1;
    if (this.wallet >= 5) {
      this.wallet = 5;
      this.energy += 20;
    }
    this.world.level.items.splice(index, 1);
  }

  /**
   * Collects a bottle from the world.
   * Increases the collected bottle count up to a maximum of 5.
   * Removes the bottle from the world.
   * @param {number} index - The index of the bottle in the world to be collected.
   */
  collectBottle(index) {
    this.collectedBottle += 1;
    if (this.collectedBottle >= 5) {
      this.collectedBottle = 5;
    }
    this.world.level.items.splice(index, 1);
  }

  /**
   * Checks if the object is hurt based on the time passed since the last hit.
   * @returns {boolean} True if the object was hit within the last second, otherwise false.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead (energy is 0).
   * @returns {boolean} True if the object is dead (energy is 0), otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Plays an animation by cycling through a set of images.
   * @param {Array<string>} images - The list of image paths to cycle through for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Plays the animation once by cycling through the provided images array.
   * It displays each image in sequence, but only once. After reaching the end of the array, it resets the animation.
   *
   * @param {Array<string>} images - An array of image paths to display in the animation.
   * @returns {void}
   */
  playAnimationOnce(images) {
    if (this.currentImage < images.length) {
      // Check if there are still images to show
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    } else {
      this.currentImage = 0; // Reset the image index after the animation finishes
    }
  }

  /**
   * Moves the object to the right by its speed value.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left by its speed value.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed (`speedY`).
   * Plays a jump sound if enabled.
   */
  jump() {
    if (soundEnabled) world.JUMP_SOUND.play();
    this.speedY = 33;
  }

  /**
   * Causes the object to fall to its death at a given speed value.
   * @param {number} speedValue - The speed at which the object falls.
   */
  fallToDeath(speedValue) {
    setStoppableInterval(() => {
      if (this.y < 1000) {
        this.y += speedValue;
      }
    }, 1000 / 20);
  }

  /**
   * Starts an animation that moves the object to the left continuously.
   */
  animateMoveLeft() {
    this.movingLeftIntervallId = setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  /**
   * Starts an animation that plays the given images in sequence.
   * @param {Array<string>} img - The list of image paths for the animation.
   */
  animatePlayAnimation(img) {
    this.playAnimationId = setStoppableInterval(() => {
      this.playAnimation(img);
    }, 200);
  }
}
