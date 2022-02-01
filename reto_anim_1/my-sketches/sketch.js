const canvasSketch = require('canvas-sketch'); // canvas library
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

// Sketch parameters
const settings = {
  dimensions: [1080, 1080],
  animate: true
};

// Artwork function
const sketch = ({ context, width, height }) => {

  const agents = [];
  const length = 5;
  const boxWidth = width * 0.12;
  const boxHeigth = height * 0.12;

  const gab = width * 0.018;
  const offset = width * 0.009;

  let xPos = (width / 2) - (((boxWidth + gab) * length - gab) / 2);
  let yPos = (height / 2) - (((boxHeigth + gab) * length - gab) / 2);

  let x, y;

  for (let i = 0; i < length; i++)
    {
      x = xPos + (boxWidth + gab) * i;

      for (let j = 0; j < length; j++)
      {
        y = yPos + (boxHeigth + gab) * j;

        agents.push(new Agent(x, y, boxWidth, boxHeigth));

        if (Math.random() > 0.5)
        {
          agents.push(new Agent(x + offset, y + offset, boxWidth - offset * 2, boxHeigth - offset * 2));
        }
      }
    }

  return ({ context, width, height }) => {
    
// Off-white background
  context.fillStyle = 'white';
  // context.strokeStyle = '#f8f8f8'
  context.fillRect(0, 0, width, height);

  agents.forEach(e => {
    e.update();
    e.shake();
    e.draw(context);
  })

  };
};

class Vector {
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y, width, height) {
    this.pos = new Vector(x, y);
    this.initPos = new Vector(this.pos.x, this.pos.y);
    this.angle = 0;
    this.vel = new Vector(random.range(-3, 0), random.range(0, 3));
    this.width = width;
    this.height = height;
    this.bounce = random.range(1, 16);

  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 10;

    context.beginPath();
    context.rect(0, 0, this.width, this.height);
    context.fill();
    context.stroke();
    context.restore();
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  shake()
  {
    if (this.pos.x < this.initPos.x - this.bounce || this.pos.x > this.initPos.x + this.bounce) {
      this.vel.x *= -1;
    }

    if (this.pos.y < this.initPos.y - this.bounce || this.pos.y > this.initPos.y + this.bounce) {
      this.vel.y *= -1;
    }
  }
}

// Start the sketch
canvasSketch(sketch, settings);
