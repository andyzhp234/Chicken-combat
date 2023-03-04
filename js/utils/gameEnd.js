import { timer, timerId } from "./timer.js";
import { enemy, player } from "../game.js";

let gameOver = false;

function checkGameOver() {
  if (timer === 0 || player.health <= 0 || enemy.health <= 0) {
    gameOver = true;
    clearInterval(timerId);

    const gameResultText = document.getElementById("gameResult");

    if (timer === 0) {
      gameResultText.innerText = "Tie";
    } else if (player.health <= 0) {
      gameResultText.innerText = "Enemy Wins";
    } else {
      gameResultText.innerText = "Player Wins";
    }
  }
}

export { gameOver, checkGameOver };
