import * as game from "./game/game";
import * as util from "./util/util";

util.assert(true);

window.addEventListener("DOMContentLoaded", ()=> {
  const canvas = document.getElementById("gamemain");
  const app = new game.GameApplication(canvas, 60);
  app.run();
});
