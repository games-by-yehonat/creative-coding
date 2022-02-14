/** @type {CanvasRenderingContext2D} */
const canvasSketch = require('canvas-sketch');

const video = document.createElement('video');
video.setAttribute('autoplay',true);
video.width = 640;
video.height = 480;

console.log(navigator);
    
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("a");
    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
    video.srcObject = stream;
    video.play();
    start();
    console.log("enter");
  })
}

console.log("enter");
// grid
const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

// const typeCanvas = document.createElement('canvas');
// const typeContext = typeCanvas.getContext('2d');



// const sketch = () => {
//   return ({ context, width, height }) => {
//     context.drawImage(video, 0, 0, width, height);
//     console.log("enter");
//   };
// };


// const start = async () => {
//   manager = await canvasSketch(sketch, settings);
// }

// start();
