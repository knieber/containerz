function Component() {
  this.onUpdate = null;
}

Component.prototype.update = function(game, entity) {
  if (this.onUpdate) {
    this.onUpdate(game, entity);
  }
}

module.exports = Component;
