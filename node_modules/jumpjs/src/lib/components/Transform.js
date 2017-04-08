var Component = require('./Component');

function Transform(x, y, width, height) {
  Component.call(this);
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Transform.prototype = Object.create(Component.prototype);
Transform.prototype.constructor = Transform;

Transform.prototype.getTop = function() {
  return this.y;
}

Transform.prototype.getBottom = function() {
  return this.y + this.height;
}

Transform.prototype.getLeft = function() {
  return this.x;
}

Transform.prototype.getRight = function() {
  return this.x + this.width;
}

module.exports = Transform;
