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
  frame() {
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
  run() {
    const start = new Date().getTime();
    this.frame();
    this.render();
    const now = new Date().getTime();
    const timeout = Math.max(0, this.frameMs_ - (now - start));
    window.setTimeout(() => this.run(), timeout);
  }
}
