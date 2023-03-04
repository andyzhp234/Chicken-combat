import { checkLeftBoundaries, checkRightBoundaries } from "../../utils.js";

function AIMovementPhysics({ player }) {
  player.velocity.x = 0;
  // player can only move if they are alive
  if (player.health <= 0) return;

  // randomly pick true or false
  let randomTrueOrFalse = Math.random() < 0.5;

  let goLeft = randomTrueOrFalse;
  let goRight = !randomTrueOrFalse;

  if (goLeft && checkLeftBoundaries(player.position.x)) {
    player.velocity.x = -2.5;
  } else if (
    goRight &&
    checkRightBoundaries(player.position.x, canvas.width - player.width)
  ) {
    player.velocity.x = 2.5;
  }
}

export default AIMovementPhysics;
