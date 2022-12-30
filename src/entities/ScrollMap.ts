import Phaser from 'phaser';

const TILESIZE = 64; //TODO: REFACTOR THIS FUCKING THING
const MAPWIDTH = 10;
const DATA = [
  [7, 8, 9, 10, 0, 0, 0, 0, 0, 8],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [1, 1, 2, 3, 0, 1, 1, 1, 1, 1],
  [1, 3, 0, 3, 0, 1, 1, 1, 1, 1],
  [1, 3, 2, 0, 0, 1, 1, 1, 1, 1],
  [7, 8, 9, 10, 0, 0, 0, 0, 0, 8],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [1, 1, 2, 3, 0, 8, 1, 1, 1, 1],
  [1, 3, 0, 3, 0, 1, 1, 1, 1, 1],
  [1, 3, 2, 0, 0, 1, 1, 1, 1, 1],
  [7, 8, 9, 10, 0, 12, 0, 0, 0, 8],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [1, 1, 2, 3, 0, 1, 1, 1, 1, 1],
  [1, 5, 0, 3, 0, 1, 1, 1, 1, 1],
  [1, 5, 5, 5, 5, 1, 1, 1, 1, 1],
  [7, 5, 5, 5, 5, 0, 0, 0, 0, 8],
  [4, 4, 4, 0, 5, 1, 1, 1, 1, 1],
  [8, 9, 10, 11, 0, 1, 1, 1, 1, 1],
  [12, 13, 14, 15, 0, 1, 1, 1, 1, 1],
  [12, 5, 5, 0, 0, 1, 1, 1, 1, 1],
];

export class ScrollMap {
  tileMap: Phaser.Tilemaps.Tilemap;
  layer: Phaser.Tilemaps.TilemapLayer;
  data: any;

  constructor(scene: Phaser.Scene) {
    this.tileMap = scene.make.tilemap({
      tileHeight: TILESIZE,
      tileWidth: TILESIZE,
      data: DATA,
    });

    this.layer = this.tileMap.createLayer(0, this.tileMap.addTilesetImage('tiles'), 0, -(DATA.length - 12) * TILESIZE);
    console.log(this.layer);
  }

  update() {
    this.layer.y++;

    if (this.layer.y == 0) {
      this.layer.y = -TILESIZE;
      let firstRow: number[] = [];

      for (let j = DATA.length - 1; j > 0; --j) {
        for (let i = 0; i < MAPWIDTH; ++i) {
          let tile = this.layer.getTileAt(i, j);
          let prevTile = this.layer.getTileAt(i, j - 1);

          if (j == DATA.length - 1) {
            firstRow.push(tile.index);
          }

          tile.index = prevTile.index;
        }
      }

      console.log(firstRow);

      for (let i = 0; i < MAPWIDTH; ++i) {
        this.layer.getTileAt(i, 0).index = firstRow[i];
      }
    }
  }
}
