// noinspection DuplicatedCode
WEBS = {};

// noinspection DuplicatedCode
WEBS.Init = function() {
	if ((window.WebSocket == null) || (document.location.protocol === 'https:')) {
		return;
	}

	WEBS.available = true;

	// noinspection JSConstructorReturnsPrimitive
	return true;
};

// noinspection DuplicatedCode
WEBS.Connect = function(host) {
	if (host.length <= 5) {
		return;
	}

	if (host.charCodeAt(5) === 47) {
		return;
	}

	if (host.substring(0, 5) !== 'ws://') {
		return;
	}

	host = 'ws://' + host.split('/')[2];

	var sock = NET.NewQSocket();
	sock.disconnected = true;
	sock.receiveMessage = [];
	sock.address = host;

	try {
		sock.driverdata = new WebSocket(host, 'quake');
	} catch (e) {
		return;
	}

	sock.driverdata.data_socket = sock;
	sock.driverdata.binaryType = 'arraybuffer';
	sock.driverdata.onerror = WEBS.OnError;
	sock.driverdata.onmessage = WEBS.OnMessage;
	NET.newsocket = sock;

	// noinspection JSConstructorReturnsPrimitive
	return 0;
};

// noinspection DuplicatedCode
WEBS.CheckNewConnections = function() {};

// noinspection DuplicatedCode
WEBS.GetMessage = function(sock) {
	if (sock.driverdata == null) {
		// noinspection JSConstructorReturnsPrimitive
		return -1;
	}

	if (sock.driverdata.readyState !== 1) {
		// noinspection JSConstructorReturnsPrimitive
		return -1;
	}

	if (sock.receiveMessage.length === 0) {
		// noinspection JSConstructorReturnsPrimitive
		return 0;
	}

	var message = sock.receiveMessage.shift();
	NET.message.cursize = message.length - 1;
	(new Uint8Array(NET.message.data)).set(message.subarray(1));
	return message[0];
};

// noinspection DuplicatedCode
WEBS.SendMessage = function(sock, data) {
	if (sock.driverdata == null) {
		// noinspection JSConstructorReturnsPrimitive
		return -1;
	}

	if (sock.driverdata.readyState !== 1) {
		// noinspection JSConstructorReturnsPrimitive
		return -1;
	}

	var buf = new ArrayBuffer(data.cursize + 1), dest = new Uint8Array(buf);
	dest[0] = 1;
	dest.set(new Uint8Array(data.data, 0, data.cursize), 1);
	sock.driverdata.send(buf);

	// noinspection JSConstructorReturnsPrimitive
	return 1;
};

// noinspection DuplicatedCode
WEBS.SendUnreliableMessage = function(sock, data) {
	if (sock.driverdata == null) {
		// noinspection JSConstructorReturnsPrimitive
		return -1;
	}

	if (sock.driverdata.readyState !== 1) {
		// noinspection JSConstructorReturnsPrimitive
		return -1;
	}

	var buf = new ArrayBuffer(data.cursize + 1), dest = new Uint8Array(buf);
	dest[0] = 2;
	dest.set(new Uint8Array(data.data, 0, data.cursize), 1);
	sock.driverdata.send(buf);

	// noinspection JSConstructorReturnsPrimitive
	return 1;
};

// noinspection DuplicatedCode
WEBS.CanSendMessage = function(sock) {
	if (sock.driverdata == null) {
		return;
	}

	if (sock.driverdata.readyState === 1) {
		// noinspection JSConstructorReturnsPrimitive
		return true;
	}
};

// noinspection DuplicatedCode
WEBS.Close = function(sock) {
	if (sock.driverdata != null) {
		sock.driverdata.close(1000);
	}
};

// noinspection DuplicatedCode
WEBS.CheckForResend = function() {
	if (NET.newsocket.driverdata.readyState === 1) {
		// noinspection JSConstructorReturnsPrimitive
		return 1;
	}

	if (NET.newsocket.driverdata.readyState !== 0) {
		// noinspection JSConstructorReturnsPrimitive
		return -1;
	}
};

// noinspection DuplicatedCode
WEBS.OnError = function() {
	NET.Close(this.data_socket);
};

// noinspection DuplicatedCode
WEBS.OnMessage = function(message) {
	var data = message.data;

	if (typeof (data) === 'string') {
		return;
	}

	if (data.byteLength > 8000) {
		return;
	}

	this.data_socket.receiveMessage.push(new Uint8Array(data));
};