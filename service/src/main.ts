import express from 'express'
import { WebSocketServer } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });
let clients = [];
wss.on('connection',function(ws){
    // setInterval(()=>{
    //         ws.send("solana prices:" + Math.random())
    //     },5000)
    clients.push(ws)
    ws.on('error', console.error);

    ws.on('message', (e) => {
        console.log("Message from client : "+e.toString())
        clients.forEach(clients => {
            if(clients !== ws && clients.readyState === WebSocket.OPEN){
                clients.send(e.toString())
            }
        })
    });
    

})