function Scene() {
  this.entities = [];
  this.onSetup = null;
}

Scene.prototype.reset = function() {
  this.entities = [];
}

Scene.prototype.addEntity = function(entity) {
  this.entities.push(entity);
}

Scene.prototype.update = function(game) {
  for (var i = 0; i < this.entities.length; i++) {
    this.entities[i].update(game);
  }
}

Scene.prototype.findEntity = function(id) {
  for (var i = 0; i < this.entities.length; i++) {
    if (id === this.entities[i].getId()) {
      return this.entities[i];
    }
  }
}

module.exports = Scene;
