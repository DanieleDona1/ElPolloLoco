let isBackgroundSoundOn = false;
let gameSound = new Audio('audio/game_sound.mp3'); // Lade die Audiodatei
gameSound.loop = true; // Der Sound wird wiederholt abgespielt

// Funktion zum Startbildschirm laden
function loadStartScreen() {
  let startScreen = document.getElementById('userInteraction');
  startScreen.innerHTML = /*html*/ `
    <div class='start-container'>
      <div class='start-screen-container'>
        <img src="./img/start_screen/settings.svg" alt="settings">
        <img id="sound-icon" src="./img/start_screen/sound_off.svg" alt="sound-on" onclick="toggleSound()">
        <img src="./img/start_screen/fullscreen-enter.svg" alt="fullscreen">
      </div>
      <img onclick="playGame();" class="play-icon" src="./img/start_screen/play-btn.svg" alt="play-button">
    </div>
  `;
}

// Funktion, um den Sound ein- oder auszuschalten
function toggleSound() {
  let soundIcon = document.getElementById('sound-icon');
  if (isBackgroundSoundOn) {
    gameSound.play();
    soundIcon.src = "./img/start_screen/sound_on.svg";
  } else {
    // Stoppe den Sound
    gameSound.pause();
    gameSound.currentTime = 0;
    soundIcon.src = "./img/start_screen/sound_off.svg";
  }
  isBackgroundSoundOn = !isBackgroundSoundOn;
}
