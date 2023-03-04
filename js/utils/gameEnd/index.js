import { timer, timerId } from "../timer/index.js";

let gameOver = false;

function checkGameOver(player1, player2, player1WinText, player2WinText) {
  if (timer === 0 || player1.health <= 0 || player2.health <= 0) {
    gameOver = true;
    clearInterval(timerId);

    const gameResultText = document.getElementById("gameResult");
    if (timer === 0) {
      gameResultText.innerText = "Tie";
    } else if (player2.health <= 0) {
      gameResultText.innerText = player1WinText;
    } else {
      gameResultText.innerText = player2WinText;
    }

    const playAgainText = document.getElementById("playAgain");
    playAgainText.innerText = "Play Again";
  }
}

export { gameOver, checkGameOver };
