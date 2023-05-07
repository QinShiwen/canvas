const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });
const clients = [];
const clientsInfo = [];
const messages = [];
const paintData = [];

server.on("connection", function connection(ws) {
  console.log("WebSocket connected.");

  clients.push(ws);

  ws.send("Hello, WebSocket!");

  ws.on("message", function incoming(message) {
    message = JSON.parse(message);

    if (message.type === "join") {
      clientsInfo.push(message.userinfo);
      ws.name = message.userinfo.name;
      const data = setData("updatePlayers", clientsInfo);
      broadcast(data,true);
    }

    if (message.type === "sendMessage") {
      console.log(message);
      messages.push(message);
      const data = setData("updateMessages", message.messageInfo);
      broadcast(data,true);
    }

    if (message.type === "draw") {
      //paintData.push(message);
      //const data = setData("updatePaint", paintData);
      console.log(message);
      const data = setData("draw", message.data);
      broadcast(data,false);
    }
  });

  ws.on("close", function close() {
    console.log("WebSocket disconnected.");

    let index = clientsInfo.findIndex((client) => client.name === ws.name);
    clientsInfo.splice(index, 1);
    const data = setData("updatePlayers", clientsInfo);
    broadcast(data);
  });

  // ifToMe: true: send to all clients, false: send to all clients except me
  function broadcast(data,ifToMe) {
    clients.forEach(function (client) {
      const condition = (ifToMe)?
      (client.readyState === WebSocket.OPEN):(client !== ws
        && client.readyState === WebSocket.OPEN);

      if (condition) {
        client.send(data);
      }
    });
  }
});



function setData(type, data) {
  const packagedata = JSON.stringify({
    type: type,
    data: data,
  });
  return packagedata;
}

console.log("WebSocket server running on port 8080");
