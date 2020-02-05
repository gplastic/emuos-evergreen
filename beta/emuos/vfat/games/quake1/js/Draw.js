// noinspection DuplicatedCode
Draw = {};

// noinspection DuplicatedCode
Draw.id = 'Draw';

// noinspection DuplicatedCode
Draw.CharToConback = function(num, dest) {
	// Sys.DPrint(Draw.id, 'CharToConback', arguments);

	var source = ((num >> 4) << 10) + ((num & 15) << 3);
	var drawline, x;

	for (drawline = 0; drawline < 8; ++drawline) {
		for (x = 0; x < 8; ++x) {
			if (Draw.chars[source + x] !== 0) {
				Draw.conback.data[dest + x] = 0x60 + Draw.chars[source + x];
			}
		}

		source += 128;
		dest += 320;
	}
};

// noinspection DuplicatedCode
Draw.Init = function() {
	Sys.DPrint('Draw.Init()');

	var i;

	Draw.chars = new Uint8Array(W.GetLumpName('CONCHARS'));

	var trans = new ArrayBuffer(65536);
	var trans32 = new Uint32Array(trans);

	for (i = 0; i < 16384; ++i) {
		if (Draw.chars[i] !== 0) {
			trans32[i] = COM.LittleLong(VID.d_8to24table[Draw.chars[i]] + 0xff000000);
		}
	}

	Draw.char_texture = gl.createTexture();
	GL.Bind(0, Draw.char_texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 128, 128, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(trans));
	gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

	Draw.conback = {};
	var cb = COM.LoadFile('gfx/conback.lmp');

	if (cb == null) {
		Sys.Error('Couldn\'t load gfx/conback.lmp');
	}

	Draw.conback.width = 320;
	Draw.conback.height = 200;
	Draw.conback.data = new Uint8Array(cb, 8, 64000);

	var ver = '(WebQuake build ' + Def.webquake_version + ') 1.09';

	for (i = 0; i < ver.length; ++i) {
		Draw.CharToConback(ver.charCodeAt(i), 59829 - ((ver.length - i) << 3), 186);
	}

	Draw.conback.texnum = GL.LoadPicTexture(Draw.conback);

	Draw.loading = Draw.CachePic('loading');
	Draw.loadingElem = document.getElementById('loading');
	Draw.loadingElem.src = Draw.PicToDataURL(Draw.loading);
	Draw.loadingMsg = document.getElementById('loading-message');

	document.body.style.backgroundImage = 'url("' + Draw.PicToDataURL(Draw.PicFromWad('BACKTILE')) + '")';

	GL.CreateProgram('Fill', ['uOrtho'], [['aPosition', gl.FLOAT, 2], ['aColor', gl.UNSIGNED_BYTE, 4, true]], []);
	GL.CreateProgram('Pic', ['uOrtho'], [['aPosition', gl.FLOAT, 2], ['aTexCoord', gl.FLOAT, 2]], ['tTexture']);
	GL.CreateProgram('PicTranslate', ['uOrtho', 'uTop', 'uBottom'], [['aPosition', gl.FLOAT, 2], ['aTexCoord', gl.FLOAT, 2]], ['tTexture', 'tTrans']);
};

// noinspection DuplicatedCode
Draw.Char = function(x, y, num) {
	// Sys.DPrint(Draw.id, 'Char', arguments);

	GL.StreamDrawTexturedQuad(x, y, 8, 8, (num & 15) * 0.0625, (num >> 4) * 0.0625, ((num & 15) + 1) * 0.0625, ((num >> 4) + 1) * 0.0625);
};

// noinspection DuplicatedCode
Draw.Character = function(x, y, num) {
	// Sys.DPrint(Draw.id, 'Character', arguments);

	var program = GL.UseProgram('Pic', true);
	// noinspection JSUnresolvedVariable
	GL.Bind(program.tTexture, Draw.char_texture, true);
	Draw.Char(x, y, num);
};

