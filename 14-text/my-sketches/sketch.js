/** @type {CanvasRenderingContext2D} */
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

// grid
const settings = {
  dimensions: [ 1080, 1080 ]
};

let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    // context.font = fontSize + 'px ' + fontFamily;
    context.font = `${fontSize}px ${fontFamily}`;
    // context.font = '1200px serif';
    // context.textBaseline = 'middle';
    // context.textAlign = 'center';
    context.textBaseline = 'top';

    

    const metrics = context.measureText(text);
    // console.log(metrics);

    const metricsX = metrics.actualBoundingBoxLeft * -1;
    const metricsY = metrics.actualBoundingBoxAscent * -1;
    const metricsWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const metricsHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const x = (width - metricsWidth) * 0.5 - metricsX;
    const y = (width - metricsHeight) * 0.5 - metricsY;

    context.save();
    // mode 1
    // context.translate(width * 0.5, height * 0.5);
    // context.fillText(text, 0, 0);

    // mode 2
    context.translate(x, y);

    context.beginPath();
    context.rect(metricsX, metricsY, metricsWidth, metricsHeight);
    context.stroke();
    
    context.fillText(text, 0, 0);
    context.restore();
  };
};

canvasSketch(sketch, settings);
