
const WebSocket = require('ws');

const server = new WebSocket.Server({port:1000});

console.log('server started');

function broadcast(){

}

server.on('connection',(socket)=>{
    console.log('connected');

    socket.on('connect',(msg)=>{
        console.log('connected',msg);
    })

    socket.on('draw',(msg)=>{
        console.log(msg);
        server.clients.forEach(client=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(msg);
            }
        })
    })

    
})



