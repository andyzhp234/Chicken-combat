function AIMovementAnimation({ player }) {
  // If the player is jumping or falling, switch to the jump or fall sprite
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  } else {
    // If the player is not jumping or falling, switch to the run or idle sprite
    if (player.velocity.x < 0 || player.velocity.x > 0) {
      player.switchSprite("run");
    } else {
      player.switchSprite("idle");
    }
  }
}

export default AIMovementAnimation;
