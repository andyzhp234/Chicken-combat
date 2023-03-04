import { Fighter } from "../classes/fighter.js";

const createPlayer2 = (ctx) => {
  return new Fighter({
    ctx,
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
};

export default createPlayer2;
