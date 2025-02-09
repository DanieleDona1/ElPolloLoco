class BottleStatusBar extends DrawableObject {
  IMAGES = [
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
  ];
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 100;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }
}
