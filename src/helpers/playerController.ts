import { isInsideScreen } from './screen';

export const playerController = (
  keys: Phaser.Types.Input.Keyboard.CursorKeys,
  player: Phaser.GameObjects.Rectangle,
  speed: number
) => {
  let nx = player.x;
  let ny = player.y;
  if (keys.up.isDown) {
    ny -= speed;
  }
  if (keys.down.isDown) {
    ny += speed;
  }
  if (keys.left.isDown) {
    nx -= speed;
  }
  if (keys.right.isDown) {
    nx += speed;
  }

  if (isInsideScreen(nx, ny)) {
    player.setPosition(nx, ny);
  }
};
