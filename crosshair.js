class Crosshair {
  constructor(screenWidth, screenHeight, width, height) {
    this._width = width;
    this._height = height;
    this._origin = {
      x: null,
      y: null,
    };
    this.recenter(screenWidth, screenHeight);
    this._colorA = '#00ff00';
    this._colorB = '#ff0000';
    this._colorState = true;
  }

  recenter(screenWidth, screenHeight) {
    this._origin.x = screenWidth * 0.5;
    this._origin.y = screenHeight * 0.5;
  }

  draw(context) {
    context.strokeStyle = this.color;
    context.beginPath();
    // Vertical.
    context.moveTo(this._origin.x, this._origin.y - 20);
    context.lineTo(this._origin.x, this._origin.y + 20);
    // Horizontal.
    context.moveTo(this._origin.x - 20, this._origin.y);
    context.lineTo(this._origin.x + 20, this._origin.y);
    context.stroke();
  }

  set state(value) {
    this._colorState = value;
  }

  get color() {
    return (this._colorState) ? this._colorA : this._colorB;
  }
}