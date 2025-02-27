let intervalIds = [];
let intervalDetails = [];
let isGamePaused = false;

let intervalEndbossIds = [];
let intervalEndbossDetails = [];

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  intervalDetails.push({ fn: fn, time: time });
  return id;
}

function pauseGame() {
  intervalIds.forEach(clearInterval);
  intervalEndbossIds.forEach(clearInterval);
}

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

function setStoppableIntervalEndboss(fn, time) {
  let id = setInterval(fn, time);
  intervalEndbossIds.push(id);
  intervalEndbossDetails.push({ fn: fn, time: time });
  return id;
}
