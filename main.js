let intervalIds = [];

function onload() {
  loadStartScreen();
  toggleSound(); //TODO entkommentiere und lösche playGame() Zeile 4
  // playGame();
}

function playGame() {
  // isBackgroundSoundOn = true;
  // toggleSound(); //TODO entkommentiere beide Zeilen, damit sound starten wenn user auf play icon drückt
  let startScreen = document.getElementById('userInteraction');
  startScreen.innerHTML = /*html*/ `<canvas id="canvas" width="720" height="480"></canvas>`;
  // initLevel();
  startScreen.innerHTML += getInGameNavigation();
  startScreen.innerHTML += getSettingsPopupTemplate();
  init();
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

function stopGame() {
  intervalIds.forEach(clearInterval);
}
