function checkAttackCollusion(attacker, receiver) {
  return (
    attacker.attackBox.position.x + attacker.attackBox.width >=
      receiver.position.x &&
    attacker.attackBox.position.x < receiver.position.x + receiver.width &&
    attacker.attackBox.position.y + attacker.attackBox.height >=
      receiver.position.y &&
    attacker.attackBox.position.y <= receiver.position.y + receiver.height &&
    attacker.isAttacking
  );
}

export default checkAttackCollusion;
