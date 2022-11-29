import Phaser from 'phaser';

export class Explosion extends Phaser.GameObjects.Arc {
  constructor(scene: Phaser.Scene, origin: Phaser.Types.Math.Vector2Like) {
    super(scene, origin.x, origin.y, 5);
    this.setFillStyle(0xffff00);
  }

  update() {
    this.radius += 0.4;

    if (this.radius > 10) {
      this.destroy();
    }
  }
}
