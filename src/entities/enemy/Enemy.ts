import Phaser from 'phaser';
import { EnemyDefinition, EnemyType } from './types';
import { EnemyDefinitions } from './EnemyDefinitions';
import { Bullet } from '../Bullet';
import { isInsideScreen } from '../../helpers/screen';

export class Enemy extends Phaser.GameObjects.Sprite {
  definition: EnemyDefinition;
  timerEvents: Phaser.Time.TimerEvent[];
  hp: number;
  points: number;

  constructor(scene: Phaser.Scene, type: EnemyType) {
    super(scene, 0, 0, 'plane', 1);
    this.definition = EnemyDefinitions[type];

    const position = this.definition.startPosition(); // TODO: Can we deconstruct assign this?
    this.x = position.x;
    this.y = position.y;
    this.angle = position.angle;
    this.hp = this.definition.hp;
    this.points = this.definition.points;
    this.tint = 0xff0000;

    this.timerEvents = [
      this.scene.time.addEvent({
        delay: 500, // TODO: game tics in config
        callback: () => {
          if (Math.random() * 100 < this.definition.shootChance) {
            const origin = { x: this.x, y: this.y };
            const target = { x: this.scene.P1.x, y: this.scene.P1.y };
            const bullet = new Bullet(this.scene, origin, target, 5); // TODO: speed in enemy definition
            this.scene.bullets.add(bullet, true);
            console.log('Bullets:', this.scene.bullets.getChildren());
          }
        },
        callbackScope: this,
        loop: true,
      }),
    ];
  }

  update() {
    this.definition.update(this);

    if (!isInsideScreen(this.x, this.y) || this.hp == 0) {
      this.destroy();
    }
  }

  destroy(fromScene?: boolean): void {
    this.timerEvents.forEach((event: Phaser.Time.TimerEvent) => event.remove());
    super.destroy();
  }
}
