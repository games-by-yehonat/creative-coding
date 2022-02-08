/** @type {CanvasRenderingContext2D} */
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

// grid
const settings = {
  dimensions: [ 1080, 1080 ]
};

let manager;

let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
console.log(typeCanvas);
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {

  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const cells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols * 1.2;

    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';

    const metrics = typeContext.measureText(text);
    console.log(metrics);

    const metricsX = metrics.actualBoundingBoxLeft * -1;
    const metricsY = metrics.actualBoundingBoxAscent * -1;
    const metricsWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const metricsHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - metricsWidth) * 0.5 - metricsX;
    const ty = (rows - metricsHeight) * 0.5 - metricsY;

    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.beginPath();
    typeContext.rect(metricsX, metricsY, metricsWidth, metricsHeight);
    typeContext.stroke();
    
    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;
    
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.textBaseline = 'middle';
    context.textAlign = 'center';

    // context.drawImage(typeCanvas, 0, 0);

    for (let i = 0; i < cells; i++) {
      let col = i % cols;
      let row = Math.floor(i / cols);

      let x = col * cell;
      let y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      let glyph = getGlyph(r);

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1) {
        context.font = `${cell * 6}px ${fontFamily}`;
      }
      context.fillStyle = `rgb(${r}, ${g}, ${b})`;

      context.save();

      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);
      // pixel
      // context.fillRect(0, 0, cell, cell);

      // arc
      // context.beginPath();
      // context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
      // context.fill();

      context.fillText(glyph, 0, 0);;

      context.restore();

    }
  };
};

const getGlyph = (v) => {
  console.log(v);
  if(v < 50) return '';
  if(v < 100) return '.';
  if(v < 150) return '-';
  if(v < 200) return '+';

  const glyphs = '_= /?¡'.split('');

  return random.pick(glyphs);
}

const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();
}

document.addEventListener('keyup', onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
}

start();

// const url = 'http://picsum.photos/200';

// const loadMeSomeImage = (url) => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = () => reject();
//     img.src = url;
//   });
// }

// const start = async () => {
//   const img = await loadMeSomeImage(url);
//   console.log(' image width', img.width);
//   console.log('this line');
// };

// const start = () => {
//   loadMeSomeImage(url).then(img => {
//     console.log(' image width', img.width);
//   });
//   console.log('this line');
// };

// start();