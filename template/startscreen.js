let isBackgroundSoundOn = false;
let gameSound = new Audio('audio/game_sound.mp3'); // Lade die Audiodatei
gameSound.loop = true; // Der Sound wird wiederholt abgespielt

// Funktion zum Startbildschirm laden
function loadStartScreen() {
  let startScreen = document.getElementById('userInteraction');
  startScreen.innerHTML = getStartScreenTemplate();
  startScreen.innerHTML += getSettingsPopupTemplate();
}

function getStartScreenTemplate() {
  return /*html*/ `
    <div class='start-container'>
      <div class='start-screen-container'>
        <img src="./img/start_screen/info.svg" alt="settings" onclick="toggleSettings()">
        <img id="sound-icon" src="./img/start_screen/sound_off.svg" alt="sound-on" onclick="toggleSound()">
      </div>
      <img onclick="playGame();" class="play-icon" src="./img/start_screen/play-btn.svg" alt="play-button">
    </div>
  `;
}

// musik beenden, spiel stoppen und spielanleitung
function getInGameNavigation() {
  return /*html*/ `
    <div class='start-container'>
      <div class='start-screen-container in-game-nav'>
          <img src="./img/start_screen/info.svg" alt="info" onclick="toggleSettings()">
          <img id="sound-icon" src="./img/start_screen/sound_off.svg" alt="sound-on" onclick="toggleSound()">
          <img class="play-pause-icon" id="play-icon" src="./img/start_screen/play.svg" alt="play-button" onclick="togglePlayPauseGame()">
        </div>
        <img id="fullscreenBtn" onclick="toggleFullscreen();" class="fullscreen-btn" src="./img/start_screen/fullscreen-enter.svg" alt="fullscreen">
    </div>
  `;
}

function toggleFullscreen() {
  const fullscreenButton = document.getElementById('fullscreenBtn');
  const userInteractionElement = document.getElementById('userInteraction');

  if (!document.fullscreenElement) {
    // Vollbildmodus aktivieren
    if (userInteractionElement.requestFullscreen) {
      userInteractionElement.requestFullscreen();
    } else if (userInteractionElement.mozRequestFullScreen) { // Firefox
      userInteractionElement.mozRequestFullScreen();
    } else if (userInteractionElement.webkitRequestFullscreen) { // Chrome, Safari und Opera
      userInteractionElement.webkitRequestFullscreen();
    } else if (userInteractionElement.msRequestFullscreen) { // IE/Edge
      userInteractionElement.msRequestFullscreen();
    }
    // Ändere das Bild auf das Fullscreen Exit Symbol
    fullscreenButton.src = './img/start_screen/fullscreen-exit.svg';

    // Icons sichtbar halten, auch im Fullscreen-Modus
    fullscreenButton.style.position = 'fixed';
    fullscreenButton.style.top = '20px';
    fullscreenButton.style.right = '20px';
  } else {
    // Verlasse den Vollbildmodus
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari und Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
    // Ändere das Bild auf das Fullscreen Enter Symbol
    fullscreenButton.src = './img/start_screen/fullscreen-enter.svg';

    // Position zurücksetzen
    fullscreenButton.style.position = '';
    fullscreenButton.style.top = '';
    fullscreenButton.style.right = '';
  }
}




function getSettingsPopupTemplate() {
  return /*html*/ `
    <div id="settingsPopup" class="settings-popup">
      <div class="settings-popup-content">
        <span class="close-btn" onclick="closeSettings()"></span>
        <h2>Game Controls</h2>
        <ul>
          <li><strong>Left Arrow:</strong> Move Left</li>
          <li><strong>Right Arrow:</strong> Move Right</li>
          <li><strong>Up Arrow:</strong> Jump</li>
          <li><strong>Spacebar:</strong> Throw Bottle</li>
        </ul>

        <h2>Game Instructions</h2>
        <ul>
            <li><strong>To eliminate large and small chickens:</strong> Jump on them or throw a bottle at them.</li>
            <li><strong>To collect bottles and coins:</strong> Simply touch them.</li>
            <li><strong>If you come into contact with an enemy:</strong> You will lose a percentage of your health.</li>
            <li><strong>To restore health:</strong> Collect coins amounting to more than 100% of your health.</li>
            <li><strong>To defeat the final boss:</strong> Throw bottles at him.</li>
        </ul>
      </div>
    </div>
  `;
}

// Funktion, um den Sound ein- oder auszuschalten
function toggleSound() {
  let soundIcon = document.getElementById('sound-icon');
  if (isBackgroundSoundOn) {
    gameSound.play();
    soundIcon.src = './img/start_screen/sound_on.svg';
  } else {
    // Stoppe den Sound
    gameSound.pause();
    gameSound.currentTime = 0;
    soundIcon.src = './img/start_screen/sound_off.svg';
  }
  isBackgroundSoundOn = !isBackgroundSoundOn;
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
  popup.style.animation = 'slideDown 0.5s forwards';
}

// Funktion zum Schließen des Settings-Popups
function closeSettings() {
  const popup = document.getElementById('settingsPopup');
  popup.style.animation = 'slideUp 0.5s forwards'; // Slide-up-Animation
  setTimeout(() => {
    popup.style.display = 'none';
  }, 250); // Warten, bis die Animation abgeschlossen ist
}
