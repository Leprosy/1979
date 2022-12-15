import Phaser from 'phaser';
import { Bullet } from '../entities/Bullet';
import { Enemy } from '../entities/enemy';
import { Explosion } from '../entities/Explosion';
import { playerController } from '../helpers/PlayerController';

export class Stage extends Phaser.Scene {
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  P1: Phaser.GameObjects.Sprite;
  speed: number;
  bullets: Phaser.Physics.Arcade.Group;
  enemies: Phaser.Physics.Arcade.Group;
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

  preload() {
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
    // Entities
    this.P1 = this.physics.add.sprite(100, 500, 'plane', 5); //this.add.rectangle(100, 500, 40, 40, 0x00ff00);
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('plane', { frames: [0, 1] }),
      frameRate: 8,
      repeat: -1,
    });
    this.P1.play('idle');

    this.explosions = this.add.container();
    this.enemies = this.physics.add.group({ runChildUpdate: true });
    this.bullets = this.physics.add.group({ runChildUpdate: true });

    // Collissions
    this.physics.add.collider(this.P1, this.enemies, (P1, enemy) => {
      this.explosions.add(new Explosion(this, { x: (<Enemy>enemy).x, y: (<Enemy>enemy).y }));
      enemy.destroy();
    });

    this.physics.add.collider(this.P1, this.bullets, (P1, bullet) => {
      if (!(<Bullet>bullet).isFromPlayer) {
        this.explosions.add(new Explosion(this, { x: (<Bullet>bullet).x, y: (<Bullet>bullet).y }));
        bullet.destroy();
      }
    });

    // Input
    this.keys = this.input.keyboard.createCursorKeys(); // TODO: Use a helper for assign keys
    this.keys['a'] = this.input.keyboard.addKey('A');
    this.keys['s'] = this.input.keyboard.addKey('S');
    this.keys['d'] = this.input.keyboard.addKey('D');
  }

  update() {
    // Update entities
    this.explosions.each((explosion: Explosion) => explosion.update());

    // Check keys
    playerController(this.keys, this.P1, this.speed);

    if (this.keys['a'].isDown && this.canSpawn) {
      this.canSpawn = false;
      const enemy = new Enemy(this, 'TopDown');
      this.enemies.add(enemy, true);
      this.time.delayedCall(this.cooldown * 1000, () => (this.canSpawn = true), [], this);
      console.log('Enemies:', this.enemies.getChildren());
    }
    if (this.keys['s'].isDown && this.canSpawn) {
      this.canSpawn = false;
      const enemy = new Enemy(this, 'LeftRight');
      this.enemies.add(enemy, true);
      this.time.delayedCall(this.cooldown * 1000, () => (this.canSpawn = true), [], this);
      console.log('Enemies:', this.enemies.getChildren());
    }

    if (this.keys.space.isDown && this.canFire) {
      this.canFire = false;
      const origin = { x: this.P1.x, y: this.P1.y };
      const target = { x: this.P1.x, y: 0 };
      const bullet = new Bullet(this, origin, target, this.speed * 2);
      bullet.isFromPlayer = true;
      this.bullets.add(bullet, true);
      this.time.delayedCall(this.cooldown * 1000, () => (this.canFire = true), [], this);
      console.log('Bullets:', this.bullets.getChildren());
    }
  }
}