// noinspection DuplicatedCode
Draw.String = function(x, y, str) {
	// Sys.DPrint(Draw.id, 'String', arguments);

	var program = GL.UseProgram('Pic', true);
	// noinspection JSUnresolvedVariable
	GL.Bind(program.tTexture, Draw.char_texture, true);

	for (var i = 0; i < str.length; ++i) {
		Draw.Char(x, y, str.charCodeAt(i));
		x += 8;
	}
};

// noinspection DuplicatedCode
Draw.StringWhite = function(x, y, str) {
	// Sys.DPrint(Draw.id, 'StringWhite', arguments);

	var program = GL.UseProgram('Pic', true);
	// noinspection JSUnresolvedVariable
	GL.Bind(program.tTexture, Draw.char_texture, true);

	for (var i = 0; i < str.length; ++i) {
		Draw.Char(x, y, str.charCodeAt(i) + 128);
		x += 8;
	}
};

// noinspection DuplicatedCode
Draw.PicFromWad = function(name) {
	Sys.DPrint(Draw.id, 'PicFromWad', arguments);

	var buf = W.GetLumpName(name);
	var p = {};
	var view = new DataView(buf, 0, 8);

	p.width = view.getUint32(0, true);
	p.height = view.getUint32(4, true);
	p.data = new Uint8Array(buf, 8, p.width * p.height);
	p.texnum = GL.LoadPicTexture(p);

	return p;
};

// noinspection DuplicatedCode
Draw.CachePic = function(path) {
	// Sys.DPrint(Draw.id, 'CachePic', arguments);

	path = 'gfx/' + path + '.lmp';

	var buf = COM.LoadFile(path);

	if (buf == null) {
		Sys.Error('Draw.CachePic: failed to load ' + path);
	}

	var dat = {};
	var view = new DataView(buf, 0, 8);

	dat.width = view.getUint32(0, true);
	dat.height = view.getUint32(4, true);
	dat.data = new Uint8Array(buf, 8, dat.width * dat.height);
	dat.texnum = GL.LoadPicTexture(dat);

	return dat;
};

// noinspection DuplicatedCode
Draw.Pic = function(x, y, pic) {
	// Sys.DPrint(Draw.id, 'Pic', arguments);

	var program = GL.UseProgram('Pic', true);
	// noinspection JSUnresolvedVariable
	GL.Bind(program.tTexture, pic.texnum, true);
	GL.StreamDrawTexturedQuad(x, y, pic.width, pic.height, 0.0, 0.0, 1.0, 1.0);
};

// noinspection DuplicatedCode
Draw.PicTranslate = function(x, y, pic, top, bottom) {
	Sys.DPrint(Draw.id, 'PicTranslate', arguments);

	GL.StreamFlush();
	var program = GL.UseProgram('PicTranslate');
	// noinspection JSUnresolvedVariable
	GL.Bind(program.tTexture, pic.texnum);
	// noinspection JSUnresolvedVariable
	GL.Bind(program.tTrans, pic.translate);

	var p = VID.d_8to24table[top];
	var scale = 1.0 / 191.25;
	// noinspection JSUnresolvedVariable
	gl.uniform3f(program.uTop, (p & 0xff) * scale, ((p >> 8) & 0xff) * scale, (p >> 16) * scale);
	p = VID.d_8to24table[bottom];
	// noinspection JSUnresolvedVariable
	gl.uniform3f(program.uBottom, (p & 0xff) * scale, ((p >> 8) & 0xff) * scale, (p >> 16) * scale);

	GL.StreamDrawTexturedQuad(x, y, pic.width, pic.height, 0.0, 0.0, 1.0, 1.0);

	GL.StreamFlush();
};

