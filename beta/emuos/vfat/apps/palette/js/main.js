// Color Cycling in HTML5 Canvas
// BlendShift Technology conceived, designed and coded by Joseph Huckaby
// Copyright (c) 2001-2002, 2010 Joseph Huckaby.
// Released under the LGPL v3.0: http://www.opensource.org/licenses/lgpl-3.0.html

FrameCount.visible = false;

var CanvasCycle = {

	cookie: new CookieTree(),
	query: parseQueryString( location.href ),
	ctx: null,
	imageData: null,
	clock: 0,
	inGame: false,
	bmp: null,
	globalTimeStart: (new Date()).getTime(),
	inited: false,
	optTween: null,
	winSize: null,
	globalBrightness: 1.0,
	lastBrightness: 0,
	sceneIdx: -1,
	highlightColor: -1,
	defaultMaxVolume: 0.5,

	TL_WIDTH: 80,
	TL_MARGIN: 15,
	OPT_WIDTH: 150,
	OPT_MARGIN: 15,

	settings: {
		showOptions: false,
		targetFPS: 60,
		zoomFull: false,
		blendShiftEnabled: true,
		speedAdjust: 1.0,
		sound: true
	},

	contentSize: {
		width: 640,
		optionsWidth: 0,
		height: 480 + 40,
		scale: 1.0
	},

	init: function() {
		// console.log('init');
		// called when DOM is ready
		if (!this.inited) {
			this.inited = true;
			$('container').style.display = 'block';
			$('d_options').style.display = 'none';
			$('d_timeline').style.display = 'none';

			FrameCount.init();
			this.handleResize();

			var pal_disp = $('palette_display');
			for (var idx = 0, len = 256; idx < len; idx++) {
				var div = document.createElement('div');
				div._idx = idx;
				div.id = 'pal_' + idx;
				div.className = 'palette_color';
				div.onmouseover = function() { CanvasCycle.highlightColor = this._idx; };
				div.onmouseout = function() { CanvasCycle.highlightColor = -1; };
				pal_disp.appendChild( div );
			}
			var div = document.createElement('div');
			div.className = 'clear';
			pal_disp.appendChild( div );

			// pick starting scene
			// var initialSceneIdx = Math.floor( Math.random() * scenes.length );
			// var initialSceneIdx = 0;
			var monthIdx = (new Date()).getMonth();
			var initialSceneIdx = -1;
			for (var idx = 0, len = scenes.length; idx < len; idx++) {
				var scene = scenes[idx];
				if (scene.monthIdx === monthIdx) {
					initialSceneIdx = idx;
					idx = len;
				}
			}
			if (initialSceneIdx === -1) initialSceneIdx = 0;

			// populate scene menu
			var html = '';
			html += '<select id="fe_scene" onChange="CanvasCycle.switchScene(this)">';
			for (var idx = 0, len = scenes.length; idx < len; idx++) {
				var scene = scenes[idx];
				html += '<option value="'+scene.name+'" '+((idx === initialSceneIdx) ? ' selected="selected"' : '')+'>'+scene.title+'</option>';
			}
			html += '</select>';
			$('d_scene_selector').innerHTML = html;

			// read prefs from cookie
			var prefs = this.cookie.get('settings');
			if (!prefs) prefs = {
				showOptions: false,
				targetFPS: 60,
				zoomFull: false,
				blendShiftEnabled: true,
				speedAdjust: 1.0,
				sound: true
			};

			// allow query to override prefs
			for (var key in this.query) {
				prefs[key] = this.query[key];
			}

			if (prefs) {
				if (prefs.showOptions) this.toggleOptions();
				this.setRate( prefs.targetFPS );
				this.setZoom( prefs.zoomFull );
				this.setSpeed( prefs.speedAdjust );
				this.setBlendShift( prefs.blendShiftEnabled );
				this.setSound( prefs.sound );
			}

			// allow query to control sound
			if (location.href.match(/\bsound\=(\d+)/)) {
				this.setSound(!!parseInt(RegExp.$1, 10));
			}

			// start synced to local time
			var now = new Date();
			this.timeOffset = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
			this.updateTimelineDisplay();

			// setup timeline drag
			$('d_tl_thumb').addEventListener('mousedown', function(e) {
				CC.tl_mouseDown = true;
				CC.tl_mouseOriginY = e.pageY;
				CC.tl_timeOrigin = CC.timeOffset;
				e.preventDefault();
				e.stopPropagation();
			}, false );
			window.addEventListener('mouseup', function(e) {
				CC.tl_mouseDown = false;
			}, false );
			window.addEventListener( "mousemove", function(e) {
				if (CC.tl_mouseDown) {
					// visual thumb top range: 8px - 424px (416)
					var yDelta = e.pageY - CC.tl_mouseOriginY;
					CC.timeOffset = CC.tl_timeOrigin + Math.floor(yDelta * (86400 / 416));
					if (CC.timeOffset < 0) CC.timeOffset = 0;
					else if (CC.timeOffset >= 86400) CC.timeOffset = 86399;
					CC.updateTimelineDisplay();
				}
			}, false );

			// keyboard shortcuts
			window.addEventListener('keydown', function(e) {
				if (!e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
					switch (e.keyCode) {
						case 9: // tab
							if (CC.inGame) {
								CC.stop();
								if (CC.audioTrack) {
									try { CC.audioTrack.pause(); } catch(e) {}
								}
							}
							else {
								CC.run();
								if (CC.audioTrack && CC.settings.sound) {
									try { CC.audioTrack.play(); } catch(e) {}
								}
							}
							break;
						case 38: // up arrow
							CC.timeOffset -= 60;
							if (CC.timeOffset < 0) CC.timeOffset += 86400;
							CC.updateTimelineDisplay();
							break;
						case 40: // down arrow
							CC.timeOffset += 60;
							if (CC.timeOffset >= 86400) CC.timeOffset -= 86400;
							CC.updateTimelineDisplay();
							break;
						case 80: // P
							CC.toggleOptions();
							break;
						case 66: // B
							CC.setBlendShift( !CC.settings.blendShiftEnabled );
							break;
					}
					e.preventDefault();
					e.stopPropagation();
				}
			}, false );

			// this.loadImage( scenes[initialSceneIdx].name );

			// load initial scene
			this.sceneIdx = initialSceneIdx;
			this.loadScene( initialSceneIdx );
		}
	},

	updateTimelineDisplay: function() {
		// console.log('updateTimelineDisplay');
		// sync the timeline thumb position to the current time
		$('d_tl_thumb').style.top = '' + Math.floor(8 + (this.timeOffset / (86400 / 416))) + 'px';

		// also update the clocky
		var ampm = 'AM';
		var hour = Math.floor(this.timeOffset / 3600);
		if (hour >= 12) {
			ampm = 'PM';
			if (hour > 12) hour -= 12;
		}
		else if (hour === 0) hour = 12;
		if (hour < 10) hour = '0' + hour;

		var minute = Math.floor( (this.timeOffset / 60) % 60 );
		if (minute < 10) minute = '0' + minute;

		var second = Math.floor( this.timeOffset % 60 );
		if (second < 10) second = '0' + second;

		$('d_tl_clock').innerHTML = '' + hour + ':' + minute + '&nbsp;' + ampm;
	},

	jumpScene: function(dir) {
		// console.log('jumpScene');
		// next or prev scene
		this.sceneIdx += dir;
		if (this.sceneIdx >= scenes.length) this.sceneIdx = 0;
		else if (this.sceneIdx < 0) this.sceneIdx = scenes.length - 1;
		$('fe_scene').selectedIndex = this.sceneIdx;
		this.switchScene( $('fe_scene') );
	},

	switchScene: function(menu) {
		// console.log('switchScene');
		// switch to new scene (grab menu selection)
		this.stopSceneAudio();

		var name = menu.options[menu.selectedIndex].value;
		this.sceneIdx = menu.selectedIndex;

		if (ua.mobile) {
			// no transitions on mobile devices, just switch as fast as possible
			this.inGame = false;

			this.ctx.clearRect(0, 0, this.bmp.width, this.bmp.height);
			this.ctx.fillStyle = "rgb(0,0,0)";
			this.ctx.fillRect (0, 0, this.bmp.width, this.bmp.height);

			CanvasCycle.globalBrightness = 1.0;
			// CanvasCycle.loadImage( name );
			CanvasCycle.loadScene( this.sceneIdx );
		}
		else {
			TweenManager.removeAll({ category: 'scenefade' });
			TweenManager.tween({
				target: { value: this.globalBrightness, newSceneName: name, newSceneIdx: this.sceneIdx },
				duration: Math.floor( this.settings.targetFPS / 2 ),
				mode: 'EaseInOut',
				algo: 'Quadratic',
				props: { value: 0.0 },
				onTweenUpdate: function(tween) {
					CanvasCycle.globalBrightness = tween.target.value;
				},
				onTweenComplete: function(tween) {
					// CanvasCycle.loadImage( tween.target.newSceneName );
					CanvasCycle.loadScene( tween.target.newSceneIdx );
				},
				category: 'scenefade'
			});
		}
	},

	loadScene: function(idx) {
		// console.log('loadScene');
		// load image JSON from the server
		this.stop();
		this.showLoading();

		var scene = scenes[idx];

		//var url = 'image.php?file='+name+'&callback=CanvasCycle.processImage';
		// var url = 'scene.php?file='+scene.name+'&month='+scene.month+'&script='+scene.scpt+'&callback=CanvasCycle.initScene';

		var url = '';

		if (typeof scene.month === 'undefined') {
			url = 'lbm/' + scene.name.toLowerCase() + '.lbm.js';
			$('d_timeline').style.visibility = 'hidden';
		} else {
			url = 'lbm/' + scene.name.toLowerCase() + scene.month.toLowerCase() + '.lbm.js';
			$('d_timeline').style.visibility = 'visible';
		}

		var scr = document.createElement('SCRIPT');
		scr.type = 'text/javascript';
		scr.src = url;
		document.getElementsByTagName('HEAD')[0].appendChild(scr);
	},

	showLoading: function() {
		// console.log('showLoading');
		// show spinning loading indicator
		var loading = $('d_loading');
		var kicker = this.settings.showOptions ? (this.TL_WIDTH + this.TL_MARGIN) : 0;
		loading.style.left = '' + Math.floor( kicker + (((this.contentSize.width * this.contentSize.scale) / 2) - 16) ) + 'px';
		loading.style.top = '' + Math.floor( ((this.contentSize.height * this.contentSize.scale) / 2) - 16 ) + 'px';
		loading.show();
	},

	hideLoading: function() {
		// console.log('hideLoading');
		// hide spinning loading indicator
		$('d_loading').hide();
	},

	processImage: function(img) {
		// console.log('processImage');

		// initialize, receive image data from server
		this.bmp = new Bitmap(img);
		this.bmp.optimize();

		// $('d_debug').innerHTML = img.filename;

		var canvas = $('mycanvas');
		if (!canvas.getContext) return; // no canvas support

		if (!this.ctx) this.ctx = canvas.getContext('2d');
		this.ctx.clearRect(0, 0, this.bmp.width, this.bmp.height);
		this.ctx.fillStyle = "rgb(0,0,0)";
		this.ctx.fillRect (0, 0, this.bmp.width, this.bmp.height);

		if (!this.imageData) {
			if (this.ctx.createImageData) {
				this.imageData = this.ctx.createImageData( this.bmp.width, this.bmp.height );
			}
			else if (this.ctx.getImageData) {
				this.imageData = this.ctx.getImageData( 0, 0, this.bmp.width, this.bmp.height );
			}
			else return; // no canvas data support
		}

		if (ua.mobile) {
			// no transition on mobile devices
			this.globalBrightness = 1.0;
		}
		else {
			this.globalBrightness = 0.0;
			TweenManager.removeAll({ category: 'scenefade' });
			TweenManager.tween({
				target: { value: 0 },
				duration: Math.floor( this.settings.targetFPS / 2 ),
				mode: 'EaseInOut',
				algo: 'Quadratic',
				props: { value: 1.0 },
				onTweenUpdate: function(tween) {
					CanvasCycle.globalBrightness = tween.target.value;
				},
				category: 'scenefade'
			});
		}

		this.startSceneAudio();
	},

	initScene: function(scene) {
		// console.log('initScene');
		// initialize, receive image data from server
		this.initPalettes( scene.palettes );
		this.initTimeline( scene.timeline );

		// force a full palette and pixel refresh for first frame
		this.oldTimeOffset = -1;

		// create an intermediate palette that will hold the time-of-day colors
		this.todPalette = new Palette( scene.base.colors, scene.base.cycles );

		// process base scene image
		this.bmp = new Bitmap(scene.base);
		this.bmp.optimize();

		var canvas = $('mycanvas');
		if (!canvas.getContext) return; // no canvas support

		if (!this.ctx) this.ctx = canvas.getContext('2d');
		this.ctx.clearRect(0, 0, this.bmp.width, this.bmp.height);
		this.ctx.fillStyle = "rgb(0,0,0)";
		this.ctx.fillRect (0, 0, this.bmp.width, this.bmp.height);

		if (!this.imageData) {
			if (this.ctx.createImageData) {
				this.imageData = this.ctx.createImageData( this.bmp.width, this.bmp.height );
			}
			else if (this.ctx.getImageData) {
				this.imageData = this.ctx.getImageData( 0, 0, this.bmp.width, this.bmp.height );
			}
			else return; // no canvas data support
		}
		this.bmp.clear( this.imageData );

		if (ua.mobile) {
			// no transition on mobile devices
			this.globalBrightness = 1.0;
		}
		else {
			this.globalBrightness = 0.0;
			TweenManager.removeAll({ category: 'scenefade' });
			TweenManager.tween({
				target: { value: 0 },
				duration: Math.floor( this.settings.targetFPS / 2 ),
				mode: 'EaseInOut',
				algo: 'Quadratic',
				props: { value: 1.0 },
				onTweenUpdate: function(tween) {
					CanvasCycle.globalBrightness = tween.target.value;
				},
				category: 'scenefade'
			});
		}

		this.startSceneAudio();
	},

	initPalettes: function(pals) {
		// console.log('initPalettes');
		// create palette objects for each raw time-based palette
		var scene = scenes[this.sceneIdx];

		this.palettes = {};
		for (var key in pals) {
			var pal = pals[key];

			if (scene.remap) {
				for (var idx in scene.remap) {
					pal.colors[idx][0] = scene.remap[idx][0];
					pal.colors[idx][1] = scene.remap[idx][1];
					pal.colors[idx][2] = scene.remap[idx][2];
				}
			}

			var palette = this.palettes[key] = new Palette( pal.colors, pal.cycles );
			palette.copyColors( palette.baseColors, palette.colors );
		}
	},

	initTimeline: function(entries) {
		// console.log('initTimeline');
		// create timeline with pointers to each palette
		this.timeline = {};
		for (var offset in entries) {
			var palette = this.palettes[ entries[offset] ];
			if (!palette) return alert("ERROR: Could not locate palette for timeline entry: " + entries[offset]);
			this.timeline[offset] = palette;
		}
	},

	run: function () {
		// console.log('run');
		// start main loop
		if (!this.inGame) {
			this.inGame = true;
			this.animate();
		}
	},

	stop: function() {
		// console.log('stop');
		// stop main loop
		this.inGame = false;
	},

	animate: function() {
		// console.log('animate');
		// animate one frame. and schedule next
		if (this.inGame) {
			var colors = this.bmp.palette.colors;

			if (this.settings.showOptions) {
				for (var idx = 0, len = colors.length; idx < len; idx++) {
					var clr = colors[idx];
					var div = $('pal_'+idx);
					div.style.backgroundColor = 'rgb(' + clr.red + ',' + clr.green + ',' + clr.blue + ')';
				}

				// if (this.clock % this.settings.targetFPS == 0) $('d_debug').innerHTML = 'FPS: ' + FrameCount.current;
				$('d_debug').innerHTML = 'FPS: ' + FrameCount.current + ((this.highlightColor !== -1) ? (' - Color #' + this.highlightColor) : '');
			}

			var optimize = true;
			var newSec = FrameCount.count();

			if (newSec && !this.tl_mouseDown) {
				// advance time
				this.timeOffset++;
				if (this.timeOffset >= 86400) this.timeOffset = 0;
				this.updateTimelineDisplay();
			}

			if (this.timeOffset !== this.oldTimeOffset && typeof scenes[this.sceneIdx].month !== 'undefined') {
				// calculate time-of-day base colors
				this.setTimeOfDayPalette();
				optimize = false;
			}

			if (this.lastBrightness !== this.globalBrightness) optimize = false;
			if (this.highlightColor !== this.lastHighlightColor) optimize = false;

			// cycle palette
			this.bmp.palette.cycle( this.bmp.palette.baseColors, GetTickCount(), this.settings.speedAdjust, this.settings.blendShiftEnabled );

			if (this.highlightColor > -1) {
				this.bmp.palette.colors[ this.highlightColor ] = new Color(0, 0, 0);
			}
			if (this.globalBrightness < 1.0) {
				// bmp.palette.fadeToColor( pureBlack, 1.0 - globalBrightness, 1.0 );
				this.bmp.palette.burnOut( 1.0 - this.globalBrightness, 1.0 );
			}

			// render pixels
			this.bmp.render( this.imageData, optimize );
			this.ctx.putImageData( this.imageData, 0, 0 );

			this.lastBrightness = this.globalBrightness;
			this.lastHighlightColor = this.highlightColor;
			this.oldTimeOffset = this.timeOffset;

			TweenManager.logic( this.clock );
			this.clock++;
			this.scaleAnimate();

			if (this.inGame) {
				// setTimeout( function() { CanvasCycle.animate(); }, 1 );
				requestAnimationFrame( function() { CanvasCycle.animate(); } );
			}
		}
	},

	setTimeOfDayPalette: function() {
		// console.log('setTimeOfDayPalette');
		// fade palette to proper time-of-day

		// locate nearest timeline palette before, and after current time
		// auto-wrap to find nearest out-of-bounds events (i.e. tomorrow and yesterday)
		var before = {
			palette: null,
			dist: 86400,
			offset: 0
		};
		for (var offset in this.timeline) {
			if ((offset <= this.timeOffset) && ((this.timeOffset - offset) < before.dist)) {
				before.dist = this.timeOffset - offset;
				before.palette = this.timeline[offset];
				before.offset = offset;
			}
		}
		if (!before.palette) {
			// no palette found, so wrap around and grab one with highest offset
			var temp = 0;
			for (var offset in this.timeline) {
				if (offset > temp) temp = offset;
			}
			before.palette = this.timeline[temp];
			before.offset = temp - 86400; // adjust timestamp for day before
		}

		var after = {
			palette: null,
			dist: 86400,
			offset: 0
		};
		for (var offset in this.timeline) {
			if ((offset >= this.timeOffset) && ((offset - this.timeOffset) < after.dist)) {
				after.dist = offset - this.timeOffset;
				after.palette = this.timeline[offset];
				after.offset = offset;
			}
		}
		if (!after.palette) {
			// no palette found, so wrap around and grab one with lowest offset
			var temp = 86400;
			for (var offset in this.timeline) {
				if (offset < temp) temp = offset;
			}
			after.palette = this.timeline[temp];
			after.offset = temp + 86400; // adjust timestamp for day after
		}

		// copy the 'before' palette colors into our intermediate palette
		this.todPalette.copyColors( before.palette.baseColors, this.todPalette.colors );

		// now, fade to the 'after' palette, but calculate the correct 'tween' time
		this.todPalette.fade( after.palette, this.timeOffset - before.offset, after.offset - before.offset );

		// finally, copy the final colors back to the bitmap palette for cycling and rendering
		this.bmp.palette.importColors( this.todPalette.colors );
	},

	scaleAnimate: function() {
		// console.log('scaleAnimate');
		// handle scaling image up or down
		if (this.settings.zoomFull) {
			// scale up to full size
			var totalNativeWidth = this.contentSize.width + this.contentSize.optionsWidth;
			var maxScaleX = (this.winSize.width - 30) / totalNativeWidth;

			var totalNativeHeight = this.contentSize.height;
			var maxScaleY = (this.winSize.height - 30) / totalNativeHeight;

			var maxScale = Math.min( maxScaleX, maxScaleY );

			if (this.contentSize.scale !== maxScale) {
				this.contentSize.scale += ((maxScale - this.contentSize.scale) / 8);
				if (Math.abs(this.contentSize.scale - maxScale) < 0.001) this.contentSize.scale = maxScale; // close enough

				var sty = $('mycanvas').style;

				if (ua.webkit) sty.webkitTransform = 'translate3d(0px, 0px, 0px) scale('+this.contentSize.scale+')';
				else if (ua.ff) sty.MozTransform = 'scale('+this.contentSize.scale+')';
				else if (ua.op) sty.OTransform = 'scale('+this.contentSize.scale+')';
				else sty.transform = 'scale('+this.contentSize.scale+')';

				sty.marginRight = '' + Math.floor( (this.contentSize.width * this.contentSize.scale) - this.contentSize.width ) + 'px';
				$('d_header').style.width = '' + Math.floor(this.contentSize.width * this.contentSize.scale) + 'px';
				this.repositionContainer();
			}
		}
		else {
			// scale back down to native
			if (this.contentSize.scale > 1.0) {
				this.contentSize.scale += ((1.0 - this.contentSize.scale) / 8);
				if (this.contentSize.scale < 1.001) this.contentSize.scale = 1.0; // close enough

				var sty = $('mycanvas').style;

				if (ua.webkit) sty.webkitTransform = 'translate3d(0px, 0px, 0px) scale('+this.contentSize.scale+')';
				else if (ua.ff) sty.MozTransform = 'scale('+this.contentSize.scale+')';
				else if (ua.op) sty.OTransform = 'scale('+this.contentSize.scale+')';
				else sty.transform = 'scale('+this.contentSize.scale+')';

				sty.marginRight = '' + Math.floor( (this.contentSize.width * this.contentSize.scale) - this.contentSize.width ) + 'px';
				$('d_header').style.width = '' + Math.floor(this.contentSize.width * this.contentSize.scale) + 'px';
				this.repositionContainer();
			}
		}
	},

	repositionContainer: function() {
		// console.log('repositionContainer');
		// reposition container element based on inner window size
		var div = $('container');
		if (div) {
			this.winSize = getInnerWindowSize();
			div.style.left = '' + Math.floor((this.winSize.width / 2) - (((this.contentSize.width * this.contentSize.scale) + this.contentSize.optionsWidth) / 2)) + 'px';
			div.style.top = '' + Math.floor((this.winSize.height / 2) - ((this.contentSize.height * this.contentSize.scale) / 2)) + 'px';
		}
	},

	handleResize: function() {
		// console.log('handleResize');
		// called when window resizes
		this.repositionContainer();
		if (this.settings.zoomFull) this.scaleAnimate();
	},

	saveSettings: function() {
		// console.log('saveSettings');
		// save settings in cookie
		this.cookie.set( 'settings', this.settings );
		this.cookie.save();
	},

	startSceneAudio: function() {
		// console.log('startSceneAudio');
		// start audio for current scene, if applicable
		var scene = scenes[ this.sceneIdx ];
		if (scene.sound && this.settings.sound && window.Audio) {
			if (this.audioTrack) {
				try { this.audioTrack.pause(); } catch(e) {}
			}
			TweenManager.removeAll({ category: 'audio' });

			var ext = (ua.ff || ua.op) ? 'ogg' : 'mp3';
			var track = this.audioTrack = new Audio( 'audio/' + scene.sound + '.' + ext );
			track.volume = 0;
			track.loop = true;
			track.autobuffer = false;
			track.autoplay = true;

			track.addEventListener('canplaythrough', function() {
				track.play();
				TweenManager.tween({
					target: track,
					duration: Math.floor( CanvasCycle.settings.targetFPS * 2 ),
					mode: 'EaseOut',
					algo: 'Linear',
					props: { volume: scene.maxVolume || CanvasCycle.defaultMaxVolume },
					category: 'audio'
				});
				CanvasCycle.hideLoading();
				CanvasCycle.run();
			}, false);

			if (ua.iphone || ua.ipad) {
				// these may support audio, but just don't invoke events
				// try to force it
				setTimeout( function() {
					track.play();
					track.volume = 1.0;
					CanvasCycle.hideLoading();
					CanvasCycle.run();
				}, 1000 );
			}

			if (ua.ff || ua.mobile) {
				// loop doesn't seem to work on FF or mobile devices, so let's force it
				track.addEventListener('ended', function() {
					track.currentTime = 0;
					track.play();
				}, false);
			}

			track.load();
		} // sound enabled and supported
		else {
			// no sound for whatever reason, so just start main loop
			this.hideLoading();
			this.run();
		}
	},

	stopSceneAudio: function() {
		// console.log('stopSceneAudio');
		// fade out and stop audio for current scene
		var scene = scenes[ this.sceneIdx ];
		if (scene.sound && this.settings.sound && window.Audio && this.audioTrack) {
			var track = this.audioTrack;

			if (ua.iphone || ua.ipad) {
				// no transition here, so just stop sound
				track.pause();
			}
			else {
				TweenManager.removeAll({ category: 'audio' });
				TweenManager.tween({
					target: track,
					duration: Math.floor( CanvasCycle.settings.targetFPS / 2 ),
					mode: 'EaseOut',
					algo: 'Linear',
					props: { volume: 0 },
					onTweenComplete: function(tween) {
						// ff has weird delay with volume fades, so allow sound to continue
						// will be stopped when next one starts
						if (!ua.ff) track.pause();
					},
					category: 'audio'
				});
			}
		}
	},

	toggleOptions: function() {
		// console.log('toggleOptions');
		var startValue, endValue;
		TweenManager.removeAll({ category: 'options' });

		if (!this.settings.showOptions) {
			startValue = 0;
			if (this.optTween) startValue = this.optTween.target.value;
			endValue = 1.0;
			$('d_options').style.display = '';
			$('d_options').style.opacity = startValue;
			$('btn_options_toggle').innerHTML = '&#x00AB; Hide Options';

			$('d_timeline').style.width = '0px';
			$('d_timeline').style.display = '';
			$('d_timeline').style.opacity = startValue;
		}
		else {
			startValue = 1.0;
			if (this.optTween) startValue = this.optTween.target.value;
			endValue = 0;
			$('btn_options_toggle').innerHTML = 'Show Options &#x00BB;';
		}

		this.optTween = TweenManager.tween({
			target: { value: startValue },
			duration: Math.floor( this.settings.targetFPS / 3 ),
			mode: 'EaseOut',
			algo: 'Quadratic',
			props: { value: endValue },
			onTweenUpdate: function(tween) {
				// $('d_options').style.left = '' + Math.floor(tween.target.value - 150) + 'px';
				$('d_options').style.opacity = tween.target.value;
				$('btn_options_toggle').style.left = '' + Math.floor(tween.target.value * 128) + 'px';

				var tl_sty = $('d_timeline').style;
				tl_sty.opacity = tween.target.value;
				tl_sty.width = '' + Math.floor(tween.target.value * CC.TL_WIDTH) + 'px';
				tl_sty.marginRight = '' + Math.floor(tween.target.value * CC.TL_MARGIN) + 'px';

				$('d_header').style.marginLeft = '' + Math.floor(tween.target.value * (CC.TL_WIDTH + CC.TL_MARGIN)) + 'px';

				CanvasCycle.contentSize.optionsWidth = Math.floor( tween.target.value * (CC.OPT_WIDTH + CC.OPT_MARGIN + CC.TL_WIDTH + CC.TL_MARGIN) );
				CanvasCycle.handleResize();
			},
			onTweenComplete: function(tween) {
				if (tween.target.value === 0) {
					$('d_options').style.display = 'none';
					$('d_timeline').style.display = 'none';
				}
				CanvasCycle.optTween = null;
			},
			category: 'options'
		});

		this.settings.showOptions = !this.settings.showOptions;
		this.saveSettings();
	},

	setZoom: function(enabled) {
		// console.log('setZoom');
		if (enabled !== this.settings.zoomFull) {
			this.settings.zoomFull = enabled;
			this.saveSettings();
			$('btn_zoom_actual').setClass('selected', !enabled);
			$('btn_zoom_max').setClass('selected', enabled);
		}
	},

	setSound: function(enabled) {
		// console.log('setSound');
		$('btn_sound_on').setClass('selected', enabled);
		$('btn_sound_off').setClass('selected', !enabled);
		this.settings.sound = enabled;

		if (this.sceneIdx > -1) {
			if (enabled) {
				// enable sound
				if (this.audioTrack) this.audioTrack.play();
				else this.startSceneAudio();
			}
			else {
				// disable sound
				if (this.audioTrack) this.audioTrack.pause();
			}
		}

		this.saveSettings();
	},

	setRate: function(rate) {
		// console.log('setRate');
		/* $('btn_rate_30').setClass('selected', rate == 30);
		$('btn_rate_60').setClass('selected', rate == 60);
		$('btn_rate_90').setClass('selected', rate == 90); */
		this.settings.targetFPS = rate;
		this.saveSettings();
	},

	setSpeed: function(speed) {
		// console.log('setSpeed');
		$('btn_speed_025').setClass('selected', speed === 0.25);
		$('btn_speed_05').setClass('selected', speed === 0.5);
		$('btn_speed_1').setClass('selected', speed === 1);
		$('btn_speed_2').setClass('selected', speed === 2);
		$('btn_speed_4').setClass('selected', speed === 4);
		this.settings.speedAdjust = speed;
		this.saveSettings();
	},

	setBlendShift: function(enabled) {
		// console.log('setBlendShift');
		$('btn_blendshift_on').setClass('selected', enabled);
		$('btn_blendshift_off').setClass('selected', !enabled);
		this.settings.blendShiftEnabled = enabled;
		this.saveSettings();
	}
};

var CC = CanvasCycle; // shortcut