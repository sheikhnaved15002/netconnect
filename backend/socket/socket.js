import {Server} from 'socket.io'
import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
dotenv.config()
const app  =  express();
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin: process.env.URL,
        methods:['GET','POST']
    }
})
console.log(process.env.URL)

const userSocketMap = {};
export const getRecieverSocketId = (recieverId)=> userSocketMap[recieverId]
io.on('connection',(socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id
        console.log(`user connected userid ${userId}, socketid ${socket.id}`)
    }
    io.emit('getOnlineUsers',Object.keys(userSocketMap));

    socket.on('disconnect',()=>{
        if(userId){
            console.log(`user connnected ${userId}, socket id ${socket.id}`)
            delete userSocketMap[userId]
        }
        io.emit('getOnlineUsers',Object.keys(userSocketMap))
    })
})
export {io,server,app}