class Object3D {
  constructor(x, y, z) {
    this._position = new Point3D(x, y, z);
  }

  get position() {
    return this._position;
  }

  // Override this.
  draw(context) {}

  // Override this.
  update() {}
}