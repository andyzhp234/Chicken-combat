import { Sprite } from "./sprite.js";
import { ctx } from "../game.js";

const gravity = 0.13;

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    isEnemy = false,
    imgSrc,
    scale = 1,
    frameMax = 1,
    framesHold = 30,
    sprites,
    framesTopToDown = false,
    framesRightToLeft = false,
    bottomOffset = 90,
    imgOffset = { x: 0, y: 0 },
    attackAnimationTime = 200,
  }) {
    super({
      imgOffset,
      position,
      imgSrc,
      scale,
      frameMax,
      framesHold,
      framesTopToDown,
      framesRightToLeft,
    });
    this.bottomOffset = bottomOffset;
    this.health = 100;
    this.dead = false;
    this.attackAnimationTime = attackAnimationTime;
    this.velocity = velocity;
    this.isEnemy = isEnemy;
    this.canAttack = true;
    this.isAttacking = false;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 100,
      height: 50,
    };

    this.sprites = sprites;
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imgSrc;
    }
  }

  draw() {
    if (this.framesTopToDown) {
      this.drawAnimationTopToDown();
    } else if (this.framesRightToLeft) {
      this.drawAnimationRightToLeft();
    } else {
      this.drawAnimationLeftToRight();
    }
  }

  update() {
    this.draw();
    if (!this.dead) this.animateFrames();

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    this.attackBox.position.x =
      this.position.x + (this.isEnemy ? -this.width - 20 : 20);
    this.attackBox.position.y = this.position.y + 50;

    if (
      this.position.y + this.height + this.velocity.y >=
      canvas.height - this.bottomOffset
    ) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    if (this.canAttack) {
      this.canAttack = false;
      this.switchSprite("attack1");
      // we need set a cooldown for attack animations to complete
      setTimeout(() => {
        this.canAttack = true;
      }, this.attackAnimationTime);

      // we need to set a delay for the attack box to appear
      setTimeout(() => {
        this.isAttacking = true;
        // Attack box only lasts for 0.1s
        setTimeout(() => {
          this.isAttacking = false;
        }, 100);
      }, this.attackAnimationTime / 2);
    }
  }

  receivedDmg(dmg = 15) {
    this.health -= dmg;
    if (this.health <= 0) {
      this.health = 0;
      this.switchSprite("death");
    } else {
      this.switchSprite("take_dmg");
    }
  }

  jump() {
    if (this.position.y >= canvas.height - this.height - this.bottomOffset) {
      this.velocity.y = -10;
    }
  }

  switchSprite(sprite) {
    // Override other sprites during death sprite animation
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent >= this.sprites.death.frameMax - 1) {
        this.dead = true;
      }
      return;
    }
    // Override other sprites during attack sprite animation
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.frameMax - 1
    ) {
      return;
    }

    // Override other sprites during take_dmg sprite animation
    if (
      this.image === this.sprites.take_dmg.image &&
      this.framesCurrent < this.sprites.take_dmg.frameMax - 1
    ) {
      return;
    }

    // default framesHold
    this.framesHold = 30;
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.framesCurrent = 0;
          this.image = this.sprites.idle.image;
          this.frameMax = this.sprites.idle.frameMax;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.framesCurrent = 0;
          this.image = this.sprites.run.image;
          this.frameMax = this.sprites.run.frameMax;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.framesCurrent = 0;
          this.image = this.sprites.jump.image;
          this.frameMax = this.sprites.jump.frameMax;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.framesCurrent = 0;
          this.image = this.sprites.fall.image;
          this.frameMax = this.sprites.fall.frameMax;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.framesCurrent = 0;
          this.framesHold = 15;
          this.image = this.sprites.attack1.image;
          this.frameMax = this.sprites.attack1.frameMax;
        }
        break;
      case "take_dmg":
        if (this.image !== this.sprites.take_dmg.image) {
          this.framesCurrent = 0;
          this.framesHold = 15;
          this.image = this.sprites.take_dmg.image;
          this.frameMax = this.sprites.take_dmg.frameMax;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.framesCurrent = 0;
          this.image = this.sprites.death.image;
          this.frameMax = this.sprites.death.frameMax;
        }
        break;
    }
  }
}

export { Fighter };

// draw() {
//   if (this.framesTopToDown) {
//     this.drawAnimationTopToDown();
//   } else if (this.framesRightToLeft) {
//     this.drawAnimationRightToLeft();
//   } else {
//     this.drawAnimationLeftToRight();
//   }

//   // Body
//   ctx.fillStyle = "blue";
//   ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

//   if (this.isAttacking) {
//     // Attack Box
//     ctx.fillStyle = "red";
//     ctx.fillRect(
//       this.attackBox.position.x,
//       this.attackBox.position.y,
//       this.attackBox.width,
//       this.attackBox.height
//     );
//   }
// }
