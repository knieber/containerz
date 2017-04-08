var jumpjs = window.jumpjs;
var Game = jumpjs.core.Game;
var Scene = jumpjs.core.Scene;
var Component = jumpjs.components.Component;
var Entity = jumpjs.core.Entity;
var Keyboard = jumpjs.input.Keyboard;
var Sprite = jumpjs.graphics.Sprite;
var SpriteSheet = jumpjs.graphics.SpriteSheet;
var Rect = jumpjs.graphics.Rect;
var Text = jumpjs.graphics.Text;
var Collision = jumpjs.components.Collision;

var down = Keyboard.bindKey('down');
var left = Keyboard.bindKey('left');
var right = Keyboard.bindKey('right');
var space = Keyboard.bindKey('spacebar');

var levelNumber = 0;
var levels = [{
  joe: [10, 460],
  exit: [50, 10],
  enemies: [
    [100, 265, 4],
    [400, 165, 6],
    [550, 65, 8]
  ],
  ledges: [
    [100, 5, 50, 450],
    [100, 5, 265, 420],
    [100, 5, 465, 390],
    [100, 5, 590, 340],
    [400, 5, 90, 300],
    [50, 5, 10, 250],
    [400, 5, 90, 200],
    [150, 5, 500, 150],
    [150, 5, 500, 100],
    [400, 5, 90, 50]
  ]
}, {
  joe: [10, 460],
  exit: [600, 10],
  enemies: [
    [40, 365, 1],
    [200, 115, 6],
    [500, 15, 8]
  ],
  ledges: [
    [100, 5, 550, 450],
    [450, 5, 50, 400],
    [50, 5, 50, 350],
    [300, 5, 150, 300],
    [50, 5, 530, 250],
    [400, 5, 50, 200],
    [400, 5, 50, 150],
    [400, 5, 50, 100],
    [600, 5, 50, 50]
  ]
}];

var spriteMap = [{
  "name":"joe",
  "x":0,
  "y":0,
  "width":24,
  "height":36
},{
  "name":"enemy",
  "x":25,
  "y":0,
  "width":22,
  "height":35
},{
  "name":"exit",
  "x":0,
  "y":37,
  "width":30,
  "height":30
}];

var spriteSheet = new SpriteSheet('img/spritesheet.png', spriteMap);

var joeSprite = spriteSheet.sprites['joe'];
var exitSprite = spriteSheet.sprites['exit'];
var enemySprite = spriteSheet.sprites['enemy'];

var gravity = new Component();
gravity.onUpdate = function(_game, _entity) {
  var transform = _entity.components['transform'];
  if (!isJumping) {
    for (var j = 0; j < 3; j++) {
      if (!dropThrough) {
        var level = levels[levelNumber];
        var _scene = _game.getScene();
        for (var i = 0; i < level.ledges.length; i++) {
          var ledge = _scene.findEntity('ledge_' + i);
          var ledgeTransform = ledge.components['transform'];
          if (transform.y + transform.height === ledgeTransform.y &&
      		   transform.x <= ledgeTransform.x + ledgeTransform.width &&
      		   transform.x + transform.width >= ledgeTransform.x) {
            isGrounded = true;
      			return;
      		}
        }
      }
      transform.y += 2;
      if (transform.y + transform.height >= 500) {
        transform.y = 500 - transform.height;
        isGrounded = true;
      }
    }
    dropThrough = false;
  }
}

var dropThrough = false;
var isGrounded = false;
var isJumping = false;
var jumpingTimes = 0;
var playerControls = new Component();
playerControls.onUpdate = function(_game, _entity) {
  var transform = _entity.components['transform'];
  if (isJumping) {
    transform.y -= 10;
    if (++jumpingTimes === 7) {
      isJumping = false;
      jumpingTimes = 0;
    }
  }
  if (left.pressed) {
    transform.x -= 7;
  }
  if (right.pressed) {
    transform.x += 7;
  }
  if (transform.x <= 0) {
    transform.x = 0;
  }
  if (transform.x + transform.width >= 700) {
    transform.x = 700 - transform.width;
  }
  var exit = _game.getScene().findEntity('exit');
  var exitTransform = exit.components['transform'];
  if((transform.y + transform.height >= exitTransform.y &&
      transform.y <= exitTransform.y + exitTransform.height) &&
	   (transform.x + transform.width  >= exitTransform.x &&
      transform.x <= exitTransform.x + exitTransform.width)){
		levelNumber++;
		Game.setScene(scene);
	}
};

var enemyMovement = new Component();
enemyMovement.onUpdate = function(_game, _entity) {
  var transform = _entity.components['transform'];
  if (_entity.direction === 'left') {
    transform.x -= 5;
  } else if (_entity.direction === 'right') {
    transform.x += 5;
  }
  var ledge = _game.getScene().findEntity('ledge_' + _entity.ledge);
  ledgeTransform = ledge.components['transform'];
  if (transform.x <= ledgeTransform.x) {
    _entity.direction = 'right';
  } else if (transform.x + transform.width >= ledgeTransform.x + ledgeTransform.width) {
    _entity.direction = 'left';
  }
};

var text = new Text();
var textEntity = new Entity(10, 10);
textEntity.addComponent('text', text);

var scene = new Scene();

scene.onSetup = function () {

  scene.reset();

  scene.addEntity(textEntity);

  var level = levels[levelNumber];

  //Joe
  var joe = new Entity(level.joe[0], level.joe[1], joeSprite.width, joeSprite.height);
  joe.addComponent('gravity', gravity);
  joe.addComponent('sprite', joeSprite);
  joe.addComponent('playerControls', playerControls);
  scene.addEntity(joe);

  //Exit
  var exit = new Entity(level.exit[0], level.exit[1], exitSprite.width, exitSprite.height);
  exit.setId('exit');
  exit.addComponent('sprite', exitSprite);
  scene.addEntity(exit);

  //Enemies
  for (var i = 0; i < level.enemies.length; i++) {
    var enemy = new Entity(level.enemies[i][0], level.enemies[i][1], enemySprite.width, enemySprite.height);
    enemy.ledge = level.enemies[i][2];
    enemy.direction = 'left';
    enemy.addComponent('sprite', enemySprite);
    enemy.addComponent('movement', enemyMovement);
    scene.addEntity(enemy);
  }

  //Ledges
  for (var i = 0; i < level.ledges.length; i++) {
    var ledge = new Entity(level.ledges[i][2], level.ledges[i][3], level.ledges[i][0], level.ledges[i][1]);
    ledge.setId('ledge_' + i);
    ledge.addComponent('rect', new Rect());
    scene.addEntity(ledge);
  }

}

Game.setCanvas(document.getElementById('game'));
Game.setScene(scene);

down.event = function() {
  isGrounded = false;
  dropThrough = true;
}
space.event = function() {
  if (isGrounded) {
    isJumping = true;
    isGrounded = false;
  }
};

document.addEventListener('DOMContentLoaded', function () {
  Game.run();
}, false);
