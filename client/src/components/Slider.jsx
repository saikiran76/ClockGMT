import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../App.css'; 
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Slider = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const content = [
    { id: 1, heading: "We serve incomparable delicacies", content: "All the best restaurants with their top menu waiting for you, they can't wait for your order!!" },
    { id: 2, heading: "We serve incomparable delicacies", content: "All the best restaurants with their top menu waiting for you, they can't wait for your order!!" },
    { id: 3, heading: "We serve incomparable delicacies", content: "All the best restaurants with their top menu waiting for you, they can't wait for your order!!" }
  ];

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleDirect = (event) => {
    event.stopPropagation();
    navigate("/login");
  };

  return (
    <Swiper
      ref={swiperRef}
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className} custom-bullet"></span>`;
        },
      }}
      className="mySwiper"
    >
      {content.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="flex flex-col items-center justify-center h-full text-white p-6 rounded-lg">
            <h1 className="text-2xl md:text-3xl mb-4 font-bold">{item.heading}</h1>
            <p className="text-md md:text-lg mb-5">
              {item.content}
            </p>
            {item.id === 3 ? (
              <div className="relative flex items-center justify-center mt-2 md:mt-10">
                <div className="progress-circle">
                  <div className="circle-center">
                    <div onClick={handleDirect}><IoArrowForwardCircleOutline style={{ color: "orange", fontSize: "2rem", margin:"1rem" }}  /></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-between w-full">
                <button className="text-white mt-[5rem] md:mt-[15rem] hover:text-[#EEBF74] duration-200">Skip</button>
                <button className="relative text-white mt-[5rem] md:mt-[15rem] flex items-center gap-3 hover:text-[#EEBF74] duration-200" onClick={handleNext}>
                  Next
                  <span className="hover:text-[#EEBF74] duration-200">→</span>
                </button>
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
