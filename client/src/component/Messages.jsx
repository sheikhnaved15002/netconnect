import { getRTM } from "@/hooks/getRTM";
import getAllMessage from "@/hooks/useGetAllMessage";
// import { User } from 'lucide-react'
import React from "react";
import { useSelector } from "react-redux";

const Messages = ({ setSelectedUser }) => {
    getRTM()
  getAllMessage();
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="overflow-y-auto flex-1 p-4">
      <div className="flex ml-3 flex-col gap-2">
        {messages &&
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                user._id === msg.senderId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  user._id === msg.senderId ? "bg-green-300" : "bg-blue-300"
                } inline-block px-3 py-2 rounded-lg`}
              >
                {msg.message}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Messages;
