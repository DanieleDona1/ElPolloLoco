class Coin extends MovableObject {
  y = 20;
  height = 150;
  width = 150;

  constructor() {
    super().loadImage('./img/8_coin/coin_1.png');
    this.x = 300 + Math.random() * 2100;
    this.y = Math.random() * 10;
  }
}