// noinspection DuplicatedCode
Draw.ConsoleBackground = function(lines) {
	// Sys.DPrint(Draw.id, 'ConsoleBackground', arguments);

	var program = GL.UseProgram('Pic', true);
	// noinspection JSUnresolvedVariable
	GL.Bind(program.tTexture, Draw.conback.texnum, true);
	GL.StreamDrawTexturedQuad(0, lines - VID.height, VID.width, VID.height, 0.0, 0.0, 1.0, 1.0);
};

// noinspection DuplicatedCode
Draw.Fill = function(x, y, w, h, c) {
	Sys.DPrint(Draw.id, 'Fill', arguments);

	GL.UseProgram('Fill', true);
	var color = VID.d_8to24table[c];
	GL.StreamDrawColoredQuad(x, y, w, h, color & 0xff, (color >> 8) & 0xff, color >> 16, 255);
};

// noinspection DuplicatedCode
Draw.FadeScreen = function() {
	// Sys.DPrint('Draw.FadeScreen()');

	GL.UseProgram('Fill', true);
	GL.StreamDrawColoredQuad(0, 0, VID.width, VID.height, 0, 0, 0, 204);
};

// noinspection DuplicatedCode
Draw.BeginDisc = function(filename) {
	// Sys.DPrint('Draw.BeginDisc()');

	if (Draw.loadingElem == null) {
		return;
	}

	Draw.loadingElem.style.left = ((VID.width - Draw.loading.width) >> 1) + 'px';
	Draw.loadingElem.style.top = ((VID.height - Draw.loading.height) >> 1) + 'px';
	Draw.loadingElem.style.display = 'block';

	Draw.loadingMsg.style.left = ((VID.width - Draw.loading.width) >> 1) + 'px';
	Draw.loadingMsg.style.top = ((VID.height - Draw.loading.height + 50) >> 1) + 'px';
	Draw.loadingMsg.style.display = 'block';
	Draw.loadingMsg.innerText = filename;

	var elem = document.documentElement;
	var width = (elem.clientWidth <= 320) ? 320 : elem.clientWidth;
	var height = (elem.clientHeight <= 200) ? 200 : elem.clientHeight;
	var pixelRatio;

	if (window.devicePixelRatio >= 1.0) {
		pixelRatio = window.devicePixelRatio;
	} else {
		pixelRatio = 1.0;
	}

	if ((VID.width !== width) || (VID.height !== height) || (SCR.devicePixelRatio !== pixelRatio) || (Host.framecount === 0)) {
		VID.width = width;
		VID.height = height;
		VID.mainwindow.width = (width * pixelRatio) >> 0;
		VID.mainwindow.height = (height * pixelRatio) >> 0;
		VID.mainwindow.style.width = width + 'px';
		VID.mainwindow.style.height = height + 'px';
		SCR.devicePixelRatio = pixelRatio;
		SCR.recalc_refdef = true;
	}
};

// noinspection DuplicatedCode
Draw.EndDisc = function() {
	// Sys.DPrint('Draw.EndDisc()');

	if (Draw.loadingElem != null) {
		Draw.loadingElem.style.display = 'none';
	}

	if (Draw.loadingMsg != null) {
		Draw.loadingMsg.style.display = 'none';
	}
};

// noinspection DuplicatedCode
Draw.PicToDataURL = function(pic) {
	// Sys.DPrint(Draw.id, 'PicToDataURL', arguments);

	var canvas = document.createElement('canvas');
	canvas.width = pic.width;
	canvas.height = pic.height;

	var ctx = canvas.getContext('2d');
	var data = ctx.createImageData(pic.width, pic.height);
	var trans = new ArrayBuffer(data.data.length);
	var trans32 = new Uint32Array(trans);
	var i;

	for (i = 0; i < pic.data.length; ++i) {
		trans32[i] = COM.LittleLong(VID.d_8to24table[pic.data[i]] + 0xff000000);
	}

	data.data.set(new Uint8Array(trans));
	ctx.putImageData(data, 0, 0);

	// noinspection JSConstructorReturnsPrimitive
	return canvas.toDataURL();
};