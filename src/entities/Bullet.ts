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

    // Setup
    const angle = Phaser.Math.Angle.BetweenPoints(origin, target);
    this.speedX = speed * Math.cos(angle);
    this.speedY = speed * Math.sin(angle);
    this.isFromPlayer = false;

    // Animation
    scene.anims.create({
      key: 'fire',
      frames: this.anims.generateFrameNumbers('bullet', { frames: [0, 1] }),
      frameRate: 8,
      repeat: -1,
    });
    this.play('fire');
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
