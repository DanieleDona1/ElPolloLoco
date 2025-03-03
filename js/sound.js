let gameSound = new Audio('./audio/game_sound.mp3');
let soundEnabled;

gameSound.volume = 0.15;
gameSound.loop = true;

/**
 * Retrieves the current sound enabled status from localStorage.
 * @returns {boolean} The current sound enabled status.
 */
function getSoundEnabled() {
  const soundEnabled = JSON.parse(localStorage.getItem('soundEnabled'));
  return soundEnabled;
}

/**
 * Checks the sound status in localStorage. If no status is found, it sets the default to 'false'.
 * Based on the sound status, it either enables or disables background sound.
 */
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

/**
 * Toggles the sound on or off by flipping the sound status in localStorage.
 * Updates the sound status and UI accordingly.
 */
function toggleSound() {
  let soundEnabled = JSON.parse(localStorage.getItem('soundEnabled'));
  localStorage.setItem('soundEnabled', !soundEnabled);
  checkSoundStatus();
}

/**
 * Enables the background sound by playing the audio and updating the sound icon to "sound-on".
 * Handles potential errors that may occur if the user hasn't interacted with the document.
 */
function backgroundSoundOn() {
  let soundIcon = document.getElementById('sound-icon');
  try {
    gameSound.play();
  } catch (error) {
    console.warn('NotAllowedError: play() failed because the user didn t interact with the document');
  }
  soundIcon.src = './img/start_end_screen/sound-on.svg';
}

/**
 * Disables the background sound by pausing the audio, resetting its playback time, and updating the sound icon to "sound-off".
 */
function backgroundSoundOff() {
  let soundIcon = document.getElementById('sound-icon');
  gameSound.pause();
  gameSound.currentTime = 0;
  soundIcon.src = './img/start_end_screen/sound-off.svg';
  if (world) {
    world.SLEEP_SOUND.pause();
    world.ALERT_SOUND.pause();
    world.ATTACK_SCREAM_SOUND.pause();
  }
}
