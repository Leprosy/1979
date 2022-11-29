import { EnemyType, EnemyDefinition } from './types';
import { Enemy } from './Enemy';
import { gameConfig } from '../../config';

export const EnemyDefinitions: Record<EnemyType, EnemyDefinition> = {
  TopDown: {
    startPosition: () => {
      return { x: Phaser.Math.RND.between(0, gameConfig.width), y: 0 };
    },
    update: (enemy: Enemy) => {
      const speed = 5;
      const shootChance = 1;
      enemy.y += speed;
    },
  },

  LeftRight: {
    startPosition: () => {
      return { x: 0, y: 10 };
    },
    update: (enemy: Enemy) => {
      const speed = 5;
      const shootChance = 2;

      if (enemy.x < gameConfig.width * 0.9 && enemy.y == 10) {
        enemy.x += speed;
      }
      if (enemy.x >= gameConfig.width * 0.9 || enemy.y > 10) {
        enemy.x -= speed / 2;
        enemy.y += speed;
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
