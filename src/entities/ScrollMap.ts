import Phaser from 'phaser';

const TILESIZE = 64; //TODO: REFACTOR THIS FUCKING THING

export class ScrollMap {
  tileMap: Phaser.Tilemaps.Tilemap;
  layer: any;
  data: any;

  constructor(scene: Phaser.Scene) {
    this.tileMap = scene.make.tilemap({
      tileHeight: TILESIZE,
      tileWidth: TILESIZE,
      data: [
        [7, 8, 9, 10, 0, 0, 0, 0, 0, 8],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 2, 3, 0, 1, 1, 1, 1, 1],
        [1, 3, 0, 3, 0, 1, 1, 1, 1, 1],
        [1, 3, 2, 0, 0, 1, 1, 1, 1, 1],
        [7, 8, 9, 10, 0, 0, 0, 0, 0, 8],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 2, 3, 0, 1, 1, 1, 1, 1],
        [1, 3, 0, 3, 0, 1, 1, 1, 1, 1],
        [1, 3, 2, 0, 0, 1, 1, 1, 1, 1],
        [7, 8, 9, 10, 0, 0, 0, 0, 0, 8],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 2, 3, 0, 1, 1, 1, 1, 1],
        [1, 3, 0, 3, 0, 1, 1, 1, 1, 1],
        [1, 3, 2, 0, 0, 1, 1, 1, 1, 1],
        [7, 8, 9, 10, 0, 0, 0, 0, 0, 8],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 2, 3, 0, 1, 1, 1, 1, 1],
        [1, 3, 0, 3, 0, 1, 1, 1, 1, 1],
        [1, 3, 2, 0, 0, 1, 1, 1, 1, 1],
      ],
    });

    this.layer = this.tileMap.createLayer(0, this.tileMap.addTilesetImage('tiles'), 0, 0);
  }

  update() {
    this.layer.y++;

    if (this.layer.y % TILESIZE == 0) {
      this.layer.y = 0;
    }
  }
}
