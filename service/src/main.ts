import express from 'express'
import { WebSocketServer } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection',function(ws){
    // setInterval(()=>{
    //         ws.send("solana prices:" + Math.random())
    //     },5000)
    ws.on('error', console.error);
    ws.on('message', (e) => {
        console.log("Message from client : "+e.toString())
        if(e.toString() === "ping"){
            ws.send("pong")
        }
        else{
            ws.send("send me ping")
        }
    });
    

})