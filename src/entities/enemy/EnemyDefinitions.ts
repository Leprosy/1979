import { EnemyType, EnemyDefinition } from "./types";
import { Enemy } from "./Enemy";
import { gameConfig } from "../../config";

export const EnemyDefinitions: Record<EnemyType, EnemyDefinition> = {
  TopDown: {
    startPosition: () => {
      return { x: Phaser.Math.RND.between(0, gameConfig.width), y: 0 };
    },
    update: (enemy: Enemy) => {
      const speed = 5;
      const shootChance = 1;

      enemy.y += speed;

      if (enemy.y > gameConfig.height) {
        enemy.destroy();
      }
    },
  },

  LeftRight: {
    startPosition: () => {
      return { x: Phaser.Math.RND.between(0, gameConfig.width), y: 0 };
    },
    update: (enemy: Enemy) => {
      const speedY = 1;
      const speedX = 20;
      const shootChance = 2;

      enemy.y += speedY;
      enemy.x += Math.random() * speedX * 2 - speedX;

      if (enemy.y > gameConfig.height) {
        enemy.destroy();
      }
    },
  },

  Kamikaze: {
    startPosition: () => {
      return { x: 0, y: 0 };
    },
    update: () => {},
  },
  Formation1: {
    startPosition: () => {
      return { x: 0, y: 0 };
    },
    update: () => {},
  },
};
