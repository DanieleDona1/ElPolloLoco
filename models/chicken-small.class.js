class ChickenSmall extends MovableObject {
  y = 345;
  height = 80;
  width = 60;
  IMAGES_WALKING = [
    './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGES_DEAD = [
    './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
  ]

  constructor() {
    super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/3_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 900 + Math.random() * 1600;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animateMoveLeft();
    this.animatePlayAnimation(this.IMAGES_WALKING);
  }
}
