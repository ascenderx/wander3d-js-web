class Game {
  constructor(canvas) {
    this._context = canvas.getContext('2d');
    this._width = canvas.width;
    this._height = canvas.height;
    this._timer = new IntervalTimer(this._tick.bind(this), 5);
    this._inputHdl = new InputHandler(canvas);
    this._objects = [
      new Block3D(
        // x, y, z
        0, 0, 0,
        // l, w, h
        100, 100, 100
      ),
    ];
    this._camera = new Camera3D(
      // f, w, h
      1000, canvas.width, canvas.height,
      // x, y, z
      50, 50, -200,
      // ax, ay (will be overwritten on mouse move)
      0, 0
    );
    Point3D.camera = this._camera;
    this._valid = false;
    this._dirty = true;
    this._paused = false;
    this._sweepWidth = 180.0 / (canvas.width * 0.5);
    this._sweepHeight = 90.0 / (canvas.height * 0.5);
    this._crossHair = new Crosshair(canvas.width, canvas.height);
    this._debugCallback = null;
    this._debugging = false;
  }

  _invalidate() {
    this._valid = false;
    this._dirty = true;
  }

  _validate() {
    this._valid = true;
    this._dirty = false;
  }

  _input() {
    let input = this._inputHdl;
    if (input.isButtonDown(InputHandler.BUTTON_SECONDARY)) {
      this._togglePause();
      input.debounceButton(InputHandler.BUTTON_SECONDARY);
    }
    if (this._paused) {
      return;
    }

    let mouseOX = this._inputHdl.mouseXFromOrigin;
    let mouseOY = this._inputHdl.mouseYFromOrigin;

    let camera = this._camera;
    if (input.didMouseMove) {
      camera.yaw(mouseOX * this._sweepWidth);
      camera.pitch(mouseOY * this._sweepHeight);
      input.resetMouseMoved();
      this._invalidate();
    }

    if (input.isKeyDown('w')) {
      camera.moveForward(1);
      this._invalidate();
    } else if (input.isKeyDown('s')) {
      camera.moveBackward(1);
      this._invalidate();
    }

    if (input.isKeyDown('a')) {
      camera.moveLeft(1);
      this._invalidate();
    } else if (input.isKeyDown('d')) {
      camera.moveRight(1);
      this._invalidate();
    }

    if (input.isKeyDown('Shift')) {
      camera.moveDown(1);
      this._invalidate();
    } else if (input.isKeyDown(' ')) {
      camera.moveUp(1);
      this._invalidate();
    }
  }

  _togglePause() {
    this._paused = !this._paused;
    this._invalidate();
  }

  pause() {
    this._paused = true;
    this._invalidate();
  }

  resume() {
    this._paused = false;
    this._invalidate();
  }

  _update() {
    if (!this._valid) {
      for (let object of this._objects) {
        object.update();
      }
    }
  }

  _debug() {
    if (this._debugCallback) {
      this._debugCallback();
    }
  }

  attachDebugListener(callback) {
    this._debugCallback = callback;
  }

  _draw() {
    this._crossHair.state = !this._paused;
    if (this._dirty) {
      // Clear.
      this._context.clearRect(0, 0, this._width, this._height);

      // Draw objects.
      for (let object of this._objects) {
        object.draw(this._context);
      }
    
      this._crossHair.draw(this._context);
    }
  }

  _tick() {
    this._input();
    this._update();
    this._draw();
    this._validate();
    if (this._debugging) {
      this._debug();
    }
  }

  set allowDebugging(value) {
    this._debugging = value;
  }

  start() {
    this._timer.start();
  }

  resize(width, height) {
    this._width = width;
    this._height = height;
    this._inputHdl.resize(width, height);
    this._camera.resize(width, height);
    this._crossHair.recenter(width, height);
    this._invalidate();
  }
}