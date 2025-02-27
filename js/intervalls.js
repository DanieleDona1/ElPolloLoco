let intervalIds = [];
let intervalDetails = [];
let isGamePaused = false;

let intervalEndbossIds = [];
let intervalEndbossDetails = [];

/**
 * Sets a stoppable interval that runs the given function at the specified time interval.
 * The interval ID is saved to allow for stopping later.
 * @param {Function} fn - The function to run at the specified interval.
 * @param {number} time - The time interval (in milliseconds) between each function execution.
 * @returns {number} The interval ID that can be used to stop the interval later.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  intervalDetails.push({ fn: fn, time: time });
  return id;
}

/**
 * Pauses the game by clearing all active intervals.
 * This will stop all ongoing periodic functions.
 */
function pauseGame() {
  intervalIds.forEach(clearInterval);
  intervalEndbossIds.forEach(clearInterval);
}

/**
 * Resumes the game by re-creating the intervals for all previously stored functions.
 * It restores all intervals from both regular and endboss details to resume the game.
 */
function resumeGame() {
  intervalDetails.forEach((detail) => {
    let id = setInterval(detail.fn, detail.time);
    intervalIds.push(id);
  });
  intervalEndbossDetails.forEach((detail) => {
    let id = setInterval(detail.fn, detail.time);
    intervalEndbossIds.push(id);
  });
}

/**
 * Sets a stoppable interval for endboss-specific functions, similar to `setStoppableInterval`.
 * The interval ID is saved to allow for stopping later.
 * @param {Function} fn - The function to run at the specified interval for the endboss.
 * @param {number} time - The time interval (in milliseconds) between each function execution for the endboss.
 * @returns {number} The interval ID for the endboss-specific interval.
 */
function setStoppableIntervalEndboss(fn, time) {
  let id = setInterval(fn, time);
  intervalEndbossIds.push(id);
  intervalEndbossDetails.push({ fn: fn, time: time });
  return id;
}

