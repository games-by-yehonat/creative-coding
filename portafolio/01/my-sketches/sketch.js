const canvasSketch = require('canvas-sketch');
const tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 2048, 2048 ]
};

let manager;

const sketch = ({ context, width, height }) => {
  const squares = [];
  const circles = [];

  let framePercent = 0.1;
  let gapPercent = 0.03;

  let cols = 5;
  let rows = 5;

  let offset = width * 0.02;

  let length = cols * rows;

  let frameWidth = width * framePercent;
  let frameHeight = height * framePercent;

  let gap = width * gapPercent;

  let framePositionX = (width - ((frameWidth + gap) * cols) + gap) * 0.5;
  let framePositionY = (height - ((frameHeight + gap) * rows) + gap) * 0.5;

  let x, y;

  for (let i = 0; i < length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);      

    x = framePositionX + (frameWidth + gap) * col;
    y = framePositionY + (frameHeight + gap) * row;

    squares.push(new Square(x, y, frameWidth, frameHeight));

    if (Math.random() > 0.5) {
      x += offset / 2;
      y += offset / 2;
      squares.push(new Square(x, y, frameWidth - offset, frameHeight - offset));
    }
  }

  for (let i = 0; i < 20; i++) {
    let col = i % (cols - 1);
    let row = Math.floor(i / cols);      

    x = framePositionX + (frameWidth + gap) * col;
    y = framePositionY + (frameHeight + gap) * row;

    circles.push(new Circle(x, y, frameWidth * 1.15));
  }

  return ({ context, width, height }) => {
    context.fillStyle = PARAMS.background;
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.005;

    let x0 = framePositionX;
    let y0 = framePositionY;
    let x1 = (frameWidth + gap) * cols;
    let y1 = (frameHeight + gap) * rows;

    if (PARAMS.gradient == 'horizontal') {
      x1 = framePositionX;
    } else if (PARAMS.gradient == 'vertical') {
      y1 = framePositionY;
    }
    
    let gradient = context.createLinearGradient(x0, y0, x1, y1);

    gradient.addColorStop(PARAMS.offset.x, PARAMS.primary);
    gradient.addColorStop(PARAMS.offset.y, PARAMS.secondary);
    gradient.addColorStop(PARAMS.offset.z, PARAMS.tertiary);

    context.strokeStyle = gradient;

    squares.forEach(e => {
      e.draw(context);
    })

    circles.forEach(e => {
      e.draw(context);
    })
    
  };
};

const PARAMS = {
  background: '#FAEEE7',
  gradient: 'combined',
  primary: '#F54291',
  secondary: '#4CD3C2',
  tertiary: '#0A97B0',
  offset: {x: 0.4, y: 0.75, z: 1},
}

const initPane = () => {
  const pane = new tweakpane.Pane({
    title: 'Parameters'
  });

  pane.addInput(PARAMS, 'background');

  const folderColor = pane.addFolder({
    title: 'Gradient foreground',
  });
  
  folderColor.addInput(PARAMS, 'gradient', {
    options : {
      combined: 'combined',
      horizontal: 'horizontal',
      vertical: 'vertical'
    }
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


class Square {
  constructor(x, y, width, height) {
    this.pos = new Vector(x, y);
    this.width = width;
    this.height = height;
  }

  draw(context) {
    context.beginPath();
    context.rect(this.pos.x, this.pos.y, this.width, this.height);
    context.stroke();
  }
}

class Circle {
  constructor(x, y, radius) {
    this.pos = new Vector(x, y);
    this.radius = radius;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.pos.x + this.radius, this.pos.y + this.radius, this.radius, 0, Math.PI * 2);
    // context.fill();
    context.stroke();
  }
}

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
