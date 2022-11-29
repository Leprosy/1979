import Phaser from 'phaser';
import { gameConfig } from '../config';
import { Bullet } from '../entities/Bullet';
import { Enemy } from '../entities/enemy';
import { Explosion } from '../entities/Explosion';
import { playerController } from '../helpers/PlayerController';
import { areColliding } from '../helpers/screen';

export class Stage extends Phaser.Scene {
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  P1: Phaser.GameObjects.Rectangle;
  speed: number;
  bullets: Phaser.GameObjects.Container;
  enemies: Phaser.GameObjects.Container;
  explosions: Phaser.GameObjects.Container;
  cooldown: number;
  canFire: boolean;
  canSpawn: boolean;

  constructor() {
    super('Stage');
    this.speed = 5;
    this.cooldown = 0.5;
    this.canFire = true;
    this.canSpawn = true;
  }

  preload() {}

  create() {
    // Entities
    this.P1 = this.add.rectangle(100, 500, 40, 40, 0x00ff00);
    this.bullets = this.add.container();
    this.enemies = this.add.container();
    this.explosions = this.add.container();

    // Input
    this.keys = this.input.keyboard.createCursorKeys(); // TODO: Use a helper for assign keys
    this.keys['a'] = this.input.keyboard.addKey('A');
    this.keys['s'] = this.input.keyboard.addKey('S');
    this.keys['d'] = this.input.keyboard.addKey('D');
  }

  update() {
    // Update entities
    this.enemies.each((enemy: Enemy) => enemy.update());
    this.explosions.each((explosion: Explosion) => explosion.update());

    this.bullets.each((bullet: Bullet) => {
      bullet.update();

      if (areColliding(this.P1, bullet)) {
        this.explosions.add(new Explosion(this, { x: bullet.x, y: bullet.y }));

        bullet.destroy();
      }
    });
    this.explosions.list.forEach(explosion => explosion.update());

    // Check keys
    playerController(this.keys, this.P1, this.speed);

    if (this.keys['a'].isDown && this.canSpawn) {
      this.canSpawn = false;
      const enemy = new Enemy(this, 'TopDown');
      this.enemies.add(enemy);
      this.time.delayedCall(this.cooldown * 1000, () => (this.canSpawn = true), [], this);
      console.log('Enemies:', this.enemies.list);
    }
    if (this.keys['s'].isDown && this.canSpawn) {
      this.canSpawn = false;
      const enemy = new Enemy(this, 'LeftRight');
      this.enemies.add(enemy);
      this.time.delayedCall(this.cooldown * 1000, () => (this.canSpawn = true), [], this);
      console.log('Enemies:', this.enemies.list);
    }

    if (this.keys.space.isDown && this.canFire) {
      this.canFire = false;
      const origin = { x: this.P1.x, y: this.P1.y };
      const target = { x: this.P1.x, y: 0 };
      const bullet = new Bullet(this, origin, target, this.speed * 2);
      this.bullets.add(bullet);
      this.time.delayedCall(this.cooldown * 1000, () => (this.canFire = true), [], this);
      console.log('Bullets:', this.bullets.list);
    }
  }
}
