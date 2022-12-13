import { EnemyType, EnemyDefinition } from './types';
import { Enemy } from './Enemy';
import { gameConfig } from '../../config';

export const EnemyDefinitions: Record<EnemyType, EnemyDefinition> = {
  TopDown: {
    startPosition: () => {
      return { x: Phaser.Math.RND.between(0, gameConfig.width), y: 0, angle: 180 };
    },
    update: (enemy: Enemy) => {
      enemy.y += 5;
    },
    shootChance: 50,
  },

  LeftRight: {
    startPosition: () => {
      return { x: 0, y: 10, angle: 90 };
    },
    update: (enemy: Enemy) => {
      const speed = 5;

      if (enemy.x < gameConfig.width * 0.9 && enemy.y == 10) {
        enemy.x += speed;
      }
      if (enemy.x >= gameConfig.width * 0.9 || enemy.y > 10) {
        enemy.angle = 180 + 45;
        enemy.x -= speed / 2;
        enemy.y += speed;
      }
    },
    shootChance: 90,
  },

  Kamikaze: {
    startPosition: () => {
      return { x: 0, y: 0, angle: 0 };
    },
    update: () => {},
  },
  Formation1: {
    startPosition: () => {
      return { x: 0, y: 0, angle: 0 };
    },
    update: () => {},
  },
};
