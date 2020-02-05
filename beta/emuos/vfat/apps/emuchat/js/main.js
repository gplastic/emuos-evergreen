// noinspection ThisExpressionReferencesGlobalObjectJS,JSUnusedLocalSymbols,DuplicatedCode
(function(global) {
	console.log('╔═╗╔╦╗╦ ╦╔═╗╔═╗╔╦═╗╦╔═╗\n' +
				'╠═ ║║║║ ║╠═╝╠═  ║ ║║╠═╣\n' +
				'╚═╝╩ ╩╚═╝╩  ╚═╝═╩═╝╩╩ ╩');

	// noinspection JSUnusedLocalSymbols,DuplicatedCode
	define('optional', [], {
		load: function(name, req, onload, config) {
			var onLoadSuccess = function(moduleInstance) {
				onload(moduleInstance);
			};

			var onLoadFailure = function(err) {
				var failedId = err.requireModules && err.requireModules[0];
				console.warn('Could not load optional module: ' + failedId);

				requirejs.undef(failedId);

				// noinspection JSRedundantSwitchStatement
				switch (failedId) {
					default:
						define(failedId, [], function(){return {};});
						break;
				}

				req([failedId], onLoadSuccess);
			};

			req([name], onLoadSuccess, onLoadFailure);
		},
		normalize: function (name, normalize) {
			return normalize(name);
		}
	});

	// noinspection JSFileReferences
	requirejs.config({
		urlArgs: 'rand=' + (new Date()).getTime(),
		waitSeconds: 300,
		paths: {
			fingerprint: '../../../../js/libraries/fingerprint-0.5.3',
			jquery: '../../../../js/libraries/jquery-2.2.4.min',
			jquerymousewheel: '../../../../js/libraries/jquery-mousewheel-3.1.13',
			jqueryui: '../../../../js/libraries/jquery-ui-1.11.4.min',
			jqueryuicontextmenu: '../../../../js/libraries/jquery-ui-contextmenu-1.18.1.min',
			jquerycustomscrollbar: '../../../../js/libraries/jquery-customscrollbar-3.1.5.min',
			jqyeryajaxretry: '../../../../js/libraries/jquery-ajax-retry-0.2.8.min',
			json: '../../../../js/libraries/requirejs-json-1.0.3',
			moment: '../../../../js/libraries/moment-2.24.0.min',
			'moment-timezone': '../../../../js/libraries/moment-timezone-0.5.27.min',
			network: '../../../../js/network',
			noext: '../../../../js/libraries/requirejs-noext-1.0.3',
			simplestorage: '../../../../js/libraries/simplestorage-0.2.1.min',
			socketio: '../../../../js/libraries/socket.io-2.3.0.min',
			text: '../../../../js/libraries/requirejs-text-2.0.15'
		},
		shim: {
			chat: {
				deps: ['jquery', 'simplestorage', 'fingerprint', 'network']
			},
			fingerprint: {
				exports: 'Fingerprint'
			},
			jquerymousewheel: {
				deps: ['jquery']
			},
			jqueryui: {
				deps: ['jquery']
			},
			jqueryuicontextmenu: {
				deps: ['jqueryui']
			},
			jquerycustomscrollbar: {
				deps: ['jquerymousewheel']
			},
			network: {
				deps: ['socketio']
			},
			'moment-timezone': {
				exports: 'moment',
				deps: ['moment']
			}
		},
		map: {
			'*': {
				io: 'socketio',
				'socket.io': 'socketio'
			}
		}
	});

	// noinspection JSCheckFunctionSignatures,JSUnusedLocalSymbols,DuplicatedCode
	requirejs([
		'jquery',
		'simplestorage',
		'network',
		'fingerprint'
	], function($, simplestorage, network, Fingerprint) {
		// noinspection DuplicatedCode
		$(function() {
			var net = network.start({
				servers: ['https://ws.emupedia.net/'],
				server: 0,
				mode: 0
			});

			var fingerprint = new Fingerprint().get();

			net.colors = ['rgba(180, 173, 173, 0.973)', '#395fa4', '#159904', 'rgba(128, 128, 128, 0.35)'];

			net.normalize = function(str) {
				return $('<div />').text(str.replace(/[\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F\u0483-\u0486\u05C7\u0610-\u061A\u0656-\u065F\u0670\u06D6-\u06ED\u0711\u0730-\u073F\u0743-\u074A\u0F18-\u0F19\u0F35\u0F37\u0F72-\u0F73\u0F7A-\u0F81\u0F84\u0e00-\u0eff\uFC5E-\uFC62]{2,}/gi, '')).html();
			};

			// noinspection DuplicatedCode
			net.log = function (txt, color) {
				if (typeof color === 'undefined') {
					color = 0;
				}

				if (!net.output_div.length) {
					if (net.config.mode === 1) {
						console.log(txt);
					}

					return false;
				}

				var colors = net.colors;

				color = typeof colors[color] !== 'undefined' ? 'style="color:' + colors[color] + '"' : '';

				if (typeof txt === 'object') {
					// noinspection HtmlDeprecatedTag
					txt = '<br><xmp>' + JSON.stringify(txt, null, 2) + '</xmp>';
				}

				var d = new Date();

				var time_stamp = [
					'<span style="color:' + colors[1] + ';">[',
					('0' + d.getHours()).slice(-2),
					':',
					('0' + d.getMinutes()).slice(-2),
					':',
					('0' + d.getSeconds()).slice(-2),
					']&nbsp;</span>'
				].join('');

				net.output_div.append('<div ' + color + '>' + time_stamp + txt + '</div>');
				net.output_div.get(0).scrollTop = net.output_div.get(0).scrollHeight;
			};

			// noinspection DuplicatedCode
			net.send_input = function() {
				var timestamp = Math.floor(Date.now() / 1000);

				if (!net.last_send) {
					net.last_send = 0;
				}

				if (!net.spam_cap) {
					net.spam_cap = 0;
				}

				if (timestamp - net.last_send < 2) {
					net.spam_cap++;
				} else {
					if (net.spam_cap > 10) {
						if (timestamp - net.last_send < 10) {
							return false;
						}
					}

					net.spam_cap = 0;
				}

				if (net.spam_cap > 10) {
					return false;
				}

				net.last_send = timestamp;

				var msg = net.text_input.val();

				if (msg.trim() === '') {
					return false;
				}

				if (msg.charAt(0) === '/') {
					var data = {
						cmd: '',
						data: ''
					};

					msg = msg.substr(1).split(' ');
					data.cmd = msg.shift();
					data.data = msg.join(' ');

					while (data.data.charAt(0) === ' ') {
						data.data = data.data.substr(1);
					}

					if ((data.data.charAt(0) === '[') || (data.data.charAt(0) === '{')) {
						try {
							eval('var json_data=' + data.data);
						} catch (e) {
							var json_data = data.data;
						}

						data.data = json_data;
					}

					net.send_cmd(data.cmd, data.data);
				} else {
					net.send_cmd('room_msg', msg);
				}

				net.text_input.val('');
			};

			// noinspection DuplicatedCode
			net.socket.on('connect', function(data) {
				var nickname = typeof simplestorage.get('nickname') !== 'undefined' ? net.normalize(simplestorage.get('nickname')) : 'EMU-' + fingerprint;
				var server = typeof data !== 'undefined' ? data.server : net.server;
				// noinspection JSUnresolvedVariable
				var socket_id = typeof data !== 'undefined' ? data.socket_id : net.socket.id;

				net.send_cmd('auth', {user: nickname, room: 'Emupedia'});
				net.chat_id = '<span style="color: #2c487e;">[' + socket_id + '] </span>';
				net.log('[connected][' + server + '] [id][' + socket_id + ']', 0);

				if (~nickname.indexOf('EMU-')) {
					net.log(net.normalize('Type /nick <nickname> to set your name'), 0);
				}
			});

			net.socket.on('disconnect', function() {
				net.log('[disconnected][' + net.server + ']', 0);
			});

			net.socket.on('auth.info', function (data) {
				simplestorage.set('nickname', net.normalize(data.info.user));
			});

			// noinspection DuplicatedCode
			net.socket.on('room.info', function (data) {
				var r_users = '';

				for (var n in data.users) {
					var color = (n !== data.me) ? net.colors[3] : net.colors[1];
					// noinspection JSUnfilteredForInLoop
					var name = net.normalize(n);
					// noinspection JSUnfilteredForInLoop
					r_users += '<div id="room_user_' + name + '" style="color: ' + color + '; overflow: hidden;">' + name + '</div>';
				}

				net.client_room_users.html(r_users);
				net.text_input.attr('placeholder', 'Press "`" (tilda) to Show / Hide chat. You are Typing as "' + net.normalize(data.me) + '" on "' + data.name + '"');
				net.client_room_users.html(r_users);
				net.client_room.html(data.name);
			});

			net.socket.on('room.user_join', function (data) {
				var name = net.normalize(data.user);
				net.client_room_users.append('<div id="room_user_' + name + '" style="color: ' + net.colors[3] + ';">' + name + '</div>');
			});

			net.socket.on('room.user_leave', function (data) {
				$('#room_user_' + net.normalize(data.user)).remove();
			});

			net.socket.on('room.msg', function (data) {
				net.log('<span style="color: ' + net.colors[3] + '; overflow: hidden;">[' + net.normalize(data.user) + '] </span>' + net.normalize(data.msg));
			});

			net.socket.on('server.msg', function (data) {
				net.log(data, 2);
			});

			net.socket.on('silent.msg', function (data) {
				net.log(data, 1);
			});

			// noinspection DuplicatedCode
			net.socket.on('server.help', function (data) {
				var msg = '';

				for (var n in data) {
					// noinspection JSUnfilteredForInLoop
					msg += '<a class="do_cmd" style="cursor: pointer; color: ' + net.colors[2] + ';">/' + data[n] + ' </a> ';
				}

				net.log(msg);

				$('.do_cmd').off('click').on('click', function() {
					net.text_input.val($(this).html());
					net.text_input.focus();
				});
			});

			var network_ui = '<div id="client_console" class="client_decoration">' +
								'<div id="client_output" class="client_decoration client_left"></div>' +
								'<div class="client_decoration client_right">' +
									'<div id="client_room" class="client_decoration"></div>' +
									'<div id="client_room_users" class="client_decoration"></div>' +
								'</div>' +
								'<div id="client_input" class="client_decoration">' +
									'<input id="client_command" type="text" spellcheck="false" autocomplete="off" /><button id="client_command_send">Send</button>' +
								'</div>' +
							'</div>';

			var $body = $('body');

			$body.append(network_ui);

			net.console = $('#client_console');
			net.text_input = $('#client_command');
			net.text_input_button = $('#client_command_send');
			net.output_div = $('#client_output');
			net.client_room_users = $('#client_room_users');
			net.client_room = $('#client_room');
			net.text_input.off('keypress').on('keypress', function (e) {
				if (e.which === 13) {
					net.send_input();
				}
			});
			net.text_input_button.off('click').on('click', function() {
				net.send_input();
			});
		});
	});
} (this));