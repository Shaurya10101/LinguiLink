"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import React from "react";

const page = () => {
  const [socket, setSocket] = useState<any>(undefined);
  const [inbox, setInbox] = useState<any>([]);
  const [message, setMessage]=useState("");
  const [roomName, setRoomName]=useState("")

  const handleSendMessage = ()=>{
    socket.emit("message", message, roomName);
  }

  useEffect(() => {
    const socket = io("http://localhost:3000");
    
    socket.on('message',(message)=>{
      setInbox([...inbox, message])
    })
    setSocket(socket)
  }, []);

  return (
    <div className="pt-24">
      <div>
        <div className="flex flex-col gap-5 mt-20 px-10 1g:px-48">
          <div className="flex flex-col gap-2 border rounded-1g p-10">
            {" "}
            {inbox.map((message: string, index: number) => (
              <div key={index} className="border rounded px-4 py-2">
                {message}
              </div>
            ))}{" "}
          </div>
          <div className="flex gap-2 align-center justify-center">
            <input
              type="text"
              name="message"
              className="flex-1 bg-black text-white border rounded px-2 py-1"
              onChange={(e)=>{
                setMessage(e.target.value)
              }}
            />{" "}
            <button className="w-40" onClick={handleSendMessage}>Send message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
