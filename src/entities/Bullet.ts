import Phaser from 'phaser';
import { isInsideScreen } from '../helpers/screen';

export class Bullet extends Phaser.GameObjects.Arc {
  speedX: number;
  speedY: number;

  constructor(
    scene: Phaser.Scene,
    origin: Phaser.Types.Math.Vector2Like,
    target: Phaser.Types.Math.Vector2Like,
    speed: number
  ) {
    super(scene, origin.x, origin.y, 5);
    this.setFillStyle(0xff0000);
    const angle = Phaser.Math.Angle.BetweenPoints(origin, target);
    this.speedX = speed * Math.cos(angle);
    this.speedY = speed * Math.sin(angle);
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    if (!isInsideScreen(this.x, this.y)) {
      this.destroy();
    }
  }
}
