
const WebSocket = require('ws');

const wss = new WebSocket.Server({port:8080});

const clients = new Set();
const lines = [];

wss.on('connection',(ws)=>{
    clients.add(ws);
    ws.on('message', (data)=>{
        const msg = JSON.parse(data);
        switch (msg.type) {
            case 'draw':
                lines.push(msg.data);
                clients.forEach((client)=>{
                    if(client !== ws){
                        client.send(data);
                    }
                })
                break;
            case 'clear':
                lines.length = 0;
                clients.forEach((client)=>{
                    if(client !== ws){
                        client.send(data);
                    }
                }
                )
                break;
            default:
                break;      
        }

    })
})


