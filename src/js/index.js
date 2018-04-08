import * as game from "./game/game";
import * as util from "./util/util";

util.assert(true);

window.addEventListener("DOMContentLoaded", ()=> {
  const canvas = document.getElementById("gamemain");
  const imgList = {
    img1: "./img/yappy_house_mini.jpg",
    img2: "./img/yappy_house_mini2.jpg"
  };
  const audioList = {};

  const app = new game.GameApplication(canvas, 60, imgList, audioList);
  app.run();
});
