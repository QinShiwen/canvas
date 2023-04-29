const uuidv4 = require("uuid");
const http = require("http");
const WebSocketServer = require("ws");


console.log("test");

const server = http.createServer();
const port = 1000;

server.listen(port, () => {
  console.log("server started");
});

const wsSever = new WebSocketServer.Server({server});

const clients = {}
console.log(wsSever.address());

wsSever.on("connection", (connection) => {
  console.log("connected");
  const userId = uuidv4();
  clients[userId] = connection;
  console.log(`${userId} connected.`);

});
