class MovableObject extends DrawableObject {
  //Supclass MovableObject dynamische img
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  wallet = 0;
  bottleBox = 0;

  applyGravity() {
    setInterval(() => {
      // nur wenn wir uns über Boden befinden, springt erstellen y verändert
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) { //always fall
      return true;
    } else {
      return this.y < 150;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y && //R > L
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }
  collectItem(index) {
    this.wallet += 20;
    if (this.wallet >= 100) {
      this.wallet = 100;
    }
    this.world.level.items.splice(index, 1);
  }
  collectBottle() {
    this.bottleBox += 20;

    if (this.bottleBox >= 100) {
      this.bottleBox = 100;
    }
}
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; //Differenz ms
    timepassed = timepassed / 1000; //Differenz sec
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

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
  }
  jump() {
    this.speedY = 30;
  }
}
