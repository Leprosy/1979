import Phaser from "phaser";
import { EnemyDefinition, EnemyType } from "./types";
import { EnemyDefinitions } from "./EnemyDefinitions";
import { Bullet } from "../Bullet";
import { isInsideScreen } from "../../helpers/screen";

export class Enemy extends Phaser.GameObjects.Rectangle {
  definition: EnemyDefinition;
  timerEvents: Phaser.Time.TimerEvent[];

  constructor(scene: Phaser.Scene, type: EnemyType) {
    super(scene, 0, 0, 40, 40, 0xff00ff);
    this.definition = EnemyDefinitions[type];

    const position = this.definition.startPosition();
    this.x = position.x;
    this.y = position.y;

    this.timerEvents = [
      this.scene.time.addEvent({
        delay: 1000, // TODO: game tics in config
        callback: () => {
          if (25 < Math.random() * 100) {
            const origin = { x: this.x, y: this.y };
            const target = { x: this.scene.P1.x, y: this.scene.P1.y };
            const bullet = new Bullet(this.scene, origin, target, 5);
            this.scene.bullets.add(bullet);
            console.log("Bullets:", this.scene.bullets.list);
          }
        },
        callbackScope: this,
        loop: true,
      }),
    ];
  }

  update() {
    this.definition.update(this);

    if (!isInsideScreen(this.x, this.y)) {
      this.destroy();
    }
  }

  destroy(fromScene?: boolean): void {
    this.timerEvents.forEach((event: Phaser.Time.TimerEvent) => event.remove());
    super.destroy();
  }
}
