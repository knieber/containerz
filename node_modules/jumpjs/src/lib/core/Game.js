var FPS = 60;
var FRAME_DURATION = 1000 / FPS;
var fps = 0;
var frames = 0;
var scene = null;
var previousTime = null;
var delta = null;
var canvas = null;
var context = null;
var paused = true;
var elapsed = 0;

var Game = {
  getCanvas() {
    return canvas;
  },
  setCanvas(_canvas) {
    canvas = _canvas;
    context = canvas.getContext('2d');
  },
  getContext() {
    return context;
  },
  getScene() {
    return scene;
  },
  setScene(_scene) {
    if (_scene.onSetup) {
      _scene.onSetup();
    }
    scene = _scene;
  },
  getDelta() {
    return delta;
  },
  getFPS() {
    return Math.round(1 / elapsed);
  },
  run() {
    _gameLoop();
  }
};

module.exports = Game;

function _gameLoop() {

  //Call the next iteration of the game loop
  window.requestAnimationFrame(() => _gameLoop());

  //calculate the delta time between this current timestamp (frame)
  //and the previous
  var now = window.performance.now();
  elapsed = (now - (previousTime || now)) / 1000;
  delta = now - previousTime;

  //correct any huge unexpected gaps in the delta
  if (delta > 1000) {
    delta = FRAME_DURATION;
  }

  // Store the current transformation matrix
  context.save();

  // Use the identity matrix while clearing the canvas
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Restore the transform
  context.restore();

  //Update all of the game components
  scene.update(Game);

  //set the current time to be used as the previous
  //for the next frame
  previousTime = now;

}
