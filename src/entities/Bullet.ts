import Phaser from 'phaser';
import { isInsideScreen } from '../helpers/screen';

export class Bullet extends Phaser.GameObjects.Sprite {
  speedX: number;
  speedY: number;
  isFromPlayer: boolean;

  constructor(
    scene: Phaser.Scene,
    origin: Phaser.Types.Math.Vector2Like,
    target: Phaser.Types.Math.Vector2Like,
    speed: number
  ) {
    super(scene, origin.x || 0, origin.y || 0, 'bullet');
    const angle = Phaser.Math.Angle.BetweenPoints(origin, target);
    this.speedX = speed * Math.cos(angle);
    this.speedY = speed * Math.sin(angle);
    this.isFromPlayer = false;
  }

  update() {
    // TODO: Check if bullets travel at the same speed in all directions
    this.y += this.speedY;
    this.x += this.speedX;

    if (!isInsideScreen(this.x, this.y)) {
      this.destroy();
    }
  }
}
