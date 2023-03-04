import { Fighter } from "../classes/fighter.js";

const createPlayer = () => {
  return new Fighter({
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
};

export default createPlayer;
