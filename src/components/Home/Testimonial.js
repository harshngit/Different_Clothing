"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const TestimonialTwo = () => {
  return (
    <div className='lg:mx-16 mx-4 pt-12 pb-12  '>
        <div>
        <div className='flex items-center justify-between' >
        <h3 className='font-[NeueBold] text-[1.4rem] lg:text-[2.8rem]' >Reviews</h3>
       
        </div>
        <Swiper
          spaceBetween={0}
          className="mt-6"
          draggable={true}
          breakpoints={{
            350: {
          width: 450,
          slidesPerView: 1.5,
        },
            450: {
          width: 450,
          slidesPerView: 1.5,
        },
        576: {
          width: 576,
          slidesPerView: 2,
        },
        780: {
          width: 780,
          slidesPerView: 3,
        },
         1200: {
          width: 1200,
          slidesPerView: 3.5,
        },
       
         1440:{
          width:1440,
          slidesPerView:4.4
        }
      }}
          autoplay={{
            delay: 2000,
            disableOnInteraction:true,
          }}
          loop={true}
          modules={[Autoplay]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
         
              <SwiperSlide >
              <video className='   h-[500px] rounded-lg shadow-lg px-2 lg:px-0 lg:mr-0 mb-6   '  controls>
          <source src="https://firebasestorage.googleapis.com/v0/b/grc-logistics.appspot.com/o/files%2FreviewOne.mp4?alt=media&token=45ab2b87-59a4-45b5-9b6b-bddc5cad9b25" type="video/mp4" />
              </video>
              </SwiperSlide>
              <SwiperSlide >
              <video className='   h-[500px] rounded-lg shadow-lg px-2 lg:px-0 lg:mr-0 mb-6   '  controls>
          <source src="https://firebasestorage.googleapis.com/v0/b/grc-logistics.appspot.com/o/files%2FreviewTwo.mp4?alt=media&token=f3abc2a7-2286-48c1-93b7-61743bdfa9d3" type="video/mp4" />
              </video>
              </SwiperSlide>
              
              <SwiperSlide >
              <video className='   h-[500px] rounded-lg shadow-lg px-2 lg:px-0 lg:mr-0 mb-6   '  controls>
          <source src="https://firebasestorage.googleapis.com/v0/b/grc-logistics.appspot.com/o/files%2FreviewThree.mp4?alt=media&token=09e0f5c1-4357-432b-804d-36fa2eea8965" type="video/mp4" />
              </video>
              </SwiperSlide>
              <SwiperSlide >
              <video className='   h-[500px] rounded-lg shadow-lg px-2 lg:px-0 lg:mr-0 mb-6   '  controls>
          <source src="https://firebasestorage.googleapis.com/v0/b/grc-logistics.appspot.com/o/files%2FreviewFive.mp4?alt=media&token=1fbb9ac2-a426-413b-b3ef-b671aceb0add" type="video/mp4" />
              </video>
              </SwiperSlide>
        </Swiper>
        </div>
        
    </div>
  )
}

export default TestimonialTwo