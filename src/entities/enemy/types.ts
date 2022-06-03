import { Enemy } from "./Enemy";

export type EnemyType = "TopDown" | "LeftRight" | "Kamikaze" | "Formation1";

export type EnemyDefinition = {
  startPosition: () => { x: number; y: number };
  update: (enemy: Enemy) => void;
};
