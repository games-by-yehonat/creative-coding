const canvasSketch = require('canvas-sketch'); // canvas library

// Sketch parameters
const settings = {
  dimensions: [1080, 1080]
};

// Artwork function
const sketch = () => {
  return ({ context, width, height }) => {
    
// Off-white background
  context.fillStyle = '#000';
  context.strokeStyle = '#f8f8f8'
  context.fillRect(0, 0, width, height);

    let canvasWidth = width;
    let canvasHeigth = height;

    context.lineWidth = 10;

    const length = 5;
    const boxWidth = width * 0.12;
    const boxHeigth = height * 0.12;
    const gab = width * 0.018;
    const offset = width * 0.009;

    let xPos = (canvasWidth / 2) - (((boxWidth + gab) * length - gab) / 2);
    let yPos = (canvasHeigth / 2) - (((boxHeigth + gab) * length - gab) / 2);

    let x, y;

    for (let i = 0; i < length; i++)
    {
      x = xPos + (boxWidth + gab) * i;

      for (let j = 0; j < length; j++)
      {
        y = yPos + (boxHeigth + gab) * j;
        context.beginPath();
        context.rect(x, y, boxWidth, boxHeigth);
        context.stroke();

        if (Math.random() > 0.5)
        {
          context.beginPath();
          context.rect(x + offset, y + offset, boxWidth - offset * 2, boxHeigth - offset * 2);
          context.stroke();
        }
      }
    }

  };
};

// Start the sketch
canvasSketch(sketch, settings);
