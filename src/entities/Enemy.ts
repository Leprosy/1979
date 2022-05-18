import Phaser from "phaser";

export class Enemy extends Phaser.GameObjects.Rectangle {
  behavior: EnemyBehavior;

  constructor(scene: Phaser.Scene, behavior: EnemyBehavior) {
    super(scene, Math.random() * 800, 0, 40, 40, 0xff00ff);
    this.behavior = behavior;
  }

  update() {
    EnemyBehaviors[this.behavior](this);
  }
}

export type EnemyBehavior = "TopDown" | "LeftRight" | "Kamikaze" | "Formation1";

const EnemyBehaviors: Record<EnemyBehavior, (enemy: Enemy) => void> = {
  TopDown: (enemy: Enemy) => {
    const speed = 5;
    const shootChance = 1;

    enemy.y += speed;

    if (enemy.y > 600) {
      enemy.destroy();
    }

    if (shootChance < Math.random() * 100) {
      console.log("TopDown: shoot");
    }
  },
  LeftRight: (enemy: Enemy) => {
    const speedY = 1;
    const speedX = 20;
    const shootChance = 2;

    enemy.y += speedY;
    enemy.x += Math.random() * speedX * 2 - speedX;

    if (enemy.y > 600) {
      enemy.destroy();
    }

    if (shootChance < Math.random() * 100) {
      console.log("LeftRight: shoot");
    }
  },
  Kamikaze: () => {
    console.log("K");
  },
  Formation1: () => {
    console.log("F");
  },
};
