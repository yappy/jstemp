import * as game from "./game/game";
import * as util from "./util/util";

util.assert(true);

window.onload = () => {
  const canvas = document.getElementById("gamemain");
  const app = new game.GameApplication(canvas, 30);
  app.run();
}
