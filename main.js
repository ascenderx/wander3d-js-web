let game;
let canvas;

window.addEventListener('load', () => {
  canvas = document.getElementById('canvas');
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;

  let debugLabels = {
    lblCursorX: document.getElementById('lblCursorX'),
    lblCursorY: document.getElementById('lblCursorY'),
    lblCameraX: document.getElementById('lblCameraX'),
    lblCameraY: document.getElementById('lblCameraY'),
    lblCameraZ: document.getElementById('lblCameraZ'),
    lblCameraAX: document.getElementById('lblCameraAX'),
    lblCameraAY: document.getElementById('lblCameraAY'),
  };

  game = new Game(canvas, debugLabels);
  game.start();
});

window.addEventListener('resize', () => {
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
  
  game.resize(canvas.width, canvas.height);
});