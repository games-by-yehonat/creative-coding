/** @type {CanvasRenderingContext2D} */
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

// const degToRad = (degrees) => {
//   return degrees / 180 * Math.PI;
// }

// const randomRange = (min, max) => {
//   return Math.random() * (max - min) + min;
// }

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    let x, y;

    const amount = 12;
    const radius = width * 0.3;

    for (let i = 0; i < amount; i++) {

      let slice = math.degToRad(360 / amount);
      let angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      // lines
      //transformations
      context.save(); // saves the state of the current context
      context.translate(x, y);

      // var angle = 45;
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

      context.beginPath();
      context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore(); // returns previously saved path state and attributes
      // lines

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(-8, 1), slice * random.range(1, 5));
      context.stroke();


      context.restore();
    }    
  };
};

canvasSketch(sketch, settings);
