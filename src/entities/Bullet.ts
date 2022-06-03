import Phaser from "phaser";
import { isInsideScreen } from "../helpers/screen";

export class Bullet extends Phaser.GameObjects.Rectangle {
  speed: number;

  constructor(scene: Phaser.Scene, origin: Phaser.Types.Math.Vector2Like, target: Phaser.Types.Math.Vector2Like, speed: number) {
    super(scene, origin.x, origin.y, 5, 5, 0xff0000);
    this.speed = speed;
  }

  update() {
    this.y -= this.speed;

    if (!isInsideScreen(this.x, this.y)) {
      console.log("splat");
      this.destroy();
    }
  }
}
