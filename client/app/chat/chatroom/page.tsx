"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from 'axios';

const Page = () => {
  const [socket, setSocket] = useState<any>(undefined);
  const [inbox, setInbox] = useState<any>([]); // For received messages
  const [message, setMessage] = useState(""); // For user input message
  const [targetLanguage, setTargetLanguage] = useState(""); // For target language input

  const languages = [
    { name: "Afrikaans", code: "af" },
    { name: "Albanian", code: "sq" },
    { name: "Amharic", code: "am" },
    { name: "Arabic", code: "ar" },
    { name: "Armenian", code: "hy" },
    { name: "Azerbaijani", code: "az" },
    { name: "Basque", code: "eu" },
    { name: "Belarusian", code: "be" },
    { name: "Bengali", code: "bn" },
    { name: "Bosnian", code: "bs" },
    { name: "Bulgarian", code: "bg" },
    { name: "Catalan", code: "ca" },
    { name: "Cebuano", code: "ceb" },
    { name: "Chichewa", code: "ny" },
    { name: "Chinese (Simplified)", code: "zh-CN" },
    { name: "Chinese (Traditional)", code: "zh-TW" },
    { name: "Corsican", code: "co" },
    { name: "Croatian", code: "hr" },
    { name: "Czech", code: "cs" },
    { name: "Danish", code: "da" },
    { name: "Dutch", code: "nl" },
    { name: "English", code: "en" },
    { name: "Esperanto", code: "eo" },
    { name: "Estonian", code: "et" },
    { name: "Filipino", code: "tl" },
    { name: "Finnish", code: "fi" },
    { name: "French", code: "fr" },
    { name: "Frisian", code: "fy" },
    { name: "Galician", code: "gl" },
    { name: "Georgian", code: "ka" },
    { name: "German", code: "de" },
    { name: "Greek", code: "el" },
    { name: "Gujarati", code: "gu" },
    { name: "Haitian Creole", code: "ht" },
    { name: "Hausa", code: "ha" },
    { name: "Hawaiian", code: "haw" },
    { name: "Hebrew", code: "iw" },
    { name: "Hindi", code: "hi" },
    { name: "Hmong", code: "hmn" },
    { name: "Hungarian", code: "hu" },
    { name: "Icelandic", code: "is" },
    { name: "Igbo", code: "ig" },
    { name: "Indonesian", code: "id" },
    { name: "Irish", code: "ga" },
    { name: "Italian", code: "it" },
    { name: "Japanese", code: "ja" },
    { name: "Javanese", code: "jw" },
    { name: "Kannada", code: "kn" },
    { name: "Kazakh", code: "kk" },
    { name: "Khmer", code: "km" },
    { name: "Kinyarwanda", code: "rw" },
    { name: "Korean", code: "ko" },
    { name: "Kurdish (Kurmanji)", code: "ku" },
    { name: "Kyrgyz", code: "ky" },
    { name: "Lao", code: "lo" },
    { name: "Latin", code: "la" },
    { name: "Latvian", code: "lv" },
    { name: "Lithuanian", code: "lt" },
    { name: "Luxembourgish", code: "lb" },
    { name: "Macedonian", code: "mk" },
    { name: "Malagasy", code: "mg" },
    { name: "Malay", code: "ms" },
    { name: "Malayalam", code: "ml" },
    { name: "Maltese", code: "mt" },
    { name: "Maori", code: "mi" },
    { name: "Marathi", code: "mr" },
    { name: "Mongolian", code: "mn" },
    { name: "Myanmar (Burmese)", code: "my" },
    { name: "Nepali", code: "ne" },
    { name: "Norwegian", code: "no" },
    { name: "Odia (Oriya)", code: "or" },
    { name: "Pashto", code: "ps" },
    { name: "Persian", code: "fa" },
    { name: "Polish", code: "pl" },
    { name: "Portuguese", code: "pt" },
    { name: "Punjabi", code: "pa" },
    { name: "Romanian", code: "ro" },
    { name: "Russian", code: "ru" },
    { name: "Samoan", code: "sm" },
    { name: "Scots Gaelic", code: "gd" },
    { name: "Serbian", code: "sr" },
    { name: "Sesotho", code: "st" },
    { name: "Shona", code: "sn" },
    { name: "Sindhi", code: "sd" },
    { name: "Sinhala", code: "si" },
    { name: "Slovak", code: "sk" },
    { name: "Slovenian", code: "sl" },
    { name: "Somali", code: "so" },
    { name: "Spanish", code: "es" },
    { name: "Sundanese", code: "su" },
    { name: "Swahili", code: "sw" },
    { name: "Swedish", code: "sv" },
    { name: "Tajik", code: "tg" },
    { name: "Tamil", code: "ta" },
    { name: "Tatar", code: "tt" },
    { name: "Telugu", code: "te" },
    { name: "Thai", code: "th" },
    { name: "Turkish", code: "tr" },
    { name: "Turkmen", code: "tk" },
    { name: "Ukrainian", code: "uk" },
    { name: "Urdu", code: "ur" },
    { name: "Uyghur", code: "ug" },
  ];

  const handleSendMessage = () => {
    if (socket && message && targetLanguage) {
      socket.emit("message", { message, targetLanguage });
    }
    setMessage("");
  }

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    newSocket.on('message', (message) => {
      setInbox((prevInbox: any) => [...prevInbox, message]);
    });

    setSocket(newSocket);
``
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="pt-24">
      <div>
        <div className="flex flex-col gap-5 mt-20 px-10 lg:px-48">
          <div className="flex flex-col gap-2 border rounded-lg p-10">
            {/* Display received messages */}
            {inbox.map((message: string, index: number) => (
              <div key={index} className="border rounded px-4 py-2">
                {message}
              </div>
            ))}
          </div>
          <div className="flex gap-2 align-center justify-center">
            <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)} className="bg-white text-black border px-2 py-1 rounded-lg">
              <option value="">Select Language</option>
              {languages.map((lang, index) => (
                <option key={index} value={lang.code}>{lang.name}</option>
              ))}
            </select>
            <input
              type="text"
              name="message"
              className="flex-1 bg-white text-black border px-2 py-1 rounded-lg"
              value={message}
              placeholder="Type a message..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="w-40 bg-blue-700 text-white rounded-xl" onClick={handleSendMessage}>Send message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
