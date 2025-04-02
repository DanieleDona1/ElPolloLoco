
/**
 * Initializes the start screen and checks the sound status when the page is loaded.
 */
function onload() {
  loadStartScreen();
  checkSoundStatus();
  // TODO entferne playGame 
  playGame();
}

/**
 * Loads the start screen template and settings popup into the DOM.
 */
function loadStartScreen() {
  let startScreen = document.getElementById('userInteraction');
  startScreen.innerHTML = getStartScreenTemplate();
  startScreen.innerHTML += getSettingsPopupTemplate();
}

/**
 * Starts the game by setting up the game canvas, in-game navigation, and initializing the first level.
 * Also checks the sound status and displays the settings popup.
 */
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

/**
 * Toggles the play/pause button icon and either pauses or resumes the game based on the current state.
 */
function togglePlayPauseBtn() {
  let playPauseIcon = document.getElementById('playPauseIcon');
  if (isGamePaused) {
    playPauseIcon.src = './img/start_end_screen/pause.svg';
    resumeGame();
    if (soundEnabled) backgroundSoundOn();
  } else {
    playPauseIcon.src = './img/start_end_screen/play.svg';
    pauseGame();
    world.SLEEP_SOUND.pause();
    backgroundSoundOff();
    localStorage.setItem('soundEnabled', 'false');
  }
  isGamePaused = !isGamePaused;
}

/**
 * Restarts the game by invoking the playGame function.
 */
function restartGame() {
  playGame();
}

/**
 * Toggles the visibility of the settings popup. If it's open, it closes; otherwise, it opens.
 */
function toggleSettings() {
  const popup = document.getElementById('settingsPopup');

  if (popup.style.display === 'block') {
    closeSettings();
  } else {
    openSettings();
  }
}

/**
 * Opens the settings popup and animates it sliding down.
 */
function openSettings() {
  const popup = document.getElementById('settingsPopup');
  popup.style.display = 'block';
  popup.style.animation = 'slideDown 400ms forwards';
}

/**
 * Closes the settings popup with an animated slide-up effect.
 * The popup is hidden after the animation completes.
 */
function closeSettings() {
  const popup = document.getElementById('settingsPopup');
  popup.style.animation = 'slideUp 400ms forwards';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 250);
}
