import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });

console.log("Websocket is running on ws://localhost:8000");

wss.on('connection', (socket, request) => {
    const ip = request.socket.remoteAddress;
    console.log(`New Client got connected from ${ip} address`);

    // server
    socket.send(JSON.stringify({
        type: 'welcome',
        message: 'Welcome to websocket server!'
    }));

    // client
    
})