
function onload() {
  loadStartScreen();
  checkSoundStatus();
}

function loadStartScreen() {
  let startScreen = document.getElementById('userInteraction');
  startScreen.innerHTML = getStartScreenTemplate();
  startScreen.innerHTML += getSettingsPopupTemplate();
}

function playGame() {
  let startScreen = document.getElementById('userInteraction');
  startScreen.innerHTML = /*html*/ `<canvas id="canvas" width="720" height="480"></canvas>`;
  startScreen.innerHTML += getInGameNavigation();
  checkSoundStatus();
  initLevel();
  startScreen.innerHTML += getSettingsPopupTemplate();
  document.getElementById('startContainer').style.backgroundImage = 'none';
  init();
}

function togglePlayPauseBtn() {
  let playPauseIcon = document.getElementById('playPauseIcon');
  if (isGamePaused) {
    playPauseIcon.src = './img/start_end_screen/pause.svg';
    resumeGame();
  } else {
    playPauseIcon.src = './img/start_end_screen/play.svg';
    pauseGame();
  }
  isGamePaused = !isGamePaused;
}

function restartGame() {
  playGame();
}

function toggleSettings() {
  const popup = document.getElementById('settingsPopup');

  if (popup.style.display === 'block') {
    closeSettings();
  } else {
    openSettings();
  }
}

function openSettings() {
  const popup = document.getElementById('settingsPopup');
  popup.style.display = 'block';
  popup.style.animation = 'slideDown 400ms forwards';
}

function closeSettings() {
  const popup = document.getElementById('settingsPopup');
  popup.style.animation = 'slideUp 400ms forwards';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 250);
}
