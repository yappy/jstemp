export class GameApplication {
  constructor(canvas, fps) {
    this.canvas_ = canvas;
    this.context_ = canvas.getContext("2d");
    this.fps_ = fps;
    this.frameMs_ = 1000 / fps;

    this.frameCount_ = 0;
    this.baseTime_ = new Date().getTime();
    this.printFps_ = 0.0;
  }

  update() {
    this.frameCount_++;
    if (this.frameCount_ >= this.fps_) {
      const now = new Date().getTime();
      this.printFps_ = this.frameCount_ / (now - this.baseTime_) * 1000.0;
      this.baseTime_ = now;
      this.frameCount_ = 0;
    }
  }

  render() {
    const ctx = this.context_;
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(0, 0, this.canvas_.width, this.canvas_.height);
    if (this.frameCount_ == 0) {
      console.log(this.printFps_);
    }
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
    const start = new Date().getTime();
    this.frame_(start);
  }
}
