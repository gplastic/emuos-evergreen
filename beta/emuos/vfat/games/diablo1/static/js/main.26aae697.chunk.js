(window.webpackJsonp = window.webpackJsonp || []).push([[1], {
	25: function (e, t, n) {
		e.exports = function () {
			return new Worker("./9232376d1969e7a9ebae.worker.js")
		}
	}, 30: function (e, t, n) {
		e.exports = n(62)
	}, 36: function (e, t, n) {
	}, 37: function (e, t, n) {
	}, 62: function (e, t, n) {
		"use strict";
		n.r(t);
		var a = n(0), o = n.n(a), r = n(21), s = n.n(r), i = (n(36), Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));

		function c(e, t) {
			navigator.serviceWorker.register(e).then(function (e) {
				e.onupdatefound = function () {
					var n = e.installing;
					null != n && (n.onstatechange = function () {
						"installed" === n.state && (navigator.serviceWorker.controller ? (console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."), t && t.onUpdate && t.onUpdate(e)) : (console.log("Content is cached for offline use."), t && t.onSuccess && t.onSuccess(e)))
					})
				}
			}).catch(function (e) {
				console.error("Error during service worker registration:", e)
			})
		}

		var u = n(6), l = n(22), d = n(23), h = n(27), f = n(24), p = n(5), v = n(28), m = n(29), b = (n(37), n(7)), g = n.n(b), y = n(11), w = n(9), k = n(1), x = n.n(k), E = n(4), M = n(2), C = n(25), D = n.n(C);
		var T = n(26), B = n.n(T), P = 50274091;

		function L(e, t) {
			return _.apply(this, arguments)
		}

		function _() {
			return (_ = Object(M.a)(x.a.mark(function e(t, n) {
				var a, o, r;
				return x.a.wrap(function (e) {
					for (; ;) switch (e.prev = e.next) {
						case 0:
							if (!(a = n.files.get("spawn.mpq")) || a.byteLength === P) {
								e.next = 6;
								break
							}
							return n.files.delete("spawn.mpq"), e.next = 5, n.delete("spawn.mpq");
						case 5:
							a = null;
						case 6:
							if (a) {
								e.next = 15;
								break
							}

							return e.next = 9, new Promise(function(resolve, reject) {
								var dbx = new Dropbox.Dropbox({accessToken: window['DROPBOX_TOKEN'], fetch: fetch});
								dbx.filesGetTemporaryLink({path: '/diablo1/SPAWN.MPQ'}).then(function (response) {
									resolve(B.a.request({
										url: response.link, responseType: "arraybuffer", onDownloadProgress: function (e) {
											t.onProgress && t.onProgress({text: "Downloading...", loaded: e.loaded, total: e.total || P})
										}, headers: {"Cache-Control": "max-age=31536000"}
									}));
								}).catch(function (error) {
									reject(error);
								});
							});
						case 9:
							if ((o = e.sent).data.byteLength === P) {
								e.next = 12;
								break
							}
							throw Error("Invalid spawn.mpq size. Try clearing cache and refreshing the page.");
						case 12:
							r = new Uint8Array(o.data), n.files.set("spawn.mpq", r), n.update("spawn.mpq", r.slice());
						case 15:
							return e.abrupt("return", n);
						case 16:
						case"end":
							return e.stop()
					}
				}, e)
			}))).apply(this, arguments)
		}

		function S(e, t, n) {
			var a = n.bitmap, o = n.images, r = n.text, s = n.clip, i = n.belt;
			if (a) t.transferFromImageBitmap(a); else {
				var c = !0, u = !1, l = void 0;
				try {
					for (var d, h = o[Symbol.iterator](); !(c = (d = h.next()).done); c = !0) {
						var f = d.value, p = f.x, v = f.y, m = f.w, b = f.h, g = f.data, y = t.createImageData(m, b);
						y.data.set(g), t.putImageData(y, p, v)
					}
				} catch (K) {
					u = !0, l = K
				} finally {
					try {
						c || null == h.return || h.return()
					} finally {
						if (u) throw l
					}
				}
				if (r.length) {
					if (t.save(), t.font = "bold 13px Times New Roman", s) {
						var w = s.x0, k = s.y0, x = s.x1, E = s.y1;
						t.beginPath(), t.rect(w, k, x - w, E - k), t.clip()
					}
					var M = !0, C = !1, D = void 0;
					try {
						for (var T, B = r[Symbol.iterator](); !(M = (T = B.next()).done); M = !0) {
							var P = T.value, L = P.x, _ = P.y, S = P.text, A = P.color, j = A >> 16 & 255, O = A >> 8 & 255, N = 255 & A;
							t.fillStyle = "rgb(".concat(j, ", ").concat(O, ", ").concat(N, ")"), t.fillText(S, L, _ + 22)
						}
					} catch (K) {
						C = !0, D = K
					} finally {
						try {
							M || null == B.return || B.return()
						} finally {
							if (C) throw D
						}
					}
					t.restore()
				}
			}
			e.updateBelt(i)
		}

		function A() {
			return (A = Object(M.a)(x.a.mark(function e(t, n, a) {
				var o, r, s, i;
				return x.a.wrap(function (e) {
					for (; ;) switch (e.prev = e.next) {
						case 0:
							return e.next = 2, t.fs;
						case 2:
							if (o = e.sent, r = !0, !a) {
								e.next = 8;
								break
							}
							a.name.match(/^spawn\.mpq$/i) || (r = !1, o.files.delete("spawn.mpq")), e.next = 10;
							break;
						case 8:
							return e.next = 10, L(t, o);
						case 10:
							return s = null, i = !1, s = t.canvas.getContext("2d", {alpha: !1}), e.next = 14, new Promise(function (e, c) {
								try {
									var l = new D.a;
									l.addEventListener("message", function (a) {
										var r = a.data;
										switch (r.action) {
											case"loaded":
												e(function (e) {
													for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) n[a - 1] = arguments[a];
													return l.postMessage({action: "event", func: e, params: n})
												});
												break;
											case"render":
												S(t, s, r.batch);
												break;
											case"audio":
												n[r.func].apply(n, Object(u.a)(r.params));
												break;
											case"audioBatch":
												var i = !0, d = !1, h = void 0;
												try {
													for (var f, p = r.batch[Symbol.iterator](); !(i = (f = p.next()).done); i = !0) {
														var v = f.value, m = v.func, b = v.params;
														n[m].apply(n, Object(u.a)(b))
													}
												} catch (g) {
													d = !0, h = g
												} finally {
													try {
														i || null == p.return || p.return()
													} finally {
														if (d) throw h
													}
												}
												break;
											case"fs":
												o[r.func].apply(o, Object(u.a)(r.params));
												break;
											case"cursor":
												t.setCursorPos(r.x, r.y);
												break;
											case"keyboard":
												t.openKeyboard(r.open);
												break;
											case"error":
												n.stop_all(), t.onError(r.error, r.stack);
												break;
											case"failed":
												c(Error(r.stack || r.error));
												break;
											case"progress":
												t.onProgress({text: r.text, loaded: r.loaded, total: r.total});
												break;
											case"exit":
												t.onExit();
												break;
											case"current_save":
												t.setCurrentSave(r.name)
										}
									});
									var d = [], h = !0, f = !1, p = void 0;
									try {
										for (var v, m = o.files[Symbol.iterator](); !(h = (v = m.next()).done); h = !0) {
											var b = v.value, g = Object(E.a)(b, 2)[1];
											d.push(g.buffer)
										}
									} catch (y) {
										f = !0, p = y
									} finally {
										try {
											h || null == m.return || m.return()
										} finally {
											if (f) throw p
										}
									}
									l.postMessage({action: "init", files: o.files, mpq: a, spawn: r, offscreen: i}, d), delete o.files
								} catch (w) {
									c(w)
								}
							});
						case 14:
							return e.abrupt("return", e.sent);
						case 15:
						case"end":
							return e.stop()
					}
				}, e)
			}))).apply(this, arguments)
		}

		function j(e, t) {
			return function (e, t, n) {
				return A.apply(this, arguments)
			}(e, function () {
				var e = window.AudioContext || window.webkitAudioContext;
				if (!e) return {
					create_sound: function () {
						return 0
					}, duplicate_sound: function () {
						return 0
					}, play_sound: function () {
					}, set_volume: function () {
					}, stop_sound: function () {
					}, delete_sound: function () {
					}
				};
				var t = null;
				try {
					t = new e
				} catch (a) {
				}
				var n = new Map;
				return {
					create_sound: function (e, a, o, r, s) {
						if (t) {
							for (var i = t.createBuffer(r, o, s), c = 0; c < r; ++c) i.copyToChannel(a.subarray(c * o, c * o + o), c);
							n.set(e, {buffer: i, gain: t.createGain(), panner: new StereoPannerNode(t, {pan: 0})})
						}
					}, duplicate_sound: function (e, a) {
						if (t) {
							var o = n.get(a);
							o && n.set(e, {buffer: o.buffer, gain: t.createGain(), panner: new StereoPannerNode(t, {pan: 0})})
						}
					}, play_sound: function (e, a, o, r) {
						var s = n.get(e);
						if (s) {
							s.source && s.source.stop(), s.gain.gain.value = Math.pow(2, a / 1e3);
							var i = Math.pow(2, o / 1e3);
							s.panner.pan.value = 1 - 2 / (1 + i), s.source = t.createBufferSource(), s.source.buffer = s.buffer, s.source.loop = !!r, s.source.connect(s.gain).connect(s.panner).connect(t.destination), s.source.start()
						}
					}, set_volume: function (e, t) {
						var a = n.get(e);
						a && (a.gain.gain.value = Math.pow(2, t / 1e3))
					}, stop_sound: function (e) {
						var t = n.get(e);
						t && t.source && (t.source.stop(), delete t.source)
					}, delete_sound: function (e) {
						var t = n.get(e);
						t && t.source && t.source.stop(), n.delete(e)
					}, stop_all: function () {
						var e = !0, a = !1, o = void 0;
						try {
							for (var r, s = n[Symbol.iterator](); !(e = (r = s.next()).done); e = !0) {
								var i = r.value, c = Object(E.a)(i, 2)[1];
								c.source && c.source.stop()
							}
						} catch (u) {
							a = !0, o = u
						} finally {
							try {
								e || null == s.return || s.return()
							} finally {
								if (a) throw o
							}
						}
						n.clear(), t = null
					}
				}
			}(), t)
		}

		function O(e, t) {
			var n = e.stack || e.message || "Unknown error", a = new URL("https://github.com/d07RiV/diabloweb/issues/new");
			return a.searchParams.set("body", "**Description:**\n[Please describe what you were doing before the error occurred]\n\n**App version:**\nDiabloWeb ".concat("1.0.13", " (").concat(t ? "Retail" : "Shareware", ")\n\n**Error message:**\n    \n").concat(n.split("\n").map(function (e) {
				return "    " + e
			}).join("\n"), "\n")), a.toString()
		}

		//y.a.initialize("UA-43123589-6"), y.a.pageview("/");
		var N = 0, K = 1, R = function (e) {
			var t = e.children, n = Object(m.a)(e, ["children"]);
			return o.a.createElement("a", Object.assign({target: "_blank", rel: "noopener noreferrer"}, n), t)
		}, U = function (e) {
			function t(e) {
				var n;
				return Object(l.a)(this, t), (n = Object(h.a)(this, Object(f.a)(t).call(this, e))).files = new Map, n.state = {started: !1, loading: !1, touch: !1, dropping: 0, has_spawn: !1}, n.cursorPos = {x: 0, y: 0}, n.touchButtons = [null, null, null, null, null, null], n.touchCtx = [null, null, null, null, null, null], n.touchMods = [!1, !1, !1, !1, !1, !1], n.touchBelt = [-1, -1, -1, -1, -1, -1], n.fs = Object(w.a)(!0), n.onDrop = function (e) {
					var t = function (e) {
						if (e.dataTransfer.items) for (var t = 0; t < e.dataTransfer.items.length; ++t) if ("file" === e.dataTransfer.items[t].kind) return e.dataTransfer.items[t].getAsFile();
						if (e.dataTransfer.files.length) return e.dataTransfer.files[0]
					}(e);
					t && (e.preventDefault(), n.start(t)), n.setState({dropping: 0})
				}, n.onDragEnter = function (e) {
					e.preventDefault(), n.setDropping(1)
				}, n.onDragOver = function (e) {
					(function (e) {
						if (e.dataTransfer.items) for (var t = 0; t < e.dataTransfer.items.length; ++t) if ("file" === e.dataTransfer.items[t].kind) return !0;
						return !!e.dataTransfer.files.length
					})(e) && e.preventDefault()
				}, n.onDragLeave = function (e) {
					n.setDropping(-1)
				}, n.downloadSave = function (e) {
					n.fs.then(function (e) {
						return n.saveName && e.download(n.saveName)
					}), e.stopPropagation(), e.preventDefault()
				}, n.onResize = function () {
					document.exitPointerLock()
				}, n.onPointerLockChange = function () {
					window.screen && window.innerHeight === window.screen.height && !n.pointerLocked() && (n.game("DApi_Key", 0, 0, 27), n.game("DApi_Key", 1, 0, 27))
				}, n.onMouseMove = function (e) {
					if (n.canvas) {
						var t = n.mousePos(e), a = t.x, o = t.y;
						n.game("DApi_Mouse", 0, 0, n.eventMods(e), a, o), e.preventDefault()
					}
				}, n.onMouseDown = function (e) {
					if (n.canvas) {
						var t = n.mousePos(e), a = t.x, o = t.y;
						window.screen && window.innerHeight === window.screen.height && (n.pointerLocked() || n.canvas.requestPointerLock()), n.game("DApi_Mouse", 1, n.mouseButton(e), n.eventMods(e), a, o), e.preventDefault()
					}
				}, n.onMouseUp = function (e) {
					if (n.canvas) {
						var t = n.mousePos(e), a = t.x, o = t.y;
						n.game("DApi_Mouse", 2, n.mouseButton(e), n.eventMods(e), a, o), e.preventDefault()
					}
				}, n.onKeyDown = function (e) {
					n.canvas && (n.game("DApi_Key", 0, n.eventMods(e), e.keyCode), e.keyCode >= 32 && 1 === e.key.length && !n.showKeyboard && n.game("DApi_Char", e.key.charCodeAt(0)), n.clearKeySel(), n.showKeyboard || (8 === e.keyCode || e.keyCode >= 112 && e.keyCode <= 119) && e.preventDefault())
				}, n.onMenu = function (e) {
					e.preventDefault()
				}, n.onKeyUp = function (e) {
					n.canvas && (n.game("DApi_Key", 1, n.eventMods(e), e.keyCode), n.clearKeySel())
				}, n.onKeyboard = function () {
					if (n.showKeyboard) {
						var e, t = n.keyboard.value, a = (t.match(/[\x20-\x7E]/g) || []).join("").substring(0, 15);
						t !== a && (n.keyboard.value = a), n.clearKeySel();
						var o = Object(u.a)(Array(15)).map(function (e, t) {
							return t < a.length ? a.charCodeAt(t) : 0
						});
						(e = n).game.apply(e, ["DApi_SyncText"].concat(Object(u.a)(o)))
					}
				}, n.parseFile = function (e) {
					var t = e.target.files;
					t.length > 0 && n.start(t[0])
				}, n.touchButton = null, n.touchCanvas = null, n.onFullscreenChange = function () {
					n.setState({touch: document.fullscreenElement === n.element})
				}, n.onTouchStart = function (e) {
					if (n.canvas && (e.preventDefault(), n.updateTouchButton(e.touches, !1))) {
						var t = n.mousePos(n.touchCanvas), a = t.x, o = t.y;
						n.game("DApi_Mouse", 0, 0, n.eventMods(e), a, o), n.touchMods[N] || n.game("DApi_Mouse", 1, n.touchMods[K] ? 2 : 1, n.eventMods(e), a, o)
					}
				}, n.onTouchMove = function (e) {
					if (n.canvas && (e.preventDefault(), n.updateTouchButton(e.touches, !1))) {
						var t = n.mousePos(n.touchCanvas), a = t.x, o = t.y;
						n.game("DApi_Mouse", 0, 0, n.eventMods(e), a, o)
					}
				}, n.onTouchEnd = function (e) {
					if (n.canvas) {
						e.preventDefault();
						var t = n.touchCanvas;
						if (n.updateTouchButton(e.touches, !0), t && !n.touchCanvas) {
							var a = n.mousePos(t), o = a.x, r = a.y;
							n.game("DApi_Mouse", 2, 1, n.eventMods(e), o, r), n.game("DApi_Mouse", 2, 2, n.eventMods(e), o, r), !n.touchMods[K] || n.touchButton && n.touchButton.index === K || n.setTouchButton(K, !1)
						}
						document.fullscreenElement || n.element.requestFullscreen()
					}
				}, n.setCanvas = function (e) {
					return n.canvas = e
				}, n.setElement = function (e) {
					return n.element = e
				}, n.setKeyboard = function (e) {
					return n.keyboard = e
				}, n.setTouch0 = n.setTouch_.bind(Object(p.a)(n), 0), n.setTouch1 = n.setTouch_.bind(Object(p.a)(n), 1), n.setTouch2 = n.setTouch_.bind(Object(p.a)(n), 2), n.setTouch3 = n.setTouchBelt_.bind(Object(p.a)(n), 3), n.setTouch4 = n.setTouchBelt_.bind(Object(p.a)(n), 4), n.setTouch5 = n.setTouchBelt_.bind(Object(p.a)(n), 5), n
			}

			return Object(v.a)(t, e), Object(d.a)(t, [{
				key: "componentDidMount", value: function () {
					var e = this;
					document.addEventListener("drop", this.onDrop, !0), document.addEventListener("dragover", this.onDragOver, !0), document.addEventListener("dragenter", this.onDragEnter, !0), document.addEventListener("dragleave", this.onDragLeave, !0), this.fs.then(function (t) {
						var n = t.files.get("spawn.mpq");
						n && n.byteLength === P && e.setState({has_spawn: !0})
					})
				}
			}, {
				key: "setDropping", value: function (e) {
					this.setState(function (t) {
						var n = t.dropping;
						return {dropping: Math.max(n + e, 0)}
					})
				}
			}, {
				key: "onError", value: function (e, t) {
					this.setState(function (n) {
						return !n.error && {error: {message: e, stack: t}}
					})
				}
			}, {
				key: "openKeyboard", value: function (e) {
					e ? (this.showKeyboard = !0, this.element.classList.add("keyboard"), this.keyboard.focus()) : (this.showKeyboard = !1, this.element.classList.remove("keyboard"), this.keyboard.blur())
				}
			}, {
				key: "setCursorPos", value: function (e, t) {
					var n = this, a = this.canvas.getBoundingClientRect();
					this.cursorPos = {x: a.left + (a.right - a.left) * e / 640, y: a.top + (a.bottom - a.top) * t / 480}, setTimeout(function () {
						n.game("DApi_Mouse", 0, 0, 0, e, t)
					})
				}
			}, {
				key: "onProgress", value: function (e) {
					this.setState({progress: e})
				}
			}, {
				key: "onExit", value: function () {
					this.state.error || window.location.reload()
				}
			}, {
				key: "setCurrentSave", value: function (e) {
					this.saveName = e
				}
			}, {
				key: "drawBelt", value: function (e, t) {
					this.canvas && this.touchButtons[e] && (this.touchBelt[e] = t, t >= 0 ? (this.touchButtons[e].style.display = "block", this.touchCtx[e].drawImage(this.canvas, 205 + 29 * t, 357, 28, 28, 0, 0, 28, 28)) : this.touchButtons[e].style.display = "none")
				}
			}, {
				key: "updateBelt", value: function (e) {
					if (e) {
						for (var t = new Set, n = 3, a = 0; a < e.length && n < 6; ++a) e[a] >= 0 && !t.has(e[a]) && (this.drawBelt(n++, a), t.add(e[a]));
						for (; n < 6; ++n) this.drawBelt(n, -1)
					} else this.drawBelt(3, -1), this.drawBelt(4, -1), this.drawBelt(5, -1)
				}
			}, {
				key: "start", value: function (e) {
					var t = this;
					if (e && e.name.match(/\.sv$/i)) this.fs.then(function (t) {
						return t.upload(e)
					}).then(console.log("Updated ".concat(e.name))); else {
						document.removeEventListener("drop", this.onDrop, !0), document.removeEventListener("dragover", this.onDragOver, !0), document.removeEventListener("dragenter", this.onDragEnter, !0), document.removeEventListener("dragleave", this.onDragLeave, !0), this.setState({dropping: 0});
						var n = !(!e || !e.name.match(/^diabdat\.mpq$/i));
						y.a.event({category: "Game", action: n ? "Start Retail" : "Start Shareware"}), this.setState({loading: !0, retail: n}), j(this, e).then(function (e) {
							t.game = e, document.addEventListener("mousemove", t.onMouseMove, !0), document.addEventListener("mousedown", t.onMouseDown, !0), document.addEventListener("mouseup", t.onMouseUp, !0), document.addEventListener("keydown", t.onKeyDown, !0), document.addEventListener("keyup", t.onKeyUp, !0), document.addEventListener("contextmenu", t.onMenu, !0), document.addEventListener("touchstart", t.onTouchStart, {passive: !1, capture: !0}), document.addEventListener("touchmove", t.onTouchMove, {passive: !1, capture: !0}), document.addEventListener("touchend", t.onTouchEnd, {passive: !1, capture: !0}), document.addEventListener("pointerlockchange", t.onPointerLockChange), document.addEventListener("fullscreenchange", t.onFullscreenChange), window.addEventListener("resize", t.onResize), t.setState({started: !0})
						}, function (e) {
							return t.onError(e.message, e.stack)
						})
					}
				}
			}, {
				key: "pointerLocked", value: function () {
					return document.pointerLockElement === this.canvas || document.mozPointerLockElement === this.canvas
				}
			}, {
				key: "mousePos", value: function (e) {
					var t = this.canvas.getBoundingClientRect();
					return this.pointerLocked() ? (this.cursorPos.x = Math.max(t.left, Math.min(t.right, this.cursorPos.x + e.movementX)), this.cursorPos.y = Math.max(t.top, Math.min(t.bottom, this.cursorPos.y + e.movementY))) : this.cursorPos = {x: e.clientX, y: e.clientY}, {x: Math.max(0, Math.min(Math.round((this.cursorPos.x - t.left) / (t.right - t.left) * 640), 639)), y: Math.max(0, Math.min(Math.round((this.cursorPos.y - t.top) / (t.bottom - t.top) * 480), 479))}
				}
			}, {
				key: "mouseButton", value: function (e) {
					switch (e.button) {
						case 0:
							return 1;
						case 1:
							return 4;
						case 2:
							return 2;
						case 3:
							return 5;
						case 4:
							return 6;
						default:
							return 1
					}
				}
			}, {
				key: "eventMods", value: function (e) {
					return (e.shiftKey || this.touchMods[2] ? 1 : 0) + (e.ctrlKey ? 2 : 0) + (e.altKey ? 4 : 0) + (e.touches ? 8 : 0)
				}
			}, {
				key: "clearKeySel", value: function () {
					if (this.showKeyboard) {
						var e = this.keyboard.value.length;
						this.keyboard.setSelectionRange(e, e)
					}
				}
			}, {
				key: "setTouchMod", value: function (e, t, n) {
					if (e < 3) this.touchMods[e] = t, this.touchButtons[e] && this.touchButtons[e].classList.toggle("active", t); else if (n && this.touchBelt[e] >= 0) {
						var a = performance.now();
						(!this.beltTime || a - this.beltTime > 750) && (this.game("DApi_Char", 49 + this.touchBelt[e]), this.beltTime = a)
					}
				}
			}, {
				key: "updateTouchButton", value: function (e, t) {
					var n = this, a = null, o = this.touchButton, r = !0, s = !1, i = void 0;
					try {
						for (var c, l = function () {
							var t = c.value, r = t.target, s = t.identifier, i = t.clientX, l = t.clientY;
							if (o && o.id === s && n.touchButtons[o.index] === r) return e.length > 1 && (o.stick = !1), o.clientX = i, o.clientY = l, n.touchCanvas = Object(u.a)(e).find(function (e) {
								return e.identifier !== s
							}), n.touchCanvas && (n.touchCanvas = {clientX: n.touchCanvas.clientX, clientY: n.touchCanvas.clientY}), delete n.panPos, {v: null != n.touchCanvas};
							var d = n.touchButtons.indexOf(r);
							d >= 0 && !a && (a = {id: s, index: d, stick: !0, original: n.touchMods[d], clientX: i, clientY: l})
						}, d = e[Symbol.iterator](); !(r = (c = d.next()).done); r = !0) {
							var h = l();
							if ("object" === typeof h) return h.v
						}
					} catch (x) {
						s = !0, i = x
					} finally {
						try {
							r || null == d.return || d.return()
						} finally {
							if (s) throw i
						}
					}
					if (o && !a && t && o.stick) {
						var f = this.touchButtons[o.index].getBoundingClientRect(), p = o.clientX, v = o.clientY;
						p >= f.left && p < f.right && v >= f.top && v < f.bottom ? this.setTouchMod(o.index, !o.original, !0) : this.setTouchMod(o.index, o.original)
					} else o && this.setTouchMod(o.index, !1);
					if (this.touchButton = a, a) this.setTouchMod(a.index, !0), a.index === N ? this.setTouchMod(K, !1) : a.index === K && this.setTouchMod(N, !1), delete this.panPos; else {
						if (2 === e.length) {
							var m = (e[1].clientX + e[0].clientX) / 2, b = (e[1].clientY + e[0].clientY) / 2;
							if (this.panPos) {
								var g, y = m - this.panPos.x, w = b - this.panPos.y, k = this.canvas.offsetHeight / 12;
								if (Math.max(Math.abs(y), Math.abs(w)) > k) g = Math.abs(y) > Math.abs(w) ? y > 0 ? 37 : 39 : w > 0 ? 38 : 40, this.game("DApi_Key", 0, 0, g), this.panPos = {x: m, y: b}
							} else this.game("DApi_Mouse", 0, 0, 24, 320, 180), this.game("DApi_Mouse", 2, 1, 24, 320, 180), this.panPos = {x: m, y: b};
							return this.touchCanvas = null, !1
						}
						delete this.panPos
					}
					return this.touchCanvas = Object(u.a)(e).find(function (e) {
						return !a || e.identifier !== a.id
					}), this.touchCanvas && (this.touchCanvas = {clientX: this.touchCanvas.clientX, clientY: this.touchCanvas.clientY}), null != this.touchCanvas
				}
			}, {
				key: "setTouch_", value: function (e, t) {
					this.touchButtons[e] = t
				}
			}, {
				key: "setTouchBelt_", value: function (e, t) {
					if (this.touchButtons[e] = t, t) {
						var n = document.createElement("canvas");
						n.width = 28, n.height = 28, t.appendChild(n), this.touchCtx[e] = n.getContext("2d")
					} else this.touchCtx[e] = null
				}
			}, {
				key: "render", value: function () {
					var e = this, t = this.state, n = t.started, a = t.loading, r = t.error, s = t.progress, i = t.dropping, c = t.touch, u = t.has_spawn;
					return o.a.createElement("div", {className: g()("App", {touch: c, started: n, dropping: i, keyboard: this.showKeyboard}), ref: this.setElement}, o.a.createElement("div", {className: "touch-ui touch-mods"}, o.a.createElement("div", {className: g()("touch-button", "touch-button-0", {active: this.touchMods[0]}), ref: this.setTouch0}), o.a.createElement("div", {className: g()("touch-button", "touch-button-1", {active: this.touchMods[1]}), ref: this.setTouch1}), o.a.createElement("div", {className: g()("touch-button", "touch-button-2", {active: this.touchMods[2]}), ref: this.setTouch2})), o.a.createElement("div", {className: "touch-ui touch-belt"}, o.a.createElement("div", {className: g()("touch-button", "touch-button-0"), ref: this.setTouch3}), o.a.createElement("div", {className: g()("touch-button", "touch-button-1"), ref: this.setTouch4}), o.a.createElement("div", {
						className: g()("touch-button", "touch-button-2"),
						ref: this.setTouch5
					})), o.a.createElement("div", {className: "Body"}, !r && o.a.createElement("canvas", {ref: this.setCanvas, width: 640, height: 480}), o.a.createElement("input", {type: "text", className: "keyboard", onChange: this.onKeyboard, ref: this.setKeyboard, spellCheck: !1})), o.a.createElement("div", {className: "BodyV"}, !!r && o.a.createElement(R, {className: "error", href: O(r, this.state.retail)}, o.a.createElement("p", {className: "header"}, "The following error has occurred:"), o.a.createElement("p", {className: "body"}, r.message), o.a.createElement("p", {className: "footer"}, "Click to create an issue on GitHub"), null != this.saveName && o.a.createElement("p", {
						className: "link",
						onClick: this.downloadSave
					}, "Download save file")), !!a && !n && !r && o.a.createElement("div", {className: "loading"}, s && s.text || "Loading...", null != s && !!s.total && o.a.createElement("span", {className: "progressBar"}, o.a.createElement("span", null, o.a.createElement("span", {style: {width: "".concat(Math.round(100 * s.loaded / s.total), "%")}})))), !n && !a && !r && o.a.createElement("div", {className: "start"}, o.a.createElement("p", null, "This is a web port of the original Diablo game, based on source code reconstructed by GalaXyHaXz and devilution team: ", o.a.createElement(R, {href: "https://github.com/diasurgical/devilution"}, "https://github.com/diasurgical/devilution")), o.a.createElement("p", null, "If you own the original game, you can drop the original DIABDAT.MPQ onto this page or click the button below to start playing. The game can be purchased from ", o.a.createElement(R, {href: "https://www.gog.com/game/diablo"}, "GoG"), "."), !u && o.a.createElement("p", null, "Or you can play the shareware version for free (50MB download)."), o.a.createElement("form", null, o.a.createElement("label", {
						htmlFor: "loadFile",
						className: "startButton"
					}, "Select MPQ"), o.a.createElement("input", {accept: ".mpq", type: "file", id: "loadFile", style: {display: "none"}, onChange: this.parseFile})), o.a.createElement("span", {
						className: "startButton", onClick: function () {
							return e.start()
						}
					}, "Play Shareware"))))
				}
			}]), t
		}(o.a.Component);
		s.a.render(o.a.createElement(U, null), document.getElementById("root")), function (e) {
			if ("serviceWorker" in navigator) {
				if (new URL("", window.location.href).origin !== window.location.origin) return;
				window.addEventListener("load", function () {
					var t = "".concat("", "./9232376d1969e7a9ebae.worker.js");
					i ? (function (e, t) {
						fetch(e).then(function (n) {
							var a = n.headers.get("content-type");
							404 === n.status || null != a && -1 === a.indexOf("javascript") ? navigator.serviceWorker.ready.then(function (e) {
								e.unregister().then(function () {
									window.location.reload()
								})
							}) : c(e, t)
						}).catch(function () {
							console.log("No internet connection found. App is running in offline mode.")
						})
					}(t, e), navigator.serviceWorker.ready.then(function () {
						console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")
					})) : c(t, e)
				})
			}
		}()
	}, 9: function (e, t, n) {
		"use strict";
		n.d(t, "a", function () {
			return b
		});
		var a = n(4), o = n(1), r = n.n(o), s = n(2), i = n(10), c = n.n(i), u = function () {
			return new Promise(function (e, t) {
				var n = !1, a = document.createElement("iframe");
				window.addEventListener("message", function (t) {
					var o = t.data;
					"storage" !== o.method || n || (n = !0, e(o.files), a.contentWindow.postMessage({method: "clear"}, "*"))
				}), a.addEventListener("load", function () {
					a.contentWindow.postMessage({method: "transfer"}, "*")
				}), a.addEventListener("error", function () {
					n || (n = !0, e(null))
				}), a.src = "storage.html", a.style.display = "none", document.body.appendChild(a), setTimeout(function () {
					n || (n = !0, e(null))
				}, 1e4)
			})
		};

		function l(e, t) {
			return d.apply(this, arguments)
		}

		function d() {
			return (d = Object(s.a)(r.a.mark(function e(t, n) {
				var a, o, s, i;
				return r.a.wrap(function (e) {
					for (; ;) switch (e.prev = e.next) {
						case 0:
							return e.next = 2, t.get(n.toLowerCase());
						case 2:
							(a = e.sent) ? (o = new Blob([a], {type: "binary/octet-stream"}), s = URL.createObjectURL(o), (i = document.createElement("a")).setAttribute("href", s), i.setAttribute("download", n), document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(s)) : console.error("File ".concat(n, " does not exist"));
						case 4:
						case"end":
							return e.stop()
					}
				}, e)
			}))).apply(this, arguments)
		}

		function h(e) {
			return f.apply(this, arguments)
		}

		function f() {
			return (f = Object(s.a)(r.a.mark(function e(t) {
				var n, a, o, s, i, c;
				return r.a.wrap(function (e) {
					for (; ;) switch (e.prev = e.next) {
						case 0:
							return n = !0, a = !1, o = void 0, e.prev = 3, e.next = 6, t.keys();
						case 6:
							e.t0 = Symbol.iterator, s = e.sent[e.t0]();
						case 8:
							if (n = (i = s.next()).done) {
								e.next = 14;
								break
							}
							(c = i.value).match(/\.sv$/i) && l(t, c);
						case 11:
							n = !0, e.next = 8;
							break;
						case 14:
							e.next = 20;
							break;
						case 16:
							e.prev = 16, e.t1 = e.catch(3), a = !0, o = e.t1;
						case 20:
							e.prev = 20, e.prev = 21, n || null == s.return || s.return();
						case 23:
							if (e.prev = 23, !a) {
								e.next = 26;
								break
							}
							throw o;
						case 26:
							return e.finish(23);
						case 27:
							return e.finish(20);
						case 28:
						case"end":
							return e.stop()
					}
				}, e, null, [[3, 16, 20, 28], [21, , 23, 27]])
			}))).apply(this, arguments)
		}

		var p = function (e) {
			return new Promise(function (t, n) {
				var a = new FileReader;
				a.onload = function () {
					return t(a.result)
				}, a.onerror = function () {
					return n(a.error)
				}, a.onabort = function () {
					return n()
				}, a.readAsArrayBuffer(e)
			})
		};

		function v(e, t, n) {
			return m.apply(this, arguments)
		}

		function m() {
			return (m = Object(s.a)(r.a.mark(function e(t, n, a) {
				var o;
				return r.a.wrap(function (e) {
					for (; ;) switch (e.prev = e.next) {
						case 0:
							return e.t0 = Uint8Array, e.next = 3, p(a);
						case 3:
							return e.t1 = e.sent, o = new e.t0(e.t1), n.set(a.name.toLowerCase(), o), e.abrupt("return", t.set(a.name.toLowerCase(), o));
						case 7:
						case"end":
							return e.stop()
					}
				}, e)
			}))).apply(this, arguments)
		}

		function b(e) {
			return g.apply(this, arguments)
		}

		function g() {
			return (g = Object(s.a)(r.a.mark(function e(t) {
				var n, o, s, i, d, f, p, m, b, g, y, w, k, x, E, M, C, D;
				return r.a.wrap(function (e) {
					for (; ;) switch (e.prev = e.next) {
						case 0:
							return e.prev = 0, n = new c.a("diablo_fs"), o = new Map, s = 0, e.t0 = Object, e.next = 7, n.json();
						case 7:
							e.t1 = e.sent, i = e.t0.entries.call(e.t0, e.t1);
						case 9:
							if (!(s < i.length)) {
								e.next = 18;
								break
							}
							d = i[s], f = Object(a.a)(d, 2), p = f[0], m = f[1], o.set(p, m);
						case 15:
							s++, e.next = 9;
							break;
						case 18:
							if (!t) {
								e.next = 42;
								break
							}
							return e.next = 21, u();
						case 21:
							if (!(b = e.sent)) {
								e.next = 42;
								break
							}
							for (g = !0, y = !1, w = void 0, e.prev = 26, k = b[Symbol.iterator](); !(g = (x = k.next()).done); g = !0) E = x.value, M = Object(a.a)(E, 2), C = M[0], D = M[1], b.set(C, D), n.set(C, D);
							e.next = 34;
							break;
						case 30:
							e.prev = 30, e.t2 = e.catch(26), y = !0, w = e.t2;
						case 34:
							e.prev = 34, e.prev = 35, g || null == k.return || k.return();
						case 37:
							if (e.prev = 37, !y) {
								e.next = 40;
								break
							}
							throw w;
						case 40:
							return e.finish(37);
						case 41:
							return e.finish(34);
						case 42:
							return window.DownloadFile = function (e) {
								return l(n, e)
							}, window.DownloadSaves = function () {
								return h(n)
							}, e.abrupt("return", {
								files: o, update: function (e, t) {
									return n.set(e, t)
								}, delete: function (e) {
									return n.remove(e)
								}, clear: function () {
									return n.clear()
								}, download: function (e) {
									return l(n, e)
								}, upload: function (e) {
									return v(n, o, e)
								}
							});
						case 47:
							return e.prev = 47, e.t3 = e.catch(0), window.DownloadFile = function () {
								return console.error("IndexedDB is not supported")
							}, window.DownloadSaves = function () {
								return console.error("IndexedDB is not supported")
							}, e.abrupt("return", {
								files: new Map, update: function () {
									return Promise.resolve()
								}, delete: function () {
									return Promise.resolve()
								}, clear: function () {
									return Promise.resolve()
								}, download: function () {
									return Promise.resolve()
								}, upload: function () {
									return Promise.resolve()
								}
							});
						case 52:
						case"end":
							return e.stop()
					}
				}, e, null, [[0, 47], [26, 30, 34, 42], [35, , 37, 41]])
			}))).apply(this, arguments)
		}
	}
}, [[30, 2, 0, 5]]]);
//# sourceMappingURL=main.26aae697.chunk.js.map