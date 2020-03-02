class Point3D {
  constructor(x, y, z) {
    this._value = {
      x: x,
      y: y,
      z: z,
    };
    this._projection = {
      x: null,
      y: null,
    };
    this.updateProjection();
  }

  get x() {
    return this._value.x;
  }

  get y() {
    return this._value.y;
  }

  get z() {
    return this._value.z;
  }

  updateProjection() {
    if (Point3D.camera !== null) {
      Point3D.camera.project(this._value, this._projection);
    }
  }

  set x(value) {
    this._value.x = value;
    this.updateProjection();
  }

  set y(value) {
    this._value.y = value;
    this.updateProjection();
  }

  set z(value) {
    this._value.z = value;
    this.updateProjection();
  }

  get projectedX() {
    return this._projection.x;
  }

  get projectedY() {
    return this._projection.y;
  }

  clone() {
    return new Point3D(
      this._value.x,
      this._value.y,
      this._value.z
    );
  }
}

Point3D.camera = null;