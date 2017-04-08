var Component = require('../components/Component');

function Text(str, color) {
  Component.call(this);
  this.str = str;
  this.onUpdate = onUpdate;
}

Text.prototype = Object.create(Component.prototype);
Text.prototype.constructor = Text;

Text.prototype.setText = function(str) {
  this.str = str;
};

var onUpdate = function (_game, _entity) {
  var transform = _entity.components['transform'];
  var ctx = _game.getContext();
  ctx.fillText(
    this.str,
    transform.x,
    transform.y
  );
};

module.exports = Text;
