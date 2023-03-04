import { Sprite } from "./classes/sprite.js";
import createPlayer1 from "./utils/createPlayer1.js";
import createPlayer2 from "./utils/createPlayer2.js";
import createEventListeners from "./utils/keyboards/index.js";
import movementAnimations from "./utils/movement/animations/movementAnimations.js";
import movementPhysics from "./utils/movement/physics/movementPhysics.js";
import { descreaseTimer } from "./utils/timer/index.js";
import { checkGameOver } from "./utils/gameEnd/index.js";
import checkReceivedAttack from "./utils/attack/checkReceivedAttack.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const background = new Sprite({
  ctx,
  imgSrc: "../assets/background/background.jpg",
  position: { x: 0, y: 0 },
});
const player1 = createPlayer1(ctx);
const player2 = createPlayer2(ctx);

const keys = createEventListeners(player1, player2);

function animate() {
  window.requestAnimationFrame(animate);

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw & update animations
  background.update();
  player1.update();
  player2.update();

  // Player Update Movement Animations & Physics
  movementAnimations({ player: player1, keys, isPlayer2: false });
  movementPhysics({ player: player1, keys, isPlayer2: false });

  // player2 Update Movement Animations & Physics
  movementAnimations({ player: player2, keys, isPlayer2: true });
  movementPhysics({ player: player2, keys, isPlayer2: true });

  // check if player2 received attack
  checkReceivedAttack({
    attacker: player1,
    receiver: player2,
    healthId: "player2-health",
  });

  // chceck if player1 received attack
  checkReceivedAttack({
    attacker: player2,
    receiver: player1,
    healthId: "player1-health",
  });

  // Check GameOver
  checkGameOver(player1, player2, "You Won", "AI Won");
}

descreaseTimer();

animate();
