import Phaser from 'phaser';
import { StageEvent } from './enemy/types';

const TILESIZE = 64; //TODO: REFACTOR THIS FUCKING THING
const MAPWIDTH = 10;
export class ScrollMap {
  tileMap: Phaser.Tilemaps.Tilemap;
  layer: Phaser.Tilemaps.TilemapLayer;
  events: Record<number, StageEvent>;
  mapLength: number;

  constructor(scene: Phaser.Scene, data: any) {
    this.tileMap = scene.make.tilemap({
      tileHeight: TILESIZE,
      tileWidth: TILESIZE,
      data: data.map,
    });

    this.layer = this.tileMap.createLayer(
      0,
      this.tileMap.addTilesetImage('tiles'),
      0,
      -(data.map.length - 12) * TILESIZE
    );
    console.log(this.layer);
    this.events = data.events;
    this.mapLength = data.map.length;
  }

  update() {
    this.layer.y++;

    if (this.layer.y == 0) {
      this.layer.y = -TILESIZE;
      let firstRow: number[] = [];

      for (let j = this.mapLength - 1; j > 0; --j) {
        for (let i = 0; i < MAPWIDTH; ++i) {
          let tile = this.layer.getTileAt(i, j);
          let prevTile = this.layer.getTileAt(i, j - 1);

          if (j == this.mapLength - 1) {
            firstRow.push(tile.index);
          }

          tile.index = prevTile.index;
        }
      }

      for (let i = 0; i < MAPWIDTH; ++i) {
        this.layer.getTileAt(i, 0).index = firstRow[i];
      }
    }
  }
}
