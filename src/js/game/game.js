export class GameApplication {
  constructor(canvas, fps) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.fps_ = fps;
    this.frameMs_ = 1000 / fps;

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
    const start = new Date().getTime();
    this.frame_(start);
  }
}
