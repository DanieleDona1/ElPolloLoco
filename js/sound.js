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
  soundIcon.src = './img/start_end_screen/sound-on.svg';
}
function backgroundSoundOff() {
  let soundIcon = document.getElementById('sound-icon');
  gameSound.pause();
  gameSound.currentTime = 0;
  soundIcon.src = './img/start_end_screen/sound-off.svg';
}
