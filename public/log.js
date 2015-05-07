$(document).ready(function() {
	socket = new WebSocket("ws://192.168.1.119:8000/");

	socket.onopen = function(e) {
		// socket.send("SEAT CODE");
		// socket.send("Next Message");
	}
	socket.onmessage = function(e) {
		$("#msg").append("<div>" + e.data + "</div>")
	};

	$("#btn-send").click(function() {
		socket.send("aaa")
	});
});