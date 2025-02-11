class ThrowableObject extends MovableObject{
  constructor(x, y) {
    super();
    this.loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() { //je nachdem wo der character steht
    this.speedY = 30; //nach oben fliegt
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
