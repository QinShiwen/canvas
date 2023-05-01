const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });
const clients = [];
const clientsInfo = [];

server.on("connection", function connection(ws) {
  console.log("WebSocket connected.");

  clients.push(ws);

  ws.send("Hello, WebSocket!");

  ws.on("message", function incoming(message) {
    message = JSON.parse(message);

    if (message.type === "join") {

      //console.log("join", message);
      clientsInfo.push(message.userinfo);
      ws.name = message.userinfo.name;

      const data = {
        type: "updatePlayers",
        data: clientsInfo,
      };
      
      broadcast(JSON.stringify(data));
    }
  });

  ws.on("close", function close() {

    console.log("WebSocket disconnected.");

    let index = clientsInfo.findIndex((client) => client.name === ws.name);
    clientsInfo.splice(index, 1);

    const data = {
      type: "updatePlayers",
      data: clientsInfo,
    };

    broadcast(JSON.stringify(data));
  });
});

function broadcast(data) {
  clients.forEach(function (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

console.log("WebSocket server running on port 8080");
