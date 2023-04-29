import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 1000 });

console.log('server started');
console.log(wss);

wss.on('connection', function connection(ws) {

  console.log('connected');

  ws.send('something');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

 
});

console.log('server test');