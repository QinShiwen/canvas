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
      
      clientsInfo.push(message.userinfo);
      console.log("join", message);
      clients.forEach(function (client) {
        if (client.readyState === WebSocket.OPEN) {

          const data = {
            type: "updatePlayers",
            data: clientsInfo,
          };

          client.send(JSON.stringify(data));
        }
      });

    }

    if (message.type === "leave") {
      console.log("leave", message);
      let index = clientsInfo.findIndex((client) => client.name === message.name);
      clientsInfo.splice(index, 1);

      clients.forEach(function (client) {
        if (client.readyState === WebSocket.OPEN) {

          const data = {
            type: "updatePlayers",
            data: clientsInfo,
          };

          client.send(JSON.stringify(data));
        }
      }
      );
    }

    //console.log("received: %s", message);
  });
});

console.log("WebSocket server running on port 8080");
