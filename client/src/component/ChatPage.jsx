import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { setSelectedUser } from "@/redux/authSlice";
import { MessageCircleCode } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setMessages } from "@/redux/chatSlice";

const ChatPage = () => {
  const { user, suggestedUser, selectedUser } = useSelector(
    (store) => store.auth
  );
  const {onlineUser,messages} = useSelector(store=>store.chat)
  const [textMessage, setTextMessage] = useState('')
  const navigate = useNavigate()
  // const isOnline = true;
  const dispatch = useDispatch();
  const handleSendMessage = async (e,recieverId)=>{
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP}/api/v1/message/send/${recieverId}`,{
        textMessage
      },{
        headers :{
          "Content-Type": 'application/json'
        },withCredentials:true
      })
      if(res?.data.success){
        dispatch(setMessages([...messages,res.data.newMessage]))
        toast.success('message sent')
        // console.log(res.data)
        setTextMessage('')
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response);
    }
  }
  //clean up method
  useEffect(()=>{
    return ()=>{
      dispatch(setSelectedUser(null))
    }
  },[])
  return (
    <div className="ml-[16%]  flex h-screen ">
      <section className=" lg:w-1/5 sm:w-1/4  my-8">
        <h1 className="mb-4 text-2xl font-bold px-3">{user?.username}</h1>
        <hr className="" />
        <div className="overflow-y-auto  h-[80vh]">
          {suggestedUser.map((suggestedUser) => {
            const isOnline = onlineUser?.includes(suggestedUser._id);
            return ( <div
              onClick={() => dispatch(setSelectedUser(suggestedUser))}
              key={suggestedUser._id}
              className="flex gap-3 items-center p-3 hover:bg-gray-200 cursor-pointer"
            >
              <Avatar className="h-14 w-14">
                <AvatarImage
                  
                  src={suggestedUser.profilePicture}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{suggestedUser.username}</span>
                <span
                  className={`text-xs font-bold ${
                    isOnline ? "text-green-500" : "text-red-500"
                  }`}
                >
                 {isOnline?'online':'offline'}
                </span>
              </div>
            </div>)
          })}
        </div>
      </section>
      {selectedUser ? (
        <section className="flex-1 border-l-gray-300 flex flex-col h-full ">
          <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10 cursor-pointer" onClick={()=>navigate(`/profile/${selectedUser._id}`)}>
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1>{selectedUser.username}</h1>
            </div>
          </div>
          <Messages selectedUser={selectedUser}/>
          <form onSubmit={(e)=>handleSendMessage(e,selectedUser._id)} className="flex p-3">
            <Input value={textMessage} onChange={(e)=>setTextMessage(e.target.value)} placeholder="Message..." type="text" className="flex-1 focus-visible:ring-transparent mr-2 p-2 " />
            <Button >Send</Button>
          </form>
        </section>
      ) : (
        <div className="flex flex-col  mx-auto items-center justify-center">
          <MessageCircleCode className="h-32 w-32 my-4" />
          <span className="font-medium text-xl">Your messages</span>
          <span>Send a message to start a chat</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
