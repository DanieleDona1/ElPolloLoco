

function loadStartScreen() {
  let startScreen = document.getElementById('userInteraction');

  startScreen.innerHTML = /*html*/ `
    <div class='start-container'>
      <div class='start-screen-container'>
        <img src="./img/start_screen/settings.svg" alt="settings">
        <img src="./img/start_screen/sound_on.svg" alt="sound-on">
        <img src="./img/start_screen/fullscreen-enter.svg" alt="fullscreen">
      </div>
      <img class="play-icon" src="./img/start_screen/play-button.svg" alt="play-button">
    </div>
  `;
}
