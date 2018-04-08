import * as util from "../util/util";

export class GameApplication {
  constructor(canvas, fps, imgList, audioList) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.fps_ = fps;
    this.frameMs_ = 1000 / fps;
    this.res_ = new ResourceManager(imgList, audioList);

    this.printFps = "0.0";
    this.frameCount_ = 0;
    this.baseTime_ = new Date().getTime();
  }

  getImage(key) {
    return this.res_.getImage(key);
  }

  getAudio(key) {
    return this.res_.getAudio(key);
  }

  update() {}

  render(ctx) {}

  renderClear(fillStyle) {
    const ctx = this.context;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.fillStyle = fillStyle ? fillStyle : "#000000";
    ctx.fillRect(0, 0, w, h);
  }

  renderFps(fillStyle, font) {
    const ctx = this.context;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.fillStyle = fillStyle ? fillStyle : "#FFFFFF";
    ctx.font = font ? font : "10px serif";
    ctx.fillText(this.printFps, w - 30, h - 10);
  }

  updateInternal_() {
    this.frameCount_++;
    if (this.frameCount_ >= this.fps_) {
      const now = new Date().getTime();
      const fps = this.frameCount_ / (now - this.baseTime_) * 1000.0;
      this.printFps = fps.toFixed(1);
      this.baseTime_ = now;
      this.frameCount_ = 0;
    }
    this.update();
  }

  renderInternal_() {
    this.render(this.context);
  }

  frame_(startMs) {
    this.updateInternal_();
    this.renderInternal_();
    const now = new Date().getTime();
    const nextStart = Math.max(startMs + this.frameMs_, now);
    const timeout = nextStart - now;
    window.setTimeout(() => this.frame_(nextStart), timeout);
  }

  run() {
    this.res_.load(() => {
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

  getImage(key) {
    return this.img_[key];
  }

  getAudio(key) {
    return this.audio_[key];
  }
}
