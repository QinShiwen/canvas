
const WebSocket = require("ws");

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function() {
  console.log('WebSocket connected.');
};

ws.onmessage = function(event) {
  console.log('received: %s', event.data);
};