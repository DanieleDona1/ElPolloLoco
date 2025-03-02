class Coin extends MovableObject {
  y = 20;
  height = 150;
  width = 150;
  offset = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60,
  };

  constructor() {
    super().loadImage('./img/8_coin/coin_1.png');
    this.x = 300 + Math.random() * 2100;
    this.y = 50 + Math.random() * 20;
  }
}
