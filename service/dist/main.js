"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = app.listen(8080);
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on('connection', function (ws) {
    // setInterval(()=>{
    //         ws.send("solana prices:" + Math.random())
    //     },5000)
    ws.on('error', console.error);
    ws.on('message', (e) => {
        console.log("Message from client : " + e.toString());
        if (e.toString() === "ping") {
            ws.send("pong");
        }
        else {
            ws.send("send me ping");
        }
    });
});
