let intervalIds = [];
let intervalDetails = []; // Hier werden die Funktionen und Zeitintervalle gespeichert
let isGamePaused = false;

let gameSound = new Audio('audio/game_sound.mp3'); // Lade die Audiodatei
gameSound.loop = true; // Der Sound wird wiederholt abgespielt

function onload() {
  loadStartScreen();
  checkSoundStatus(); //TODO entkommentiere und lösche playGame() Zeile 4
  // playGame();
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
  // initLevel(); kann raus weil reingerendert wird
  startScreen.innerHTML += getInGameNavigation();
  startScreen.innerHTML += getSettingsPopupTemplate();
  checkSoundStatus();

  document.getElementById('startContainer').style.backgroundImage = 'none';
  //TODO später wieder display flex document.getElementById('startContainer').style.backgroundImage = 'url("./img/9_intro_outro_screens/start/startscreen_1.png")';
  init();
}

// Funktion zum Setzen eines stoppbaren Intervalls
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  intervalDetails.push({ fn: fn, time: time }); // Speichere die Details des Intervalls
  return id;
  // console.log('intervalIds gepusht', intervalIds);
  // console.log('intervalDetails gepusht', intervalDetails);
}

// Funktion zum Pausieren aller Intervalle
function pauseGame() {
  intervalIds.forEach(clearInterval);
  // console.log('Pause/Clear', intervalIds);

}

// Funktion zum Fortsetzen der Intervalle
function resumeGame() {
  intervalDetails.forEach((detail) => {
    let id = setInterval(detail.fn, detail.time);
    intervalIds.push(id);
    // console.log('intervalIds spiel wieder fortsetzen', intervalIds);
    // console.log('intervallDetails', intervalDetails);
  });
}



function togglePlayPauseBtn() {
  let playPauseIcon = document.getElementById('play-pause-icon');

  if (isGamePaused) {
    // Spiel fortsetzen
    playPauseIcon.src = './img/start_screen/pause.svg'; // Ändere Bild zu Pause
    resumeGame(); // Fortsetzen der Intervalle
  } else {
    // Spiel pausieren
    playPauseIcon.src = './img/start_screen/play.svg'; // Ändere Bild zu Play
    pauseGame(); // Pausieren der Intervalle
  }

  // Den Zustand umschalten
  isGamePaused = !isGamePaused;
}

function checkSoundStatus() {
  if (!localStorage.getItem('soundEnabled')) {
    localStorage.setItem('soundEnabled', 'false');
  }
  let soundEnabled = JSON.parse(localStorage.getItem('soundEnabled'));

  if (soundEnabled) {
    backgroundSoundOn();
  } else {
    backgroundSoundOff();
  }
}

function toggleSound() {
  let soundEnabled = JSON.parse(localStorage.getItem('soundEnabled'));
  localStorage.setItem('soundEnabled', !soundEnabled);
  checkSoundStatus();
}

function backgroundSoundOn() {
  let soundIcon = document.getElementById('sound-icon');
  gameSound.play();
  soundIcon.src = './img/start_screen/sound-on.svg';
}
function backgroundSoundOff() {
  let soundIcon = document.getElementById('sound-icon');
  gameSound.pause();
  gameSound.currentTime = 0;
  soundIcon.src = './img/start_screen/sound-off.svg';
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
