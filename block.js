class Block3D extends Object3D {
  constructor(x, y, z, l, w, h) {
    super(x, y, z);
    this._length = l;
    this._width = w;
    this._height = h;
    this._color = 'white';
    this._corners = [
      new Point3D(x, y, z),
      new Point3D(x + w, y, z),
      new Point3D(x, y + h, z),
      new Point3D(x, y, z + l),
      new Point3D(x + w, y + h, z),
      new Point3D(x, y + h, z + l),
      new Point3D(x + w, y, z + l),
      new Point3D(x + w, y + h, z + l),
    ];
    this._faces = [
      {start: 0, next: [1, 4, 2, 0,],},
      {start: 0, next: [3, 5, 2,],},
      {start: 1, next: [6, 7, 4,],},
      {start: 6, next: [3,],},
      {start: 7, next: [5,],},
    ];
  }

  set color(value) {
    this._color = value;
  }

  draw(context) {
    context.strokeStyle = this._color;
    context.lineWidth = 2;
    context.beginPath();
    for (let face of this._faces) {
      let cornerStart = this._corners[face.start];
      context.moveTo(cornerStart.projectedX, cornerStart.projectedY);

      for (let indexNext of face.next) {
        let cornerNext = this._corners[indexNext];
        context.lineTo(cornerNext.projectedX, cornerNext.projectedY);
      }
    }
    context.stroke();
  }

  update() {
    for (let corner of this._corners) {
      corner.updateProjection();
    }
  }
}