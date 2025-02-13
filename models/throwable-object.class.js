class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super();
    this.loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() {
    this.speedY = 30; //nach oben fliegt
    this.applyGravity();

    // Intervall für das Bewegen nach rechts
    setStoppableInterval(() => {
      this.x += 10; // Charakter nach rechts bewegen
    }, 25);
  }
}
