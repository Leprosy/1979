import Phaser from "phaser";
import { EnemyDefinition, EnemyType } from "./types";
import { EnemyDefinitions } from "./EnemyDefinitions";
import { gameConfig } from "../../config";
import { Bullet } from "../Bullet";

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
        delay: 1000,
        callback: () => {
          console.log("Trying to fire");
          if (25 < Math.random() * 100) {
            console.log("Bang");
            const origin = { x: this.x, y: this.y };
            const target = { x: this.x, y: gameConfig.height };
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
  }

  destroy(fromScene?: boolean): void {
    this.timerEvents.forEach((event: Phaser.Time.TimerEvent) => event.remove());
    super.destroy();
  }
}
