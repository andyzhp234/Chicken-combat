import { checkLeftBoundaries, checkRightBoundaries } from "../../utils.js";

function movementPhysics({ player, keys, isPlayer2 = false }) {
  player.velocity.x = 0;
  // player can only move if they are alive
  if (player.health <= 0) return;

  let goLeft = isPlayer2 ? keys["ArrowLeft"].pressed : keys["a"].pressed;
  let goRight = isPlayer2 ? keys["ArrowRight"].pressed : keys["d"].pressed;

  if (goLeft && checkLeftBoundaries(player.position.x)) {
    player.velocity.x = -2.5;
  } else if (
    goRight &&
    checkRightBoundaries(player.position.x, canvas.width - player.width)
  ) {
    player.velocity.x = 2.5;
  }
}

export default movementPhysics;
