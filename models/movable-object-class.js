class MovableObject extends DrawableObject {
  //Supclass MovableObject dynamische img
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  wallet = 0;
  collectedBottle = 0;
  movingLeftIntervallId;
  playAnimationId;

  applyGravity() {
    // Intervall für die Schwerkraftanwendung
    setStoppableInterval(() => {
      // nur wenn wir uns über dem Boden befinden oder die Geschwindigkeit positiv ist (nach oben fliegen)
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY; // Y-Position ändern
        this.speedY -= this.acceleration; // Geschwindigkeit verringern
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      //always fall
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
    this.energy -= 20;
    // if (this.energy === 10) {
    //   this.energy = 0;
    // }
    // else
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
    // console.log('this.collectedBottle:', this.collectedBottle);

    if (this.collectedBottle >= 5) {
      console.log('test');

      this.collectedBottle = 5;
    }
    this.world.level.items.splice(index, 1);
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
