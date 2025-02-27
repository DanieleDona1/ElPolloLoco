class Character extends MovableObject {
  y = 77;
  height = 265;
  speed = 5.5;

  IMAGES_IDL = [
    './img/2_character_pepe/1_idle/idle/I-1.png',
    './img/2_character_pepe/1_idle/idle/I-2.png',
    './img/2_character_pepe/1_idle/idle/I-3.png',
    './img/2_character_pepe/1_idle/idle/I-4.png',
    './img/2_character_pepe/1_idle/idle/I-5.png',
    './img/2_character_pepe/1_idle/idle/I-6.png',
    './img/2_character_pepe/1_idle/idle/I-7.png',
    './img/2_character_pepe/1_idle/idle/I-8.png',
    './img/2_character_pepe/1_idle/idle/I-9.png',
    './img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_IDL_SLEEP = [
    './img/2_character_pepe/1_idle/long_idle/I-11.png',
    './img/2_character_pepe/1_idle/long_idle/I-12.png',
    './img/2_character_pepe/1_idle/long_idle/I-13.png',
    './img/2_character_pepe/1_idle/long_idle/I-14.png',
    './img/2_character_pepe/1_idle/long_idle/I-15.png',
    './img/2_character_pepe/1_idle/long_idle/I-16.png',
    './img/2_character_pepe/1_idle/long_idle/I-17.png',
    './img/2_character_pepe/1_idle/long_idle/I-18.png',
    './img/2_character_pepe/1_idle/long_idle/I-19.png',
    './img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  IMAGES_WALKING = [
    './img/2_character_pepe/2_walk/W-21.png',
    './img/2_character_pepe/2_walk/W-22.png',
    './img/2_character_pepe/2_walk/W-23.png',
    './img/2_character_pepe/2_walk/W-24.png',
    './img/2_character_pepe/2_walk/W-25.png',
    './img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    './img/2_character_pepe/3_jump/J-31.png',
    './img/2_character_pepe/3_jump/J-32.png',
    './img/2_character_pepe/3_jump/J-33.png',
    './img/2_character_pepe/3_jump/J-34.png',
    './img/2_character_pepe/3_jump/J-35.png',
    './img/2_character_pepe/3_jump/J-36.png',
    './img/2_character_pepe/3_jump/J-37.png',
    './img/2_character_pepe/3_jump/J-38.png',
    './img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_DEAD = [
    './img/2_character_pepe/5_dead/D-51.png',
    './img/2_character_pepe/5_dead/D-52.png',
    './img/2_character_pepe/5_dead/D-53.png',
    './img/2_character_pepe/5_dead/D-54.png',
    './img/2_character_pepe/5_dead/D-55.png',
    './img/2_character_pepe/5_dead/D-56.png',
    './img/2_character_pepe/5_dead/D-57.png',
  ];

  IMAGES_HURT = ['./img/2_character_pepe/4_hurt/H-41.png', './img/2_character_pepe/4_hurt/H-42.png', './img/2_character_pepe/4_hurt/H-43.png'];

  IMAGES_WON = ['./img/2_character_pepe/3_jump/J-34.png'];

  world;

  constructor() {
    super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_IDL);
    this.loadImages(this.IMAGES_IDL_SLEEP);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_WON);
    this.applyGravity();
    this.animate();
  }
  /**
   * Starts the animation for the character, calling moveCharacter and playCharacter methods at intervals.
   * @returns {void}
   */
  animate() {
    setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
    setStoppableInterval(() => this.playCharacter(), 50);
  }

  /**
   * Moves the character based on keyboard input and camera position.
   * @returns {void}
   */
  moveCharacter() {
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) this.jump();
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Checks if the character can move right.
   * @returns {boolean} True if the character can move right, false otherwise.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Moves the character to the right and plays walking sound.
   * @returns {void}
   */
  moveRight() {
    super.moveRight();
    if (soundEnabled) world.WALKING_SOUND.play();
    this.otherDirection = false;
  }

  /**
   * Checks if the character can move left.
   * @returns {boolean} True if the character can move left, false otherwise.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > -600;
  }

  /**
   * Moves the character to the left and plays walking sound.
   * @returns {void}
   */
  moveLeft() {
    if (soundEnabled) world.WALKING_SOUND.play();
    super.moveLeft();
    this.otherDirection = true;
  }

  /**
   * Checks if the character can jump.
   * @returns {boolean} True if the character can jump, false otherwise.
   */
  canJump() {
    return this.world.keyboard.UP && !this.isAboveGround();
  }

  /**
   * Updates the character's animation based on its state (dead, hurt, jumping, idle).
   * @returns {void}
   */
  playCharacter() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      if (soundEnabled) world.HURT_SOUND.play();
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else {
      this.handleState();
    }
  }

  /**
   * Handles the state of the character, including idle or walking animations.
   * @returns {void}
   */
  handleState() {
    if (this.canMoveLeftRight()) {
      this.playAnimation(this.IMAGES_WALKING);
      this.idleStartTime = 0;
    } else if (this.isIdle()) {
      this.sleepOrIdle();
    }
  }

  /**
   * Checks if the character can move left or right based on keyboard input.
   * @returns {boolean} True if the character can move left or right, false otherwise.
   */
  canMoveLeftRight() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Decides if the character should play an idle or sleep animation.
   * @returns {void}
   */
  sleepOrIdle() {
    if (this.idleStartTime === 0) {
      this.idleStartTime = Date.now();
    }
    if (this.canSleep()) {
      this.playAnimation(this.IMAGES_IDL_SLEEP);
      if (soundEnabled) world.SLEEP_SOUND.play();
    } else {
      this.playAnimation(this.IMAGES_IDL);
      if (soundEnabled) world.SLEEP_SOUND.pause();
    }
  }

  /**
   * Checks if the character is idle (not moving and not in the air).
   * @returns {boolean} True if the character is idle, false otherwise.
   */
  isIdle() {
    return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround();
  }

  /**
   * Checks if the character has been idle for at least 3 seconds and can sleep.
   * @returns {boolean} True if the character can sleep, false otherwise.
   */
  canSleep() {
    return Date.now() - this.idleStartTime >= 3000;
  }
}
