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
  throwableObjects = [];

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
    setInterval(() => {

      this.checkCollisionsEnemies();
      this.checkCollisionsItems();
      this.checkThrowObjects();

    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.SPACE) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }


  checkCollisionsEnemies() {
    this.level.enemies.forEach(enemy => {
      if(this.character.isColliding(enemy)) {
        this.character.hit();
        this.healthStatusBar.setPercentage(this.character.energy);
      }
    });
  }
  checkCollisionsItems() {
    this.level.items.forEach(i => {
        if(this.character.isColliding(i)) {
            // Check if the item is a Coin
            if (i instanceof Coin) {
                this.character.collectItem();
                this.coinStatusBar.setPercentage(this.character.wallet);
              }
              // Check if the item is a Bottle
              else if (i instanceof Bottle) {
                    this.character.collectBottle();
                this.bottleStatusBar.setPercentage(this.character.bottleBox);
            }
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
 f
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
