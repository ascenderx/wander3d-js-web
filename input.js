class InputHandler {
  constructor(element) {
    this._keys = {};
    this._mouse = {
      x: 0,
      y: 0,
      ox: 0,
      oy: 0,
      moved: false,
      buttons: {},
    };
    this._origin = {
      x: null,
      y: null,
    };
    this.resize(element.offsetWidth, element.offsetHeight);

    element.addEventListener('mouseenter', (event) => {
      this.onMouseMove(event.clientX, event.clientY);
    });

    element.addEventListener('mousemove', (event) => {
      this.onMouseMove(event.clientX, event.clientY);
    });

    window.addEventListener('mousedown', (event) => {
      event.preventDefault();
      this.onMouseDown(event.button);
      this.onMouseMove(event.clientX, event.clientY);
    });

    window.addEventListener('mouseup', (event) => {
      event.preventDefault();
      this.onMouseUp(event.button);
      this.onMouseMove(event.clientX, event.clientY);
    });

    window.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    window.addEventListener('keydown', (event) => {
      this.onKeyDown(event.key);
    });

    window.addEventListener('keyup', (event) => {
      this.onKeyUp(event.key);
    });
  }

  resize(width, height) {
    this._origin.x = width * 0.5;
    this._origin.y = height * 0.5;
  }

  get mouseX() {
    return this._mouse.x;
  }

  get mouseY() {
    return this._mouse.y;
  }

  get mouseXFromOrigin() {
    return this._mouse.ox;
  }
  
  get mouseYFromOrigin() {
    return this._mouse.oy;
  }

  get didMouseMove() {
    return this._mouse.moved;
  }

  onMouseMove(x, y) {
    this._mouse.moved = true;
    this._mouse.x = x;
    this._mouse.y = y;
    this._mouse.ox = x - this._origin.x;
    this._mouse.oy = y - this._origin.y;
  }

  onMouseDown(button) {
    if (!(button in this._mouse.buttons)) {
      this._mouse.buttons[button] = true;
    }
  }

  onMouseUp(button) {
    if (button in this._mouse.buttons) {
      delete this._mouse.buttons[button];
    }
  }

  debounceButton(button) {
    if (button in this._mouse.buttons) {
      this._mouse.buttons[button] = false;
    }
  }

  isButtonDown(button) {
    return (button in this._mouse.buttons) && (this._mouse.buttons[button]);
  }

  onKeyDown(key) {
    if (!(key in this._keys)) {
      this._keys[key] = true;
    }
  }

  onKeyUp(key) {
    if (key in this._keys) {
      delete this._keys[key];
    }
  }

  debounceKey(key) {
    if (key in this._keys) {
      this._keys[key] = false;
    }
  }

  resetMouseMoved() {
    this._mouse.moved = false;
  }

  isKeyDown(key) {
    return (key in this._keys) && (this._keys[key]);
  }
}

InputHandler.BUTTON_PRIMARY = 0;
InputHandler.BUTTON_AUXILIARY = 1;
InputHandler.BUTTON_SECONDARY = 2;
InputHandler.BUTTON_BACK = 3;
InputHandler.BUTTON_FORWARD = 4;