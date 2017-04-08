require('./setup');

var jumpjs = require('./lib');

if (window) {
  window.jumpjs = jumpjs;
}

module.exports = jumpjs;
