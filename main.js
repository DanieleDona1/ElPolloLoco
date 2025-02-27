
function onload() {
  loadStartScreen();
  checkSoundStatus();
}

// Funktion zum Startbildschirm laden
function loadStartScreen() {
  let startScreen = document.getElementById('userInteraction');
  startScreen.innerHTML = getStartScreenTemplate();
  startScreen.innerHTML += getSettingsPopupTemplate();
}

function playGame() {
  let startScreen = document.getElementById('userInteraction');
  startScreen.innerHTML = /*html*/ `<canvas id="canvas" width="720" height="480"></canvas>`;
  // document.getElementById('canvas').classList.remove = 'd-none';
  startScreen.innerHTML += getInGameNavigation();
  checkSoundStatus();
  initLevel();
  startScreen.innerHTML += getSettingsPopupTemplate();
  document.getElementById('startContainer').style.backgroundImage = 'none';
  init();

  //TODO später wieder display flex document.getElementById('startContainer').style.backgroundImage = 'url("./img/9_intro_outro_screens/start/startscreen_1.png")';
}

function togglePlayPauseBtn() {
  let playPauseIcon = document.getElementById('playPauseIcon');

  if (isGamePaused) {
    playPauseIcon.src = './img/start_end_screen/pause.svg';
    resumeGame();
    // document.getElementById('restartBtn').classList.add('d-none');
  } else {
    // Spiel pausieren
    playPauseIcon.src = './img/start_end_screen/play.svg';
    pauseGame();
    // document.getElementById('restartBtn').classList.remove('d-none');
  }
  isGamePaused = !isGamePaused;
}

function restartGame() {
  // document.getElementById('restartBtn').classList.add('d-none');
  playGame();
}

// Funktion zum Öffnen und Schließen des Settings-Popups
function toggleSettings() {
  const popup = document.getElementById('settingsPopup');

  if (popup.style.display === 'block') {
    closeSettings();
  } else {
    openSettings();
  }
}

// Funktion zum Öffnen des Settings-Popups
function openSettings() {
  const popup = document.getElementById('settingsPopup');
  popup.style.display = 'block';
  popup.style.animation = 'slideDown 400ms forwards';
}

// Funktion zum Schließen des Settings-Popups
function closeSettings() {
  const popup = document.getElementById('settingsPopup');
  popup.style.animation = 'slideUp 400ms forwards'; // Slide-up-Animation
  setTimeout(() => {
    popup.style.display = 'none';
  }, 250); // Warten, bis die Animation abgeschlossen ist
}
