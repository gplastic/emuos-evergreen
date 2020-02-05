// noinspection JSUnusedLocalSymbols
var Console = function(console) {
	this.target = document.createElement('div');
	this.target.id = 'console';
	this.target.style.position = 'absolute';
	this.target.style.width = '100%';
	this.target.style.height = '25%';
	// noinspection JSValidateTypes
	this.target.style.zIndex = 9999;
	this.target.style.background = "url('images/resources/console.png') top left";
	this.target.style.overflow = 'auto';
	this.target.style.padding = '0px';
	this.target.style.color = 'whit';
	this.target.style.fontFamily = 'monospace';
	this.target.style.borderBottom = 'solid 2px #F00';

	document.body.appendChild(this.target);

	this.visible = false;
	this.hide();
	var logger = this;

	window.onkeypress = function(event) {
		console.log('event', event);
		// noinspection JSDeprecatedSymbols
		if (event.which === 96 || event.which === 93) {
			if (logger.visible) {
				logger.hide();
			} else {
				logger.show();
			}
		}
	}
};

Console.prototype.show = function() {
	this.target.style.display = 'inherit';
	this.target.style.top = '0';
	this.visible = true;
};

Console.prototype.hide = function() {
	this.target.style.display = 'none';
	this.target.style.top = (0 - this.target.clientHeight - 2) + 'px'; // 2px border :D
	this.visible = false;
};

Console.prototype.write = function(text, module) {
	if (!module) {
		module = 'Main';
	}

	var time = new Date();

	// noinspection HtmlDeprecatedTag
	this.target.innerHTML += '<div style="color: #CCC;"><font color="#CCC">[' + formatTime(time) + ']</font> N <font color="#FFF"><strong>' + module + ':</strong></font> ' + text + '</div>';
	this.target.scrollTop = this.target.scrollHeight;
};

Console.prototype.success = function(text, module) {
	if (!module) {
		module = 'Main';
	}

	var time = new Date();
	// noinspection JSUnusedLocalSymbols
	var hour = time.getHours();
	// noinspection JSUnusedLocalSymbols
	var minute = time.getMinutes();
	// noinspection JSUnusedLocalSymbols
	var second = time.getSeconds();

	// noinspection HtmlDeprecatedTag
	this.target.innerHTML += '<div style="color: lime;"><font color="#CCC">[' + formatTime(time) + ']</font> S <font color="#FFF"><strong>' + module + ':</strong></font> ' + text + '</div>';
	this.target.scrollTop = this.target.scrollHeight;
};

Console.prototype.debug = function(text, module) {
	if (!module) {
		module = 'Main';
	}

	var time = new Date();
	// noinspection JSUnusedLocalSymbols
	var hour = time.getHours();
	// noinspection JSUnusedLocalSymbols
	var minute = time.getMinutes();
	// noinspection JSUnusedLocalSymbols
	var second = time.getSeconds();

	// noinspection HtmlDeprecatedTag
	this.target.innerHTML += '<div style="color: cyan;"><font color="#CCC">[' + formatTime(time) + ']</font> D <font color="#FFF"><strong>' + module + ':</strong></font> ' + text + '</div>';
	this.target.scrollTop = this.target.scrollHeight;
};

Console.prototype.warning = function(text, module) {
	if (!module) {
		module = 'Main';
	}

	var time = new Date();
	// noinspection JSUnusedLocalSymbols
	var hour = time.getHours();
	// noinspection JSUnusedLocalSymbols
	var minute = time.getMinutes();
	// noinspection JSUnusedLocalSymbols
	var second = time.getSeconds();

	// noinspection HtmlDeprecatedTag
	this.target.innerHTML += '<div style="color: yellow;"><font color="#CCC">[' + formatTime(time) + ']</font> W <font color="#FFF"><strong>' + module + ':</strong></font> ' + text + '</div>';
	this.target.scrollTop = this.target.scrollHeight;
};

Console.prototype.error = function(text, module) {
	if (!module) {
		module = 'Main';
	}

	var time = new Date();
	// noinspection JSUnusedLocalSymbols
	var hour = time.getHours();
	// noinspection JSUnusedLocalSymbols
	var minute = time.getMinutes();
	// noinspection JSUnusedLocalSymbols
	var second = time.getSeconds();

	//var stackTrace = printStackTrace().join('<br />');

	// noinspection HtmlDeprecatedTag
	this.target.innerHTML += '<div style="color: red;"><font color="#CCCCCC">[' + formatTime(time) + ']</font> E <font color="#FFFFFF"><strong>' + module + ':</strong></font> ' + text + '</div>';
	//this.target.innerHTML += '<div style="color: red;">Stack Trace: <br />' + stackTrace + '</div>';
	this.target.scrollTop = this.target.scrollHeight;
};