import * as util from "../util/util";

export class GameApplication {
  constructor(canvas, fps, imgList, audioList) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.fps_ = fps;
    this.frameMs_ = 1000 / fps;
    this.res = new ResourceManager(imgList, audioList);

    this.frameCount_ = 0;
    this.baseTime_ = new Date().getTime();
    this.printFps_ = "0.0";
  }

  update() {
    this.frameCount_++;
    if (this.frameCount_ >= this.fps_) {
      const now = new Date().getTime();
      const fps = this.frameCount_ / (now - this.baseTime_) * 1000.0;
      this.printFps_ = fps.toFixed(1);
      this.baseTime_ = now;
      this.frameCount_ = 0;
    }
  }

  render() {
    const ctx = this.context;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.fillStyle = "#0000FF";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "10px serif";
    ctx.fillText(this.printFps_, w - 30, h - 10);
  }

  frame_(startMs) {
    this.update();
    this.render();
    const now = new Date().getTime();
    const nextStart = Math.max(startMs + this.frameMs_, now);
    const timeout = nextStart - now;
    window.setTimeout(() => this.frame_(nextStart), timeout);
  }

  run() {
    this.res.load(() => {
      const start = new Date().getTime();
      this.frame_(start);
    });
  }
}

class ResourceManager {
  constructor(imgList, audioList) {
    this.img_ = {};
    this.imgCount_ = 0;
    for (const key in imgList) {
      this.img_ [key] = {
        image:  new Image(),
        src:    imgList[key],
      };
      this.imgCount_++;
    }

    this.audio_ = {};
    this.audioCount_ = 0;
    for (const key in audioList) {
      this.audio_[key] = {
        audio:  new Audio(),
        src:    audioList[key],
      };
      this.audioCount_++;
    }
  }

  load(then) {
    let loaded = 0;
    const loadNum = this.imgCount_ + this.audioCount_;
    const onLoad = () => {
      loaded++;
      util.assert(loaded <= loadNum);
      console.log(loaded + "/" + loadNum);
      if (loaded >= loadNum) {
        console.log("Loading complete!");
        then();
      }
    };

    for (const key in this.img_) {
      const entry = this.img_[key];
      // Set EventListener before setting src
      entry.image.addEventListener("load", onLoad);
      entry.image.addEventListener("load", () => {
        console.log("Load image: " + entry.src);
      });
      entry.image.addEventListener("error", () => {
        console.log("Load error image: " + entry.src);
      });
      entry.image.src = entry.src;
    }
  }

  getImage() {

  }

  getAudio() {

  }
}
