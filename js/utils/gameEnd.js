import { timer, timerId } from "./timer.js";

let gameOver = false;

function checkGameOver(player, enemy, playerWinText, playerLoseText) {
  if (timer === 0 || player.health <= 0 || enemy.health <= 0) {
    gameOver = true;
    clearInterval(timerId);

    const gameResultText = document.getElementById("gameResult");
    if (timer === 0) {
      gameResultText.innerText = "Tie";
    } else if (enemy.health <= 0) {
      gameResultText.innerText = playerWinText;
    } else {
      gameResultText.innerText = playerLoseText;
    }

    const playAgainText = document.getElementById("playAgain");
    playAgainText.innerText = "Play Again";
  }
}

export { gameOver, checkGameOver };
