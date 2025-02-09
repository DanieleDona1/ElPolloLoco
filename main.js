function onload() {
  loadStartScreen();
  toggleSound();
}

function playGame() {
  // isBackgroundSoundOn = true;
  // toggleSound();
  let startScreen = document.getElementById('userInteraction');
  startScreen.innerHTML = `<canvas id="canvas" width="720" height="480"></canvas>`;

  init();
}
