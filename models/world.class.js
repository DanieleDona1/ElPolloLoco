class World {
  //Game logic
  character = new Character();
  level = level1;
  canvas;
  ctx; //der Stift
  keyboard;
  camera_x = 0;
  enemyIsDead = false;
  healthStatusBar = new HealthStatusBar();
  coinStatusBar = new CoinStatusBar();
  bottleStatusBar = new BottleStatusBar();
  endbossHealthStatusBar = new EndbossHealthStatusBar();
  throwableObjects = [];
  reloadBottle = true;

  constructor(canvas, keyboard) {
    //Hier werden function regelmäßig wiederholt
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
      this.checkCollision();
      this.checkThrowObjects();
      this.checkCollisionsItems();
    }, 100);
  }

  checkThrowObjects() {
    if (this.keyboard.SPACE && this.character.collectedBottle !== 0 && this.reloadBottle) {
      this.reloadBottle = false;
      setTimeout(() => (this.reloadBottle = true), 500);
      this.bottleStatusBar.setPercentage(this.character.collectedBottle * 20);
      this.character.collectedBottle -= 1;
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.bottleStatusBar.setPercentage(this.character.collectedBottle * 20);
    }
  }

  checkCollision() {
    this.level.enemies.forEach((enemy, index) => {
      this.characterCollision(enemy, index);
      this.bottleCollision(enemy, index);
    });
  }

  characterCollision(enemy, index) {
    if (this.character.isColliding(enemy)) {
      if (this.character.isAboveGround() && !(enemy instanceof Endboss)) {
        this.stompEnemy(enemy, index);
      } else if (!this.enemyIsDead) {
        this.character.hit();
        this.healthStatusBar.setPercentage(this.character.energy);

        if (this.character.energy === 0) {
          this.character.fallToDeath(3);
          document.getElementById('startContainer').style.backgroundImage = 'url(./img/9_intro_outro_screens/game_over/game_over.png)';
          setTimeout(() => {
            togglePlayPauseBtn();
            document.getElementById('playPauseIcon').style.display = 'none';
            document.getElementById('restartBtn').classList.remove('d-none');
          }, 350);
        }
      }
    }
  }

  stompEnemy(enemy, index) {
    this.enemyIsDead = true;
    clearInterval(enemy.movingLeftIntervallId);
    clearInterval(enemy.playAnimationId);
    enemy.playAnimation(enemy.IMAGES_DEAD);
    enemy.fallToDeath(5);
    setTimeout(() => {
      this.level.enemies.splice(index, 1);
    }, 1000);
    setTimeout(() => {
      this.enemyIsDead = false;
    }, 500);
  }

  bottleCollision(enemy, index) {
    if (this.throwableObjects.length > 0) {
      this.throwableObjects.forEach((bottle) => {
        if (bottle.isColliding(enemy)) {
          if (enemy instanceof Endboss) {
            this.level.enemies[0].hit();
            this.endbossHealthStatusBar.setPercentage(this.level.enemies[0].energy);
            if (this.level.enemies[0].energy > 0) {
              this.level.enemies[0].hitEndbossAnimation();
            } else {
              this.level.enemies[0].endbossDead();
              setTimeout(() => {
                document.getElementById('startContainer').style.backgroundImage = 'url(./img/start_end_screen/win.png)';
                document.getElementById('playPauseIcon').click();
                this.character.playAnimation(this.character.IMAGES_WON);
              }, 500);
              setTimeout(() => {
                document.getElementById('restartBtn').classList.remove('d-none');
                document.getElementById('playPauseIcon').style.display = 'none';
              }, 500);
            }
          } else {
            this.stompEnemy(enemy, index);
          }
        }
      });
    }
  }

  checkCollisionsItems() {
    this.level.items.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        if (item instanceof Coin) {
          this.character.collectItem(index);
          this.coinStatusBar.setPercentage(this.character.wallet * 20);

          this.healthStatusBar.setPercentage(this.character.energy);
        } else if (item instanceof Bottle) {
          this.character.collectBottle(index);
          this.bottleStatusBar.setPercentage(this.character.collectedBottle * 20);
        }
      }
    });
  }
  //TODO
  checkCollisionsBottle() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
        }
      });
      if (bottle.isColliding(this.level.endboss)) {
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.items);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthStatusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
    if (this.endbossHealthStatusBar.otherDirection) {
      this.endbossHealthStatusBar.flipImage();
    } else {
      this.addToMap(this.endbossHealthStatusBar);
    }
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

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
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
