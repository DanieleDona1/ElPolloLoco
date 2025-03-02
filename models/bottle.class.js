class Bottle extends MovableObject {
  y = 345;
  height = 80;
  width = 80;
  offset = {
    top: 5,
    right: 10,
    bottom: 0,
    left: 30,
  };

  constructor() {
    super();
    this.loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.x = 300 + Math.random() * 2000;
  }
}
