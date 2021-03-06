import Phaser from "phaser";
import { gameConfig } from "./config";
import { Main, Stage } from "./scenes/";

class SimpleGame {
  game: Phaser.Game;

  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      width: gameConfig.width,
      height: gameConfig.height,
      type: Phaser.AUTO,
      parent: "content",
      scene: [Main, Stage],
      title: gameConfig.title,
      version: gameConfig.version,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    this.game = new Phaser.Game(config);
  }
}

window.onload = () => {
  var game = new SimpleGame(); // TODO: Use this as a global config ?
};
