var Component = require('../components/Component');

function Rect(color) {
  Component.call(this);
  this.color = color || 'black';
  this.onUpdate = onUpdate;
}

Rect.prototype = Object.create(Component.prototype);
Rect.prototype.constructor = Rect;

var onUpdate = function (_game, _entity) {
  var transform = _entity.components['transform'];
  var ctx = _game.getContext();
  ctx.fillStyle = this.color;
  ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
};

module.exports = Rect;
