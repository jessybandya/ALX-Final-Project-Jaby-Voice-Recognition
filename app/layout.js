"use client"

import React from 'react'
import Footer from '@components/Footer'
import './globals.css'
import Header from '@components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store, persistor  } from '@redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react'
import 'regenerator-runtime/runtime'
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DataProvider from '@components/DataProvider'

export default function RootLayout({ children }) {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const isSpeechRecognitionSupported =
  typeof window !== "undefined" &&
  ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
  const microphoneRef = useRef(null);
  const synth = typeof window !== "undefined" && window.speechSynthesis;
  const [isScrolling, setIsScrolling] = useState(false);

  const history = useRouter()


  useEffect(() => {
    const isListeningLocalStorage = localStorage.getItem("isListening");

    if (isListeningLocalStorage === "true") {
      setIsListening(true);
      SpeechRecognition.startListening({ continuous: true });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transcript", transcript);
    localStorage.setItem("resetTranscript", resetTranscript); 
  }, [transcript]);


  const handleListing = () => {
    if(!isSpeechRecognitionSupported){
      speakText('Your browser does not support Voice Recognition. Consider to Update your browser or use another browser')
      stopHandle()
    }else{
      setIsListening(true);
      microphoneRef.current.classList.add("listening");
      SpeechRecognition.startListening({ continuous: true });
      localStorage.setItem("isListening", "true");
    }
  };

  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    localStorage.setItem("isListening", "false");
  };

  useEffect(() => {
    if (transcript.includes('stop')) {
      stopHandle();
      resetTranscript();
      speakText("Ok, I will stop listening");
    }else if (transcript.includes('back')) {      
      history.back();
      resetTranscript();
    } else if (transcript.includes('home')) {      
      history.push('/');
      resetTranscript();
    } else if (transcript.includes('shop')) {      
      history.push('/shop/1');
      resetTranscript();
    } else if (transcript.includes('login')) {      
      history.push('/login');
      resetTranscript();
    } else if (transcript.includes('register')) {      
      history.push('/register');
      resetTranscript();
    }    else if (transcript.includes('scroll up')) {
      if (!isScrolling) {
        setIsScrolling(true);
        const scrollInterval = setInterval(() => {
          window.scrollBy(0, -100); // Scroll up by 100 pixels
        }, 300); // Set the interval for smooth scrolling (adjust the speed as needed)
        setTimeout(() => {
          clearInterval(scrollInterval);
          setIsScrolling(false);
        }, 1000); // Set a timeout to stop scrolling after 1 second
      }
    } else if (transcript.includes('scroll down')) {
      if (!isScrolling) {
        setIsScrolling(true);
        const scrollInterval = setInterval(() => {
          window.scrollBy(0, 100); // Scroll down by 100 pixels
        }, 300); // Set the interval for smooth scrolling (adjust the speed as needed)
        setTimeout(() => {
          clearInterval(scrollInterval);
          setIsScrolling(false);
        }, 1000); // Set a timeout to stop scrolling after 1 second
      }
    } else if (transcript.includes('check out')) {
      history.push('/checkout');
      resetTranscript();
    }
  }, [transcript, history, isScrolling]);


    // Function to speak the given text using the Web Speech API
    const speakText = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    };

  return (
    <html lang="en">
    <body>
      <DataProvider transcript={transcript} resetTranscript={resetTranscript}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Header transcript={transcript} resetTranscript={resetTranscript}/>
      <ToastContainer />      
       {children}
      <Footer />
      <div  className="app-container">
      <div className="microphone-wrapper">
        <div className="microphone-container">
          <div className="microphone-icon-container" ref={microphoneRef} onClick={handleListing}>
           <KeyboardVoiceIcon style={{ color: '#fff', fontSize: 42 }} />
          </div>
        </div>
      </div>
    </div>
      </PersistGate>
      </Provider>
      </DataProvider>
      </body>
    </html>
  )
}
