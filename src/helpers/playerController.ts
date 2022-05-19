export const playerController = (keys: Phaser.Types.Input.Keyboard.CursorKeys, player: Phaser.GameObjects.Rectangle, speed: number) => {
  if (keys.up.isDown) {
    player.y -= speed;
  }
  if (keys.down.isDown) {
    player.y += speed;
  }
  if (keys.left.isDown) {
    player.x -= speed;
  }
  if (keys.right.isDown) {
    player.x += speed;
  }
};
