"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import React from "react";

const Page = () => {
  const [socket, setSocket] = useState<any>(undefined);
  const [inbox, setInbox] = useState<any>([]);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (socket) {
      socket.emit("message", message);
    }
  }

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    newSocket.on('message', (message) => {
      setInbox((prevInbox: any) => [...prevInbox, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="pt-24">
      <div>
        <div className="flex flex-col gap-5 mt-20 px-10 lg:px-48">
          <div className="flex flex-col gap-2 border rounded-lg p-10">
            {inbox.map((message: string, index: number) => (
              <div key={index} className="border rounded px-4 py-2">
                {message}
              </div>
            ))}
          </div>
          <div className="flex gap-2 align-center justify-center">
            <input
              type="text"
              name="message"
              className="flex-1 bg-black text-white border rounded px-2 py-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="w-40" onClick={handleSendMessage}>Send message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
