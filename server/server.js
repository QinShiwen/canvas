const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", function connection(ws) {
  console.log("WebSocket connected.");

  ws.send("Hello, WebSocket!");
  
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });
  
});

console.log("WebSocket server running on port 8080");
