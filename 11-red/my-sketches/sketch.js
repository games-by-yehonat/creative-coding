/** @type {CanvasRenderingContext2D} */
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

// grid
const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height); 

    const cols = 10;
    const rows = 10;
    const cells = cols * rows;

    const gridWidth = width * 0.8;
    const gridHeigth = height * 0.8;

    const cellWidth = gridWidth / cols;
    const cellHeigth = gridHeigth / rows;

    const marginX = (width - gridWidth) * 0.5;
    const marginY = (height - gridHeigth) * 0.5;

    for (let i = 0; i < cells; i++) {
      let col = i % cols;
      let row = Math.floor(i / cols);
      
      let x = col * cellWidth ;
      let y = row * cellHeigth;
      let w = cellWidth * 0.8;
      let h = cellHeigth * 0.8;

      context.save();
      context.translate(x, y);
      context.translate(marginX, marginY);
      context.translate(cellWidth * 0.5, cellHeigth * 0.5);

      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.restore();

    }

  };
};

canvasSketch(sketch, settings);
