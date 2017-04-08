var Component = require('./Component');

function Collision() {
  Component.call(this);
  this.onUpdate = onUpdate;
  this.collidedWith = [];
}

Collision.prototype = Object.create(Component.prototype);
Collision.prototype.constructor = Collision;

Collision.prototype.hasCollidedWith = function(entity) {
  for (var i = 0; i < this.collidedWith.length; i++) {
    if (entity === this.collidedWith[i].entity) {
      return this.collidedWith[i].collisions;
    }
  }
  return false;
}

module.exports = Collision;

var onUpdate = function (_game, _entity) {
  var collision = _entity.components['collision'];
  var entities = _game.getScene().entities;
  this.collidedWith = [];
  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    if (entity === _entity) {
      return;
    }
    var collisions = {
      top: false,
      bottom: false,
      left: false,
      right: false
    };
    checkCollions(collisions, _entity, entity);
    if (collisions.top || collisions.bottom || collisions.left || collisions.right) {
      this.collidedWith.push({
        entity: entity,
        collisions: collisions
      });
    }
  }
}

function checkCollions(collisions, _entity, entity) {
  var transform1 = _entity1.components['transform'];
  var transform2 = _entity2.components['transform'];
  if (transform1.getBottom() >= transform2.getBottom()) {
    collisions.bottom = true;
  }
  if (transform1.getTop() <= transform2.getTop()) {
    collisions.top = true;
  }
	if (transform1.getRight() >= transform2.getRight()) {
    collisions.right = true;
  }
  if (transform1.getLeft() <= transform2.getLeft()) {
    collisions.left = true;
  }
}
