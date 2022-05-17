import Phaser from "phaser";
import { Bullet } from "../entities/Bullet";

export class Stage extends Phaser.Scene {
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  P1: Phaser.GameObjects.Rectangle;
  speed: number;
  bullets: Phaser.GameObjects.Container;
  enemies: Phaser.GameObjects.Container;
  cooldown: number;
  canFire: boolean;

  constructor() {
    super("Stage");
    this.speed = 5;
    this.cooldown = 0.5;
    this.canFire = true;
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

    /* const logo = this.add.image(400, 100, "logo");
    const text1 = this.add.bitmapText(400, 200, "font", this.game.config.gameTitle).setOrigin(0.5);
    const text2 = this.add.bitmapText(400, 300, "font", "We are in\nthe first stage").setOrigin(0.5).setTint(0x0000dd).setCenterAlign();
    this.keys["space"] = this.input.keyboard.addKey("SPACE"); */
  }

  update() {
    // Move bullets
    this.bullets.list.forEach((bullet) => bullet.update());

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

    if (this.keys.a.isDown) {
      console.log("OAW");
    }
    if (this.keys.s.isDown) {
      console.log("OAW");
    }

    if (this.keys.space.isDown && this.canFire) {
      this.canFire = false;
      const bullet = new Bullet(this, this.P1.x, this.P1.y, this.speed * 2);
      this.bullets.add(bullet);
      this.time.delayedCall(this.cooldown * 1000, () => (this.canFire = true), [], this);
      console.log("OAW", this.bullets.list);
    }
  }
}
