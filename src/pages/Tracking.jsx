import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const Tracking = () => {
  const [speed, setSpeed] = useState(1);
  const [shareUrl, setShareUrl] = useState('');
  const hourHandRef = useRef(null);
  const minuteHandRef = useRef(null);
  const secondHandRef = useRef(null);
  const [quote, setQuote] = useState(''); 
  const [category, setCategory] = useState('happiness');

  useEffect(() => {
    let interval;
    const updateClock = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const secondAngle = (seconds / 60) * 360;
      const minuteAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
      const hourAngle = (hours / 12) * 360 + (minutes / 60) * 30;

      if (secondHandRef.current) {
        secondHandRef.current.style.transform = `rotate(${secondAngle}deg)`;
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.style.transform = `rotate(${minuteAngle}deg)`;
      }
      if (hourHandRef.current) {
        hourHandRef.current.style.transform = `rotate(${hourAngle}deg)`;
      }
    };

    const startClock = () => {
      clearInterval(interval);
      interval = setInterval(updateClock, 1000 / speed);
    };

    startClock();

    return () => clearInterval(interval);
  }, [speed]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
          headers: {
            'X-Api-Key': import.meta.env.VITE_QAPIKEY, 
          },
        });
        const quoteData = response.data;
        setQuote(quoteData[0].quote); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuote(); 

    const interval = setInterval(fetchQuote, 5000); 

    return () => clearInterval(interval);
  }, [category]);

  const handleShare = () => {
    const uuid = uuidv4(); 
    const url = `${window.location.origin}/analog-clock/${uuid}?speed=${speed}`;
    setShareUrl(url);
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
    }).catch((error) => {
      console.error('Failed to copy URL to clipboard:', error);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-poppins">
      <div className="w-64 h-64 border-8 border-orange-500 rounded-full flex items-center justify-center relative">
        <div ref={hourHandRef} className="w-2 h-24 bg-black origin-bottom absolute bottom-1/2"></div>
        <div ref={minuteHandRef} className="w-1 h-28 bg-black origin-bottom absolute bottom-1/2"></div>
        <div ref={secondHandRef} className="w-1 h-32 bg-black origin-bottom absolute bottom-1/2"></div>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={speed}
        onChange={(e) => setSpeed(parseInt(e.target.value))}
        className="mt-6 w-64"
      />
      <p className="mt-2">Speed: {speed}x</p>
      <button
        className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600"
        onClick={handleShare}
      >
        Share
      </button>
      {shareUrl && (
        <p className="mt-3 text-gray-500">
          Share this URL: <a href={shareUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">{shareUrl}</a>
        </p>
      )}
      <p className="mt-6 border-gray-400 border-2 p-3 text-sm rounded">{quote}</p>
    </div>
  );
};

export default Tracking;
