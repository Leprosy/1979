import Phaser from 'phaser';

export class Inter extends Phaser.Scene {
  keys: Phaser.Input.Keyboard.Key[];
  counter: number;

  constructor() {
    super('Inter');
    this.keys = [];
  }

  preload() {}

  create(data) {
    // Display something
    const text1 = this.add.bitmapText(300, 200, 'font', `Level ${data.level}`).setOrigin(0.5);

    // Keys
    this.keys['space'] = this.input.keyboard.addKey('SPACE');
  }

  update() {
    if (this.keys['space'].isDown) {
      console.log('Space pressed on Main');
      this.scene.start('Stage');
    }
  }
}
