import Phaser from 'phaser';
import { Actor } from './Actor';

export class Player extends Actor {
  constructor(scene: Phaser.Scene) {
    super(scene, 'plane');

    // Setup
    this.hp = 10; // TODO: config?
    this.x = 100;
    this.y = 500;

    scene.add.existing(this); // This make player visible
  }
}
