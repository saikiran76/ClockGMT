import React from 'react';
import Slider from '../components/Slider';
import smallsrc from '../assets/burger.png'; 

const OnBoard = () => {
  const source = "https://cdn.pixabay.com/photo/2023/03/05/11/02/burger-7831128_640.jpg"; 
  const sourceSmall = smallsrc; 

  return (
    <div className="relative h-screen bg-cover bg-center font-poppins">
      <div className="absolute bottom-0 left-0 right-0 h-[26rem] bg-[#FE8C00] p-5 m-8 md:m-4 rounded-[3rem] bg-opacity-100 text-center z-50">
        <Slider />
      </div>

      <div className="hidden md:block absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${source})`}}></div>
      <div className="block md:hidden absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${sourceSmall})`}}></div>
    </div>
  );
};

export default OnBoard;
