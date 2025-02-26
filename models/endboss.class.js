class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  introEndbossAnimationId;
  hitEndbossAnimationId;
  alertEndbossAfterHitId;
  hadFirstContact = false;
  walkedForward = false;
  endbossAttackRange = 2300;

  IMAGES_WALKING = ['./img/4_enemie_boss_chicken/1_walk/G1.png', './img/4_enemie_boss_chicken/1_walk/G2.png', './img/4_enemie_boss_chicken/1_walk/G3.png', './img/4_enemie_boss_chicken/1_walk/G4.png'];

  IMAGES_ALERT = [
    './img/4_enemie_boss_chicken/2_alert/G5.png',
    './img/4_enemie_boss_chicken/2_alert/G6.png',
    './img/4_enemie_boss_chicken/2_alert/G7.png',
    './img/4_enemie_boss_chicken/2_alert/G8.png',
    './img/4_enemie_boss_chicken/2_alert/G9.png',
    './img/4_enemie_boss_chicken/2_alert/G10.png',
    './img/4_enemie_boss_chicken/2_alert/G11.png',
    './img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

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
    this.x = 2500;
    this.introEndbossAnimation();
  }

  introEndbossAnimation() {

    let i = 0;
    const walkingLength = this.IMAGES_WALKING.length;
    const alertLength = this.IMAGES_ALERT.length;
    const attackLength = this.IMAGES_ATTACK.length;

    this.introEndbossAnimationId = setStoppableInterval(() => {
      // console.log('intro');
      if (i < alertLength) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (i >= alertLength && i < alertLength + attackLength) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else if (i >= alertLength + attackLength && i < alertLength + attackLength + walkingLength) {
        this.playAnimation(this.IMAGES_WALKING);
        this.x -= 30;
      } else if (i >= alertLength + attackLength + walkingLength && i < alertLength + 2 * attackLength + walkingLength) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else if (i >= alertLength + 2 * attackLength + walkingLength && i < 2 * (alertLength + attackLength + walkingLength)) {
        this.playAnimation(this.IMAGES_WALKING);
        this.x += 15;
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }

      if (world.character.x > 1950 && !this.hadFirstContact) {
        i = 0;
        this.hadFirstContact = true;
      }
      i++;

      // console.log('x:', world.character.x, 'i:', i);
    }, 200);
  }

  hitEndbossAnimation() {
    clearInterval(this.hitEndbossAnimationId);

    // console.log('test');

    this.hitEndbossAnimationId = setStoppableInterval(() => {
      // console.log('world.level.enemies[0].x > 2500', world.level.enemies[0].x > 2500);
      // console.log('!this.walkedForward',  !this.walkedForward);

      clearInterval(this.introEndbossAnimationId);
      if (world.level.enemies[0].x > this.endbossAttackRange && !this.walkedForward) {
        this.playAnimation(this.IMAGES_HURT);
        this.x -= 30;
        console.log('ATTACK');
        this.endbossAttackRange -= 3;
        // console.log('x:', this.x);
      } else {
        // console.log('Else block reached');
        this.walkedForward = true;
        if (world.level.enemies[0].x < 2600) {
          this.playAnimation(this.IMAGES_ATTACK);
          console.log('Defensive');

          this.x += 50;
        } else {
          clearInterval(this.hitEndbossAnimationId);
          clearInterval(this.alertEndbossAfterHitId);
          this.alertEndbossAfterHit();
          console.log('else');
          this.walkedForward = false;
        }
      }
      // world.level.enemies[0].x 2620
      // console.log('x:', world.character.x, 'i:', i);
    }, 200);
  }

  alertEndbossAfterHit() {
    this.alertEndbossAfterHitId = setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
      console.log('alertEndbossAfterHit');
    }, 400);
  }

  endbossDead() {
    clearInterval(this.hitEndbossAnimationId);
    clearInterval(this.alertEndbossAfterHitId);
    this.playAnimation(this.IMAGES_DEAD);

    console.log('endbossDead');
  }
}
