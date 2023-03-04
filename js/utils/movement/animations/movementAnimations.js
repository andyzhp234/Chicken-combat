function movementAnimations({ player, keys, isPlayer2 = false }) {
  // If the player is jumping or falling, switch to the jump or fall sprite
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  } else {
    // If the player is not jumping or falling, switch to the run or idle sprite

    if (isPlayer2) {
      if (keys["ArrowLeft"].pressed || keys["ArrowRight"].pressed) {
        player.switchSprite("run");
      } else {
        player.switchSprite("idle");
      }
    } else {
      if (keys["a"].pressed || keys["d"].pressed) {
        player.switchSprite("run");
      } else {
        player.switchSprite("idle");
      }
    }
  }
}

export default movementAnimations;
