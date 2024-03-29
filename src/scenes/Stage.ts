import Phaser from 'phaser'; // TODO: entities imports in one line?
import { Bullet } from '../entities/Bullet';
import { Enemy } from '../entities/enemy';
import { StageEvent } from '../entities/enemy/types';
import { Explosion } from '../entities/Explosion';
import { Player } from '../entities/Player';
import { ScrollMap } from '../entities/ScrollMap';
import { playerController } from '../helpers/PlayerController';

export class Stage extends Phaser.Scene {
  //TODO move this to a definition(same with Enemy, Player, Bullet, etc)?
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  P1: Player;
  speed: number;
  bullets: Phaser.Physics.Arcade.Group;
  enemies: Phaser.Physics.Arcade.Group;
  explosions: Phaser.GameObjects.Container;
  cooldown: number;
  canFire: boolean;
  canSpawn: boolean;
  hud: Phaser.GameObjects.BitmapText;
  score: number;
  level: number;
  scrollMap: ScrollMap;
  generators: StageEvent[];

  constructor() {
    super('Stage');
    this.level = 1;
    this.speed = 5;
    this.cooldown = 0.2;
    this.canFire = true;
    this.canSpawn = true;
    console.log('OAW stage const', this);
  }

  preload() {}

  create() {
    // Events
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        console.log('Generators', this.generators);
        const time = Math.floor(this.time.now / 1000);

        if (this.scrollMap.events[time] != undefined) {
          console.log('StageEvent added', this.scrollMap.events[time]);
          this.generators.push(this.scrollMap.events[time]);
        }

        this.generators.forEach((item: StageEvent) => {
          if (item.number-- > 0) {
            this.enemies.add(new Enemy(this, item.enemy), true);
            console.log('Enemies:', this.enemies.getChildren());
          }

          this.generators = this.generators.filter((item: StageEvent) => item.number > 0);
        });
      },
    });

    // Entities
    this.scrollMap = new ScrollMap(this, this.cache.json.get(`jsonMap${this.level}`));
    this.P1 = this.physics.add.existing(new Player(this));
    this.explosions = this.add.container();
    this.enemies = this.physics.add.group({ runChildUpdate: true });
    this.bullets = this.physics.add.group({ runChildUpdate: true });
    this.generators = [];

    // Collissions
    this.physics.add.collider(this.P1, this.enemies, (P1, enemy) => {
      if (P1.isDead() || enemy.isDead()) return;

      this.explosions.add(new Explosion(this, { x: (<Enemy>enemy).x, y: (<Enemy>enemy).y }));
      (<Player>P1).hp -= (<Enemy>enemy).hp;
      this.score += (<Enemy>enemy).points;
      (<Enemy>enemy).hp = 0;
    });

    this.physics.add.collider(this.P1, this.bullets, (P1, bullet) => {
      if (P1.isDead()) return;

      if (!(<Bullet>bullet).isFromPlayer) {
        this.explosions.add(new Explosion(this, { x: (<Bullet>bullet).x, y: (<Bullet>bullet).y }));
        (<Player>P1).hp--;
        bullet.destroy();
      }
    });

    this.physics.add.collider(this.enemies, this.bullets, (enemy, bullet) => {
      if ((<Bullet>bullet).isFromPlayer && !enemy.isDead()) {
        this.explosions.add(new Explosion(this, { x: (<Bullet>bullet).x, y: (<Bullet>bullet).y }));
        bullet.destroy();
        this.score += (<Enemy>enemy).points;
        (<Enemy>enemy).hp--;
      }
    });

    // Input
    this.keys = this.input.keyboard.createCursorKeys(); // TODO: Use a helper for assign keys
    this.keys['a'] = this.input.keyboard.addKey('A');
    this.keys['s'] = this.input.keyboard.addKey('S');
    this.keys['d'] = this.input.keyboard.addKey('D');

    // HUD
    this.hud = this.add.bitmapText(10, 10, 'font', this.game.config.gameTitle).setOrigin(0);
    this.score = 0;

    console.log('OAW stage create', this);
  }

  update() {
    // Update entities
    this.explosions.each((explosion: Explosion) => explosion.update());
    this.P1.update();
    this.scrollMap.update();

    // Hud
    this.hud.text = `HP:${this.P1.hp} - Score:${this.score}`;

    // Check keys
    if (!this.P1.isDead()) playerController(this.keys, this.P1, this.speed);

    if (this.keys.space.isDown && this.canFire && !this.P1.isDead()) {
      this.canFire = false;
      const origin = { x: this.P1.x, y: this.P1.y }; // TODO: pass actors to the bullet constructor
      const target = { x: this.P1.x, y: 0 }; // TODO: if no target, fire in the facing angle
      const bullet = new Bullet(this, origin, target, this.speed * 2);
      bullet.isFromPlayer = true;
      this.bullets.add(bullet, true);
      this.time.delayedCall(this.cooldown * 1000, () => (this.canFire = true), [], this);
      console.log('Bullets:', this.bullets.getChildren());
    }

    // Debug only
    if (this.keys.a.isDown) {
      this.level++;
      this.scene.start('Inter', { level: this.level });
    }
  }
}
