import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,

} from "swiper";
// Import Swiper styles
import "swiper/css";
import { HiArrowLongLeft } from "react-icons/hi2";
import { HiArrowLongRight } from "react-icons/hi2";
import 'swiper/css/navigation';
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../app/firebase.config'
const UpcomingEvents = () => {
    const [events, setEvents] = useState([])

const handleEvents  = async ()=>{
  const q = query(collection(db, "events")) 
  const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
    
    setEvents((prev)=>[...prev,{
      id:doc.id,
      ...doc.data()
     }])
 
   });
}
   useEffect(()=>{
    handleEvents()
    
    },[])

  return (
    <div className='py-8 lg:py-12  font-[500]    bg-gray-200 lg:px-16 '>
    <div className='flex items-center px-3 lg:px-0 justify-between' >
    <div>
    <p className='font-[NeueRegular]  text-[1.2rem] mt-2' >Don't Just Stay, Live!</p>
        <h1 style={{fontFamily:"NeueBold"}} className='xl:text-4xl text-3xl  font-bold capitalize' >Experience Our Events</h1>
        </div>
        <div className='flex items-center  gap-3 justify-center' >
        <button className="arrow-right rounded-full border-[1px] border-[#272727]  px-3 py-3 arrow">
         <HiArrowLongLeft className='lg:text-[25px] text-[15px]  text-[#272727]' />
         </button>
         <button className="arrow-left  rounded-full border-[1px] border-[#272727]  px-3 py-3 arrow">
         <HiArrowLongRight className='lg:text-[25px] text-[15px] text-[#272727]' />
         </button>
         </div>
         </div>
        <div>
       
 {events.length===0 ? <h3 className=' text-gray-400 text-xl my-6 mx-3 text-center font-[NeueBold] capitalize' >No Events for now....</h3> : 
 
 <Swiper
          spaceBetween={0}
          className=""
          draggable={true}
          navigation={{ nextEl: "div>.arrow-left", prevEl: "div>.arrow-right" }}
          breakpoints={{
        576: {
          width: 576,
          slidesPerView: 1,
        },
        780: {
          width: 780,
          slidesPerView: 3,
        },
       
         1440:{
          width:1440,
          slidesPerView:3.5
        }
      }}
       
         
          modules={[Navigation]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
           {events.map(event=>(
             <SwiperSlide>
             
              
          <div className="lg:mr-12 mx-4 my-12 lg:my-12">
           {event?.coverImage &&  <img
              className="w-full rounded-lg"
              src={event?.coverImage}
              alt=""
            />}
            <h5 className='font-[NeueBold] mt-2 text-[1.6rem]' >{event?.name}</h5>
            <p className='font-[NeueRegular] text-justify text-[0.9rem] mt-2'>{event?.description?.slice(0,80)}...</p>
          </div>
     
            </SwiperSlide>
           ))}
        </Swiper>}
        </div>
    </div>
  )
}

export default UpcomingEvents