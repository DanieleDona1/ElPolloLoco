//User interaction
let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the canvas, world, and event listeners.
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  bindKeyPressEvents();
  bindBtsPressEvents();
}

/**
 * Binds touch event listeners to the on-screen buttons to control the player's movements and actions.
 */
function bindBtsPressEvents() {
  document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById('btnLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById('btnRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById('btnRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById('btnJump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });

  document.getElementById('btnJump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });

  document.getElementById('btnThrowBottle').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById('btnThrowBottle').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
}

/**
 * Binds keyboard event listeners to the arrow keys and spacebar for player control.
 * Updates the keyboard object to reflect which keys are being pressed.
 */
function bindKeyPressEvents() {
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
}
