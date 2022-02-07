/** @type {CanvasRenderingContext2D} */
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const tweakpane = require('tweakpane');

// grid
const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amplitude: 0.2,
  frame: 0,
  animate: true,
  lineCap: 'but'
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
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
      
      let f = params.animate ? frame : params.frame;
      
      // let n = random.noise2D(x + frame * 10, y, params.freq);
      let n = random.noise3D(x, y, f * 10, params.freq);
      let angle = n * Math.PI * params.amplitude;
      // let scale = (n + 1) / 2 * 30;
      // let scale = (n * 0.5 + 0.5) * 30;
      let scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      
      context.translate(x, y);
      context.translate(marginX, marginY);
      context.translate(cellWidth * 0.5, cellHeigth * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      // context.strokeStyle = 'white';
      context.stroke();

      context.restore();

    }

  };
};

const createPane = () => {
  const pane = new tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: 'Grid' });
  folder.addInput(params, 'lineCap', { options: {butt: 'butt', round: 'round', square: 'square' }});
  folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
  folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
  folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
  folder.addInput(params, 'scaleMax', { min: 1, max: 100 });

  folder = pane.addFolder({ title: 'Noise' });
  folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
  folder.addInput(params, 'amplitude', { min: 0, max: 1 });
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame', { min: 0, max: 999 });
}

createPane();
canvasSketch(sketch, settings);
