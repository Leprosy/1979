import { EnemyBehavior } from "./constants";
import { Enemy } from "./Enemy";

export const EnemyBehaviors: Record<EnemyBehavior, (enemy: Enemy) => void> = {
  TopDown: (enemy: Enemy) => {
    const speed = 5;
    const shootChance = 1;

    enemy.y += speed;

    if (enemy.y > 600) {
      enemy.destroy();
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
  },
  Kamikaze: () => {
    console.log("K");
  },
  Formation1: () => {
    console.log("F");
  },
};
