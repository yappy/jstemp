import * as game from "./game/game";
import * as util from "./util/util";

util.assert(true);

class MyGame extends game.GameApplication {
  constructor(canvas) {
    const imgList = {
      img1: "./img/yappy_house_mini.jpg",
      img2: "./img/yappy_house_mini2.jpg"
    };
    const audioList = {};

    super(canvas, 60, imgList, audioList);
  }

  update() {
    super.update();
  }

  render(ctx) {
    super.render(ctx);
    this.renderClear();
    this.renderFps();

    ctx.drawImage(this.getImage("img1"), 100, 100, 100, 100);
  }
}

window.addEventListener("DOMContentLoaded", ()=> {
  const canvas = document.getElementById("gamemain");

  const app = new MyGame(canvas);
  app.run();
});
