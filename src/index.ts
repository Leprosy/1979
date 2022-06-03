import Phaser from "phaser";
import { Main, Stage } from "./scenes/";

class SimpleGame {
  game: Phaser.Game;

  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      width: 600,
      height: 800,
      type: Phaser.AUTO,
      parent: "content",
      scene: [Main, Stage],
      title: "A Game",
      version: "0.1",
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    this.game = new Phaser.Game(config);
  }
}

window.onload = () => {
  var game = new SimpleGame();
};
