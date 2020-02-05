!function (e) {
	var n = {};

	function t(r) {
		if (n[r]) return n[r].exports;
		var i = n[r] = {i: r, l: !1, exports: {}};
		return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
	}

	t.m = e, t.c = n, t.d = function (e, n, r) {
		t.o(e, n) || Object.defineProperty(e, n, {enumerable: !0, get: r})
	}, t.r = function (e) {
		"undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
	}, t.t = function (e, n) {
		if (1 & n && (e = t(e)), 8 & n) return e;
		if (4 & n && "object" === typeof e && e && e.__esModule) return e;
		var r = Object.create(null);
		if (t.r(r), Object.defineProperty(r, "default", {enumerable: !0, value: e}), 2 & n && "string" != typeof e) for (var i in e) t.d(r, i, function (n) {
			return e[n]
		}.bind(null, i));
		return r
	}, t.n = function (e) {
		var n = e && e.__esModule ? function () {
			return e.default
		} : function () {
			return e
		};
		return t.d(n, "a", n), n
	}, t.o = function (e, n) {
		return Object.prototype.hasOwnProperty.call(e, n)
	}, t.p = "", t(t.s = 35)
}([function (e, n, t) {
	"use strict";
	var r = t(5), i = t(20), o = Object.prototype.toString;

	function a(e) {
		return "[object Array]" === o.call(e)
	}

	function u(e) {
		return null !== e && "object" === typeof e
	}

	function s(e) {
		return "[object Function]" === o.call(e)
	}

	function c(e, n) {
		if (null !== e && "undefined" !== typeof e) if ("object" !== typeof e && (e = [e]), a(e)) for (var t = 0, r = e.length; t < r; t++) n.call(null, e[t], t, e); else for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && n.call(null, e[i], i, e)
	}

	e.exports = {
		isArray: a, isArrayBuffer: function (e) {
			return "[object ArrayBuffer]" === o.call(e)
		}, isBuffer: i, isFormData: function (e) {
			return "undefined" !== typeof FormData && e instanceof FormData
		}, isArrayBufferView: function (e) {
			return "undefined" !== typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
		}, isString: function (e) {
			return "string" === typeof e
		}, isNumber: function (e) {
			return "number" === typeof e
		}, isObject: u, isUndefined: function (e) {
			return "undefined" === typeof e
		}, isDate: function (e) {
			return "[object Date]" === o.call(e)
		}, isFile: function (e) {
			return "[object File]" === o.call(e)
		}, isBlob: function (e) {
			return "[object Blob]" === o.call(e)
		}, isFunction: s, isStream: function (e) {
			return u(e) && s(e.pipe)
		}, isURLSearchParams: function (e) {
			return "undefined" !== typeof URLSearchParams && e instanceof URLSearchParams
		}, isStandardBrowserEnv: function () {
			return ("undefined" === typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" !== typeof window && "undefined" !== typeof document
		}, forEach: c, merge: function e() {
			var n = {};

			function t(t, r) {
				"object" === typeof n[r] && "object" === typeof t ? n[r] = e(n[r], t) : n[r] = t
			}

			for (var r = 0, i = arguments.length; r < i; r++) c(arguments[r], t);
			return n
		}, deepMerge: function e() {
			var n = {};

			function t(t, r) {
				"object" === typeof n[r] && "object" === typeof t ? n[r] = e(n[r], t) : n[r] = "object" === typeof t ? e({}, t) : t
			}

			for (var r = 0, i = arguments.length; r < i; r++) c(arguments[r], t);
			return n
		}, extend: function (e, n, t) {
			return c(n, function (n, i) {
				e[i] = t && "function" === typeof n ? r(n, t) : n
			}), e
		}, trim: function (e) {
			return e.replace(/^\s*/, "").replace(/\s*$/, "")
		}
	}
}, function (e, n, t) {
	e.exports = t(18)
}, function (e, n) {
	var t, r, i = e.exports = {};

	function o() {
		throw new Error("setTimeout has not been defined")
	}

	function a() {
		throw new Error("clearTimeout has not been defined")
	}

	function u(e) {
		if (t === setTimeout) return setTimeout(e, 0);
		if ((t === o || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0);
		try {
			return t(e, 0)
		} catch (n) {
			try {
				return t.call(null, e, 0)
			} catch (n) {
				return t.call(this, e, 0)
			}
		}
	}

	!function () {
		try {
			t = "function" === typeof setTimeout ? setTimeout : o
		} catch (e) {
			t = o
		}
		try {
			r = "function" === typeof clearTimeout ? clearTimeout : a
		} catch (e) {
			r = a
		}
	}();
	var s, c = [], f = !1, l = -1;

	function _() {
		f && s && (f = !1, s.length ? c = s.concat(c) : l = -1, c.length && p())
	}

	function p() {
		if (!f) {
			var e = u(_);
			f = !0;
			for (var n = c.length; n;) {
				for (s = c, c = []; ++l < n;) s && s[l].run();
				l = -1, n = c.length
			}
			s = null, f = !1, function (e) {
				if (r === clearTimeout) return clearTimeout(e);
				if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
				try {
					r(e)
				} catch (n) {
					try {
						return r.call(null, e)
					} catch (n) {
						return r.call(this, e)
					}
				}
			}(e)
		}
	}

	function d(e, n) {
		this.fun = e, this.array = n
	}

	function m() {
	}

	i.nextTick = function (e) {
		var n = new Array(arguments.length - 1);
		if (arguments.length > 1) for (var t = 1; t < arguments.length; t++) n[t - 1] = arguments[t];
		c.push(new d(e, n)), 1 !== c.length || f || u(p)
	}, d.prototype.run = function () {
		this.fun.apply(null, this.array)
	}, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = m, i.addListener = m, i.once = m, i.off = m, i.removeListener = m, i.removeAllListeners = m, i.emit = m, i.prependListener = m, i.prependOnceListener = m, i.listeners = function (e) {
		return []
	}, i.binding = function (e) {
		throw new Error("process.binding is not supported")
	}, i.cwd = function () {
		return "/"
	}, i.chdir = function (e) {
		throw new Error("process.chdir is not supported")
	}, i.umask = function () {
		return 0
	}
}, function (e, n) {
}, function (e, n, t) {
	(function (e) {
		function t(e, n) {
			for (var t = 0, r = e.length - 1; r >= 0; r--) {
				var i = e[r];
				"." === i ? e.splice(r, 1) : ".." === i ? (e.splice(r, 1), t++) : t && (e.splice(r, 1), t--)
			}
			if (n) for (; t--; t) e.unshift("..");
			return e
		}

		function r(e, n) {
			if (e.filter) return e.filter(n);
			for (var t = [], r = 0; r < e.length; r++) n(e[r], r, e) && t.push(e[r]);
			return t
		}

		n.resolve = function () {
			for (var n = "", i = !1, o = arguments.length - 1; o >= -1 && !i; o--) {
				var a = o >= 0 ? arguments[o] : e.cwd();
				if ("string" !== typeof a) throw new TypeError("Arguments to path.resolve must be strings");
				a && (n = a + "/" + n, i = "/" === a.charAt(0))
			}
			return (i ? "/" : "") + (n = t(r(n.split("/"), function (e) {
				return !!e
			}), !i).join("/")) || "."
		}, n.normalize = function (e) {
			var o = n.isAbsolute(e), a = "/" === i(e, -1);
			return (e = t(r(e.split("/"), function (e) {
				return !!e
			}), !o).join("/")) || o || (e = "."), e && a && (e += "/"), (o ? "/" : "") + e
		}, n.isAbsolute = function (e) {
			return "/" === e.charAt(0)
		}, n.join = function () {
			var e = Array.prototype.slice.call(arguments, 0);
			return n.normalize(r(e, function (e, n) {
				if ("string" !== typeof e) throw new TypeError("Arguments to path.join must be strings");
				return e
			}).join("/"))
		}, n.relative = function (e, t) {
			function r(e) {
				for (var n = 0; n < e.length && "" === e[n]; n++) ;
				for (var t = e.length - 1; t >= 0 && "" === e[t]; t--) ;
				return n > t ? [] : e.slice(n, t - n + 1)
			}

			e = n.resolve(e).substr(1), t = n.resolve(t).substr(1);
			for (var i = r(e.split("/")), o = r(t.split("/")), a = Math.min(i.length, o.length), u = a, s = 0; s < a; s++) if (i[s] !== o[s]) {
				u = s;
				break
			}
			var c = [];
			for (s = u; s < i.length; s++) c.push("..");
			return (c = c.concat(o.slice(u))).join("/")
		}, n.sep = "/", n.delimiter = ":", n.dirname = function (e) {
			if ("string" !== typeof e && (e += ""), 0 === e.length) return ".";
			for (var n = e.charCodeAt(0), t = 47 === n, r = -1, i = !0, o = e.length - 1; o >= 1; --o) if (47 === (n = e.charCodeAt(o))) {
				if (!i) {
					r = o;
					break
				}
			} else i = !1;
			return -1 === r ? t ? "/" : "." : t && 1 === r ? "/" : e.slice(0, r)
		}, n.basename = function (e, n) {
			var t = function (e) {
				"string" !== typeof e && (e += "");
				var n, t = 0, r = -1, i = !0;
				for (n = e.length - 1; n >= 0; --n) if (47 === e.charCodeAt(n)) {
					if (!i) {
						t = n + 1;
						break
					}
				} else -1 === r && (i = !1, r = n + 1);
				return -1 === r ? "" : e.slice(t, r)
			}(e);
			return n && t.substr(-1 * n.length) === n && (t = t.substr(0, t.length - n.length)), t
		}, n.extname = function (e) {
			"string" !== typeof e && (e += "");
			for (var n = -1, t = 0, r = -1, i = !0, o = 0, a = e.length - 1; a >= 0; --a) {
				var u = e.charCodeAt(a);
				if (47 !== u) -1 === r && (i = !1, r = a + 1), 46 === u ? -1 === n ? n = a : 1 !== o && (o = 1) : -1 !== n && (o = -1); else if (!i) {
					t = a + 1;
					break
				}
			}
			return -1 === n || -1 === r || 0 === o || 1 === o && n === r - 1 && n === t + 1 ? "" : e.slice(n, r)
		};
		var i = "b" === "ab".substr(-1) ? function (e, n, t) {
			return e.substr(n, t)
		} : function (e, n, t) {
			return n < 0 && (n = e.length + n), e.substr(n, t)
		}
	}).call(this, t(2))
}, function (e, n, t) {
	"use strict";
	e.exports = function (e, n) {
		return function () {
			for (var t = new Array(arguments.length), r = 0; r < t.length; r++) t[r] = arguments[r];
			return e.apply(n, t)
		}
	}
}, function (e, n, t) {
	"use strict";
	var r = t(0);

	function i(e) {
		return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
	}

	e.exports = function (e, n, t) {
		if (!n) return e;
		var o;
		if (t) o = t(n); else if (r.isURLSearchParams(n)) o = n.toString(); else {
			var a = [];
			r.forEach(n, function (e, n) {
				null !== e && "undefined" !== typeof e && (r.isArray(e) ? n += "[]" : e = [e], r.forEach(e, function (e) {
					r.isDate(e) ? e = e.toISOString() : r.isObject(e) && (e = JSON.stringify(e)), a.push(i(n) + "=" + i(e))
				}))
			}), o = a.join("&")
		}
		if (o) {
			var u = e.indexOf("#");
			-1 !== u && (e = e.slice(0, u)), e += (-1 === e.indexOf("?") ? "?" : "&") + o
		}
		return e
	}
}, function (e, n, t) {
	"use strict";
	e.exports = function (e) {
		return !(!e || !e.__CANCEL__)
	}
}, function (e, n, t) {
	"use strict";
	(function (n) {
		var r = t(0), i = t(25), o = {"Content-Type": "application/x-www-form-urlencoded"};

		function a(e, n) {
			!r.isUndefined(e) && r.isUndefined(e["Content-Type"]) && (e["Content-Type"] = n)
		}

		var u = {
			adapter: function () {
				var e;
				return "undefined" !== typeof n && "[object process]" === Object.prototype.toString.call(n) ? e = t(9) : "undefined" !== typeof XMLHttpRequest && (e = t(9)), e
			}(), transformRequest: [function (e, n) {
				return i(n, "Accept"), i(n, "Content-Type"), r.isFormData(e) || r.isArrayBuffer(e) || r.isBuffer(e) || r.isStream(e) || r.isFile(e) || r.isBlob(e) ? e : r.isArrayBufferView(e) ? e.buffer : r.isURLSearchParams(e) ? (a(n, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : r.isObject(e) ? (a(n, "application/json;charset=utf-8"), JSON.stringify(e)) : e
			}], transformResponse: [function (e) {
				if ("string" === typeof e) try {
					e = JSON.parse(e)
				} catch (n) {
				}
				return e
			}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, validateStatus: function (e) {
				return e >= 200 && e < 300
			}, headers: {common: {Accept: "application/json, text/plain, */*"}}
		};
		r.forEach(["delete", "get", "head"], function (e) {
			u.headers[e] = {}
		}), r.forEach(["post", "put", "patch"], function (e) {
			u.headers[e] = r.merge(o)
		}), e.exports = u
	}).call(this, t(2))
}, function (e, n, t) {
	"use strict";
	var r = t(0), i = t(26), o = t(6), a = t(28), u = t(29), s = t(10);
	e.exports = function (e) {
		return new Promise(function (n, c) {
			var f = e.data, l = e.headers;
			r.isFormData(f) && delete l["Content-Type"];
			var _ = new XMLHttpRequest;
			if (e.auth) {
				var p = e.auth.username || "", d = e.auth.password || "";
				l.Authorization = "Basic " + btoa(p + ":" + d)
			}
			if (_.open(e.method.toUpperCase(), o(e.url, e.params, e.paramsSerializer), !0), _.timeout = e.timeout, _.onreadystatechange = function () {
				if (_ && 4 === _.readyState && (0 !== _.status || _.responseURL && 0 === _.responseURL.indexOf("file:"))) {
					var t = "getAllResponseHeaders" in _ ? a(_.getAllResponseHeaders()) : null, r = {data: e.responseType && "text" !== e.responseType ? _.response : _.responseText, status: _.status, statusText: _.statusText, headers: t, config: e, request: _};
					i(n, c, r), _ = null
				}
			}, _.onabort = function () {
				_ && (c(s("Request aborted", e, "ECONNABORTED", _)), _ = null)
			}, _.onerror = function () {
				c(s("Network Error", e, null, _)), _ = null
			}, _.ontimeout = function () {
				c(s("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", _)), _ = null
			}, r.isStandardBrowserEnv()) {
				var m = t(30), y = (e.withCredentials || u(e.url)) && e.xsrfCookieName ? m.read(e.xsrfCookieName) : void 0;
				y && (l[e.xsrfHeaderName] = y)
			}
			if ("setRequestHeader" in _ && r.forEach(l, function (e, n) {
				"undefined" === typeof f && "content-type" === n.toLowerCase() ? delete l[n] : _.setRequestHeader(n, e)
			}), e.withCredentials && (_.withCredentials = !0), e.responseType) try {
				_.responseType = e.responseType
			} catch (h) {
				if ("json" !== e.responseType) throw h
			}
			"function" === typeof e.onDownloadProgress && _.addEventListener("progress", e.onDownloadProgress), "function" === typeof e.onUploadProgress && _.upload && _.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function (e) {
				_ && (_.abort(), c(e), _ = null)
			}), void 0 === f && (f = null), _.send(f)
		})
	}
}, function (e, n, t) {
	"use strict";
	var r = t(27);
	e.exports = function (e, n, t, i, o) {
		var a = new Error(e);
		return r(a, n, t, i, o)
	}
}, function (e, n, t) {
	"use strict";
	var r = t(0);
	e.exports = function (e, n) {
		n = n || {};
		var t = {};
		return r.forEach(["url", "method", "params", "data"], function (e) {
			"undefined" !== typeof n[e] && (t[e] = n[e])
		}), r.forEach(["headers", "auth", "proxy"], function (i) {
			r.isObject(n[i]) ? t[i] = r.deepMerge(e[i], n[i]) : "undefined" !== typeof n[i] ? t[i] = n[i] : r.isObject(e[i]) ? t[i] = r.deepMerge(e[i]) : "undefined" !== typeof e[i] && (t[i] = e[i])
		}), r.forEach(["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent", "cancelToken", "socketPath"], function (r) {
			"undefined" !== typeof n[r] ? t[r] = n[r] : "undefined" !== typeof e[r] && (t[r] = e[r])
		}), t
	}
}, function (e, n, t) {
	"use strict";

	function r(e) {
		this.message = e
	}

	r.prototype.toString = function () {
		return "Cancel" + (this.message ? ": " + this.message : "")
	}, r.prototype.__CANCEL__ = !0, e.exports = r
}, function (e, n, t) {
	e.exports = t.p + "static/media/Diablo.91c5173f.wasm"
}, function (e, n, t) {
	(function (n, r) {
		var i = function () {
			var e = "undefined" !== typeof document && document.currentScript ? document.currentScript.src : void 0;
			return function (i) {
				var o, a = "undefined" !== typeof (i = i || {}) ? i : {}, u = {};
				for (o in a) a.hasOwnProperty(o) && (u[o] = a[o]);
				a.arguments = [], a.thisProgram = "./this.program", a.quit = function (e, n) {
					throw n
				}, a.preRun = [], a.postRun = [];
				var s, c, f = !1, l = !1;
				f = "object" === typeof window, l = "function" === typeof importScripts, s = "object" === typeof n && !f && !l, c = !f && !s && !l;
				var _, p, d = "";

				function m(e) {
					return a.locateFile ? a.locateFile(e, d) : d + e
				}

				s ? (d = r + "/", a.read = function (e, n) {
					var r;
					return _ || (_ = t(3)), p || (p = t(4)), e = p.normalize(e), r = _.readFileSync(e), n ? r : r.toString()
				}, a.readBinary = function (e) {
					var n = a.read(e, !0);
					return n.buffer || (n = new Uint8Array(n)), w(n.buffer), n
				}, n.argv.length > 1 && (a.thisProgram = n.argv[1].replace(/\\/g, "/")), a.arguments = n.argv.slice(2), n.on("uncaughtException", function (e) {
					if (!(e instanceof we)) throw e
				}), n.on("unhandledRejection", function (e, t) {
					n.exit(1)
				}), a.quit = function (e) {
					n.exit(e)
				}, a.inspect = function () {
					return "[Emscripten Module object]"
				}) : c ? ("undefined" != typeof read && (a.read = function (e) {
					return read(e)
				}), a.readBinary = function (e) {
					var n;
					return "function" === typeof readbuffer ? new Uint8Array(readbuffer(e)) : (w("object" === typeof (n = read(e, "binary"))), n)
				}, "undefined" != typeof scriptArgs ? a.arguments = scriptArgs : "undefined" != typeof arguments && (a.arguments = arguments), "function" === typeof quit && (a.quit = function (e) {
					quit(e)
				})) : (f || l) && (f ? document.currentScript && (d = document.currentScript.src) : d = self.location.href, e && (d = e), d = 0 !== d.indexOf("blob:") ? d.split("/").slice(0, -1).join("/") + "/" : "", a.read = function (e) {
					var n = new XMLHttpRequest;
					return n.open("GET", e, !1), n.send(null), n.responseText
				}, l && (a.readBinary = function (e) {
					var n = new XMLHttpRequest;
					return n.open("GET", e, !1), n.responseType = "arraybuffer", n.send(null), new Uint8Array(n.response)
				}), a.readAsync = function (e, n, t) {
					var r = new XMLHttpRequest;
					r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = function () {
						200 == r.status || 0 == r.status && r.response ? n(r.response) : t()
					}, r.onerror = t, r.send(null)
				}, a.setWindowTitle = function (e) {
					document.title = e
				});
				var y = a.print || ("undefined" !== typeof console ? console.log.bind(console) : "undefined" !== typeof print ? print : null), h = a.printErr || ("undefined" !== typeof printErr ? printErr : "undefined" !== typeof console && console.warn.bind(console) || y);
				for (o in u) u.hasOwnProperty(o) && (a[o] = u[o]);
				u = void 0;
				var v = 16;

				function g(e, n) {
					return n || (n = v), e = Math.ceil(e / n) * n
				}

				var E = {
					"f64-rem": function (e, n) {
						return e % n
					}, debugger: function () {
					}
				}, b = (new Array(0), 0);

				function w(e, n) {
					e || Te("Assertion failed: " + n)
				}

				function A(e, n) {
					if (0 === n || !e) return "";
					for (var t, r = 0, i = 0; r |= t = x[e + i >> 0], (0 != t || n) && (i++, !n || i != n);) ;
					n || (n = i);
					var o = "";
					if (r < 128) {
						for (var a; n > 0;) a = String.fromCharCode.apply(String, x.subarray(e, e + Math.min(n, 1024))), o = o ? o + a : a, e += 1024, n -= 1024;
						return o
					}
					return function (e) {
						return O(x, e)
					}(e)
				}

				var T = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;

				function O(e, n) {
					for (var t = n; e[t];) ++t;
					if (t - n > 16 && e.subarray && T) return T.decode(e.subarray(n, t));
					for (var r, i, o, a, u, s = ""; ;) {
						if (!(r = e[n++])) return s;
						if (128 & r) if (i = 63 & e[n++], 192 != (224 & r)) if (o = 63 & e[n++], 224 == (240 & r) ? r = (15 & r) << 12 | i << 6 | o : (a = 63 & e[n++], 240 == (248 & r) ? r = (7 & r) << 18 | i << 12 | o << 6 | a : (u = 63 & e[n++], r = 248 == (252 & r) ? (3 & r) << 24 | i << 18 | o << 12 | a << 6 | u : (1 & r) << 30 | i << 24 | o << 18 | a << 12 | u << 6 | 63 & e[n++])), r < 65536) s += String.fromCharCode(r); else {
							var c = r - 65536;
							s += String.fromCharCode(55296 | c >> 10, 56320 | 1023 & c)
						} else s += String.fromCharCode((31 & r) << 6 | i); else s += String.fromCharCode(r)
					}
				}

				"undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");
				var C, S, x, R, j, N, D, L, M, I, P = 65536, B = 16777216, k = 16777216;

				function U(e, n) {
					return e % n > 0 && (e += n - e % n), e
				}

				function F(e) {
					a.buffer = C = e
				}

				function W() {
					a.HEAP8 = S = new Int8Array(C), a.HEAP16 = new Int16Array(C), a.HEAP32 = R = new Int32Array(C), a.HEAPU8 = x = new Uint8Array(C), a.HEAPU16 = new Uint16Array(C), a.HEAPU32 = new Uint32Array(C), a.HEAPF32 = j = new Float32Array(C), a.HEAPF64 = new Float64Array(C)
				}

				N = L = I = 0, a.reallocBuffer || (a.reallocBuffer = function (e) {
					var n;
					try {
						if (ArrayBuffer.transfer) n = ArrayBuffer.transfer(C, e); else {
							var t = S;
							n = new ArrayBuffer(e), new Int8Array(n).set(t)
						}
					} catch (r) {
						return !1
					}
					return !!ye(n) && n
				});
				try {
					Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get)(new ArrayBuffer(4))
				} catch (Oe) {
					(function (e) {
						return e.byteLength
					})
				}
				var H = a.TOTAL_STACK || 5242880, G = a.TOTAL_MEMORY || 134217728;

				function q(e) {
					for (; e.length > 0;) {
						var n = e.shift();
						if ("function" != typeof n) {
							var t = n.func;
							"number" === typeof t ? void 0 === n.arg ? a.dynCall_v(t) : a.dynCall_vi(t, n.arg) : t(void 0 === n.arg ? null : n.arg)
						} else n()
					}
				}

				G < H && h("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + G + "! (TOTAL_STACK=" + H + ")"), a.buffer ? C = a.buffer : ("object" === typeof WebAssembly && "function" === typeof WebAssembly.Memory ? (a.wasmMemory = new WebAssembly.Memory({initial: G / P}), C = a.wasmMemory.buffer) : C = new ArrayBuffer(G), a.buffer = C), W();
				var z = [], K = [], X = [], Y = [], V = [], Q = !1;

				function J(e) {
					V.unshift(e)
				}

				var Z = 0, $ = null, ee = null;
				a.preloadedImages = {}, a.preloadedAudios = {};
				var ne = "data:application/octet-stream;base64,";

				function te(e) {
					return String.prototype.startsWith ? e.startsWith(ne) : 0 === e.indexOf(ne)
				}

				!function () {
					var e = "Diablo.wast", n = "Diablo.wasm", t = "Diablo.temp.asm.js";
					te(e) || (e = m(e)), te(n) || (n = m(n)), te(t) || (t = m(t));
					var r = {global: null, env: null, asm2wasm: E, parent: a}, i = null;

					function o() {
						try {
							if (a.wasmBinary) return new Uint8Array(a.wasmBinary);
							if (a.readBinary) return a.readBinary(n);
							throw"both async and sync fetching of the wasm failed"
						} catch (h) {
							Te(h)
						}
					}

					function u(e, t, u) {
						if ("object" !== typeof WebAssembly) return h("no native wasm support detected"), !1;
						if (!(a.wasmMemory instanceof WebAssembly.Memory)) return h("no native wasm Memory in use"), !1;

						function s(e, n) {
							(i = e.exports).memory && function (e) {
								var n = a.buffer;
								e.byteLength < n.byteLength && h("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here");
								var t = new Int8Array(n);
								new Int8Array(e).set(t), F(e), W()
							}(i.memory), a.asm = i, a.usingWasm = !0, function (e) {
								if (Z--, a.monitorRunDependencies && a.monitorRunDependencies(Z), 0 == Z && (null !== $ && (clearInterval($), $ = null), ee)) {
									var n = ee;
									ee = null, n()
								}
							}()
						}

						if (t.memory = a.wasmMemory, r.global = {NaN: NaN, Infinity: 1 / 0}, r["global.Math"] = Math, r.env = t, Z++, a.monitorRunDependencies && a.monitorRunDependencies(Z), a.instantiateWasm) try {
							return a.instantiateWasm(r, s)
						} catch (Oe) {
							return h("Module.instantiateWasm callback failed with error: " + Oe), !1
						}

						function c(e) {
							s(e.instance, e.module)
						}

						function _(e) {
							(a.wasmBinary || !f && !l || "function" !== typeof fetch ? new Promise(function (e, n) {
								e(o())
							}) : fetch(n, {credentials: "same-origin"}).then(function (e) {
								if (!e.ok) throw"failed to load wasm binary file at '" + n + "'";
								return e.arrayBuffer()
							}).catch(function () {
								return o()
							})).then(function (e) {
								return WebAssembly.instantiate(e, r)
							}).then(e).catch(function (e) {
								h("failed to asynchronously prepare wasm: " + e), Te(e)
							})
						}

						return a.wasmBinary || "function" !== typeof WebAssembly.instantiateStreaming || te(n) || "function" !== typeof fetch ? _(c) : WebAssembly.instantiateStreaming(fetch(n, {credentials: "same-origin"}), r).then(c).catch(function (e) {
							h("wasm streaming compile failed: " + e), h("falling back to ArrayBuffer instantiation"), _(c)
						}), {}
					}

					a.asmPreload = a.asm;
					var s = a.reallocBuffer;
					a.reallocBuffer = function (e) {
						return "asmjs" === c ? s(e) : function (e) {
							e = U(e, a.usingWasm ? P : B);
							var n = a.buffer.byteLength;
							if (a.usingWasm) try {
								return -1 !== a.wasmMemory.grow((e - n) / 65536) ? a.buffer = a.wasmMemory.buffer : null
							} catch (Oe) {
								return null
							}
						}(e)
					};
					var c = "";
					a.asm = function (e, n, t) {
						var r;
						if (!(n = n).table) {
							var i = a.wasmTableSize;
							void 0 === i && (i = 1024);
							var o = a.wasmMaxTableSize;
							"object" === typeof WebAssembly && "function" === typeof WebAssembly.Table ? n.table = void 0 !== o ? new WebAssembly.Table({initial: i, maximum: o, element: "anyfunc"}) : new WebAssembly.Table({initial: i, element: "anyfunc"}) : n.table = new Array(i), a.wasmTable = n.table
						}
						return n.memoryBase || (n.memoryBase = a.STATIC_BASE), n.tableBase || (n.tableBase = 0), w(r = u(0, n), "no binaryen method succeeded."), r
					}
				}();
				var re = [function (e) {
					self.DApi.current_save_id(e)
				}];
				N = 1855168, K.push({
					func: function () {
						me()
					}
				});

				function ie() {
					return !!ie.uncaught_exception
				}

				a.STATIC_BASE = 1024, a.STATIC_BUMP = 1854144, N += 16;
				var oe = {
					last: 0, caught: [], infos: {}, deAdjust: function (e) {
						if (!e || oe.infos[e]) return e;
						for (var n in oe.infos) {
							var t = +n;
							if (oe.infos[t].adjusted === e) return t
						}
						return e
					}, addRef: function (e) {
						e && oe.infos[e].refcount++
					}, decRef: function (e) {
						if (e) {
							var n = oe.infos[e];
							w(n.refcount > 0), n.refcount--, 0 !== n.refcount || n.rethrown || (n.destructor && a.dynCall_vi(n.destructor, e), delete oe.infos[e], ae(e))
						}
					}, clearRef: function (e) {
						e && (oe.infos[e].refcount = 0)
					}
				};

				function ae(e) {
					try {
						return he(e)
					} catch (Oe) {
					}
				}

				function ue() {
					var e = oe.last;
					if (!e) return 0 | (ge(0), 0);
					var n = oe.infos[e], t = n.type;
					if (!t) return 0 | (ge(0), e);
					var r = Array.prototype.slice.call(arguments);
					a.___cxa_is_pointer_type(t);
					ue.buffer || (ue.buffer = ve(4)), R[ue.buffer >> 2] = e, e = ue.buffer;
					for (var i = 0; i < r.length; i++) if (r[i] && a.___cxa_can_catch(r[i], t, e)) return e = R[e >> 2], n.adjusted = e, 0 | (ge(r[i]), e);
					return e = R[e >> 2], 0 | (ge(t), e)
				}

				var se = {
					varargs: 0, get: function (e) {
						return se.varargs += 4, R[se.varargs - 4 >> 2]
					}, getStr: function () {
						return A(se.get())
					}, get64: function () {
						var e = se.get(), n = se.get();
						return w(e >= 0 ? 0 === n : -1 === n), e
					}, getZero: function () {
						w(0 === se.get())
					}
				};

				function ce(e) {
					!function (e, n) {
						if (n && a.noExitRuntime && 0 === e) return;
						a.noExitRuntime || (b = !0, e, L = de, q(Y), !0, a.onExit && a.onExit(e));
						a.quit(e, new we(e))
					}(e)
				}

				var fe = {};
				var le = 1, _e = {
					EPERM: 1,
					ENOENT: 2,
					ESRCH: 3,
					EINTR: 4,
					EIO: 5,
					ENXIO: 6,
					E2BIG: 7,
					ENOEXEC: 8,
					EBADF: 9,
					ECHILD: 10,
					EAGAIN: 11,
					EWOULDBLOCK: 11,
					ENOMEM: 12,
					EACCES: 13,
					EFAULT: 14,
					ENOTBLK: 15,
					EBUSY: 16,
					EEXIST: 17,
					EXDEV: 18,
					ENODEV: 19,
					ENOTDIR: 20,
					EISDIR: 21,
					EINVAL: 22,
					ENFILE: 23,
					EMFILE: 24,
					ENOTTY: 25,
					ETXTBSY: 26,
					EFBIG: 27,
					ENOSPC: 28,
					ESPIPE: 29,
					EROFS: 30,
					EMLINK: 31,
					EPIPE: 32,
					EDOM: 33,
					ERANGE: 34,
					ENOMSG: 42,
					EIDRM: 43,
					ECHRNG: 44,
					EL2NSYNC: 45,
					EL3HLT: 46,
					EL3RST: 47,
					ELNRNG: 48,
					EUNATCH: 49,
					ENOCSI: 50,
					EL2HLT: 51,
					EDEADLK: 35,
					ENOLCK: 37,
					EBADE: 52,
					EBADR: 53,
					EXFULL: 54,
					ENOANO: 55,
					EBADRQC: 56,
					EBADSLT: 57,
					EDEADLOCK: 35,
					EBFONT: 59,
					ENOSTR: 60,
					ENODATA: 61,
					ETIME: 62,
					ENOSR: 63,
					ENONET: 64,
					ENOPKG: 65,
					EREMOTE: 66,
					ENOLINK: 67,
					EADV: 68,
					ESRMNT: 69,
					ECOMM: 70,
					EPROTO: 71,
					EMULTIHOP: 72,
					EDOTDOT: 73,
					EBADMSG: 74,
					ENOTUNIQ: 76,
					EBADFD: 77,
					EREMCHG: 78,
					ELIBACC: 79,
					ELIBBAD: 80,
					ELIBSCN: 81,
					ELIBMAX: 82,
					ELIBEXEC: 83,
					ENOSYS: 38,
					ENOTEMPTY: 39,
					ENAMETOOLONG: 36,
					ELOOP: 40,
					EOPNOTSUPP: 95,
					EPFNOSUPPORT: 96,
					ECONNRESET: 104,
					ENOBUFS: 105,
					EAFNOSUPPORT: 97,
					EPROTOTYPE: 91,
					ENOTSOCK: 88,
					ENOPROTOOPT: 92,
					ESHUTDOWN: 108,
					ECONNREFUSED: 111,
					EADDRINUSE: 98,
					ECONNABORTED: 103,
					ENETUNREACH: 101,
					ENETDOWN: 100,
					ETIMEDOUT: 110,
					EHOSTDOWN: 112,
					EHOSTUNREACH: 113,
					EINPROGRESS: 115,
					EALREADY: 114,
					EDESTADDRREQ: 89,
					EMSGSIZE: 90,
					EPROTONOSUPPORT: 93,
					ESOCKTNOSUPPORT: 94,
					EADDRNOTAVAIL: 99,
					ENETRESET: 102,
					EISCONN: 106,
					ENOTCONN: 107,
					ETOOMANYREFS: 109,
					EUSERS: 87,
					EDQUOT: 122,
					ESTALE: 116,
					ENOTSUP: 95,
					ENOMEDIUM: 123,
					EILSEQ: 84,
					EOVERFLOW: 75,
					ECANCELED: 125,
					ENOTRECOVERABLE: 131,
					EOWNERDEAD: 130,
					ESTRPIPE: 86
				};
				I = function (e) {
					var n = N;
					return N = N + e + 15 & -16, n
				}(4), D = L = g(N), M = g(D + H), R[I >> 2] = M, a.wasmTableSize = 600, a.wasmMaxTableSize = 600, a.asmGlobalArg = {}, a.asmLibraryArg = {
					abort: Te, enlargeMemory: function () {
						var e = a.usingWasm ? P : B, n = 2147483648 - e;
						if (R[I >> 2] > n) return !1;
						var t = G;
						for (G = Math.max(G, k); G < R[I >> 2];) G = G <= 536870912 ? U(2 * G, e) : Math.min(U((3 * G + 2147483648) / 4, e), n);
						var r = a.reallocBuffer(G);
						return r && r.byteLength == G ? (F(r), W(), !0) : (G = t, !1)
					}, getTotalMemory: function () {
						return G
					}, abortOnCannotGrowMemory: function () {
						Te("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + G + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")
					}, invoke_i: function (e) {
						var n = be();
						try {
							return a.dynCall_i(e)
						} catch (Oe) {
							if (Ee(n), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_ii: function (e, n) {
						var t = be();
						try {
							return a.dynCall_ii(e, n)
						} catch (Oe) {
							if (Ee(t), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_iii: function (e, n, t) {
						var r = be();
						try {
							return a.dynCall_iii(e, n, t)
						} catch (Oe) {
							if (Ee(r), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_iiii: function (e, n, t, r) {
						var i = be();
						try {
							return a.dynCall_iiii(e, n, t, r)
						} catch (Oe) {
							if (Ee(i), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_iiiii: function (e, n, t, r, i) {
						var o = be();
						try {
							return a.dynCall_iiiii(e, n, t, r, i)
						} catch (Oe) {
							if (Ee(o), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_iiiiii: function (e, n, t, r, i, o) {
						var u = be();
						try {
							return a.dynCall_iiiiii(e, n, t, r, i, o)
						} catch (Oe) {
							if (Ee(u), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_ji: function (e, n) {
						var t = be();
						try {
							return a.dynCall_ji(e, n)
						} catch (Oe) {
							if (Ee(t), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_v: function (e) {
						var n = be();
						try {
							a.dynCall_v(e)
						} catch (Oe) {
							if (Ee(n), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_vi: function (e, n) {
						var t = be();
						try {
							a.dynCall_vi(e, n)
						} catch (Oe) {
							if (Ee(t), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_vii: function (e, n, t) {
						var r = be();
						try {
							a.dynCall_vii(e, n, t)
						} catch (Oe) {
							if (Ee(r), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_viii: function (e, n, t, r) {
						var i = be();
						try {
							a.dynCall_viii(e, n, t, r)
						} catch (Oe) {
							if (Ee(i), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_viiii: function (e, n, t, r, i) {
						var o = be();
						try {
							a.dynCall_viiii(e, n, t, r, i)
						} catch (Oe) {
							if (Ee(o), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_viiiii: function (e, n, t, r, i, o) {
						var u = be();
						try {
							a.dynCall_viiiii(e, n, t, r, i, o)
						} catch (Oe) {
							if (Ee(u), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_viji: function (e, n, t, r, i) {
						var o = be();
						try {
							a.dynCall_viji(e, n, t, r, i)
						} catch (Oe) {
							if (Ee(o), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, ___assert_fail: function (e, n, t, r) {
						Te("Assertion failed: " + A(e) + ", at: " + [n ? A(n) : "unknown filename", t, r ? A(r) : "unknown function"])
					}, ___cxa_allocate_exception: function (e) {
						return ve(e)
					}, ___cxa_begin_catch: function (e) {
						var n = oe.infos[e];
						return n && !n.caught && (n.caught = !0, ie.uncaught_exception--), n && (n.rethrown = !1), oe.caught.push(e), oe.addRef(oe.deAdjust(e)), e
					}, ___cxa_end_catch: function () {
						a.setThrew(0);
						var e = oe.caught.pop();
						e && (oe.decRef(oe.deAdjust(e)), oe.last = 0)
					}, ___cxa_find_matching_catch_2: function () {
						return ue.apply(null, arguments)
					}, ___cxa_find_matching_catch_3: function () {
						return ue.apply(null, arguments)
					}, ___cxa_free_exception: ae, ___cxa_throw: function (e, n, t) {
						throw oe.infos[e] = {ptr: e, adjusted: e, type: n, destructor: t, refcount: 0, caught: !1, rethrown: !1}, oe.last = e, "uncaught_exception" in ie ? ie.uncaught_exception++ : ie.uncaught_exception = 1, e
					}, ___lock: function () {
					}, ___resumeException: function (e) {
						throw oe.last || (oe.last = e), e
					}, ___setErrNo: function (e) {
						return a.___errno_location && (R[a.___errno_location() >> 2] = e), e
					}, ___syscall140: function (e, n) {
						se.varargs = n;
						try {
							var t = se.getStreamFromFD(), r = (se.get(), se.get()), i = se.get(), o = se.get(), a = r;
							return FS.llseek(t, a, o), R[i >> 2] = t.position, t.getdents && 0 === a && 0 === o && (t.getdents = null), 0
						} catch (Oe) {
							return "undefined" !== typeof FS && Oe instanceof FS.ErrnoError || Te(Oe), -Oe.errno
						}
					}, ___syscall146: function e(n, t) {
						se.varargs = t;
						try {
							var r = se.get(), i = se.get(), o = se.get(), a = 0;
							e.buffers || (e.buffers = [null, [], []], e.printChar = function (n, t) {
								var r = e.buffers[n];
								w(r), 0 === t || 10 === t ? ((1 === n ? y : h)(O(r, 0)), r.length = 0) : r.push(t)
							});
							for (var u = 0; u < o; u++) {
								for (var s = R[i + 8 * u >> 2], c = R[i + (8 * u + 4) >> 2], f = 0; f < c; f++) e.printChar(r, x[s + f]);
								a += c
							}
							return a
						} catch (Oe) {
							return "undefined" !== typeof FS && Oe instanceof FS.ErrnoError || Te(Oe), -Oe.errno
						}
					}, ___syscall54: function (e, n) {
						se.varargs = n;
						try {
							return 0
						} catch (Oe) {
							return "undefined" !== typeof FS && Oe instanceof FS.ErrnoError || Te(Oe), -Oe.errno
						}
					}, ___syscall6: function (e, n) {
						se.varargs = n;
						try {
							var t = se.getStreamFromFD();
							return FS.close(t), 0
						} catch (Oe) {
							return "undefined" !== typeof FS && Oe instanceof FS.ErrnoError || Te(Oe), -Oe.errno
						}
					}, ___unlock: function () {
					}, _abort: function () {
						a.abort()
					}, _api_close_keyboard: function () {
						self.DApi.close_keyboard()
					}, _api_create_sound_float: function (e, n, t, r, i) {
						self.DApi.create_sound(e, j.slice(n / 4, n / 4 + t * r), t, r, i)
					}, _api_delete_sound: function (e) {
						self.DApi.delete_sound(e)
					}, _api_draw_begin: function () {
						self.DApi.draw_begin()
					}, _api_draw_belt: function (e) {
						self.DApi.draw_belt(R.subarray(e / 4, e / 4 + 8))
					}, _api_draw_blit: function (e, n, t, r, i) {
						self.DApi.draw_blit(e, n, t, r, x.subarray(i, i + t * r * 4))
					}, _api_draw_clip_text: function (e, n, t, r) {
						self.DApi.draw_clip_text(e, n, t, r)
					}, _api_draw_end: function () {
						self.DApi.draw_end()
					}, _api_draw_text: function (e, n, t, r) {
						var i = x.indexOf(0, t), o = String.fromCharCode.apply(null, x.subarray(t, i));
						self.DApi.draw_text(e, n, o, r)
					}, _api_duplicate_sound: function (e, n) {
						self.DApi.duplicate_sound(e, n)
					}, _api_exit_game: function () {
						self.DApi.exit_game()
					}, _api_open_keyboard: function () {
						self.DApi.open_keyboard()
					}, _api_play_sound: function (e, n, t, r) {
						self.DApi.play_sound(e, n, t, r)
					}, _api_set_cursor: function (e, n) {
						self.DApi.set_cursor(e, n)
					}, _api_set_volume: function (e, n) {
						self.DApi.set_volume(e, n)
					}, _api_stop_sound: function (e) {
						self.DApi.stop_sound(e)
					}, _emscripten_asm_const_ii: function (e, n) {
						return re[e](n)
					}, _emscripten_memcpy_big: function (e, n, t) {
						return x.set(x.subarray(n, n + t), e), e
					}, _exit: function (e) {
						ce(e)
					}, _exit_error: function (e) {
						var n = x.indexOf(0, e), t = String.fromCharCode.apply(null, x.subarray(e, n));
						self.DApi.exit_error(t)
					}, _get_file_contents: function (e, n, t, r) {
						var i = x.indexOf(0, e), o = String.fromCharCode.apply(null, x.subarray(e, i));
						self.DApi.get_file_contents(o, x.subarray(n, n + r), t)
					}, _get_file_size: function (e) {
						var n = x.indexOf(0, e), t = String.fromCharCode.apply(null, x.subarray(e, n));
						return self.DApi.get_file_size(t)
					}, _pthread_getspecific: function (e) {
						return fe[e] || 0
					}, _pthread_key_create: function (e, n) {
						return 0 == e ? _e.EINVAL : (R[e >> 2] = le, fe[le] = 0, le++, 0)
					}, _pthread_once: function e(n, t) {
						e.seen || (e.seen = {}), n in e.seen || (a.dynCall_v(t), e.seen[n] = 1)
					}, _pthread_setspecific: function (e, n) {
						return e in fe ? (fe[e] = n, 0) : _e.EINVAL
					}, _put_file_contents: function (e, n, t) {
						var r = x.indexOf(0, e), i = String.fromCharCode.apply(null, x.subarray(e, r));
						self.DApi.put_file_contents(i, x.slice(n, n + t))
					}, _remove_file: function (e) {
						var n = x.indexOf(0, e), t = String.fromCharCode.apply(null, x.subarray(e, n));
						self.DApi.remove_file(t)
					}, _show_alert: function (e) {
						var n = x.indexOf(0, e), t = String.fromCharCode.apply(null, x.subarray(e, n));
						self.alert(t)
					}, _time: function (e) {
						var n = Date.now() / 1e3 | 0;
						return e && (R[e >> 2] = n), n
					}, DYNAMICTOP_PTR: I, STACKTOP: L
				};
				var pe = a.asm(a.asmGlobalArg, a.asmLibraryArg, C);
				a.asm = pe;
				a._DApi_Char = function () {
					return a.asm._DApi_Char.apply(null, arguments)
				}, a._DApi_Init = function () {
					return a.asm._DApi_Init.apply(null, arguments)
				}, a._DApi_Key = function () {
					return a.asm._DApi_Key.apply(null, arguments)
				}, a._DApi_Mouse = function () {
					return a.asm._DApi_Mouse.apply(null, arguments)
				}, a._DApi_Render = function () {
					return a.asm._DApi_Render.apply(null, arguments)
				}, a._DApi_SyncText = function () {
					return a.asm._DApi_SyncText.apply(null, arguments)
				};
				var de, me = a.__GLOBAL__sub_I_msgcmd_cpp = function () {
					return a.asm.__GLOBAL__sub_I_msgcmd_cpp.apply(null, arguments)
				}, ye = (a.___cxa_can_catch = function () {
					return a.asm.___cxa_can_catch.apply(null, arguments)
				}, a.___cxa_is_pointer_type = function () {
					return a.asm.___cxa_is_pointer_type.apply(null, arguments)
				}, a.___em_js__api_close_keyboard = function () {
					return a.asm.___em_js__api_close_keyboard.apply(null, arguments)
				}, a.___em_js__api_create_sound_float = function () {
					return a.asm.___em_js__api_create_sound_float.apply(null, arguments)
				}, a.___em_js__api_delete_sound = function () {
					return a.asm.___em_js__api_delete_sound.apply(null, arguments)
				}, a.___em_js__api_draw_begin = function () {
					return a.asm.___em_js__api_draw_begin.apply(null, arguments)
				}, a.___em_js__api_draw_belt = function () {
					return a.asm.___em_js__api_draw_belt.apply(null, arguments)
				}, a.___em_js__api_draw_blit = function () {
					return a.asm.___em_js__api_draw_blit.apply(null, arguments)
				}, a.___em_js__api_draw_clip_text = function () {
					return a.asm.___em_js__api_draw_clip_text.apply(null, arguments)
				}, a.___em_js__api_draw_end = function () {
					return a.asm.___em_js__api_draw_end.apply(null, arguments)
				}, a.___em_js__api_draw_text = function () {
					return a.asm.___em_js__api_draw_text.apply(null, arguments)
				}, a.___em_js__api_duplicate_sound = function () {
					return a.asm.___em_js__api_duplicate_sound.apply(null, arguments)
				}, a.___em_js__api_exit_game = function () {
					return a.asm.___em_js__api_exit_game.apply(null, arguments)
				}, a.___em_js__api_open_keyboard = function () {
					return a.asm.___em_js__api_open_keyboard.apply(null, arguments)
				}, a.___em_js__api_play_sound = function () {
					return a.asm.___em_js__api_play_sound.apply(null, arguments)
				}, a.___em_js__api_set_cursor = function () {
					return a.asm.___em_js__api_set_cursor.apply(null, arguments)
				}, a.___em_js__api_set_volume = function () {
					return a.asm.___em_js__api_set_volume.apply(null, arguments)
				}, a.___em_js__api_stop_sound = function () {
					return a.asm.___em_js__api_stop_sound.apply(null, arguments)
				}, a.___em_js__exit_error = function () {
					return a.asm.___em_js__exit_error.apply(null, arguments)
				}, a.___em_js__get_file_contents = function () {
					return a.asm.___em_js__get_file_contents.apply(null, arguments)
				}, a.___em_js__get_file_size = function () {
					return a.asm.___em_js__get_file_size.apply(null, arguments)
				}, a.___em_js__put_file_contents = function () {
					return a.asm.___em_js__put_file_contents.apply(null, arguments)
				}, a.___em_js__remove_file = function () {
					return a.asm.___em_js__remove_file.apply(null, arguments)
				}, a.___em_js__show_alert = function () {
					return a.asm.___em_js__show_alert.apply(null, arguments)
				}, a.___em_js__trace_pop = function () {
					return a.asm.___em_js__trace_pop.apply(null, arguments)
				}, a.___em_js__trace_push = function () {
					return a.asm.___em_js__trace_push.apply(null, arguments)
				}, a._emscripten_replace_memory = function () {
					return a.asm._emscripten_replace_memory.apply(null, arguments)
				}), he = a._free = function () {
					return a.asm._free.apply(null, arguments)
				}, ve = a._malloc = function () {
					return a.asm._malloc.apply(null, arguments)
				}, ge = a.setTempRet0 = function () {
					return a.asm.setTempRet0.apply(null, arguments)
				}, Ee = (a.setThrew = function () {
					return a.asm.setThrew.apply(null, arguments)
				}, a.stackRestore = function () {
					return a.asm.stackRestore.apply(null, arguments)
				}), be = a.stackSave = function () {
					return a.asm.stackSave.apply(null, arguments)
				};
				a.dynCall_i = function () {
					return a.asm.dynCall_i.apply(null, arguments)
				}, a.dynCall_ii = function () {
					return a.asm.dynCall_ii.apply(null, arguments)
				}, a.dynCall_iii = function () {
					return a.asm.dynCall_iii.apply(null, arguments)
				}, a.dynCall_iiii = function () {
					return a.asm.dynCall_iiii.apply(null, arguments)
				}, a.dynCall_iiiii = function () {
					return a.asm.dynCall_iiiii.apply(null, arguments)
				}, a.dynCall_iiiiii = function () {
					return a.asm.dynCall_iiiiii.apply(null, arguments)
				}, a.dynCall_ji = function () {
					return a.asm.dynCall_ji.apply(null, arguments)
				}, a.dynCall_v = function () {
					return a.asm.dynCall_v.apply(null, arguments)
				}, a.dynCall_vi = function () {
					return a.asm.dynCall_vi.apply(null, arguments)
				}, a.dynCall_vii = function () {
					return a.asm.dynCall_vii.apply(null, arguments)
				}, a.dynCall_viii = function () {
					return a.asm.dynCall_viii.apply(null, arguments)
				}, a.dynCall_viiii = function () {
					return a.asm.dynCall_viiii.apply(null, arguments)
				}, a.dynCall_viiiii = function () {
					return a.asm.dynCall_viiiii.apply(null, arguments)
				}, a.dynCall_viji = function () {
					return a.asm.dynCall_viji.apply(null, arguments)
				};

				function we(e) {
					this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e
				}

				function Ae(e) {
					function n() {
						a.calledRun || (a.calledRun = !0, b || (Q || (Q = !0, q(K)), q(X), a.onRuntimeInitialized && a.onRuntimeInitialized(), function () {
							if (a.postRun) for ("function" == typeof a.postRun && (a.postRun = [a.postRun]); a.postRun.length;) J(a.postRun.shift());
							q(V)
						}()))
					}

					e = e || a.arguments, Z > 0 || (!function () {
						if (a.preRun) for ("function" == typeof a.preRun && (a.preRun = [a.preRun]); a.preRun.length;) e = a.preRun.shift(), z.unshift(e);
						var e;
						q(z)
					}(), Z > 0 || a.calledRun || (a.setStatus ? (a.setStatus("Running..."), setTimeout(function () {
						setTimeout(function () {
							a.setStatus("")
						}, 1), n()
					}, 1)) : n()))
				}

				function Te(e) {
					throw a.onAbort && a.onAbort(e), void 0 !== e ? (y(e), h(e), e = JSON.stringify(e)) : e = "", b = !0, 1, "abort(" + e + "). Build with -s ASSERTIONS=1 for more info."
				}

				if (a.asm = pe, a.then = function (e) {
					if (a.calledRun) e(a); else {
						var n = a.onRuntimeInitialized;
						a.onRuntimeInitialized = function () {
							n && n(), e(a)
						}
					}
					return a
				}, we.prototype = new Error, we.prototype.constructor = we, ee = function e() {
					a.calledRun || Ae(), a.calledRun || (ee = e)
				}, a.run = Ae, a.abort = Te, a.preInit) for ("function" == typeof a.preInit && (a.preInit = [a.preInit]); a.preInit.length > 0;) a.preInit.pop()();
				return a.noExitRuntime = !0, Ae(), a.ready = new Promise(function (e, n) {
					delete a.then, a.onAbort = function (e) {
						n(e)
					}, J(function () {
						e(a)
					})
				}), i
			}
		}();
		e.exports = i
	}).call(this, t(2), "/")
}, function (e, n, t) {
	e.exports = t.p + "static/media/DiabloSpawn.cbb9c567.wasm"
}, function (e, n, t) {
	(function (n, r) {
		var i = function () {
			var e = "undefined" !== typeof document && document.currentScript ? document.currentScript.src : void 0;
			return function (i) {
				var o, a = "undefined" !== typeof (i = i || {}) ? i : {}, u = {};
				for (o in a) a.hasOwnProperty(o) && (u[o] = a[o]);
				a.arguments = [], a.thisProgram = "./this.program", a.quit = function (e, n) {
					throw n
				}, a.preRun = [], a.postRun = [];
				var s, c, f = !1, l = !1;
				f = "object" === typeof window, l = "function" === typeof importScripts, s = "object" === typeof n && !f && !l, c = !f && !s && !l;
				var _, p, d = "";

				function m(e) {
					return a.locateFile ? a.locateFile(e, d) : d + e
				}

				s ? (d = r + "/", a.read = function (e, n) {
					var r;
					return _ || (_ = t(3)), p || (p = t(4)), e = p.normalize(e), r = _.readFileSync(e), n ? r : r.toString()
				}, a.readBinary = function (e) {
					var n = a.read(e, !0);
					return n.buffer || (n = new Uint8Array(n)), w(n.buffer), n
				}, n.argv.length > 1 && (a.thisProgram = n.argv[1].replace(/\\/g, "/")), a.arguments = n.argv.slice(2), n.on("uncaughtException", function (e) {
					if (!(e instanceof we)) throw e
				}), n.on("unhandledRejection", function (e, t) {
					n.exit(1)
				}), a.quit = function (e) {
					n.exit(e)
				}, a.inspect = function () {
					return "[Emscripten Module object]"
				}) : c ? ("undefined" != typeof read && (a.read = function (e) {
					return read(e)
				}), a.readBinary = function (e) {
					var n;
					return "function" === typeof readbuffer ? new Uint8Array(readbuffer(e)) : (w("object" === typeof (n = read(e, "binary"))), n)
				}, "undefined" != typeof scriptArgs ? a.arguments = scriptArgs : "undefined" != typeof arguments && (a.arguments = arguments), "function" === typeof quit && (a.quit = function (e) {
					quit(e)
				})) : (f || l) && (f ? document.currentScript && (d = document.currentScript.src) : d = self.location.href, e && (d = e), d = 0 !== d.indexOf("blob:") ? d.split("/").slice(0, -1).join("/") + "/" : "", a.read = function (e) {
					var n = new XMLHttpRequest;
					return n.open("GET", e, !1), n.send(null), n.responseText
				}, l && (a.readBinary = function (e) {
					var n = new XMLHttpRequest;
					return n.open("GET", e, !1), n.responseType = "arraybuffer", n.send(null), new Uint8Array(n.response)
				}), a.readAsync = function (e, n, t) {
					var r = new XMLHttpRequest;
					r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = function () {
						200 == r.status || 0 == r.status && r.response ? n(r.response) : t()
					}, r.onerror = t, r.send(null)
				}, a.setWindowTitle = function (e) {
					document.title = e
				});
				var y = a.print || ("undefined" !== typeof console ? console.log.bind(console) : "undefined" !== typeof print ? print : null), h = a.printErr || ("undefined" !== typeof printErr ? printErr : "undefined" !== typeof console && console.warn.bind(console) || y);
				for (o in u) u.hasOwnProperty(o) && (a[o] = u[o]);
				u = void 0;
				var v = 16;

				function g(e, n) {
					return n || (n = v), e = Math.ceil(e / n) * n
				}

				var E = {
					"f64-rem": function (e, n) {
						return e % n
					}, debugger: function () {
					}
				}, b = (new Array(0), 0);

				function w(e, n) {
					e || Te("Assertion failed: " + n)
				}

				function A(e, n) {
					if (0 === n || !e) return "";
					for (var t, r = 0, i = 0; r |= t = x[e + i >> 0], (0 != t || n) && (i++, !n || i != n);) ;
					n || (n = i);
					var o = "";
					if (r < 128) {
						for (var a; n > 0;) a = String.fromCharCode.apply(String, x.subarray(e, e + Math.min(n, 1024))), o = o ? o + a : a, e += 1024, n -= 1024;
						return o
					}
					return function (e) {
						return O(x, e)
					}(e)
				}

				var T = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;

				function O(e, n) {
					for (var t = n; e[t];) ++t;
					if (t - n > 16 && e.subarray && T) return T.decode(e.subarray(n, t));
					for (var r, i, o, a, u, s = ""; ;) {
						if (!(r = e[n++])) return s;
						if (128 & r) if (i = 63 & e[n++], 192 != (224 & r)) if (o = 63 & e[n++], 224 == (240 & r) ? r = (15 & r) << 12 | i << 6 | o : (a = 63 & e[n++], 240 == (248 & r) ? r = (7 & r) << 18 | i << 12 | o << 6 | a : (u = 63 & e[n++], r = 248 == (252 & r) ? (3 & r) << 24 | i << 18 | o << 12 | a << 6 | u : (1 & r) << 30 | i << 24 | o << 18 | a << 12 | u << 6 | 63 & e[n++])), r < 65536) s += String.fromCharCode(r); else {
							var c = r - 65536;
							s += String.fromCharCode(55296 | c >> 10, 56320 | 1023 & c)
						} else s += String.fromCharCode((31 & r) << 6 | i); else s += String.fromCharCode(r)
					}
				}

				"undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");
				var C, S, x, R, j, N, D, L, M, I, P = 65536, B = 16777216, k = 16777216;

				function U(e, n) {
					return e % n > 0 && (e += n - e % n), e
				}

				function F(e) {
					a.buffer = C = e
				}

				function W() {
					a.HEAP8 = S = new Int8Array(C), a.HEAP16 = new Int16Array(C), a.HEAP32 = R = new Int32Array(C), a.HEAPU8 = x = new Uint8Array(C), a.HEAPU16 = new Uint16Array(C), a.HEAPU32 = new Uint32Array(C), a.HEAPF32 = j = new Float32Array(C), a.HEAPF64 = new Float64Array(C)
				}

				N = L = I = 0, a.reallocBuffer || (a.reallocBuffer = function (e) {
					var n;
					try {
						if (ArrayBuffer.transfer) n = ArrayBuffer.transfer(C, e); else {
							var t = S;
							n = new ArrayBuffer(e), new Int8Array(n).set(t)
						}
					} catch (r) {
						return !1
					}
					return !!ye(n) && n
				});
				try {
					Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get)(new ArrayBuffer(4))
				} catch (Oe) {
					(function (e) {
						return e.byteLength
					})
				}
				var H = a.TOTAL_STACK || 5242880, G = a.TOTAL_MEMORY || 134217728;

				function q(e) {
					for (; e.length > 0;) {
						var n = e.shift();
						if ("function" != typeof n) {
							var t = n.func;
							"number" === typeof t ? void 0 === n.arg ? a.dynCall_v(t) : a.dynCall_vi(t, n.arg) : t(void 0 === n.arg ? null : n.arg)
						} else n()
					}
				}

				G < H && h("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + G + "! (TOTAL_STACK=" + H + ")"), a.buffer ? C = a.buffer : ("object" === typeof WebAssembly && "function" === typeof WebAssembly.Memory ? (a.wasmMemory = new WebAssembly.Memory({initial: G / P}), C = a.wasmMemory.buffer) : C = new ArrayBuffer(G), a.buffer = C), W();
				var z = [], K = [], X = [], Y = [], V = [], Q = !1;

				function J(e) {
					V.unshift(e)
				}

				var Z = 0, $ = null, ee = null;
				a.preloadedImages = {}, a.preloadedAudios = {};
				var ne = "data:application/octet-stream;base64,";

				function te(e) {
					return String.prototype.startsWith ? e.startsWith(ne) : 0 === e.indexOf(ne)
				}

				!function () {
					var e = "DiabloSpawn.wast", n = "DiabloSpawn.wasm", t = "DiabloSpawn.temp.asm.js";
					te(e) || (e = m(e)), te(n) || (n = m(n)), te(t) || (t = m(t));
					var r = {global: null, env: null, asm2wasm: E, parent: a}, i = null;

					function o() {
						try {
							if (a.wasmBinary) return new Uint8Array(a.wasmBinary);
							if (a.readBinary) return a.readBinary(n);
							throw"both async and sync fetching of the wasm failed"
						} catch (h) {
							Te(h)
						}
					}

					function u(e, t, u) {
						if ("object" !== typeof WebAssembly) return h("no native wasm support detected"), !1;
						if (!(a.wasmMemory instanceof WebAssembly.Memory)) return h("no native wasm Memory in use"), !1;

						function s(e, n) {
							(i = e.exports).memory && function (e) {
								var n = a.buffer;
								e.byteLength < n.byteLength && h("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here");
								var t = new Int8Array(n);
								new Int8Array(e).set(t), F(e), W()
							}(i.memory), a.asm = i, a.usingWasm = !0, function (e) {
								if (Z--, a.monitorRunDependencies && a.monitorRunDependencies(Z), 0 == Z && (null !== $ && (clearInterval($), $ = null), ee)) {
									var n = ee;
									ee = null, n()
								}
							}()
						}

						if (t.memory = a.wasmMemory, r.global = {NaN: NaN, Infinity: 1 / 0}, r["global.Math"] = Math, r.env = t, Z++, a.monitorRunDependencies && a.monitorRunDependencies(Z), a.instantiateWasm) try {
							return a.instantiateWasm(r, s)
						} catch (Oe) {
							return h("Module.instantiateWasm callback failed with error: " + Oe), !1
						}

						function c(e) {
							s(e.instance, e.module)
						}

						function _(e) {
							(a.wasmBinary || !f && !l || "function" !== typeof fetch ? new Promise(function (e, n) {
								e(o())
							}) : fetch(n, {credentials: "same-origin"}).then(function (e) {
								if (!e.ok) throw"failed to load wasm binary file at '" + n + "'";
								return e.arrayBuffer()
							}).catch(function () {
								return o()
							})).then(function (e) {
								return WebAssembly.instantiate(e, r)
							}).then(e).catch(function (e) {
								h("failed to asynchronously prepare wasm: " + e), Te(e)
							})
						}

						return a.wasmBinary || "function" !== typeof WebAssembly.instantiateStreaming || te(n) || "function" !== typeof fetch ? _(c) : WebAssembly.instantiateStreaming(fetch(n, {credentials: "same-origin"}), r).then(c).catch(function (e) {
							h("wasm streaming compile failed: " + e), h("falling back to ArrayBuffer instantiation"), _(c)
						}), {}
					}

					a.asmPreload = a.asm;
					var s = a.reallocBuffer;
					a.reallocBuffer = function (e) {
						return "asmjs" === c ? s(e) : function (e) {
							e = U(e, a.usingWasm ? P : B);
							var n = a.buffer.byteLength;
							if (a.usingWasm) try {
								return -1 !== a.wasmMemory.grow((e - n) / 65536) ? a.buffer = a.wasmMemory.buffer : null
							} catch (Oe) {
								return null
							}
						}(e)
					};
					var c = "";
					a.asm = function (e, n, t) {
						var r;
						if (!(n = n).table) {
							var i = a.wasmTableSize;
							void 0 === i && (i = 1024);
							var o = a.wasmMaxTableSize;
							"object" === typeof WebAssembly && "function" === typeof WebAssembly.Table ? n.table = void 0 !== o ? new WebAssembly.Table({initial: i, maximum: o, element: "anyfunc"}) : new WebAssembly.Table({initial: i, element: "anyfunc"}) : n.table = new Array(i), a.wasmTable = n.table
						}
						return n.memoryBase || (n.memoryBase = a.STATIC_BASE), n.tableBase || (n.tableBase = 0), w(r = u(0, n), "no binaryen method succeeded."), r
					}
				}();
				var re = [function (e) {
					self.DApi.current_save_id(e)
				}];
				N = 1830432, K.push({
					func: function () {
						me()
					}
				});

				function ie() {
					return !!ie.uncaught_exception
				}

				a.STATIC_BASE = 1024, a.STATIC_BUMP = 1829408, N += 16;
				var oe = {
					last: 0, caught: [], infos: {}, deAdjust: function (e) {
						if (!e || oe.infos[e]) return e;
						for (var n in oe.infos) {
							var t = +n;
							if (oe.infos[t].adjusted === e) return t
						}
						return e
					}, addRef: function (e) {
						e && oe.infos[e].refcount++
					}, decRef: function (e) {
						if (e) {
							var n = oe.infos[e];
							w(n.refcount > 0), n.refcount--, 0 !== n.refcount || n.rethrown || (n.destructor && a.dynCall_vi(n.destructor, e), delete oe.infos[e], ae(e))
						}
					}, clearRef: function (e) {
						e && (oe.infos[e].refcount = 0)
					}
				};

				function ae(e) {
					try {
						return he(e)
					} catch (Oe) {
					}
				}

				function ue() {
					var e = oe.last;
					if (!e) return 0 | (ge(0), 0);
					var n = oe.infos[e], t = n.type;
					if (!t) return 0 | (ge(0), e);
					var r = Array.prototype.slice.call(arguments);
					a.___cxa_is_pointer_type(t);
					ue.buffer || (ue.buffer = ve(4)), R[ue.buffer >> 2] = e, e = ue.buffer;
					for (var i = 0; i < r.length; i++) if (r[i] && a.___cxa_can_catch(r[i], t, e)) return e = R[e >> 2], n.adjusted = e, 0 | (ge(r[i]), e);
					return e = R[e >> 2], 0 | (ge(t), e)
				}

				var se = {
					varargs: 0, get: function (e) {
						return se.varargs += 4, R[se.varargs - 4 >> 2]
					}, getStr: function () {
						return A(se.get())
					}, get64: function () {
						var e = se.get(), n = se.get();
						return w(e >= 0 ? 0 === n : -1 === n), e
					}, getZero: function () {
						w(0 === se.get())
					}
				};

				function ce(e) {
					!function (e, n) {
						if (n && a.noExitRuntime && 0 === e) return;
						a.noExitRuntime || (b = !0, e, L = de, q(Y), !0, a.onExit && a.onExit(e));
						a.quit(e, new we(e))
					}(e)
				}

				var fe = {};
				var le = 1, _e = {
					EPERM: 1,
					ENOENT: 2,
					ESRCH: 3,
					EINTR: 4,
					EIO: 5,
					ENXIO: 6,
					E2BIG: 7,
					ENOEXEC: 8,
					EBADF: 9,
					ECHILD: 10,
					EAGAIN: 11,
					EWOULDBLOCK: 11,
					ENOMEM: 12,
					EACCES: 13,
					EFAULT: 14,
					ENOTBLK: 15,
					EBUSY: 16,
					EEXIST: 17,
					EXDEV: 18,
					ENODEV: 19,
					ENOTDIR: 20,
					EISDIR: 21,
					EINVAL: 22,
					ENFILE: 23,
					EMFILE: 24,
					ENOTTY: 25,
					ETXTBSY: 26,
					EFBIG: 27,
					ENOSPC: 28,
					ESPIPE: 29,
					EROFS: 30,
					EMLINK: 31,
					EPIPE: 32,
					EDOM: 33,
					ERANGE: 34,
					ENOMSG: 42,
					EIDRM: 43,
					ECHRNG: 44,
					EL2NSYNC: 45,
					EL3HLT: 46,
					EL3RST: 47,
					ELNRNG: 48,
					EUNATCH: 49,
					ENOCSI: 50,
					EL2HLT: 51,
					EDEADLK: 35,
					ENOLCK: 37,
					EBADE: 52,
					EBADR: 53,
					EXFULL: 54,
					ENOANO: 55,
					EBADRQC: 56,
					EBADSLT: 57,
					EDEADLOCK: 35,
					EBFONT: 59,
					ENOSTR: 60,
					ENODATA: 61,
					ETIME: 62,
					ENOSR: 63,
					ENONET: 64,
					ENOPKG: 65,
					EREMOTE: 66,
					ENOLINK: 67,
					EADV: 68,
					ESRMNT: 69,
					ECOMM: 70,
					EPROTO: 71,
					EMULTIHOP: 72,
					EDOTDOT: 73,
					EBADMSG: 74,
					ENOTUNIQ: 76,
					EBADFD: 77,
					EREMCHG: 78,
					ELIBACC: 79,
					ELIBBAD: 80,
					ELIBSCN: 81,
					ELIBMAX: 82,
					ELIBEXEC: 83,
					ENOSYS: 38,
					ENOTEMPTY: 39,
					ENAMETOOLONG: 36,
					ELOOP: 40,
					EOPNOTSUPP: 95,
					EPFNOSUPPORT: 96,
					ECONNRESET: 104,
					ENOBUFS: 105,
					EAFNOSUPPORT: 97,
					EPROTOTYPE: 91,
					ENOTSOCK: 88,
					ENOPROTOOPT: 92,
					ESHUTDOWN: 108,
					ECONNREFUSED: 111,
					EADDRINUSE: 98,
					ECONNABORTED: 103,
					ENETUNREACH: 101,
					ENETDOWN: 100,
					ETIMEDOUT: 110,
					EHOSTDOWN: 112,
					EHOSTUNREACH: 113,
					EINPROGRESS: 115,
					EALREADY: 114,
					EDESTADDRREQ: 89,
					EMSGSIZE: 90,
					EPROTONOSUPPORT: 93,
					ESOCKTNOSUPPORT: 94,
					EADDRNOTAVAIL: 99,
					ENETRESET: 102,
					EISCONN: 106,
					ENOTCONN: 107,
					ETOOMANYREFS: 109,
					EUSERS: 87,
					EDQUOT: 122,
					ESTALE: 116,
					ENOTSUP: 95,
					ENOMEDIUM: 123,
					EILSEQ: 84,
					EOVERFLOW: 75,
					ECANCELED: 125,
					ENOTRECOVERABLE: 131,
					EOWNERDEAD: 130,
					ESTRPIPE: 86
				};
				I = function (e) {
					var n = N;
					return N = N + e + 15 & -16, n
				}(4), D = L = g(N), M = g(D + H), R[I >> 2] = M, a.wasmTableSize = 588, a.wasmMaxTableSize = 588, a.asmGlobalArg = {}, a.asmLibraryArg = {
					abort: Te, enlargeMemory: function () {
						var e = a.usingWasm ? P : B, n = 2147483648 - e;
						if (R[I >> 2] > n) return !1;
						var t = G;
						for (G = Math.max(G, k); G < R[I >> 2];) G = G <= 536870912 ? U(2 * G, e) : Math.min(U((3 * G + 2147483648) / 4, e), n);
						var r = a.reallocBuffer(G);
						return r && r.byteLength == G ? (F(r), W(), !0) : (G = t, !1)
					}, getTotalMemory: function () {
						return G
					}, abortOnCannotGrowMemory: function () {
						Te("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + G + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")
					}, invoke_i: function (e) {
						var n = be();
						try {
							return a.dynCall_i(e)
						} catch (Oe) {
							if (Ee(n), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_ii: function (e, n) {
						var t = be();
						try {
							return a.dynCall_ii(e, n)
						} catch (Oe) {
							if (Ee(t), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_iii: function (e, n, t) {
						var r = be();
						try {
							return a.dynCall_iii(e, n, t)
						} catch (Oe) {
							if (Ee(r), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_iiii: function (e, n, t, r) {
						var i = be();
						try {
							return a.dynCall_iiii(e, n, t, r)
						} catch (Oe) {
							if (Ee(i), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_iiiii: function (e, n, t, r, i) {
						var o = be();
						try {
							return a.dynCall_iiiii(e, n, t, r, i)
						} catch (Oe) {
							if (Ee(o), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_iiiiii: function (e, n, t, r, i, o) {
						var u = be();
						try {
							return a.dynCall_iiiiii(e, n, t, r, i, o)
						} catch (Oe) {
							if (Ee(u), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_ji: function (e, n) {
						var t = be();
						try {
							return a.dynCall_ji(e, n)
						} catch (Oe) {
							if (Ee(t), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_v: function (e) {
						var n = be();
						try {
							a.dynCall_v(e)
						} catch (Oe) {
							if (Ee(n), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_vi: function (e, n) {
						var t = be();
						try {
							a.dynCall_vi(e, n)
						} catch (Oe) {
							if (Ee(t), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_vii: function (e, n, t) {
						var r = be();
						try {
							a.dynCall_vii(e, n, t)
						} catch (Oe) {
							if (Ee(r), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_viii: function (e, n, t, r) {
						var i = be();
						try {
							a.dynCall_viii(e, n, t, r)
						} catch (Oe) {
							if (Ee(i), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_viiii: function (e, n, t, r, i) {
						var o = be();
						try {
							a.dynCall_viiii(e, n, t, r, i)
						} catch (Oe) {
							if (Ee(o), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_viiiii: function (e, n, t, r, i, o) {
						var u = be();
						try {
							a.dynCall_viiiii(e, n, t, r, i, o)
						} catch (Oe) {
							if (Ee(u), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, invoke_viji: function (e, n, t, r, i) {
						var o = be();
						try {
							a.dynCall_viji(e, n, t, r, i)
						} catch (Oe) {
							if (Ee(o), "number" !== typeof Oe && "longjmp" !== Oe) throw Oe;
							a.setThrew(1, 0)
						}
					}, ___assert_fail: function (e, n, t, r) {
						Te("Assertion failed: " + A(e) + ", at: " + [n ? A(n) : "unknown filename", t, r ? A(r) : "unknown function"])
					}, ___cxa_allocate_exception: function (e) {
						return ve(e)
					}, ___cxa_begin_catch: function (e) {
						var n = oe.infos[e];
						return n && !n.caught && (n.caught = !0, ie.uncaught_exception--), n && (n.rethrown = !1), oe.caught.push(e), oe.addRef(oe.deAdjust(e)), e
					}, ___cxa_end_catch: function () {
						a.setThrew(0);
						var e = oe.caught.pop();
						e && (oe.decRef(oe.deAdjust(e)), oe.last = 0)
					}, ___cxa_find_matching_catch_2: function () {
						return ue.apply(null, arguments)
					}, ___cxa_find_matching_catch_3: function () {
						return ue.apply(null, arguments)
					}, ___cxa_free_exception: ae, ___cxa_throw: function (e, n, t) {
						throw oe.infos[e] = {ptr: e, adjusted: e, type: n, destructor: t, refcount: 0, caught: !1, rethrown: !1}, oe.last = e, "uncaught_exception" in ie ? ie.uncaught_exception++ : ie.uncaught_exception = 1, e
					}, ___lock: function () {
					}, ___resumeException: function (e) {
						throw oe.last || (oe.last = e), e
					}, ___setErrNo: function (e) {
						return a.___errno_location && (R[a.___errno_location() >> 2] = e), e
					}, ___syscall140: function (e, n) {
						se.varargs = n;
						try {
							var t = se.getStreamFromFD(), r = (se.get(), se.get()), i = se.get(), o = se.get(), a = r;
							return FS.llseek(t, a, o), R[i >> 2] = t.position, t.getdents && 0 === a && 0 === o && (t.getdents = null), 0
						} catch (Oe) {
							return "undefined" !== typeof FS && Oe instanceof FS.ErrnoError || Te(Oe), -Oe.errno
						}
					}, ___syscall146: function e(n, t) {
						se.varargs = t;
						try {
							var r = se.get(), i = se.get(), o = se.get(), a = 0;
							e.buffers || (e.buffers = [null, [], []], e.printChar = function (n, t) {
								var r = e.buffers[n];
								w(r), 0 === t || 10 === t ? ((1 === n ? y : h)(O(r, 0)), r.length = 0) : r.push(t)
							});
							for (var u = 0; u < o; u++) {
								for (var s = R[i + 8 * u >> 2], c = R[i + (8 * u + 4) >> 2], f = 0; f < c; f++) e.printChar(r, x[s + f]);
								a += c
							}
							return a
						} catch (Oe) {
							return "undefined" !== typeof FS && Oe instanceof FS.ErrnoError || Te(Oe), -Oe.errno
						}
					}, ___syscall54: function (e, n) {
						se.varargs = n;
						try {
							return 0
						} catch (Oe) {
							return "undefined" !== typeof FS && Oe instanceof FS.ErrnoError || Te(Oe), -Oe.errno
						}
					}, ___syscall6: function (e, n) {
						se.varargs = n;
						try {
							var t = se.getStreamFromFD();
							return FS.close(t), 0
						} catch (Oe) {
							return "undefined" !== typeof FS && Oe instanceof FS.ErrnoError || Te(Oe), -Oe.errno
						}
					}, ___unlock: function () {
					}, _abort: function () {
						a.abort()
					}, _api_close_keyboard: function () {
						self.DApi.close_keyboard()
					}, _api_create_sound_float: function (e, n, t, r, i) {
						self.DApi.create_sound(e, j.slice(n / 4, n / 4 + t * r), t, r, i)
					}, _api_delete_sound: function (e) {
						self.DApi.delete_sound(e)
					}, _api_draw_begin: function () {
						self.DApi.draw_begin()
					}, _api_draw_belt: function (e) {
						self.DApi.draw_belt(R.subarray(e / 4, e / 4 + 8))
					}, _api_draw_blit: function (e, n, t, r, i) {
						self.DApi.draw_blit(e, n, t, r, x.subarray(i, i + t * r * 4))
					}, _api_draw_clip_text: function (e, n, t, r) {
						self.DApi.draw_clip_text(e, n, t, r)
					}, _api_draw_end: function () {
						self.DApi.draw_end()
					}, _api_draw_text: function (e, n, t, r) {
						var i = x.indexOf(0, t), o = String.fromCharCode.apply(null, x.subarray(t, i));
						self.DApi.draw_text(e, n, o, r)
					}, _api_duplicate_sound: function (e, n) {
						self.DApi.duplicate_sound(e, n)
					}, _api_exit_game: function () {
						self.DApi.exit_game()
					}, _api_open_keyboard: function () {
						self.DApi.open_keyboard()
					}, _api_play_sound: function (e, n, t, r) {
						self.DApi.play_sound(e, n, t, r)
					}, _api_set_cursor: function (e, n) {
						self.DApi.set_cursor(e, n)
					}, _api_set_volume: function (e, n) {
						self.DApi.set_volume(e, n)
					}, _api_stop_sound: function (e) {
						self.DApi.stop_sound(e)
					}, _emscripten_asm_const_ii: function (e, n) {
						return re[e](n)
					}, _emscripten_memcpy_big: function (e, n, t) {
						return x.set(x.subarray(n, n + t), e), e
					}, _exit: function (e) {
						ce(e)
					}, _exit_error: function (e) {
						var n = x.indexOf(0, e), t = String.fromCharCode.apply(null, x.subarray(e, n));
						self.DApi.exit_error(t)
					}, _get_file_contents: function (e, n, t, r) {
						var i = x.indexOf(0, e), o = String.fromCharCode.apply(null, x.subarray(e, i));
						self.DApi.get_file_contents(o, x.subarray(n, n + r), t)
					}, _get_file_size: function (e) {
						var n = x.indexOf(0, e), t = String.fromCharCode.apply(null, x.subarray(e, n));
						return self.DApi.get_file_size(t)
					}, _pthread_getspecific: function (e) {
						return fe[e] || 0
					}, _pthread_key_create: function (e, n) {
						return 0 == e ? _e.EINVAL : (R[e >> 2] = le, fe[le] = 0, le++, 0)
					}, _pthread_once: function e(n, t) {
						e.seen || (e.seen = {}), n in e.seen || (a.dynCall_v(t), e.seen[n] = 1)
					}, _pthread_setspecific: function (e, n) {
						return e in fe ? (fe[e] = n, 0) : _e.EINVAL
					}, _put_file_contents: function (e, n, t) {
						var r = x.indexOf(0, e), i = String.fromCharCode.apply(null, x.subarray(e, r));
						self.DApi.put_file_contents(i, x.slice(n, n + t))
					}, _remove_file: function (e) {
						var n = x.indexOf(0, e), t = String.fromCharCode.apply(null, x.subarray(e, n));
						self.DApi.remove_file(t)
					}, _show_alert: function (e) {
						var n = x.indexOf(0, e), t = String.fromCharCode.apply(null, x.subarray(e, n));
						self.alert(t)
					}, _time: function (e) {
						var n = Date.now() / 1e3 | 0;
						return e && (R[e >> 2] = n), n
					}, DYNAMICTOP_PTR: I, STACKTOP: L
				};
				var pe = a.asm(a.asmGlobalArg, a.asmLibraryArg, C);
				a.asm = pe;
				a._DApi_Char = function () {
					return a.asm._DApi_Char.apply(null, arguments)
				}, a._DApi_Init = function () {
					return a.asm._DApi_Init.apply(null, arguments)
				}, a._DApi_Key = function () {
					return a.asm._DApi_Key.apply(null, arguments)
				}, a._DApi_Mouse = function () {
					return a.asm._DApi_Mouse.apply(null, arguments)
				}, a._DApi_Render = function () {
					return a.asm._DApi_Render.apply(null, arguments)
				}, a._DApi_SyncText = function () {
					return a.asm._DApi_SyncText.apply(null, arguments)
				};
				var de, me = a.__GLOBAL__sub_I_msgcmd_cpp = function () {
					return a.asm.__GLOBAL__sub_I_msgcmd_cpp.apply(null, arguments)
				}, ye = (a.___cxa_can_catch = function () {
					return a.asm.___cxa_can_catch.apply(null, arguments)
				}, a.___cxa_is_pointer_type = function () {
					return a.asm.___cxa_is_pointer_type.apply(null, arguments)
				}, a.___em_js__api_close_keyboard = function () {
					return a.asm.___em_js__api_close_keyboard.apply(null, arguments)
				}, a.___em_js__api_create_sound_float = function () {
					return a.asm.___em_js__api_create_sound_float.apply(null, arguments)
				}, a.___em_js__api_delete_sound = function () {
					return a.asm.___em_js__api_delete_sound.apply(null, arguments)
				}, a.___em_js__api_draw_begin = function () {
					return a.asm.___em_js__api_draw_begin.apply(null, arguments)
				}, a.___em_js__api_draw_belt = function () {
					return a.asm.___em_js__api_draw_belt.apply(null, arguments)
				}, a.___em_js__api_draw_blit = function () {
					return a.asm.___em_js__api_draw_blit.apply(null, arguments)
				}, a.___em_js__api_draw_clip_text = function () {
					return a.asm.___em_js__api_draw_clip_text.apply(null, arguments)
				}, a.___em_js__api_draw_end = function () {
					return a.asm.___em_js__api_draw_end.apply(null, arguments)
				}, a.___em_js__api_draw_text = function () {
					return a.asm.___em_js__api_draw_text.apply(null, arguments)
				}, a.___em_js__api_duplicate_sound = function () {
					return a.asm.___em_js__api_duplicate_sound.apply(null, arguments)
				}, a.___em_js__api_exit_game = function () {
					return a.asm.___em_js__api_exit_game.apply(null, arguments)
				}, a.___em_js__api_open_keyboard = function () {
					return a.asm.___em_js__api_open_keyboard.apply(null, arguments)
				}, a.___em_js__api_play_sound = function () {
					return a.asm.___em_js__api_play_sound.apply(null, arguments)
				}, a.___em_js__api_set_cursor = function () {
					return a.asm.___em_js__api_set_cursor.apply(null, arguments)
				}, a.___em_js__api_set_volume = function () {
					return a.asm.___em_js__api_set_volume.apply(null, arguments)
				}, a.___em_js__api_stop_sound = function () {
					return a.asm.___em_js__api_stop_sound.apply(null, arguments)
				}, a.___em_js__exit_error = function () {
					return a.asm.___em_js__exit_error.apply(null, arguments)
				}, a.___em_js__get_file_contents = function () {
					return a.asm.___em_js__get_file_contents.apply(null, arguments)
				}, a.___em_js__get_file_size = function () {
					return a.asm.___em_js__get_file_size.apply(null, arguments)
				}, a.___em_js__put_file_contents = function () {
					return a.asm.___em_js__put_file_contents.apply(null, arguments)
				}, a.___em_js__remove_file = function () {
					return a.asm.___em_js__remove_file.apply(null, arguments)
				}, a.___em_js__show_alert = function () {
					return a.asm.___em_js__show_alert.apply(null, arguments)
				}, a.___em_js__trace_pop = function () {
					return a.asm.___em_js__trace_pop.apply(null, arguments)
				}, a.___em_js__trace_push = function () {
					return a.asm.___em_js__trace_push.apply(null, arguments)
				}, a._emscripten_replace_memory = function () {
					return a.asm._emscripten_replace_memory.apply(null, arguments)
				}), he = a._free = function () {
					return a.asm._free.apply(null, arguments)
				}, ve = a._malloc = function () {
					return a.asm._malloc.apply(null, arguments)
				}, ge = a.setTempRet0 = function () {
					return a.asm.setTempRet0.apply(null, arguments)
				}, Ee = (a.setThrew = function () {
					return a.asm.setThrew.apply(null, arguments)
				}, a.stackRestore = function () {
					return a.asm.stackRestore.apply(null, arguments)
				}), be = a.stackSave = function () {
					return a.asm.stackSave.apply(null, arguments)
				};
				a.dynCall_i = function () {
					return a.asm.dynCall_i.apply(null, arguments)
				}, a.dynCall_ii = function () {
					return a.asm.dynCall_ii.apply(null, arguments)
				}, a.dynCall_iii = function () {
					return a.asm.dynCall_iii.apply(null, arguments)
				}, a.dynCall_iiii = function () {
					return a.asm.dynCall_iiii.apply(null, arguments)
				}, a.dynCall_iiiii = function () {
					return a.asm.dynCall_iiiii.apply(null, arguments)
				}, a.dynCall_iiiiii = function () {
					return a.asm.dynCall_iiiiii.apply(null, arguments)
				}, a.dynCall_ji = function () {
					return a.asm.dynCall_ji.apply(null, arguments)
				}, a.dynCall_v = function () {
					return a.asm.dynCall_v.apply(null, arguments)
				}, a.dynCall_vi = function () {
					return a.asm.dynCall_vi.apply(null, arguments)
				}, a.dynCall_vii = function () {
					return a.asm.dynCall_vii.apply(null, arguments)
				}, a.dynCall_viii = function () {
					return a.asm.dynCall_viii.apply(null, arguments)
				}, a.dynCall_viiii = function () {
					return a.asm.dynCall_viiii.apply(null, arguments)
				}, a.dynCall_viiiii = function () {
					return a.asm.dynCall_viiiii.apply(null, arguments)
				}, a.dynCall_viji = function () {
					return a.asm.dynCall_viji.apply(null, arguments)
				};

				function we(e) {
					this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e
				}

				function Ae(e) {
					function n() {
						a.calledRun || (a.calledRun = !0, b || (Q || (Q = !0, q(K)), q(X), a.onRuntimeInitialized && a.onRuntimeInitialized(), function () {
							if (a.postRun) for ("function" == typeof a.postRun && (a.postRun = [a.postRun]); a.postRun.length;) J(a.postRun.shift());
							q(V)
						}()))
					}

					e = e || a.arguments, Z > 0 || (!function () {
						if (a.preRun) for ("function" == typeof a.preRun && (a.preRun = [a.preRun]); a.preRun.length;) e = a.preRun.shift(), z.unshift(e);
						var e;
						q(z)
					}(), Z > 0 || a.calledRun || (a.setStatus ? (a.setStatus("Running..."), setTimeout(function () {
						setTimeout(function () {
							a.setStatus("")
						}, 1), n()
					}, 1)) : n()))
				}

				function Te(e) {
					throw a.onAbort && a.onAbort(e), void 0 !== e ? (y(e), h(e), e = JSON.stringify(e)) : e = "", b = !0, 1, "abort(" + e + "). Build with -s ASSERTIONS=1 for more info."
				}

				if (a.asm = pe, a.then = function (e) {
					if (a.calledRun) e(a); else {
						var n = a.onRuntimeInitialized;
						a.onRuntimeInitialized = function () {
							n && n(), e(a)
						}
					}
					return a
				}, we.prototype = new Error, we.prototype.constructor = we, ee = function e() {
					a.calledRun || Ae(), a.calledRun || (ee = e)
				}, a.run = Ae, a.abort = Te, a.preInit) for ("function" == typeof a.preInit && (a.preInit = [a.preInit]); a.preInit.length > 0;) a.preInit.pop()();
				return a.noExitRuntime = !0, Ae(), a.ready = new Promise(function (e, n) {
					delete a.then, a.onAbort = function (e) {
						n(e)
					}, J(function () {
						e(a)
					})
				}), i
			}
		}();
		e.exports = i
	}).call(this, t(2), "/")
}, function (e, n, t) {
	e.exports = t(19)
}, function (e, n, t) {
	var r = function (e) {
		"use strict";
		var n, t = Object.prototype, r = t.hasOwnProperty, i = "function" === typeof Symbol ? Symbol : {}, o = i.iterator || "@@iterator", a = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag";

		function s(e, n, t, r) {
			var i = n && n.prototype instanceof m ? n : m, o = Object.create(i.prototype), a = new S(r || []);
			return o._invoke = function (e, n, t) {
				var r = f;
				return function (i, o) {
					if (r === _) throw new Error("Generator is already running");
					if (r === p) {
						if ("throw" === i) throw o;
						return R()
					}
					for (t.method = i, t.arg = o; ;) {
						var a = t.delegate;
						if (a) {
							var u = T(a, t);
							if (u) {
								if (u === d) continue;
								return u
							}
						}
						if ("next" === t.method) t.sent = t._sent = t.arg; else if ("throw" === t.method) {
							if (r === f) throw r = p, t.arg;
							t.dispatchException(t.arg)
						} else "return" === t.method && t.abrupt("return", t.arg);
						r = _;
						var s = c(e, n, t);
						if ("normal" === s.type) {
							if (r = t.done ? p : l, s.arg === d) continue;
							return {value: s.arg, done: t.done}
						}
						"throw" === s.type && (r = p, t.method = "throw", t.arg = s.arg)
					}
				}
			}(e, t, a), o
		}

		function c(e, n, t) {
			try {
				return {type: "normal", arg: e.call(n, t)}
			} catch (r) {
				return {type: "throw", arg: r}
			}
		}

		e.wrap = s;
		var f = "suspendedStart", l = "suspendedYield", _ = "executing", p = "completed", d = {};

		function m() {
		}

		function y() {
		}

		function h() {
		}

		var v = {};
		v[o] = function () {
			return this
		};
		var g = Object.getPrototypeOf, E = g && g(g(x([])));
		E && E !== t && r.call(E, o) && (v = E);
		var b = h.prototype = m.prototype = Object.create(v);

		function w(e) {
			["next", "throw", "return"].forEach(function (n) {
				e[n] = function (e) {
					return this._invoke(n, e)
				}
			})
		}

		function A(e) {
			var n;
			this._invoke = function (t, i) {
				function o() {
					return new Promise(function (n, o) {
						!function n(t, i, o, a) {
							var u = c(e[t], e, i);
							if ("throw" !== u.type) {
								var s = u.arg, f = s.value;
								return f && "object" === typeof f && r.call(f, "__await") ? Promise.resolve(f.__await).then(function (e) {
									n("next", e, o, a)
								}, function (e) {
									n("throw", e, o, a)
								}) : Promise.resolve(f).then(function (e) {
									s.value = e, o(s)
								}, function (e) {
									return n("throw", e, o, a)
								})
							}
							a(u.arg)
						}(t, i, n, o)
					})
				}

				return n = n ? n.then(o, o) : o()
			}
		}

		function T(e, t) {
			var r = e.iterator[t.method];
			if (r === n) {
				if (t.delegate = null, "throw" === t.method) {
					if (e.iterator.return && (t.method = "return", t.arg = n, T(e, t), "throw" === t.method)) return d;
					t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
				}
				return d
			}
			var i = c(r, e.iterator, t.arg);
			if ("throw" === i.type) return t.method = "throw", t.arg = i.arg, t.delegate = null, d;
			var o = i.arg;
			return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = n), t.delegate = null, d) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, d)
		}

		function O(e) {
			var n = {tryLoc: e[0]};
			1 in e && (n.catchLoc = e[1]), 2 in e && (n.finallyLoc = e[2], n.afterLoc = e[3]), this.tryEntries.push(n)
		}

		function C(e) {
			var n = e.completion || {};
			n.type = "normal", delete n.arg, e.completion = n
		}

		function S(e) {
			this.tryEntries = [{tryLoc: "root"}], e.forEach(O, this), this.reset(!0)
		}

		function x(e) {
			if (e) {
				var t = e[o];
				if (t) return t.call(e);
				if ("function" === typeof e.next) return e;
				if (!isNaN(e.length)) {
					var i = -1, a = function t() {
						for (; ++i < e.length;) if (r.call(e, i)) return t.value = e[i], t.done = !1, t;
						return t.value = n, t.done = !0, t
					};
					return a.next = a
				}
			}
			return {next: R}
		}

		function R() {
			return {value: n, done: !0}
		}

		return y.prototype = b.constructor = h, h.constructor = y, h[u] = y.displayName = "GeneratorFunction", e.isGeneratorFunction = function (e) {
			var n = "function" === typeof e && e.constructor;
			return !!n && (n === y || "GeneratorFunction" === (n.displayName || n.name))
		}, e.mark = function (e) {
			return Object.setPrototypeOf ? Object.setPrototypeOf(e, h) : (e.__proto__ = h, u in e || (e[u] = "GeneratorFunction")), e.prototype = Object.create(b), e
		}, e.awrap = function (e) {
			return {__await: e}
		}, w(A.prototype), A.prototype[a] = function () {
			return this
		}, e.AsyncIterator = A, e.async = function (n, t, r, i) {
			var o = new A(s(n, t, r, i));
			return e.isGeneratorFunction(t) ? o : o.next().then(function (e) {
				return e.done ? e.value : o.next()
			})
		}, w(b), b[u] = "Generator", b[o] = function () {
			return this
		}, b.toString = function () {
			return "[object Generator]"
		}, e.keys = function (e) {
			var n = [];
			for (var t in e) n.push(t);
			return n.reverse(), function t() {
				for (; n.length;) {
					var r = n.pop();
					if (r in e) return t.value = r, t.done = !1, t
				}
				return t.done = !0, t
			}
		}, e.values = x, S.prototype = {
			constructor: S, reset: function (e) {
				if (this.prev = 0, this.next = 0, this.sent = this._sent = n, this.done = !1, this.delegate = null, this.method = "next", this.arg = n, this.tryEntries.forEach(C), !e) for (var t in this) "t" === t.charAt(0) && r.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = n)
			}, stop: function () {
				this.done = !0;
				var e = this.tryEntries[0].completion;
				if ("throw" === e.type) throw e.arg;
				return this.rval
			}, dispatchException: function (e) {
				if (this.done) throw e;
				var t = this;

				function i(r, i) {
					return u.type = "throw", u.arg = e, t.next = r, i && (t.method = "next", t.arg = n), !!i
				}

				for (var o = this.tryEntries.length - 1; o >= 0; --o) {
					var a = this.tryEntries[o], u = a.completion;
					if ("root" === a.tryLoc) return i("end");
					if (a.tryLoc <= this.prev) {
						var s = r.call(a, "catchLoc"), c = r.call(a, "finallyLoc");
						if (s && c) {
							if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
							if (this.prev < a.finallyLoc) return i(a.finallyLoc)
						} else if (s) {
							if (this.prev < a.catchLoc) return i(a.catchLoc, !0)
						} else {
							if (!c) throw new Error("try statement without catch or finally");
							if (this.prev < a.finallyLoc) return i(a.finallyLoc)
						}
					}
				}
			}, abrupt: function (e, n) {
				for (var t = this.tryEntries.length - 1; t >= 0; --t) {
					var i = this.tryEntries[t];
					if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
						var o = i;
						break
					}
				}
				o && ("break" === e || "continue" === e) && o.tryLoc <= n && n <= o.finallyLoc && (o = null);
				var a = o ? o.completion : {};
				return a.type = e, a.arg = n, o ? (this.method = "next", this.next = o.finallyLoc, d) : this.complete(a)
			}, complete: function (e, n) {
				if ("throw" === e.type) throw e.arg;
				return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && n && (this.next = n), d
			}, finish: function (e) {
				for (var n = this.tryEntries.length - 1; n >= 0; --n) {
					var t = this.tryEntries[n];
					if (t.finallyLoc === e) return this.complete(t.completion, t.afterLoc), C(t), d
				}
			}, catch: function (e) {
				for (var n = this.tryEntries.length - 1; n >= 0; --n) {
					var t = this.tryEntries[n];
					if (t.tryLoc === e) {
						var r = t.completion;
						if ("throw" === r.type) {
							var i = r.arg;
							C(t)
						}
						return i
					}
				}
				throw new Error("illegal catch attempt")
			}, delegateYield: function (e, t, r) {
				return this.delegate = {iterator: x(e), resultName: t, nextLoc: r}, "next" === this.method && (this.arg = n), d
			}
		}, e
	}(e.exports);
	try {
		regeneratorRuntime = r
	} catch (i) {
		Function("r", "regeneratorRuntime = r")(r)
	}
}, function (e, n, t) {
	"use strict";
	var r = t(0), i = t(5), o = t(21), a = t(11);

	function u(e) {
		var n = new o(e), t = i(o.prototype.request, n);
		return r.extend(t, o.prototype, n), r.extend(t, n), t
	}

	var s = u(t(8));
	s.Axios = o, s.create = function (e) {
		return u(a(s.defaults, e))
	}, s.Cancel = t(12), s.CancelToken = t(33), s.isCancel = t(7), s.all = function (e) {
		return Promise.all(e)
	}, s.spread = t(34), e.exports = s, e.exports.default = s
}, function (e, n) {
	e.exports = function (e) {
		return null != e && null != e.constructor && "function" === typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
	}
}, function (e, n, t) {
	"use strict";
	var r = t(0), i = t(6), o = t(22), a = t(23), u = t(11);

	function s(e) {
		this.defaults = e, this.interceptors = {request: new o, response: new o}
	}

	s.prototype.request = function (e) {
		"string" === typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = u(this.defaults, e)).method = e.method ? e.method.toLowerCase() : "get";
		var n = [a, void 0], t = Promise.resolve(e);
		for (this.interceptors.request.forEach(function (e) {
			n.unshift(e.fulfilled, e.rejected)
		}), this.interceptors.response.forEach(function (e) {
			n.push(e.fulfilled, e.rejected)
		}); n.length;) t = t.then(n.shift(), n.shift());
		return t
	}, s.prototype.getUri = function (e) {
		return e = u(this.defaults, e), i(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
	}, r.forEach(["delete", "get", "head", "options"], function (e) {
		s.prototype[e] = function (n, t) {
			return this.request(r.merge(t || {}, {method: e, url: n}))
		}
	}), r.forEach(["post", "put", "patch"], function (e) {
		s.prototype[e] = function (n, t, i) {
			return this.request(r.merge(i || {}, {method: e, url: n, data: t}))
		}
	}), e.exports = s
}, function (e, n, t) {
	"use strict";
	var r = t(0);

	function i() {
		this.handlers = []
	}

	i.prototype.use = function (e, n) {
		return this.handlers.push({fulfilled: e, rejected: n}), this.handlers.length - 1
	}, i.prototype.eject = function (e) {
		this.handlers[e] && (this.handlers[e] = null)
	}, i.prototype.forEach = function (e) {
		r.forEach(this.handlers, function (n) {
			null !== n && e(n)
		})
	}, e.exports = i
}, function (e, n, t) {
	"use strict";
	var r = t(0), i = t(24), o = t(7), a = t(8), u = t(31), s = t(32);

	function c(e) {
		e.cancelToken && e.cancelToken.throwIfRequested()
	}

	e.exports = function (e) {
		return c(e), e.baseURL && !u(e.url) && (e.url = s(e.baseURL, e.url)), e.headers = e.headers || {}, e.data = i(e.data, e.headers, e.transformRequest), e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {}), r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (n) {
			delete e.headers[n]
		}), (e.adapter || a.adapter)(e).then(function (n) {
			return c(e), n.data = i(n.data, n.headers, e.transformResponse), n
		}, function (n) {
			return o(n) || (c(e), n && n.response && (n.response.data = i(n.response.data, n.response.headers, e.transformResponse))), Promise.reject(n)
		})
	}
}, function (e, n, t) {
	"use strict";
	var r = t(0);
	e.exports = function (e, n, t) {
		return r.forEach(t, function (t) {
			e = t(e, n)
		}), e
	}
}, function (e, n, t) {
	"use strict";
	var r = t(0);
	e.exports = function (e, n) {
		r.forEach(e, function (t, r) {
			r !== n && r.toUpperCase() === n.toUpperCase() && (e[n] = t, delete e[r])
		})
	}
}, function (e, n, t) {
	"use strict";
	var r = t(10);
	e.exports = function (e, n, t) {
		var i = t.config.validateStatus;
		!i || i(t.status) ? e(t) : n(r("Request failed with status code " + t.status, t.config, null, t.request, t))
	}
}, function (e, n, t) {
	"use strict";
	e.exports = function (e, n, t, r, i) {
		return e.config = n, t && (e.code = t), e.request = r, e.response = i, e.isAxiosError = !0, e.toJSON = function () {
			return {message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: this.config, code: this.code}
		}, e
	}
}, function (e, n, t) {
	"use strict";
	var r = t(0), i = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
	e.exports = function (e) {
		var n, t, o, a = {};
		return e ? (r.forEach(e.split("\n"), function (e) {
			if (o = e.indexOf(":"), n = r.trim(e.substr(0, o)).toLowerCase(), t = r.trim(e.substr(o + 1)), n) {
				if (a[n] && i.indexOf(n) >= 0) return;
				a[n] = "set-cookie" === n ? (a[n] ? a[n] : []).concat([t]) : a[n] ? a[n] + ", " + t : t
			}
		}), a) : a
	}
}, function (e, n, t) {
	"use strict";
	var r = t(0);
	e.exports = r.isStandardBrowserEnv() ? function () {
		var e, n = /(msie|trident)/i.test(navigator.userAgent), t = document.createElement("a");

		function i(e) {
			var r = e;
			return n && (t.setAttribute("href", r), r = t.href), t.setAttribute("href", r), {href: t.href, protocol: t.protocol ? t.protocol.replace(/:$/, "") : "", host: t.host, search: t.search ? t.search.replace(/^\?/, "") : "", hash: t.hash ? t.hash.replace(/^#/, "") : "", hostname: t.hostname, port: t.port, pathname: "/" === t.pathname.charAt(0) ? t.pathname : "/" + t.pathname}
		}

		return e = i(window.location.href), function (n) {
			var t = r.isString(n) ? i(n) : n;
			return t.protocol === e.protocol && t.host === e.host
		}
	}() : function () {
		return !0
	}
}, function (e, n, t) {
	"use strict";
	var r = t(0);
	e.exports = r.isStandardBrowserEnv() ? {
		write: function (e, n, t, i, o, a) {
			var u = [];
			u.push(e + "=" + encodeURIComponent(n)), r.isNumber(t) && u.push("expires=" + new Date(t).toGMTString()), r.isString(i) && u.push("path=" + i), r.isString(o) && u.push("domain=" + o), !0 === a && u.push("secure"), document.cookie = u.join("; ")
		}, read: function (e) {
			var n = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
			return n ? decodeURIComponent(n[3]) : null
		}, remove: function (e) {
			this.write(e, "", Date.now() - 864e5)
		}
	} : {
		write: function () {
		}, read: function () {
			return null
		}, remove: function () {
		}
	}
}, function (e, n, t) {
	"use strict";
	e.exports = function (e) {
		return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
	}
}, function (e, n, t) {
	"use strict";
	e.exports = function (e, n) {
		return n ? e.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "") : e
	}
}, function (e, n, t) {
	"use strict";
	var r = t(12);

	function i(e) {
		if ("function" !== typeof e) throw new TypeError("executor must be a function.");
		var n;
		this.promise = new Promise(function (e) {
			n = e
		});
		var t = this;
		e(function (e) {
			t.reason || (t.reason = new r(e), n(t.reason))
		})
	}

	i.prototype.throwIfRequested = function () {
		if (this.reason) throw this.reason
	}, i.source = function () {
		var e;
		return {
			token: new i(function (n) {
				e = n
			}), cancel: e
		}
	}, e.exports = i
}, function (e, n, t) {
	"use strict";
	e.exports = function (e) {
		return function (n) {
			return e.apply(null, n)
		}
	}
}, function (e, n, t) {
	"use strict";

	function r(e, n) {
		return function (e) {
			if (Array.isArray(e)) return e
		}(e) || function (e, n) {
			var t = [], r = !0, i = !1, o = void 0;
			try {
				for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done) && (t.push(a.value), !n || t.length !== n); r = !0) ;
			} catch (s) {
				i = !0, o = s
			} finally {
				try {
					r || null == u.return || u.return()
				} finally {
					if (i) throw o
				}
			}
			return t
		}(e, n) || function () {
			throw new TypeError("Invalid attempt to destructure non-iterable instance")
		}()
	}

	t.r(n);
	var i = t(1), o = t.n(i);

	function a(e) {
		return function (e) {
			if (Array.isArray(e)) {
				for (var n = 0, t = new Array(e.length); n < e.length; n++) t[n] = e[n];
				return t
			}
		}(e) || function (e) {
			if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
		}(e) || function () {
			throw new TypeError("Invalid attempt to spread non-iterable instance")
		}()
	}

	function u(e, n, t, r, i, o, a) {
		try {
			var u = e[o](a), s = u.value
		} catch (c) {
			return void t(c)
		}
		u.done ? n(s) : Promise.resolve(s).then(r, i)
	}

	function s(e) {
		return function () {
			var n = this, t = arguments;
			return new Promise(function (r, i) {
				var o = e.apply(n, t);

				function a(e) {
					u(o, r, i, a, s, "next", e)
				}

				function s(e) {
					u(o, r, i, a, s, "throw", e)
				}

				a(void 0)
			})
		}
	}

	var c = t(13), f = t.n(c), l = t(14), _ = t.n(l), p = t(15), d = t.n(p), m = t(16), y = t.n(m), h = t(17), v = t.n(h), g = 1316452, E = 1196648, b = self, w = null, A = null, T = null, O = null, C = null, S = null, x = !1, R = {
		exit_error: function (e) {
			b.postMessage({action: "error", error: e})
		}, exit_game: function () {
			b.postMessage({action: "exit"})
		}, current_save_id: function (e) {
			b.postMessage({action: "current_save", name: e >= 0 ? x ? "spawn".concat(e, ".sv") : "single_".concat(e, ".sv") : null})
		}, get_file_size: function (e) {
			var n = O.get(e.toLowerCase());
			return n ? n.byteLength : 0
		}, get_file_contents: function (e, n, t) {
			var r = O.get(e.toLowerCase());
			r && n.set(r.subarray(t, t + n.length))
		}, put_file_contents: function (e, n) {
			e = e.toLowerCase(), O.set(e, n), b.postMessage({action: "fs", func: "update", params: [e, n]})
		}, remove_file: function (e) {
			e = e.toLowerCase(), O.delete(e), b.postMessage({action: "fs", func: "delete", params: [e]})
		}, set_cursor: function (e, n) {
			b.postMessage({action: "cursor", x: e, y: n})
		}, open_keyboard: function () {
			b.postMessage({action: "keyboard", open: !0})
		}, close_keyboard: function () {
			b.postMessage({action: "keyboard", open: !1})
		}
	};
	var j = {
		draw_begin: function () {
			C = {images: [], text: [], clip: null, belt: S}, S = null
		}, draw_blit: function (e, n, t, r, i) {
			C.images.push({x: e, y: n, w: t, h: r, data: i.slice()})
		}, draw_clip_text: function (e, n, t, r) {
			C.clip = {x0: e, y0: n, x1: t, y1: r}
		}, draw_text: function (e, n, t, r) {
			C.text.push({x: e, y: n, text: t, color: r})
		}, draw_end: function () {
			var e = C.images.map(function (e) {
				return e.data.buffer
			});
			C.belt && e.push(C.belt.buffer), b.postMessage({action: "render", batch: C}, e), C = null
		}, draw_belt: function (e) {
			S = e.slice()
		}
	}, N = {
		draw_begin: function () {
			A.save(), A.font = "bold 13px Times New Roman"
		}, draw_blit: function (e, n, t, r, i) {
			T.data.set(i), A.putImageData(T, e, n)
		}, draw_clip_text: function (e, n, t, r) {
			A.beginPath(), A.rect(e, n, t - e, r - n), A.clip()
		}, draw_text: function (e, n, t, r) {
			var i = r >> 16 & 255, o = r >> 8 & 255, a = 255 & r;
			A.fillStyle = "rgb(".concat(i, ", ").concat(o, ", ").concat(a, ")"), A.fillText(t, e, n + 22)
		}, draw_end: function () {
			A.restore();
			var e = w.transferToImageBitmap(), n = [e];
			S && n.push(S.buffer), b.postMessage({action: "render", batch: {bitmap: e, belt: S}}, n), S = null
		}, draw_belt: function (e) {
			S = e.slice()
		}
	}, D = null, L = null, M = 0, I = 0;
	["create_sound", "duplicate_sound"].forEach(function (e) {
		R[e] = function () {
			for (var n = arguments.length, t = new Array(n), r = 0; r < n; r++) t[r] = arguments[r];
			if (D) I = t[0] + 1, D.push({func: e, params: t}), "create_sound" === e && L.push(t[1].buffer); else {
				M = t[0] + 1;
				var i = [];
				"create_sound" === e && i.push(t[1].buffer), b.postMessage({action: "audio", func: e, params: t}, i)
			}
		}
	}), ["play_sound", "set_volume", "stop_sound", "delete_sound"].forEach(function (e) {
		R[e] = function () {
			for (var n = arguments.length, t = new Array(n), r = 0; r < n; r++) t[r] = arguments[r];
			D && t[0] >= M ? D.push({func: e, params: t}) : b.postMessage({action: "audio", func: e, params: t})
		}
	}), b.DApi = R;
	var P = null;

	function B(e) {
		try {
			var n;
			D = [], L = [];
			for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
			(n = P)["_" + e].apply(n, r), D.length && (M = I, b.postMessage({action: "audioBatch", batch: D}, L), D = null, L = null)
		} catch (o) {
			"string" === typeof o && b.postMessage({action: ""}), b.postMessage({action: "error", error: o.toString(), stack: o.stack})
		}
	}

	function k(e, n, t) {
		b.postMessage({action: "progress", text: e, loaded: n, total: t})
	}

	var U = function (e, n) {
		return new Promise(function (t, r) {
			var i = new FileReader;
			i.onload = function () {
				n && n({loaded: e.size}), t(i.result)
			}, i.onerror = function () {
				return r(i.error)
			}, i.onabort = function () {
				return r()
			}, n && i.addEventListener("progress", n), i.readAsArrayBuffer(e)
		})
	};

	function F(e, n) {
		return W.apply(this, arguments)
	}

	function W() {
		return (W = s(o.a.mark(function e(n, t) {
			var r, i;
			return o.a.wrap(function (e) {
				for (; ;) switch (e.prev = e.next) {
					case 0:
						return e.next = 2, v.a.request({url: n ? d.a : f.a, responseType: "arraybuffer", onDownloadProgress: t});
					case 2:
						return r = e.sent, e.next = 5, (n ? y.a : _.a)({wasmBinary: r.data}).ready;
					case 5:
						return i = e.sent, t({loaded: 2e6}), e.abrupt("return", i);
					case 8:
					case"end":
						return e.stop()
				}
			}, e)
		}))).apply(this, arguments)
	}

	function H() {
		return (H = s(o.a.mark(function e(n, t, i) {
			var a, u, s, c, f, l, _, p, d, m, y;
			return o.a.wrap(function (e) {
				for (; ;) switch (e.prev = e.next) {
					case 0:
						return l = function () {
							k("Loading...", a + s * f, u + c * f)
						}, x = t, i ? (w = new OffscreenCanvas(640, 480), A = w.getContext("2d"), T = A.createImageData(640, 480), Object.assign(R, N)) : Object.assign(R, j), k("Loading..."), a = 0, u = n ? n.size : 0, s = 0, c = t ? E : g, f = 5, _ = F(t, function (e) {
							s = Math.min(e.loaded, c), l()
						}), p = n ? U(n, function (e) {
							a = e.loaded, l()
						}) : Promise.resolve(null), e.next = 10, Promise.all([_, p]);
					case 10:
						d = e.sent, m = r(d, 2), P = m[0], (n = m[1]) && O.set(t ? "spawn.mpq" : "diabdat.mpq", new Uint8Array(n)), k("Initializing..."), y = "1.0.13".match(/(\d+)\.(\d+)\.(\d+)/), P._DApi_Init(Math.floor(performance.now()), i ? 1 : 0, parseInt(y[1]), parseInt(y[2]), parseInt(y[3])), setInterval(function () {
							B("DApi_Render", Math.floor(performance.now()))
						}, 50);
					case 19:
					case"end":
						return e.stop()
				}
			}, e)
		}))).apply(this, arguments)
	}

	b.addEventListener("message", function (e) {
		var n = e.data;
		switch (n.action) {
			case"init":
				O = n.files, function (e, n, t) {
					return H.apply(this, arguments)
				}(n.mpq, n.spawn, n.offscreen).then(function () {
					return b.postMessage({action: "loaded"})
				}, function (e) {
					return b.postMessage({action: "failed", error: e.toString(), stack: e.stack})
				});
				break;
			case"event":
				B.apply(void 0, [n.func].concat(a(n.params)))
		}
	})
}]);
//# sourceMappingURL=9232376d1969e7a9ebae.worker.js.map