class IntervalTimer {
  constructor(callback, interval) {
    this._callback = callback;
    this._interval = interval;
    this._handle = null;
    this._previous = 0;
  }

  _update() {
    this._handle = window.requestAnimationFrame(this._tick.bind(this));
  }

  _clear() {
    window.cancelAnimationFrame(this._handle);
    this._handle = null;
    this._previous = 0;
  }

  _tick(timestamp) {
    let elapsed = timestamp - this._previous;
    if (elapsed >= this._interval) {
      this._callback();
      this._previous = timestamp;
    }

    this._update();
  }

  start() {
    if (this._handle === null) {
      this._update();
    }
  }

  stop() {
    if (this._handle !== null) {
      this._clear();
    }
  }
}