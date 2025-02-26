function getStartScreenTemplate() {
  return /*html*/ `
    <div class='start-container'>
      <div class='start-screen-container'>
        <img src="./img/start_screen/info.svg" alt="settings" onclick="toggleSettings()">
        <img id="sound-icon" src="./img/start_screen/sound-off.svg" alt="sound-on" onclick="toggleSound()">
      </div>
      <img onclick="playGame();" class="play-icon" src="./img/start_screen/play-btn.svg" alt="play-button">
      <div class="legal-info-container">
        <a href="./privacy.html">Privacy</a>
        <a href="./impressum.html">Impressum</a>
      </div>
    </div>
  `;
}

function getSettingsPopupTemplate() {
  return /*html*/ `
    <div id="settingsPopup" class="settings-popup">
      <div class="settings-popup-content">
        <span class="close-btn" onclick="closeSettings()"></span>
        <h2>Game Controls</h2>
        <ul>
          <li><strong>Left Arrow:</strong> Move Left</li>
          <li><strong>Right Arrow:</strong> Move Right</li>
          <li><strong>Up Arrow:</strong> Jump</li>
          <li><strong>Spacebar:</strong> Throw Bottle</li>
        </ul>

        <h2>Game Instructions</h2>
        <ul>
            <li><strong>To eliminate large and small chickens:</strong> Jump on them or throw a bottle at them.</li>
            <li><strong>To collect bottles and coins:</strong> Simply touch them.</li>
            <li><strong>If you come into contact with an enemy:</strong> You will lose a percentage of your health.</li>
            <li><strong>To restore health:</strong> Collect coins.</li>
            <li><strong>To defeat the final boss:</strong> Throw bottles at him.</li>
        </ul>
      </div>
    </div>
  `;
}

// musik beenden, spiel stoppen und spielanleitung
function getInGameNavigation() {
  return /*html*/ `
    <div  id="startContainer" class='start-container'>
      <img id="restartBtn" class="restart-button d-none" onclick="restartGame();" src="./img/start_screen/restart.svg" alt="restart">
      <div id="inGameNav" class='start-screen-container in-game-nav'>
          <img class="info-img" src="./img/start_screen/info.svg" alt="info" onclick="toggleSettings()">
          <img class="sound-img" id="sound-icon" src="./img/start_screen/sound-off.svg" alt="sound-on" onclick="toggleSound()">
          <img id="playPauseIcon" class="play-pause-icon play-pause-img" src="./img/start_screen/pause.svg" alt="pause-button" onclick="togglePlayPauseBtn();">
      </div>

      <div class="panel-mobile">
        <div class="panel-group">
          <img id="btnLeft" src="./img/in_game_navigation/arrow-left-move.svg" alt="move-left">
          <img id="btnRight" src="./img/in_game_navigation/arrow-right-move.svg" alt="">
        </div>

        <div class="panel-group">
          <img id="btnJump" src="./img/in_game_navigation/arrow-top-jump.svg" alt="move-left">
          <img id="btnThrowBottle" src="./img/in_game_navigation/bottle-throw.svg" alt=""></div>
        </div>
      </div>
  `;
}
