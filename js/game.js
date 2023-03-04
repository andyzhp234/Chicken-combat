import { Sprite } from "./classes/sprite.js";
import { Fighter } from "./classes/fighter.js";
import { keys } from "./utils/keyboards.js";
import { descreaseTimer } from "./utils/timer.js";
import { gameOver, checkGameOver } from "./utils/gameEnd.js";
import {
  checkAttackCollusion,
  checkLeftBoundaries,
  checkRightBoundaries,
} from "./utils/utils.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
  imgSrc: "../assets/background/background.jpg",
  position: { x: 0, y: 0 },
});

const player = new Fighter({
  isEnemy: false,
  position: { x: 100, y: 0 },
  velocity: { x: 0, y: 0 },
  imgOffset: { x: -10, y: 6 },
  imgSrc: "../assets/character/ChikBoy/ChikBoy_idle.png",
  scale: 4,
  frameMax: 6,
  framesTopToDown: true,
  sprites: {
    idle: {
      imgSrc: "../assets/character/ChikBoy/ChikBoy_idle.png",
      frameMax: 6,
    },
    run: {
      imgSrc: "../assets/character/ChikBoy/ChikBoy_run.png",
      frameMax: 10,
    },
    jump: {
      imgSrc: "../assets/character/ChikBoy/ChikBoy_jump.png",
      frameMax: 6,
    },
    fall: {
      imgSrc: "../assets/character/ChikBoy/ChikBoy_fall.png",
      frameMax: 6,
    },
    attack1: {
      imgSrc: "../assets/character/ChikBoy/ChikBoy_attack_1.png",
      frameMax: 5,
    },
    take_dmg: {
      imgSrc: "../assets/character/ChikBoy/ChikBoy_take_damage.png",
      frameMax: 4,
    },
    death: {
      imgSrc: "../assets/character/ChikBoy/ChikBoy_death_1.png",
      frameMax: 8,
    },
  },
});

const enemy = new Fighter({
  isEnemy: true,
  attackAnimationTime: 550,
  position: { x: 1100, y: 100 },
  velocity: { x: 0, y: 0 },
  imgOffset: { x: -68, y: -50 },
  scale: 3,
  frameMax: 4,
  framesRightToLeft: true,
  imgSrc: "../assets/character/Mushroom/Idle.png",
  sprites: {
    idle: {
      imgSrc: "../assets/character/Mushroom/Idle.png",
      frameMax: 4,
    },
    run: {
      imgSrc: "../assets/character/Mushroom/Run.png",
      frameMax: 8,
    },
    jump: {
      imgSrc: "../assets/character/Mushroom/Idle.png",
      frameMax: 4,
    },
    fall: {
      imgSrc: "../assets/character/Mushroom/Idle.png",
      frameMax: 4,
    },
    attack1: {
      imgSrc: "../assets/character/Mushroom/Attack.png",
      frameMax: 8,
    },
    take_dmg: {
      imgSrc: "../assets/character/Mushroom/Take_damage.png",
      frameMax: 4,
    },
    death: {
      imgSrc: "../assets/character/Mushroom/Death.png",
      frameMax: 4,
    },
  },
});

function animate() {
  window.requestAnimationFrame(animate);

  // clear the canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
  checkGameOver();
}

descreaseTimer();

animate();

export { ctx, player, enemy };
