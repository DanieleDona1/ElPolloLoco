
let intervalIds = [];
let intervalDetails = []; // Hier werden die Funktionen und Zeitintervalle gespeichert
let isGamePaused = false;

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
  // initLevel(); kann raus weil reingerendert wird
  startScreen.innerHTML += getInGameNavigation();
  startScreen.innerHTML += getSettingsPopupTemplate();
  init();
}


// Funktion zum Setzen eines stoppbaren Intervalls
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  intervalDetails.push({ fn: fn, time: time }); // Speichere die Details des Intervalls
}

// Funktion zum Pausieren aller Intervalle
function pauseGame() {
  intervalIds.forEach(clearInterval);
}

// Funktion zum Fortsetzen der Intervalle
function resumeGame() {
  intervalDetails.forEach(detail => {
    let id = setInterval(detail.fn, detail.time);
    intervalIds.push(id);
  });
}

function togglePlayPauseBtn() {
  let playPauseIcon = document.getElementById('play-pause-icon');

  if (isGamePaused) {
    // Spiel fortsetzen
    playPauseIcon.src = "./img/start_screen/pause.svg";  // Ändere Bild zu Pause
    resumeGame(); // Fortsetzen der Intervalle
  } else {
    // Spiel pausieren
    playPauseIcon.src = "./img/start_screen/play.svg";  // Ändere Bild zu Play
    pauseGame(); // Pausieren der Intervalle
  }

  // Den Zustand umschalten
  isGamePaused = !isGamePaused;
}
