class World {
  ALERT_SOUND = new Audio('./audio/alert_endboss.mp3');
  ATTACK_SCREAM_SOUND = new Audio('./audio/attack-scream.wav');
  COIN_SOUND = new Audio('./audio/coin.mp3');
  GAME_OVER_SOUND = new Audio('./audio/game_over.wav');
  JUMP_SOUND = new Audio('./audio/jump.wav');
  STOMP_SOUND = new Audio('./audio/stomp.wav');
  WALKING_SOUND = new Audio('./audio/walking.wav');
  WIN_SOUND = new Audio('./audio/win.wav');
  COLLECT_BOTTLE_SOUND = new Audio('./audio/bottle.wav');
  COLLIDING_BOTTLE_SOUND = new Audio('./audio/colliding_bottle.wav');
  SLEEP_SOUND = new Audio('./audio/sleep.wav');
  HURT_SOUND = new Audio('./audio/hurt.wav');

  character = new Character();
  isCharacterDead = false;
  isEndbossDead = false;
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
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.initializeSoundSettings();
  }

  /**
   * Sets the world for the character.
   * This method assigns the current world instance to the character's world property.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop to check various game states.
   * This method sets an interval to repeatedly check for collisions, throwable objects, and item collisions.
   */
  run() {
    setStoppableInterval(() => {
      this.checkCollision();
      this.checkThrowObjects();
      this.checkCollisionsItems();
    }, 100);
  }

  /**
   * Initializes the sound settings for various game events.
   * This method sets the volume for different sound effects, ensuring they are ready for use in the game.
   */
  initializeSoundSettings() {
    this.ALERT_SOUND.volume = 0.3;
    this.ATTACK_SCREAM_SOUND.volume = 0.5;
    this.COIN_SOUND.volume = 0.5;
    this.GAME_OVER_SOUND.volume = 0.2;
    this.JUMP_SOUND.volume = 0.7;
    this.STOMP_SOUND.volume = 0.5;
    this.WALKING_SOUND.volume = 0.1;
    this.WIN_SOUND.volume = 0.5;
    this.COLLIDING_BOTTLE_SOUND.volume = 0.5;
    this.SLEEP_SOUND.volume = 0.5;
    this.HURT_SOUND.volume = 0.5;
  }

  /**
   * Checks if the player can throw a bottle and handles the bottle throw process.
   * If the player can throw a bottle, it will trigger the throwBottle method and update the bottle status.
   */
  checkThrowObjects() {
    if (this.canThrowBottle()) {
      this.throwBottle();
      this.updateBottleStatus();
    }
  }

  /**
   * Determines if the player can throw a bottle.
   * The player can throw a bottle if the space bar is pressed, the player has collected a bottle, and the reload is enabled.
   *
   * @returns {boolean} Returns true if the player can throw a bottle, otherwise false.
   */
  canThrowBottle() {
    return this.keyboard.SPACE && this.character.collectedBottle !== 0 && this.reloadBottle;
  }

  /**
   * Handles the bottle throwing action.
   * This method triggers the throwing of a bottle and initiates a reload delay for the next throw.
   */
  throwBottle() {
    this.reloadBottle = false;
    setTimeout(() => (this.reloadBottle = true), 500);
    let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
    this.throwableObjects.push(bottle);
    this.character.collectedBottle -= 1;
  }

  /**
   * Updates the bottle status display.
   * This method updates the bottle status bar based on the current number of collected bottles.
   */
  updateBottleStatus() {
    this.bottleStatusBar.setPercentage(this.character.collectedBottle * 20);
  }

  /**
   * Checks for collisions between the character and enemies or bottles.
   * This method iterates through all enemies to check if there is a collision with the character or if a bottle collides with an enemy.
   */
  checkCollision() {
    this.level.enemies.forEach((enemy, index) => {
      this.characterCollision(enemy, index);
      this.bottleCollision(enemy, index);
    });
  }

  /**
   * Handles the collision between the character and an enemy.
   * If a collision is detected, it checks if the character is above the enemy (to handle stomps) or if the character should be hit.
   *
   * @param {Object} enemy - The enemy object to check for collision.
   * @param {number} index - The index of the enemy in the enemies array.
   */
  characterCollision(enemy, index) {
    if (this.character.isColliding(enemy)) {
      if (this.character.isAboveGround() && !(enemy instanceof Endboss)) {
        this.handleStomp(enemy, index);
      } else {
        this.handleCharacterHit();
      }
    }
  }

  /**
   * Handles the stomp action on an enemy.
   * This method is called when the character successfully stomps on an enemy.
   *
   * @param {Object} enemy - The enemy object to stomp.
   * @param {number} index - The index of the enemy in the enemies array.
   */
  handleStomp(enemy, index) {
    this.stompEnemy(enemy, index);
  }

  /**
   * Handles the situation when the character is hit by an enemy.
   * If the character is hit and their energy reaches zero, the character's death sequence is triggered.
   */
  handleCharacterHit() {
    if (!this.enemyIsDead) {
      this.character.hit();
      this.updateHealthBar();

      if (this.character.energy === 0 && !this.isCharacterDead) {
        this.handleCharacterDeath();
      }
    }
  }

  /**
   * Updates the health bar to reflect the character's current energy.
   * This method updates the health status bar based on the character's remaining energy.
   */
  updateHealthBar() {
    this.healthStatusBar.setPercentage(this.character.energy);
  }

  /**
   * Handles the character's death sequence.
   * This method is called when the character's energy reaches zero, triggering a death animation and game over screen.
   */
  handleCharacterDeath() {
    this.character.fallToDeath(40);
    this.showGameOverScreen();
    if (soundEnabled) this.GAME_OVER_SOUND.play();
    setTimeout(() => {
      this.showRestartOptions();
    }, 350);
    this.isCharacterDead = true;
  }

  /**
   * Displays the game over screen.
   * This method updates the background image to show the game over screen.
   */
  showGameOverScreen() {
    document.getElementById('startContainer').style.backgroundImage = 'url(./img/9_intro_outro_screens/game_over/game_over.png)';
  }

  /**
   * Displays the restart options after the game is over.
   * This method shows the restart button and hides the play/pause button.
   */
  showRestartOptions() {
    togglePlayPauseBtn();
    document.getElementById('playPauseIcon').style.display = 'none';
    document.getElementById('restartBtn').classList.remove('d-none');
  }

  /**
   * Handles the process of stomping on an enemy.
   * This method stops the enemy's movement, plays the death animation, handles the sound effect,
   * triggers the enemy's fall to death, removes the enemy from the level, and resets the enemy death flag.
   *
   * @param {Object} enemy - The enemy to stomp on.
   * @param {number} index - The index of the enemy in the level's enemy array.
   */
  stompEnemy(enemy, index) {
    this.enemyIsDead = true;
    this.stopEnemyMovement(enemy);
    this.playEnemyDeathAnimation(enemy);
    this.handleSound();
    this.enemyFallToDeath(enemy);
    this.removeEnemyFromLevel(enemy, index);
    this.resetEnemyDeathFlag();
  }

  /**
   * Stops the movement of an enemy by clearing its movement intervals.
   * This method ensures that the enemy stops moving once it has been defeated.
   *
   * @param {Object} enemy - The enemy whose movement should be stopped.
   */
  stopEnemyMovement(enemy) {
    clearInterval(enemy.movingLeftIntervallId);
    clearInterval(enemy.playAnimationId);
  }

  /**
   * Plays the enemy's death animation.
   * This method triggers the death animation for the provided enemy.
   *
   * @param {Object} enemy - The enemy whose death animation should be played.
   */
  playEnemyDeathAnimation(enemy) {
    enemy.playAnimation(enemy.IMAGES_DEAD);
  }

  /**
   * Plays the sound effect associated with stomping an enemy.
   * This method plays the stomp sound if sound is enabled in the game.
   */
  handleSound() {
    if (soundEnabled) this.STOMP_SOUND.play();
  }

  /**
   * Causes the enemy to fall to its death.
   * This method triggers the fall animation and logic for the enemy when it is defeated.
   *
   * @param {Object} enemy - The enemy that should fall to death.
   */
  enemyFallToDeath(enemy) {
    enemy.fallToDeath(8);
  }

  /**
   * Removes an enemy from the level after a short delay.
   * This method removes the specified enemy from the level's enemies array.
   *
   * @param {Object} enemy - The enemy to remove.
   * @param {number} index - The index of the enemy in the enemies array.
   */
  removeEnemyFromLevel(enemy, index) {
    setTimeout(() => {
      this.level.enemies.splice(index, 1);
    }, 1000);
  }

  /**
   * Resets the enemy death flag after a short delay.
   * This method ensures that the enemy death flag is reset after the death animation is complete.
   */
  resetEnemyDeathFlag() {
    setTimeout(() => {
      this.enemyIsDead = false;
    }, 500);
  }

  /**
   * Checks if any throwable objects have collided with enemies.
   * This method iterates over all throwable objects and checks for collisions with each enemy.
   *
   * @param {Object} enemy - The enemy to check for collisions with throwable objects.
   * @param {number} index - The index of the enemy in the enemies array.
   */
  bottleCollision(enemy, index) {
    if (this.throwableObjects.length > 0) {
      this.throwableObjects.forEach((bottle) => {
        if (bottle.isColliding(enemy)) {
          if (enemy instanceof Endboss) {
            this.handleEndbossCollision();
          } else {
            this.handleRegularEnemyCollision(enemy, index);
          }
        }
      });
    }
  }

  /**
   * Handles the collision between a throwable object and the Endboss.
   * This method handles the damage and animation for the Endboss upon collision with a throwable object.
   */
  handleEndbossCollision() {
    if (soundEnabled) this.COLLIDING_BOTTLE_SOUND.play();
    this.level.enemies[0].hit();
    this.updateEndbossHealthBar();

    if (this.level.enemies[0].energy > 0) {
      this.level.enemies[0].hitEndbossAnimation();
    } else if (this.level.enemies[0].energy === 0 && !this.isEndbossDead) {
      this.handleEndbossDeath();
    }
  }

  /**
   * Updates the health bar of the Endboss based on its remaining energy.
   * This method updates the Endboss health status bar to reflect the Endboss's current energy.
   */
  updateEndbossHealthBar() {
    this.endbossHealthStatusBar.setPercentage(this.level.enemies[0].energy);
  }

  /**
   * Handles the death of the Endboss.
   * This method triggers the Endboss's death sequence, plays victory sound, and shows the victory screen.
   */
  handleEndbossDeath() {
    this.level.enemies[0].endbossDead();
    if (soundEnabled) this.WIN_SOUND.play();

    setTimeout(() => {
      this.showEndbossVictoryScreen();
    }, 500);

    setTimeout(() => {
      this.showRestartOptions();
    }, 550);

    this.isEndbossDead = true;
  }

  /**
   * Displays the victory screen after the Endboss has been defeated.
   * This method updates the background image to show the Endboss victory screen.
   */
  showEndbossVictoryScreen() {
    document.getElementById('startContainer').style.backgroundImage = 'url(./img/start_end_screen/win.png)';
    isGamePaused = false;
    togglePlayPauseBtn();
    this.character.playAnimation(this.character.IMAGES_WON);
  }

  /**
   * Displays the restart options after the game is won.
   * This method shows the restart button and hides the play/pause button.
   */
  showRestartOptions() {
    document.getElementById('restartBtn').classList.remove('d-none');
    document.getElementById('playPauseIcon').style.display = 'none';
  }

  /**
   * Handles the collision between a throwable object and a regular enemy.
   * This method triggers the stomp action for a regular enemy when hit by a throwable object.
   *
   * @param {Object} enemy - The regular enemy to handle collision with.
   * @param {number} index - The index of the enemy in the enemies array.
   */
  handleRegularEnemyCollision(enemy, index) {
    this.stompEnemy(enemy, index);
    if (soundEnabled) this.COLLIDING_BOTTLE_SOUND.play();
  }

  /**
   * Checks for collisions between the character and items in the level.
   * This method iterates through all items in the level and checks if the character collects any items (e.g., coins or bottles).
   */
  checkCollisionsItems() {
    this.level.items.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        if (item instanceof Coin) {
          this.character.collectItem(index);
          if (soundEnabled) this.COIN_SOUND.play();
          this.coinStatusBar.setPercentage(this.character.wallet * 20);
          this.healthStatusBar.setPercentage(this.character.energy);
        } else if (item instanceof Bottle) {
          this.character.collectBottle(index);
          if (soundEnabled) this.COLLECT_BOTTLE_SOUND.play();
          this.bottleStatusBar.setPercentage(this.character.collectedBottle * 20);
        }
      }
    });
  }

  /**
   * The main drawing method for the game.
   * This method clears the canvas, translates the camera position, and recursively calls the drawing process.
   *
   * @param {number} camera_x - The current camera position on the x-axis.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawBackgroundbjects();
    this.drawStatic();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draws the background objects and clouds.
   * This method adds the background objects and clouds to the map for rendering.
   */
  drawBackgroundbjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * Draws static elements on the screen such as status bars, enemies, and the player.
   * This method first restores the camera translation, draws the status bars, and then draws enemies and the player.
   */
  drawStatic() {
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();
    this.ctx.translate(this.camera_x, 0);
    this.drawEnemiesAndItems();
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws the status bars for the health, coins, and bottles.
   * Additionally, it handles the drawing of the Endboss health status bar, flipping it if required.
   */
  drawStatusBars() {
    this.addToMap(this.healthStatusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);

    if (this.endbossHealthStatusBar.otherDirection) {
      this.endbossHealthStatusBar.flipImage();
    } else {
      this.addToMap(this.endbossHealthStatusBar);
    }
  }

  /**
   * Draws the enemies, items, and throwable objects on the canvas.
   * This method adds the level's items, enemies, and throwable objects to the map for rendering.
   */
  drawEnemiesAndItems() {
    this.addObjectsToMap(this.level.items);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * Adds a list of objects to the map.
   * This method iterates over the provided list of objects and calls the `addToMap` method for each object.
   *
   * @param {Array} objects - The array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map and handles its direction and drawing.
   * If the object requires flipping (based on `otherDirection`), it will be flipped before drawing.
   * The object's image and frame are drawn to the canvas.
   *
   * @param {Object} mo - The object to be drawn (e.g., character, enemy, item).
   */
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

  /**
   * Flips an object's image horizontally.
   * This method saves the current canvas state, scales the image by -1 on the x-axis, and translates it accordingly.
   *
   * @param {Object} mo - The object whose image should be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the flipped object's image back to its original direction.
   * This method reverts the canvas transformation by restoring the canvas state and flipping the object back.
   *
   * @param {Object} mo - The object whose image should be restored to its original direction.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
