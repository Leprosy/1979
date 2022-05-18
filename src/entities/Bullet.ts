import Phaser from "phaser";

export class Bullet extends Phaser.GameObjects.Rectangle {
  speed: number;

  constructor(scene: Phaser.Scene, x: number, y: number, speed: number) {
    super(scene, x, y, 5, 5, 0xff0000);
    this.speed = speed;
  }

  update() {
    this.y -= this.speed;

    if (this.y < 0) {
      this.destroy();
    }
  }
}
