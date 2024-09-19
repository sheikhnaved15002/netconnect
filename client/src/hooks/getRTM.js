import { setMessages } from "@/redux/chatSlice";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const getRTM  = ()=>{
    const {socket}  = useSelector(store=>store.socketio)
    const dispatch = useDispatch();
    const {messages} =  useSelector(store=>store.chat);
    useEffect(()=>{
        socket?.on('newMessage',(newMessage)=>{
            dispatch(setMessages([...messages,newMessage]))

        })
        return ()=>{
            socket?.off('newMessage')
        }
    },[messages,setMessages])
}