import { Enemy } from './Enemy';

export type EnemyType = 'TopDown' | 'LeftRight' | 'Kamikaze' | 'Formation1';

export type EnemyDefinition = {
  startPosition: () => { x: number; y: number; angle: number };
  update: (enemy: Enemy) => void;
  shootChance: number;
  hp: number;
  points: number;
};

export type StageEvent = {
  enemy: EnemyType;
  number: number;
};
