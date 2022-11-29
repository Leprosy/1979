import { gameConfig } from '../config';

export const isInsideScreen = (x: number, y: number) => {
  return y >= 0 && x >= 0 && y <= gameConfig.height && x <= gameConfig.width;
};

export const areColliding = (a: any, b: any) => {
  const boundsA = a.getBounds();
  const boundsB = b.getBounds();
  return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
};
