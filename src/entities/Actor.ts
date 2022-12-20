import Phaser from 'phaser';

export class Actor extends Phaser.GameObjects.Sprite {
  hp: number;

  constructor(scene: Phaser.Scene, sprite: string) {
    super(scene, 0, 0, sprite, 1);

    // Base animations
    // TODO: frames should be constructor parameters
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('plane', { frames: [0, 1] }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'death',
      frames: this.anims.generateFrameNumbers('plane', { frames: [6, 7, 8, 9, 10, 11] }),
      frameRate: 2,
      repeat: 0,
    });

    this.play('idle');

    // Base events
    this.on('animationcomplete', () => {
      if (this.anims.getName() == 'death') {
        this.destroy();
      }
    });
  }

  update() {
    if (this.hp <= 0 && this.anims && this.anims.getName() != 'death') {
      this.play('death');
    }
  }

  isDead() {
    return this.hp <= 0;
  }
}
