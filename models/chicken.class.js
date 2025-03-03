class Chicken extends MovableObject {
  y = 345;
  height = 80;
  width = 60;
  offset = {
    top: 5,
    right: 20,
    bottom: 0,
    left: 20,
  };
  IMAGES_WALKING = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png', 'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png', 'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'];
  IMAGES_DEAD = ['./img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  constructor() {
    super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 400 + Math.random() * 600;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animateMoveLeft();
    this.animatePlayAnimation(this.IMAGES_WALKING);
  }
}
