/** @type {CanvasRenderingContext2D} */
const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const degToRad = (degrees) => {
  return degrees / 180 * Math.PI;
}

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

      let slice = degToRad(360 / amount);
      let angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      //transformations
      context.save(); // saves the state of the current context
      context.translate(x, y);

      // var angle = 45;
      context.rotate(-angle);

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore(); // returns previously saved path state and attributes
    }    
  };
};

canvasSketch(sketch, settings);
