let stopOnlyIntervalIds = [];
let isGamePaused = false;

let intervalIds = [];
let intervalDetails = [];

function pauseGame() {
  stopOnlyIntervalIds.forEach(clearInterval);
  intervalIds.forEach(clearInterval);
  stopOnlyIntervalIds.forEach(clearInterval);
}

function resumeGame() {
  world.level.enemies[0].introEndbossAnimation();
    intervalDetails.forEach((detail) => {
    let id = setInterval(detail.fn, detail.time);
    intervalIds.push(id);
  });
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  intervalDetails.push({ fn: fn, time: time });
  return id;
}

function setStopOnlyInterval(fn, time) {
  let id = setInterval(fn, time);
  stopOnlyIntervalIds.push(id);
  return id;
}
