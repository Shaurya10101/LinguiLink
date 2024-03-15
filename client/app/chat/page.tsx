"use client"

import React from 'react'
import { useRouter } from 'next/navigation';

const page = () => {

  const router = useRouter();

  const handleCreateRoom = ()=>{
    router.push("/chat/createroom");
  }
  const handleJoinRoom = ()=>{
    router.push("/chat/joinroom");
  }

  return (
    <>
    <div className='pt-24 w-fit mx-auto text-5xl font-semibold tracking-tight'>
      Chat with anyone
    </div>
    <p className='w-fit mx-auto mt-4 italic font-mono'>
      Choose to chat with anyone without any language barrier with our real time translation chat room 
    </p>
    <section>
    <button className='block px-3 py-2 bg-blue-500 rounded-xl m-5' onClick={handleCreateRoom}>
      Create Room
    </button>
    <button className='block px-3 py-2 bg-blue-500 rounded-xl m-5' onClick={handleJoinRoom}>
      Join Room
    </button>
    </section>
    </>
    
  )
}

export default page
