"use client"
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const TranslatePage = () => {
  const [socket, setSocket] = useState<Socket>();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [translatedText, setTranslatedText] = useState<string>('');

  const handleRecordAudio = async () => {
    try {
      if (!isRecording) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          setRecordedAudio(blob);
        };

        setMediaRecorder(recorder);
        setIsRecording(true);
        recorder.start();
      } else {
        if (mediaRecorder) {
          mediaRecorder.stop();
          setIsRecording(false);
        }
      }
    } catch (error) {
      console.error('Error recording audio:', error);
    }
  };

  const sendAudioToServer = async () => {
    try {
      if (recordedAudio) {
        const formData = new FormData();
        formData.append('audio', recordedAudio);

        const response = await fetch('/api/translate', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        setTranslatedText(data.translatedText);
      }
    } catch (error) {
      console.error('Error sending audio to server:', error);
    }
  };

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
  
    return () => {
    newSocket.disconnect();
    };
  }, []);

  return (
    <div className='pt-24'>
      <button onClick={handleRecordAudio}>
        {isRecording ? 'Stop Recording' : 'Record Audio'}
      </button>
      <br />
      <button onClick={sendAudioToServer}>
        Send Audio to Server
      </button>
      <br />
      <textarea
        value={translatedText}
        onChange={(e) => setTranslatedText(e.target.value)}
        placeholder="Translated Text"
      />
    </div>
  );
};

export default TranslatePage;
