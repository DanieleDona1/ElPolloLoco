class Coin extends MovableObject {
  y = 20;
  height = 150;
  width = 150;
  offset = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };

  constructor() {
    super().loadImage('./img/8_coin/coin_1.png');
    this.x = 300 + Math.random() * 2100;
    this.y = 50 + Math.random() * 20;
  }
}
