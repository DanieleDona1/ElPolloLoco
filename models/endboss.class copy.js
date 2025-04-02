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

  introEndbossAnimationId;
  hitEndbossAnimationId;
  alertEndbossAfterHitId;
  hadFirstContact = false;
  walkedForward = false;
  newStartPositionRange = 2300
  ATTACK_SCREAM_SOUND = new Audio('./audio/attack-scream.wav');

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

  /**
   * Starts the intro animation for the endboss, including the phases for alert, attack, and walking.
   * The animation will loop through different phases based on a set interval.
   */
  introEndbossAnimation() {
    let i = 0;
    const walkingLength = this.IMAGES_WALKING.length;
    const alertLength = this.IMAGES_ALERT.length;
    const attackLength = this.IMAGES_ATTACK.length;

    this.introEndbossAnimationId = setStoppableIntervalEndboss(() => {
      this.handlePhaseTransition(i, alertLength, attackLength, walkingLength);
      this.handleFirstContact(i);
      i++;
    }, 200);
  }

  /**
   * Handles the transition between animation phases based on the current index.
   * It changes the endboss's behavior between alert, attack, and walking phases.
   *
   * @param {number} i - The current index for determining the phase transition.
   * @param {number} alertLength - The length of the alert animation sequence.
   * @param {number} attackLength - The length of the attack animation sequence.
   * @param {number} walkingLength - The length of the walking animation sequence.
   */
  handlePhaseTransition(i, alertLength, attackLength, walkingLength) {
    if (i < alertLength) {
      this.playAnimation(this.IMAGES_ALERT);
    } else if (i >= alertLength && i < alertLength + attackLength) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else if (i >= alertLength + attackLength && i < alertLength + attackLength + walkingLength) {
      this.handleWalkingPhase();
    } else if (i >= alertLength + attackLength + walkingLength && i < alertLength + 2 * attackLength + walkingLength) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else if (i >= alertLength + 2 * attackLength + walkingLength && i < 2 * (alertLength + attackLength + walkingLength)) {
      this.handleWalkingPhase(true);
    } else {
      this.playAnimation(this.IMAGES_ALERT);
    }
  }

/**
 * Starts the walking animation and plays an alert sound if sound is enabled.
 *
 * @function
 */
  handleWalkingPhase() {
    this.playAnimation(this.IMAGES_WALKING);
    if (soundEnabled) world.ALERT_SOUND.play();
  }

  /**
 * Handles the first contact event when the character's x position exceeds 1950.
 * Sets the `hadFirstContact` flag to true.
 *
 * @function
 */
  handleFirstContact(i) {
    if (world.character.x > 1950 && !this.hadFirstContact) {
      i = 0;
      this.hadFirstContact = true;
    }
  }

  /**
   * Starts the hit animation for the endboss when it gets hit, transitioning through attack and movement.
   */
  hitEndbossAnimation() {
    clearInterval(this.hitEndbossAnimationId);
    this.hitEndbossAnimationId = setStoppableIntervalEndboss(() => {
      clearInterval(this.introEndbossAnimationId);
      if (this.isInAttackRange() && !this.walkedForward) {
        this.handleAttackAnimation();
      } else {
        this.walkedForward = true;
        if (this.canMoveBackwards()) {
          this.handlemoveBackwards();
        } else {
          this.endEndbossAnimation();
        }
      }
    }, 200);
  }

  /**
   * Checks if the endboss is within the attack range of the player.
   *
   * @returns {boolean} - True if the endboss is in range for an attack, false otherwise.
   */
  isInAttackRange() {
    return world.level.enemies[0].x > (this.newStartPositionRange - 220);
  }

  /**
   * Plays the attack animation for the endboss when it is in range, and moves its position.
   */
  handleAttackAnimation() {
    if (soundEnabled) world.ATTACK_SCREAM_SOUND.play();
    this.playAnimation(this.IMAGES_HURT);
    this.x -= 60;
  }

  /**
   * Determines whether the endboss should move forward.
   *
   * @returns {boolean} - True if the endboss should move forward, false otherwise.
   */
  canMoveBackwards() {
    return world.level.enemies[0].x < this.newStartPositionRange;
  }

  /**
   * Moves the endboss forward and plays the attack animation.
   */
  handlemoveBackwards() {
    this.playAnimation(this.IMAGES_ATTACK);
    this.x += 50;
  }

  /**
   * Ends the endboss animation and clears the associated intervals.
   */
  endEndbossAnimation() {
    clearInterval(this.hitEndbossAnimationId);
    clearInterval(this.alertEndbossAfterHitId);
    this.alertEndbossAfterHit();
    this.walkedForward = false;
  }

  /**
   * Starts the alert animation after the endboss has been hit.
   */
  alertEndbossAfterHit() {
    this.alertEndbossAfterHitId = setStoppableIntervalEndboss(() => {
      this.playAnimation(this.IMAGES_ALERT);
    }, 400);
  }

  /**
   * Plays the dead animation for the endboss when it is defeated.
   */
  endbossDead() {
    clearInterval(this.hitEndbossAnimationId);
    clearInterval(this.alertEndbossAfterHitId);
    this.playAnimation(this.IMAGES_DEAD);
  }
}
