class Camera3D {
  constructor(f, w, h, x, y, z, ax, ay) {
    this._position = {
      x: x, 
      y: y,
      z: z,
    };
    this._angle = {
      ax: ax,
      ay: ay,
    };
    this._width = null;
    this._height = null;
    this._origin = {
      x: null,
      y: null,
    };
    this.resize(w, h);
    this._focus = f;
    this._trigs = {
      cosAX: null,
      sinAX: null,
      cosAY: null,
      sinAY: null,
    };
    this._updateTrigsAX();
    this._updateTrigsAY();
  }

  resize(width, height) {
    this._width = width;
    this._height = height;
    this._origin.x = width * 0.5;
    this._origin.y = height * 0.5;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get x() {
    return this._position.x;
  }

  get y() {
    return this._position.y;
  }

  get z() {
    return this._position.z;
  }

  get angleX() {
    return this._angle.ax;
  }

  get angleY() {
    return this._angle.ay;
  }

  get focusDistance() {
    return this._focus;
  }

  set x(value) {
    this._position.x = value;
  }

  set y(value) {
    this._position.y = value;
  }

  set z(value) {
    this._position.z = value;
  }

  _updateTrigsAX() {
    let radAX = Camera3D.degToRad(this._angle.ax);
    this._trigs.cosAX = Math.cos(radAX);
    this._trigs.sinAX = Math.sin(radAX);
  }

  _updateTrigsAY() {
    let radAY = Camera3D.degToRad(this._angle.ay);
    this._trigs.cosAY = Math.cos(radAY);
    this._trigs.sinAY = Math.sin(radAY);
  }

  set angleX(value) {
    this._angle.ax = value;
    this._updateTrigsAX();
  }

  set angleY(value) {
    this._angle.ay = value;
    this._updateTrigsAY();
  }

  set focusDistance(value) {
    this._focus = value;
  }

  moveForward(dr) {
    this._position.x += this._trigs.sinAY * dr;
    this._position.z += this._trigs.cosAY * dr;
  }

  moveBackward(dr) {
    this._position.x -= this._trigs.sinAY * dr;
    this._position.z -= this._trigs.cosAY * dr;
  }

  moveRight(dr) {
    this._position.x += this._trigs.cosAY * dr;
    this._position.z -= this._trigs.sinAY * dr;
  }

  moveLeft(dr) {
    this._position.x -= this._trigs.cosAY * dr;
    this._position.z += this._trigs.sinAY * dr;
  }

  moveUp(dy) {
    this._position.y += dy;
  }

  moveDown(dy) {
    this._position.y -= dy;
  }

  pitch(ax) {
    this._angle.ax = ax;
    this._updateTrigsAX();
  }

  yaw(ay) {
    this._angle.ay = ay;
    this._updateTrigsAY();
  }

  // https://en.wikipedia.org/wiki/3D_projection#Mathematical_formula
  project(source, projection) {
    let px = source.x - this._position.x;
    let py = source.y - this._position.y;
    let pz = source.z - this._position.z;
    let cx = this._trigs.cosAX;
    let cy = this._trigs.cosAY;
    let sx = this._trigs.sinAX;
    let sy = this._trigs.sinAY;
    let ez = this._focus;

    let dx = cy * px - sy * pz;
    let dy = sx * (cy * pz + sy * px) + cx * py;
    let dz = cx * (cy * pz + sy * px) - sx * py;

    let bx = ez * dx / dz;
    let by = ez * dy / dz;

    projection.x = this._origin.x + bx;
    projection.y = this._origin.y - by;
  }
}

Camera3D.degToRad = function(degrees) {
  return Math.PI * degrees / 180.0;
};
