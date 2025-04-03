import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow
} from "swiper";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import PlaceholderImage from "../../asset/propertyCover/placeholder.png"
import Image from 'next/image';
import Link from 'next/link';
const PropertiesCardNew = ({property}) => {
  return (
    <div className='min-h-[500px] '  >
        <div className='shadow-md bg-[#ebe3d67b]   hover:shadow-xl rounded-lg my-3 lg:my-0' >

  <Link href={property.link} >
  
         <div className='px-3   py-3' >
            <Image  width="100%" className='h-[220px] lg:h-[300px]' src={property?.coverImage} />
        
       
             {/* <img className='w-full  rounded-lg ' alt='' src={property?.coverImage } loading='lazy' />  */}
         </div>
       
         </Link>

    <div className='my-0 flex items-center px-3 lg:px-3 py-3 justify-center flex-col text-center' >
            <h4 className='font-[NeueMedium] text-[2rem]' >{property?.name}</h4>
            <h4 className='font-[NeueRegular] text-[1.2rem]' >{property?.location}</h4>
            <p className="font-[NeueRegular]  py-1 text-[1.4rem] text-[#272727]" >Starting From: <span className='text-[#FC7451] font-[NeueMedium]' > {property?.price} </span></p>
            <p className='font-[NeueRegular] mt-1 ' >{property?.content.slice(0,110)}...</p>
            <div className='my-6' >
            <Link href={property.link} > <button className="uppercase flex items-center justify-center gap-3 rounded-lg shadow-md  font-[NeueMedium] ease-in duration-300  text-[14px] md:text-[18px]  hover:shadow-none hover:bg-[#272727] tracking-wider py-[6px] px-[24px] md:py-[8px] md:px-[24px] text-[#FFFEFC] bg-[#D64C27]" >Book Now  </button> </Link>
            </div>
        </div>
        </div>
    </div>
  )
}

export default PropertiesCardNew