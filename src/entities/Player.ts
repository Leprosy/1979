import Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Sprite {
  hp: number;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'plane', 1);

    // Setup
    this.hp = 3; // TODO: config?
    this.x = 100;
    this.y = 500;

    // Animations
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
    this.setVisible(true);
    this.play('idle');
    scene.add.existing(this); // This make player visible

    // Events
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
