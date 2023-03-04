import { ctx } from "../game.js";

class Sprite {
  constructor({
    position,
    imgSrc,
    scale = 1,
    frameMax = 1,
    framesCurrent = 0,
    framesElapsed = 0,
    framesHold = 20,
    framesTopToDown = false,
    framesRightToLeft = false,
    imgOffset = { x: 0, y: 0 },
  }) {
    this.imgOffset = imgOffset;
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imgSrc;
    this.scale = scale;
    this.frameMax = frameMax;
    this.framesCurrent = framesCurrent;
    this.framesElapsed = framesElapsed;
    this.framesHold = framesHold;
    this.framesTopToDown = framesTopToDown;
    this.framesRightToLeft = framesRightToLeft;
  }

  drawAnimationTopToDown() {
    ctx.drawImage(
      this.image,
      0,
      this.framesCurrent * (this.image.height / this.frameMax),
      this.image.width,
      this.image.height / this.frameMax,
      this.position.x + this.imgOffset.x * this.scale,
      this.position.y + this.imgOffset.y * this.scale,
      this.image.width * this.scale,
      (this.image.height / this.frameMax) * this.scale
    );
  }

  drawAnimationLeftToRight() {
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.frameMax),
      0,
      this.image.width / this.frameMax,
      this.image.height,
      this.position.x + this.imgOffset.x * this.scale,
      this.position.y + this.imgOffset.y * this.scale,
      (this.image.width / this.frameMax) * this.scale,
      this.image.height * this.scale
    );
  }

  drawAnimationRightToLeft() {
    ctx.drawImage(
      this.image,
      (this.frameMax - this.framesCurrent - 1) *
        (this.image.width / this.frameMax),
      0,
      this.image.width / this.frameMax,
      this.image.height,
      this.position.x + this.imgOffset.x * this.scale,
      this.position.y + this.imgOffset.y * this.scale,
      (this.image.width / this.frameMax) * this.scale,
      this.image.height * this.scale
    );
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

  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.frameMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

export { Sprite };
