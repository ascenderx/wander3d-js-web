let game;
let canvas;

function registerDebugCallback() {
  let lblCursorX = document.getElementById('lblCursorX');
  let lblCursorY = document.getElementById('lblCursorY');
  let lblCameraX = document.getElementById('lblCameraX');
  let lblCameraY = document.getElementById('lblCameraY');
  let lblCameraZ = document.getElementById('lblCameraZ');
  let lblCameraAX = document.getElementById('lblCameraAX');
  let lblCameraAY = document.getElementById('lblCameraAY');

  game.allowDebugging = true;
  game.attachDebugListener(() => {
    lblCursorX.innerText = Math.floor(game._inputHdl.mouseXFromOrigin);
    lblCursorY.innerText = Math.floor(game._inputHdl.mouseYFromOrigin);
    lblCameraX.innerText = Math.floor(game._camera.x);
    lblCameraY.innerText = Math.floor(game._camera.y);
    lblCameraZ.innerText = Math.floor(game._camera.z);
    lblCameraAX.innerText = Math.floor(game._camera.angleX);
    lblCameraAY.innerText = Math.floor(game._camera.angleY);
  });
}

function resizeCanvas() {
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
}

window.addEventListener('load', () => {
  canvas = document.getElementById('canvas');
  resizeCanvas();
  game = new Game(canvas);
  registerDebugCallback();
  game.start();
});

window.addEventListener('resize', () => {
  resizeCanvas();
  game.resize(canvas.width, canvas.height);
});