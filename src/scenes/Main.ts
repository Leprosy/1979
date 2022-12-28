import Phaser from 'phaser';
import { textStyles } from '../constants/styles';

export class Main extends Phaser.Scene {
  keys: Phaser.Input.Keyboard.Key[];
  counter: number;

  constructor() {
    super('Main');
    this.keys = [];
    this.counter = 0;
  }

  preload() {
    this.load.image('logo', 'assets/logo.png');
    this.load.image('tiles', 'assets/sprites/tiles.png');
    this.load.bitmapFont('font', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
    this.load.spritesheet({
      key: 'plane',
      url: 'assets/sprites/plane.png',
      frameConfig: { frameWidth: 50, frameHeight: 40 },
    });
    this.load.spritesheet({
      key: 'bullet',
      url: 'assets/sprites/bullet.png',
      frameConfig: { frameWidth: 10, frameHeight: 10 },
    });
  }

  create() {
    //this.scene.start('Stage'); // DEBUG ONLY

    // Display something
    const logo = this.add.image(300, 100, 'logo');
    const text1 = this.add.bitmapText(300, 200, 'font', this.game.config.gameTitle).setOrigin(0.5);
    const text2 = this.add.bitmapText(300, 300, 'font', 'Press <Space>').setOrigin(0.5).setTint(0xff0066);
    this.add.text(300, 500, `Version ${this.game.config.gameVersion} ${new Date()}`, textStyles.debug).setOrigin(0.5);

    // Animations
    this.tweens.add({
      targets: logo,
      y: 120,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: text2,
      duration: 1000,
      alpha: 0,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Keys
    this.keys['space'] = this.input.keyboard.addKey('SPACE');
    this.keys['a'] = this.input.keyboard.addKey('A');
  }

  update() {
    if (this.keys['space'].isDown) {
      console.log('Space pressed on Main');
      this.scene.start('Stage');
    }

    if (this.keys['a'].isDown) {
      console.log('Counter is ' + this.counter++);
    }
  }
}
