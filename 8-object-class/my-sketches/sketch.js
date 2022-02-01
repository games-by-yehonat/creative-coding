/** @type {CanvasRenderingContext2D} */
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = ({ context, width, height }) => {

  const agents = [];
  const length = 45;
  for (let i = 0; i < length; i++) {
    let x = random.range(0, width);
    let y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // const dot = {x: 800, y: 400, radius: 10 };
    // const dot_a = new Agent(800, 400);
    // const dot_b = new Agent(300, 700);

    // dot_a.draw(context);
    // dot_b.draw(context);

    agents.forEach(e => {
      e.draw(context);
    })
 
  };
};

class Dot {
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y)
  {
    this.pos = new Dot(x, y);
    this.radius = 10;
  }

  draw(context) {
    context.fillStyle = 'black';

    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fill();
 
  }
}


canvasSketch(sketch, settings);
