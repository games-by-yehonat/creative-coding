/** @type {CanvasRenderingContext2D} */
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 2048, 2048 ]
};

let manager;

const sketch = ({ context, width, height }) => {
  const circles = [];

  const cx = width * 0.5;
  const cy = height * 0.5;

  const amount = 16;

  let x0 = width * 0.5;
  let y0 = height * 0.5;
  let x1 = width;
  let y1 = height;

  for (let i = 0; i < amount; i++) {
    const radius = width * 0.03 * (i + 1);
    let angle = math.degToRad(random.range(0, 360));

    circles.push(new Circle(cx, cy, radius, amount, angle, i));
  }

  return ({ context, width, height }) => {
    context.fillStyle = PARAMS.background;
    context.fillRect(0, 0, width, height);

    context.lineCap = 'round';

    context.lineWidth = width * 0.01;

    let gradient = context.createRadialGradient(x0, y0 ,width * 0.75, x1, y1, width);

    gradient.addColorStop(PARAMS.offset.x, PARAMS.primary);
    gradient.addColorStop(PARAMS.offset.y, PARAMS.secondary);
    gradient.addColorStop(PARAMS.offset.z, PARAMS.tertiary);

    context.strokeStyle = gradient;

    circles.forEach(e => {
      e.draw(context);
    })
  };
};

const PARAMS = {
  background: '#F7F7F7',
  primary: '#43D8C9',
  secondary: '#95389E',
  tertiary: '#100303',
  offset: {x: 0, y: 0.5, z: 1},
}

const initPane = () => {
  const pane = new tweakpane.Pane({
    title: 'Parameters'
  });

  pane.addInput(PARAMS, 'background');

  const folderColor = pane.addFolder({
    title: 'Gradient foreground',
  });

  folderColor.addInput(PARAMS, 'primary');
  folderColor.addInput(PARAMS, 'secondary');
  folderColor.addInput(PARAMS, 'tertiary');
  folderColor.addInput(PARAMS, 'offset', {
    x: {min: 0, max: 1},
    y: {min: 0, max: 1},
    z: {min: 0, max: 1}
  });

  pane.on('change', function(ev) {
    manager.render();
  });
  folderColor.on('change', function(ev) {
    manager.render();
  });
}

const init = async () => {
  manager = await canvasSketch(sketch, settings);
}

initPane();
init();

class Circle {
  constructor(x, y, radius, amount, angle, i) {
    this.pos = new Vector(x, y);
    this.radius = radius;
    this.amount = amount;
    this.angle = angle;
    this.i = i;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.rotate(-this.angle)

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2 / ((1 + this.i / this.amount)));
    context.stroke();

    context.restore();
  }
}

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
