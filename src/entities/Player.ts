import Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Sprite {
  hp: number;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'plane', 1);
    this.hp = 20;
    this.x = 100;
    this.y = 500;

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('plane', { frames: [0, 1] }),
      frameRate: 8,
      repeat: -1,
    });
    this.setVisible(true);
    this.play('idle');
    scene.add.existing(this); // This make player visible
  }

  update() {
    if (this.hp == 0) this.destroy();
  }
}
