import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8000 });

console.log("Websocket is running on ws://localhost:8000");

wss.on("connection", (socket, request) => {
  const clientIp = request.socket.remoteAddress;
  console.log(`New Client got connected from ${clientIp} address`);

  // server
  socket.send(
    JSON.stringify({
      type: "welcome",
      message: "Welcome to websocket server!",
    }),
  );

  // client
  socket.on("message", (rawData) => {
    console.log(`📨 Received:`, rawData.toString());

    const message = rawData.toString();

    // broardcasting to the all connected clients
    wss.clients.forEach((client) => {
      // only send if the client connection is open
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            type: "broadcast",
            message: message,
          }),
        );
      }
    });

    // handle err or we'll be cooked
    socket.on("error", (error) => {
      console.error(`❌ Error for ${clientIp} : `, error.message);
    });

    // handle disconnection
  });
  socket.on("close", () => {
    console.log(`👋Client got diconnected: ${clientIp}`);
  });
});
