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

  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 150;
    }
  }

  isColliding(mo) {
    return this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x && this.y < mo.y + mo.height;
  }

  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  collectItem(index) {
    this.wallet += 1;
    if (this.wallet >= 5) {
      this.wallet = 5;
      this.energy += 20;
    }
    this.world.level.items.splice(index, 1);
  }
  collectBottle(index) {
    this.collectedBottle += 1;
    if (this.collectedBottle >= 5) {
      this.collectedBottle = 5;
    }
    this.world.level.items.splice(index, 1);
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationReverse(images) {
    let i = images.length - 1 - (this.currentImage % images.length);
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    if (soundEnabled) world.JUMP_SOUND.play();
    this.speedY = 30;
  }

  fallToDeath(speedValue) {
    setStoppableInterval(() => {
      if (this.y < 1000) {
        this.y += speedValue;
      }
    }, 1000 / 20);
  }

  animateMoveLeft() {
    this.movingLeftIntervallId = setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  animatePlayAnimation(img) {
    this.playAnimationId = setStoppableInterval(() => {
      this.playAnimation(img);
    }, 200);
  }
}
