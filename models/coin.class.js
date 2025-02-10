class Coin extends MovableObject {
  y = 20;
  height = 150;
  width = 150;

  constructor() {
    super().loadImage('./img/8_coin/coin_1.png');
    // this.x = Math.random() * 500;
    this.x = 200 + Math.random() * 2200;
    this.y = 30 + Math.random()* 200;
    // this.animate();

  }

  animate() {
    this.moveLeft();
  }
}
