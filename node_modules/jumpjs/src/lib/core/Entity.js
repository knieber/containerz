var Transform = require('../components/Transform');

function Entity(x, y, width, height) {
  this.components = {
    transform: new Transform(x, y, width, height)
  };
  this.id = null;
}

Entity.prototype.addComponent = function(name, component) {
  this.components[name] = component;
}

Entity.prototype.update = function(game) {
  var keys = Object.keys(this.components);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    this.components[key].update(game, this);
  }
}

Entity.prototype.setId = function(id) {
  this.id = id;
}

Entity.prototype.getId = function() {
  return this.id;
}

module.exports = Entity;
