import { player, enemy } from "../game.js";

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

window.addEventListener("keydown", (event) => {
  if (!player.dead) {
    switch (event.key) {
      case "d":
        keys["d"].pressed = true;
        break;
      case "a":
        keys["a"].pressed = true;
        break;
      case "w":
        player.jump();
        break;
      case " ":
        player.attack();
        break;
    }
  }
  if (!enemy.dead) {
    switch (event.key) {
      case "ArrowRight":
        keys["ArrowRight"].pressed = true;
        break;
      case "ArrowLeft":
        keys["ArrowLeft"].pressed = true;
        break;
      case "ArrowUp":
        enemy.jump();
        break;
      case "Enter":
        enemy.attack();
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

export { keys };
