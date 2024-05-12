"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let senderSocket = null;
let recieverSocket = null;
wss.on("connection", function connection(ws) {
    wss.on("message", function message(data) {
        const message = JSON.parse(data);
        if (message.type === "identify-as-sender") {
            console.log("senderset");
            senderSocket = ws;
        }
        else if (message.type === "identify-as-reciever") {
            console.log("recieverset ");
            recieverSocket = ws;
        }
        else if (message.type === "create-offer") {
            recieverSocket === null || recieverSocket === void 0 ? void 0 : recieverSocket.send(JSON.stringify({ type: "offer", offer: message.offer }));
            console.log("offer recieved");
        }
        else if (message.type === "create-answer") {
            senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "answer", answer: message.answer }));
            console.log("answer recieved");
        }
        else if (message.type === "iceCandidate") {
            if (ws === senderSocket) {
                recieverSocket === null || recieverSocket === void 0 ? void 0 : recieverSocket.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }));
            }
            else if (ws === recieverSocket) {
                senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }));
            }
        }
    });
});
