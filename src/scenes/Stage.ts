import Phaser from "phaser";
import { Bullet } from "../entities/Bullet";
import { Enemy, EnemyBehavior } from "../entities/Enemy";

export class Stage extends Phaser.Scene {
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  P1: Phaser.GameObjects.Rectangle;
  speed: number;
  bullets: Phaser.GameObjects.Container;
  enemies: Phaser.GameObjects.Container;
  cooldown: number;
  canFire: boolean;
  canSpawn: boolean;

  constructor() {
    super("Stage");
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

    // Input
    this.keys = this.input.keyboard.createCursorKeys();
    this.keys["a"] = this.input.keyboard.addKey("A");
    this.keys["s"] = this.input.keyboard.addKey("S");
  }

  update() {
    // Move bullets
    this.bullets.list.forEach((bullet) => bullet.update());
    this.enemies.list.forEach((enemy) => enemy.update());

    // Check keys
    if (this.keys.up.isDown) {
      this.P1.y -= this.speed;
    }
    if (this.keys.down.isDown) {
      this.P1.y += this.speed;
    }
    if (this.keys.left.isDown) {
      this.P1.x -= this.speed;
    }
    if (this.keys.right.isDown) {
      this.P1.x += this.speed;
    }

    if (this.keys.a.isDown && this.canSpawn) {
      this.canSpawn = false;
      const enemy = new Enemy(this, "TopDown");
      this.enemies.add(enemy);
      this.time.delayedCall(this.cooldown * 1000, () => (this.canSpawn = true), [], this);
      console.log("Enemies:", this.enemies.list);
    }
    if (this.keys.s.isDown && this.canSpawn) {
      this.canSpawn = false;
      const enemy = new Enemy(this, "LeftRight");
      this.enemies.add(enemy);
      this.time.delayedCall(this.cooldown * 1000, () => (this.canSpawn = true), [], this);
      console.log("Enemies:", this.enemies.list);
    }

    if (this.keys.space.isDown && this.canFire) {
      this.canFire = false;
      const bullet = new Bullet(this, this.P1.x, this.P1.y, this.speed * 2);
      this.bullets.add(bullet);
      this.time.delayedCall(this.cooldown * 1000, () => (this.canFire = true), [], this);
      console.log("Bullets:", this.bullets.list);
    }
  }
}
