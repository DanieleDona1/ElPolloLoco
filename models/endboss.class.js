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

  bottleTouchedEndboss = false;
  introEndbossAnimationId;
  currentPosition = 2500;
  attackRange = this.currentPosition;
  attackSpeed = 40;
  walkingSpeed = 15;
  isAltertTime = true;

  hitEndbossAnimationId;
  alertEndbossAfterHitId;
  hadFirstContact = false;
  walkedForward = false;
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

  // Intervall das immer wieder startet,stoppt
  // introEndbossAnimationId weil es standard animation ist
  introEndbossAnimation() {
    this.introEndbossAnimationId = setStopOnlyInterval(() => {
      if (!this.bottleTouchedEndboss) {
        this.playAnimation(this.IMAGES_ALERT);
        console.log('IMAGES_ALERT');
      } else if (this.bottleTouchedEndboss && this.isAlertTime) {
        this.handleAlertPhase();
      } else {
        this.handleWalkingPhase();
        console.log('IMAGES_WALKING');
      }
    }, 200);
  }

  handleAlertPhase() {
    this.playAnimation(this.IMAGES_ATTACK);
    console.log('IMAGES_ATTACK');
    setTimeout(() => {
      this.isAlertTime = false;
    }, 6000);
  }

  handleWalkingPhase() {
    this.playAnimation(this.IMAGES_WALKING);
    if (soundEnabled) world.ALERT_SOUND.play();
    this.x -= this.walkingSpeed;
    setTimeout(() => {
      this.isAlertTime = true;
    }, 1000);
  }

  stopIntroEndbossAnimation() {
    clearInterval(this.introEndbossAnimationId);
    console.log('aufgerufen');
  }

  hitEndbossAnimation() {
    this.stopIntroEndbossAnimation();
    this.attackRange -= 500;
    console.log('change');

    this.hitEndbossAnimationId = setStopOnlyInterval(() => {
      this.stopIntroEndbossAnimation();
      if (this.x >= this.attackRange) {
        this.playAnimation(this.IMAGES_HURT);
        if (soundEnabled) world.ATTACK_SCREAM_SOUND.play();

        console.log('IMAGES_HURT');
        this.x -= this.attackSpeed;
      } else if (this.isAttackAnimation) {
        this.playAnimation(this.IMAGES_ATTACK);
        console.log('IMAGES_ATTACK');
        setTimeout(() => {
          this.isAttackAnimation = false;
        }, 2000);
      } else {
        this.introEndbossAnimation();
        clearInterval(this.hitEndbossAnimationId);
      }
    }, 200);
  }

  endbossDead() {
    this.stopIntroEndbossAnimation();
    clearInterval(this.hitEndbossAnimationId);
    this.playAnimation(this.IMAGES_DEAD);
  }
}
