
const WebSocket = require('ws');

const wss = new WebSocket.Server({port:8080});

//set up a connection
wss.on('connection', function connection(ws) {
    //when a message is received
    ws.on('message',(message)=>{
        console.log(message)
        //send the message to all clients
        wss.clients.forEach((client)=>{
            //check if the client is still connected
            if(client.readyState === WebSocket.OPEN){
                client.send(message)
            }
        })
    })
    //when a client closes the connection
    wss.on('close', function incoming(message) {
        console.log('disconnected')
    });
});



