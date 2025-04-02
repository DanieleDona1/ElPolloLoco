class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  offset = {
    top: 110,
    right: 50,
    bottom: 0,
    left: 30,
  };

  hitEndbossAnimationId;
  bottleTouchedEndboss = false;
  introEndbossAnimationId;
  currentPosition = 2500;
  attackRange = this.currentPosition;
  addAttackRange = 600;
  attackSpeed = 40;
  walkingSpeed = 15;
  isAltertTime = true;

  ATTACK_SCREAM_SOUND = new Audio('./audio/attack-scream.wav');

  IMAGES_WALKING = ['./img/4_enemie_boss_chicken/1_walk/G1.png', './img/4_enemie_boss_chicken/1_walk/G2.png', './img/4_enemie_boss_chicken/1_walk/G3.png', './img/4_enemie_boss_chicken/1_walk/G4.png'];

  IMAGES_ALERT = ['./img/4_enemie_boss_chicken/2_alert/G5.png', './img/4_enemie_boss_chicken/2_alert/G6.png', './img/4_enemie_boss_chicken/2_alert/G7.png', './img/4_enemie_boss_chicken/2_alert/G8.png', './img/4_enemie_boss_chicken/2_alert/G9.png', './img/4_enemie_boss_chicken/2_alert/G10.png', './img/4_enemie_boss_chicken/2_alert/G11.png', './img/4_enemie_boss_chicken/2_alert/G12.png'];

  IMAGES_ATTACK = [
    './img/4_enemie_boss_chicken/3_attack/G13.png',
    './img/4_enemie_boss_chicken/3_attack/G14.png',
    './img/4_enemie_boss_chicken/3_attack/G15.png',
    './img/4_enemie_boss_chicken/3_attack/G16.png',
    './img/4_enemie_boss_chicken/3_attack/G17.png',
    './img/4_enemie_boss_chicken/3_attack/G18.png',
    './img/4_enemie_boss_chicken/3_attack/G19.png',
    './img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  IMAGES_HURT = ['./img/4_enemie_boss_chicken/4_hurt/G21.png', './img/4_enemie_boss_chicken/4_hurt/G22.png', './img/4_enemie_boss_chicken/4_hurt/G23.png'];

  IMAGES_DEAD = ['./img/4_enemie_boss_chicken/5_dead/G24.png', './img/4_enemie_boss_chicken/5_dead/G25.png', './img/4_enemie_boss_chicken/5_dead/G26.png'];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = this.currentPosition;
    this.introEndbossAnimation();
  }

  /**
   * Starts the intro animation for the endboss.
   * Plays different animations based on the game state.
   */
  introEndbossAnimation() {
    this.introEndbossAnimationId = setStopOnlyInterval(() => {
      if (!this.bottleTouchedEndboss) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.bottleTouchedEndboss && this.isAlertTime) {
        this.handleAlertPhase();
      } else {
        this.handleWalkingPhase();
      }
    }, 200);
  }

  /**
   * Handles the alert phase of the endboss.
   * The boss plays an attack animation and exits alert mode after 6 seconds.
   */
  handleAlertPhase() {
    this.playAnimation(this.IMAGES_ATTACK);
    setTimeout(() => {
      this.isAlertTime = false;
    }, 6000);
  }

  /**
   * Handles the walking phase of the endboss.
   * Plays a walking animation and moves the boss.
   * Triggers an alert phase after 1 second.
   */
  handleWalkingPhase() {
    this.playAnimation(this.IMAGES_WALKING);
    if (soundEnabled) world.ALERT_SOUND.play();
    this.x -= this.walkingSpeed;
    setTimeout(() => {
      this.isAlertTime = true;
    }, 1000);
  }

  /**
   * Stops the intro animation of the endboss.
   */
  stopIntroEndbossAnimation() {
    clearInterval(this.introEndbossAnimationId);
  }

  /**
   * Triggers the hit animation when the endboss is attacked.
   * Adjusts the attack range and switches between animations.
   */
  hitEndbossAnimation() {
    this.stopIntroEndbossAnimation();
    clearInterval(this.hitEndbossAnimationId);
    this.attackRange -= this.addAttackRange;
    this.hitEndbossAnimationId = setStopOnlyInterval(() => {
      if (this.x >= this.attackRange) {
        this.handleHurtAnimation();
      } else if (this.isAttackAnimation) {
        this.handleAttackAnimation;
      } else {
        this.introEndbossAnimation();
        clearInterval(this.hitEndbossAnimationId);
      }
    }, 200);
  }

  /**
   * Handles the hurt animation when the endboss takes damage.
   * Moves the boss backward and plays a sound effect.
   */
  handleHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    if (soundEnabled) world.ATTACK_SCREAM_SOUND.play();
    this.x -= this.attackSpeed;
  }

  /**
   * Handles the attack animation of the endboss.
   * Plays an attack animation and resets attack mode after 2 seconds.
   */
  handleAttackAnimation() {
    this.playAnimation(this.IMAGES_ATTACK);
    setTimeout(() => {
      this.isAttackAnimation = false;
    }, 2000);
  }

  /**
   * Handles the death of the endboss.
   * Stops all animations and plays the death animation.
   */
  endbossDead() {
    this.stopIntroEndbossAnimation();
    clearInterval(this.hitEndbossAnimationId);
    this.playAnimation(this.IMAGES_DEAD);
  }
}
