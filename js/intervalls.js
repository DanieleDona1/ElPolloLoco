let stopOnlyIntervalIds = [];
let isGamePaused = false;
let intervalIds = [];
let intervalDetails = [];

/**
 * Pauses the game by clearing all active intervals.
 */
function pauseGame() {
  stopOnlyIntervalIds.forEach(clearInterval);
  intervalIds.forEach(clearInterval);
  stopOnlyIntervalIds.forEach(clearInterval);
}

/**
 * Resumes the game by restarting necessary intervals.
 */
function resumeGame() {
  world.level.enemies[0].introEndbossAnimation();
  intervalDetails.forEach((detail) => {
    let id = setInterval(detail.fn, detail.time);
    intervalIds.push(id);
  });
}

/**
 * Sets an interval that can be stopped later.
 *
 * @param {Function} fn - The function to execute at each interval.
 * @param {number} time - The time in milliseconds between executions.
 * @returns {number} - The interval ID.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  intervalDetails.push({ fn: fn, time: time });
  return id;
}

/**
 * Sets an interval that is only stored in stop-only intervals.
 *
 * @param {Function} fn - The function to execute at each interval.
 * @param {number} time - The time in milliseconds between executions.
 * @returns {number} - The interval ID.
 */
function setStopOnlyInterval(fn, time) {
  let id = setInterval(fn, time);
  stopOnlyIntervalIds.push(id);
  return id;
}
