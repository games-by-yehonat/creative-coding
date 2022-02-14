const canvasSketch = require('canvas-sketch');
const load = require('load-asset');

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: true,
  duration: 1,
  fps: 30
};

const length = 19;

let images;
let index = 0;
let urls = [];
let manager;

const pixelCanvas = document.createElement('canvas');
const pixelContext = pixelCanvas.getContext('2d');

const sketch = ({ width, height } ) => {
  let pixel = 32;
  let cols = Math.floor(width / pixel);
  let rows = Math.floor(height / pixel);
  let cells = cols * rows;

  pixelCanvas.width = cols;
  pixelCanvas.height = rows;

  return ({ context, width, height }) => {
    pixelContext.fillStyle = 'white';
    pixelContext.fillRect(0, 0, cols, rows);

    pixelContext.drawImage(images[index], 0, 0, cols, rows);
    index++;
    if (index >= urls.length) { index = 0; }

    let pixels = pixelContext.getImageData(0, 0, cols, rows);

    context.drawImage(pixelCanvas, 0, 0);

    for (let i = 0; i < cells; i++) {
      let col = i % cols;
      let row = Math.floor(i / cols);

      let x = col * pixel;
      let y = row * pixel;

      const r = pixels.data[i * 4 + 0];
      const g = pixels.data[i * 4 + 1];
      const b = pixels.data[i * 4 + 2];
      const a = pixels.data[i * 4 + 3];

      context.fillStyle = `rgb(${r}, ${g}, ${b})`;

      context.save();

      context.translate(x, y);
      context.translate(pixel * 0.5, pixel * 0.5);
      // pixel
      // context.fillRect(0, 0, pixel, pixel);

      // arc
      context.beginPath();
      context.arc(0, 0, pixel * 0.5, 0, Math.PI * 2);
      context.fill();

      context.restore();
    }
  };
};

const url = 'finger.gif';

const init = async () => {

  for (let i = 0; i < length; i++) {
    let num = i < 10 ? "0" + i : i;
    urls.push('doggy/' + num + '.png');
  }

  images = await load.all(urls);
  manager = await canvasSketch(sketch, settings);
}

init();