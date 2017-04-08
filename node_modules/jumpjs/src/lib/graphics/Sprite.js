var Component = require('../components/Component');

function Sprite(img, x, y, width, height) {
  Component.call(this);
  this.img = img;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.onUpdate = onUpdate
}

Sprite.prototype = Object.create(Component.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.setImg = function (img) {
  this.img = img;
}

var onUpdate = function (_game, _entity) {
  if (!this.img) {
    return;
  }
  var transform = _entity.components['transform'];
  var ctx = _game.getContext();
  ctx.drawImage(this.img,
    this.x,
    this.y,
    this.width,
    this.height,
    transform.x,
    transform.y,
    transform.width,
    transform.height
  );
}

module.exports = Sprite;
