import Phaser from "phaser";
import { EnemyBehavior } from "./constants";
import { EnemyBehaviors } from "./EnemyBehaviors";

export class Enemy extends Phaser.GameObjects.Rectangle {
  behavior: EnemyBehavior;
  timerEvents: Phaser.Time.TimerEvent[];

  constructor(scene: Phaser.Scene, behavior: EnemyBehavior) {
    super(scene, Math.random() * 800, 0, 40, 40, 0xff00ff);
    this.behavior = behavior;

    this.timerEvents = [
      this.scene.time.addEvent({
        delay: 1000,
        callback: () => {
          console.log("Trying to fire");
          if (25 < Math.random() * 100) console.log("Bang");
        },
        callbackScope: this,
        loop: true,
      }),
    ];
  }

  update() {
    EnemyBehaviors[this.behavior](this);
  }
  destroy(fromScene?: boolean): void {
    this.timerEvents.forEach((event: Phaser.Time.TimerEvent) => event.remove());
  }
}
