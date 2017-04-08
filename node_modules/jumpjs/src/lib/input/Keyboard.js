var keys = new Array();

function bindKey(k){
	return new Key(k);
}

module.exports = {
  bindKey
};

function Key(k){

  document.addEventListener('keyup', function () {
    var keyCode = window.event.keyCode;
    if (keys[keyCode]) {
  		keys[keyCode].pressed = false;
  	}
  });
  document.addEventListener('keydown', function () {
    var keyCode = window.event.keyCode;
    if (keys[keyCode]) {
      if (!keys[keyCode].pressed && keys[keyCode].event) {
    		keys[keyCode].event();
    	}
  		keys[keyCode].pressed = true;
  	}
  });

	if (k.length > 1) {
		var c = 0;
		switch (k.toUpperCase()) {
      case "ENTER":    c=13; break;
			case "LEFT":   	 c=37; break;
			case "RIGHT": 	 c=39; break;
			case "UP":    	 c=38; break;
			case "DOWN":  	 c=40; break;
			case "SPACEBAR": c=32; break;
		}
		this.code = c;
	} else {
		this.code = k.charCodeAt(0);
	}

	this.pressed = false;
	this.event = null;

	keys[this.code] = this;

	return this;
}
