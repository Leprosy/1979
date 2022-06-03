import { gameConfig } from "../config";

export const isInsideScreen = (x: number, y: number) => {
  return y >= 0 && x >= 0 && y <= gameConfig.height && x <= gameConfig.width;
};
