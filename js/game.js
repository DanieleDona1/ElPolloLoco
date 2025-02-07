//User interaction
let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas'); //Zeichenfläche Blatt
  world = new World(canvas, keyboard);

  console.log('My:', world.character);

  // character.src = './img/2_character_pepe/2_walk/W-21.png'; //das dauert bis bild geladen wird, settimeout
  // ctx.drawImage(character, 20, 20, 50, 150);
}

window.addEventListener('keydown', (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (event.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (event.keyCode == 68) {
    keyboard.D = false;
  }
});
