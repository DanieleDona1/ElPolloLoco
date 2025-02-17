class World { //Game logic
  character = new Character();
  level = level1;
  canvas;
  ctx; //der Stift
  keyboard;
  camera_x = 0;
  healthStatusBar = new HealthStatusBar();
  coinStatusBar = new CoinStatusBar();
  bottleStatusBar = new BottleStatusBar();
  endbossHealthStatusBar = new EndbossHealthStatusBar();
  throwableObjects = [];
  reloadBottle = true;

  constructor(canvas, keyboard) { //Hier werden function regelmäßig wiederholt
    this.ctx = canvas.getContext('2d'); //Werkzeug Stift-2D
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    // Intervall für das Überprüfen von Kollisionen und anderen Funktionen
    setStoppableInterval(() => {
      this.checkCollisionsEnemies();
      this.checkCollisionsItems();
      this.checkThrowObjects();
      this.checkCollisionsBottle();
    }, 200);
  }


  checkThrowObjects() {
    if (this.keyboard.SPACE && this.character.collectedBottle !== 0 && this.reloadBottle) {
      this.reloadBottle = false;
      setTimeout(() => this.reloadBottle = true, 750);
      this.bottleStatusBar.setPercentage(this.character.collectedBottle * 20);
      this.character.collectedBottle -= 1;
      console.log('this.character.collectBottle', this.character.collectedBottle);

      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
      this.throwableObjects.push(bottle);
      // console.log('this.character.collectBottle / 20', this.character.collectBottle / 20);
    }
  }


  checkCollisionsEnemies() {
    this.level.enemies.forEach(enemy => {
      if(this.character.isColliding(enemy)) {
        this.character.hit();
        this.healthStatusBar.setPercentage(this.character.energy);
        //TODO if (this.character.energy === 0) {
        //   this.character.fallToDeath();
        // }
      }
    });
  }
  checkCollisionsItems() {
    this.level.items.forEach((item, index) => {
      // console.log('this.character', this.level);

        if (this.character.isColliding(item)) {
            // Check if the item is a Coin
            if (item instanceof Coin) {
                this.character.collectItem(index);
                this.coinStatusBar.setPercentage(this.character.wallet);
            }
            else if (item instanceof Bottle) {
                this.character.collectBottle(index);
                console.log('this.character.collectBottle * 20:', this.character.collectedBottle);

                this.bottleStatusBar.setPercentage(this.character.collectedBottle * 20);

            }
        }
    });
}
//TODO
checkCollisionsBottle() {
  this.throwableObjects.forEach((bottle) => {
      // Überprüfe Kollision mit Feinden
      this.level.enemies.forEach((enemy) => {
          if (bottle.isColliding(enemy)) {
              console.log('Enemies hurt');
          }
      });

      // Überprüfe Kollision mit dem Endboss
      if (bottle.isColliding(this.level.endboss)) {
          console.log('Endboss hurt');
      }
  });
}

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.items);
    // this.addObjectsToMap(this.level.bottle);


    this.ctx.translate(-this.camera_x, 0);
    // Space for fixed objects
    this.addToMap(this.healthStatusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
    if (this.endbossHealthStatusBar.otherDirection) {
      this.endbossHealthStatusBar.flipImage(); // Spiegeln, wenn andere Richtung
    } else {
      this.addToMap(this.endbossHealthStatusBar); // Normal zeichnen, wenn nicht gespiegelt
    }
    this.ctx.translate(this.camera_x, 0);


    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    //Draw() wird immer wieder aufgerufen
    let self = this; //aktuelle Welt hier drinne nicht mehr kennt
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save(); //Alle eigenschaft des this.ctx was der Stift gemacht hat
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
