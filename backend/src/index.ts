import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: null | WebSocket = null;
let recieverSocket: null | WebSocket = null;

wss.on("connection", function connection(ws) {
  wss.on("message", function message(data: any) {
    const message = JSON.parse(data);
    if (message.type === "identify-as-sender") {
      console.log("senderset");
      
      senderSocket = ws;
    } else if (message.type === "identify-as-reciever") {
      console.log("recieverset ");
      
      recieverSocket = ws;
    } else if (message.type === "create-offer") {

      recieverSocket?.send(
        JSON.stringify({ type: "offer", offer: message.offer })
      );
      console.log("offer recieved");
      
    } else if (message.type === "create-answer") {
      senderSocket?.send(
        JSON.stringify({ type: "answer", answer: message.answer })
      );
      console.log("answer recieved");
      
    } else if (message.type === "iceCandidate") {
      if (ws === senderSocket) {
        recieverSocket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: message.candidate })
        );
      } else if (ws === recieverSocket) {
        senderSocket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: message.candidate })
        );
      }
    }
  });
});
