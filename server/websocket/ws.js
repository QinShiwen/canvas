
const WebSocket = require('ws');

const wss = new WebSocket.Server({port:8080});

const clients = new Set();
const rooms = {};
const lines = [];

function joinRoom(roomId,user){
    let room = rooms[roomId];
    if(!room){
        room = rooms[roomId] = {users: []};
    }
    room.users.push(user);
}

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
            case 'joinroom':
                joinRoom(msg.data.roomId,msg.data.user);
                break;
            default:
                break;      
        }

    })
})


