import { Sprite } from "./classes/sprite.js";
import createPlayer from "./utils/createPlayer.js";
import createEnemy from "./utils/createEnemy.js";
import createEventListeners from "./utils/keyboards.js";
import { descreaseTimer } from "./utils/timer.js";
import { gameOver, checkGameOver } from "./utils/gameEnd.js";
import {
  checkAttackCollusion,
  checkLeftBoundaries,
  checkRightBoundaries,
} from "./utils/utils.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const background = new Sprite({
  ctx,
  imgSrc: "../assets/background/background.jpg",
  position: { x: 0, y: 0 },
});
const player = createPlayer(ctx);
const enemy = createEnemy(ctx);

const keys = createEventListeners(player, enemy);

function animate() {
  window.requestAnimationFrame(animate);

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw & update the player position
  background.update();
  player.update();
  enemy.update();

  // Player Movement Animations
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  } else {
    if (keys["a"].pressed && checkLeftBoundaries(player.position.x)) {
      player.switchSprite("run");
    } else if (
      keys["d"].pressed &&
      checkRightBoundaries(player.position.x, canvas.width - player.width)
    ) {
      player.switchSprite("run");
    } else {
      player.switchSprite("idle");
    }
  }

  // Player Movement Animations
  player.velocity.x = 0;
  if (keys["a"].pressed && checkLeftBoundaries(player.position.x)) {
    player.velocity.x = -2.5;
  } else if (
    keys["d"].pressed &&
    checkRightBoundaries(player.position.x, canvas.width - player.width)
  ) {
    player.velocity.x = 2.5;
  }

  // Enemy Movement Animations
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  } else {
    if (keys["ArrowLeft"].pressed && checkLeftBoundaries(enemy.position.x)) {
      enemy.switchSprite("run");
    } else if (
      keys["ArrowRight"].pressed &&
      checkRightBoundaries(enemy.position.x, canvas.width - enemy.width)
    ) {
      enemy.switchSprite("run");
    } else {
      enemy.switchSprite("idle");
    }
  }

  // Enemy Movement
  enemy.velocity.x = 0;
  if (keys["ArrowLeft"].pressed && checkLeftBoundaries(enemy.position.x)) {
    enemy.velocity.x = -2.5;
  } else if (
    keys["ArrowRight"].pressed &&
    checkRightBoundaries(enemy.position.x, canvas.width - enemy.width)
  ) {
    enemy.velocity.x = 2.5;
  }

  // Detect for Player Attack
  if (checkAttackCollusion(player, enemy) && !gameOver) {
    player.isAttacking = false;
    enemy.receivedDmg();
    document.getElementById("enemy__health").style.width = `${enemy.health}%`;
  }

  // Detect for collision
  if (checkAttackCollusion(enemy, player) && !gameOver) {
    enemy.isAttacking = false;
    player.receivedDmg(30);
    document.getElementById("player__health").style.width = `${player.health}%`;
  }

  // Check GameOver
  checkGameOver(player, enemy, "Player 1 Wins", "Player 2 Wins");
}

descreaseTimer();

animate();

export { ctx, player, enemy };
