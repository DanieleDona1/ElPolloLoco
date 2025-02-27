let gameSound = new Audio('./audio/game_sound.mp3');
let soundEnabled;

gameSound.volume = 0.15;
gameSound.loop = true;

function getSoundEnabled() {
  const soundEnabled = JSON.parse(localStorage.getItem('soundEnabled'));
  return soundEnabled;
}

function checkSoundStatus() {
  if (!localStorage.getItem('soundEnabled')) {
    localStorage.setItem('soundEnabled', 'false');
  }
  soundEnabled = getSoundEnabled();
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
  try {
    gameSound.play();
  } catch (error) {
    console.warn('NotAllowedError: play() failed because the user didn t interact with the document');

  }
  soundIcon.src = './img/start_end_screen/sound-on.svg';
}

function backgroundSoundOff() {
  let soundIcon = document.getElementById('sound-icon');
  gameSound.pause();
  gameSound.currentTime = 0;
  soundIcon.src = './img/start_end_screen/sound-off.svg';
}
