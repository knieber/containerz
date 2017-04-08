var Sprite = require('./Sprite');

function SpriteSheet(src, map) {
  this.map = map;
  this.img = new Image();
  this.img.src = src;
  this.sprites = {};
  for (var i = 0; i < map.length; i++) {
    var info = map[i];
    this.sprites[info.name] = new Sprite(this.img, info.x, info.y, info.width, info.height);
  };
}

module.exports = SpriteSheet;
