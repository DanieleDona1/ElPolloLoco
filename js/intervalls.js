let intervalIds = [];
let intervalDetails = [];
let isGamePaused = false;

// Funktion zum Setzen eines stoppbaren Intervalls
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  intervalDetails.push({ fn: fn, time: time });
  return id;
}

function pauseGame() {
  intervalIds.forEach(clearInterval);
}

function resumeGame() {
  intervalDetails.forEach((detail) => {
    let id = setInterval(detail.fn, detail.time);
    intervalIds.push(id);
  });
}


function setStoppableIntervalEndboss(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  intervalDetails.push({ fn: fn, time: time });
  return id;
}

// function pauseEndbossAnimation() {
//   intervalIds.forEach(clearInterval);
// }

// function resumeEndbossAnimation() {
//   intervalDetails.forEach((detail) => {
//     let id = setInterval(detail.fn, detail.time);
//     intervalIds.push(id);
//   });
// }
