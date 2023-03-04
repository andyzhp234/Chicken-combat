import checkAttackCollusion from "./checkAttackCollusion.js";
import { gameOver } from "../gameEnd/index.js";

function checkReceivedAttack({ attacker, receiver, healthId }) {
  // Detect for Player Attack
  if (checkAttackCollusion(attacker, receiver) && !gameOver) {
    attacker.isAttacking = false;
    receiver.receivedDmg();
    document.getElementById(healthId).style.width = `${receiver.health}%`;
  }
}

export default checkReceivedAttack;
