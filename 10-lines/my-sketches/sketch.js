/** @type {CanvasRenderingContext2D} */
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

// const animate = () => {
//   console.log('domestika');
//   requestAnimationFrame(animate);
// }

// animate();

const sketch = ({ context, width, height }) => {

  const agents = [];
  const length = 64;
  for (let i = 0; i < length; i++) {
    let x = random.range(0, width);
    let y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      let agent = agents[i];
      
      for (let j = i+ 1; j < agents.length; j++) {
        let other = agents[j];

        let dist = agent.pos.getDistance(other.pos);

        if (dist > 200) {
          continue;
        }

        context.lineWidth = math.mapRange(dist, 0, 200, 4, 1);

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }

    }

    agents.forEach(e => {
      e.update();
      e.draw(context);
      // e.bounce(width, height);
      e.wrap(width, height);
    })
 
  };
};

class Vector {
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }

  getDistance(v){
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y)
  {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 3;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();

    context.stroke();

    context.restore();
 
  }

  update()
  {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }
  }

  wrap(width, height) {
    if (this.pos.x <= 0) {
      this.pos.x = width;
    }
    if (this.pos.x >= width) {
      this.pos.x = 0;
    }
    if (this.pos.y <= 0) {
      this.pos.y = height;
    }
    if (this.pos.y >= height) {
      this.pos.y = 0; 
    }
  }
}


canvasSketch(sketch, settings);
