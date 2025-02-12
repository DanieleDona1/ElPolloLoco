class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;


  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch(e) {
      console.warn('Error hier:', e);
      console.warn('Error this img:', this.img);
      // console.warn('Error src:', this.img.src);
    }

  }


  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) { //Nur border bei bestimmten Instanzen
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
    console.log(this.percentage);

  }
    resolveImageIndex(){
      if (this.percentage == 100) {
          return 5;
      } else if(this.percentage >= 80) {
          return 4;
      } else if(this.percentage >= 60) {
          return 3;
      } else if(this.percentage >= 40) {
          return 2;
      } else if(this.percentage >= 20) {
          return 1;
      } else if(this.percentage >= 0) {
          return 0;
      }
  }
}
