import Phaser from "phaser";
import { Main, Stage } from "./scenes/";

class SimpleGame {
  game: Phaser.Game;

  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      width: 800,
      height: 600,
      type: Phaser.AUTO,
      parent: "content",
      scene: [Main, Stage],
      title: "A Game",
      version: "0.1",
    };

    this.game = new Phaser.Game(config);
  }
}

window.onload = () => {
  var game = new SimpleGame();
};
