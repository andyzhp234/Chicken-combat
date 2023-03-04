function createEventListeners(player1, player2) {
  const keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
  };

  window.addEventListener("keydown", (event) => {
    if (!player1.dead) {
      switch (event.key) {
        case "d":
          keys["d"].pressed = true;
          break;
        case "a":
          keys["a"].pressed = true;
          break;
        case "w":
          player1.jump();
          break;
        case " ":
          player1.attack();
          break;
      }
    }
    if (!player2.dead) {
      switch (event.key) {
        case "ArrowRight":
          keys["ArrowRight"].pressed = true;
          break;
        case "ArrowLeft":
          keys["ArrowLeft"].pressed = true;
          break;
        case "ArrowUp":
          player2.jump();
          break;
        case "Enter":
          player2.attack();
          break;
      }
    }
  });

  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "d":
        keys["d"].pressed = false;
        break;
      case "a":
        keys["a"].pressed = false;
        break;

      case "ArrowRight":
        keys["ArrowRight"].pressed = false;
        break;
      case "ArrowLeft":
        keys["ArrowLeft"].pressed = false;
        break;
    }
  });

  return keys;
}

export default createEventListeners;
