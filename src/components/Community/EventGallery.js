import React from 'react'
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
import ImageOne from "../../asset/communityimages/image1.webp"
import ImageTwo from "../../asset/communityimages/image2.webp"
import ImageThree from "../../asset/communityimages/image3.webp"
import ImageFour from "../../asset/communityimages/image4.webp"
import ImageFive from "../../asset/communityimages/image5.webp"
import ImageSix from "../../asset/communityimages/image6.webp"
import ImageSeven from "../../asset/communityimages/image7.webp"
import ImageEight from "../../asset/communityimages/image8.webp"
import ImageNine from "../../asset/communityimages/image9.webp"
import ImageTen from "../../asset/communityimages/image10.webp"
import EventList from "./EventList"
import EventListTwo from "./EventListTwo"
const EventGallery = ({community}) => {
  
    
    const list = [
      {
        image:ImageOne,
        link:"https://www.projectstoday.com/News/Union-Living-to-add-1000-beds-in-expansion-mode"
      },
      {
        image:ImageTwo,
        link:"https://yourstory.com/2024/01/startup-news-and-updates-daily-roundup-january-23"
      },
      {
        image:ImageThree,
        link:"https://indianstartupnews.com/news/co-living-startup-union-living-to-add-1-000-beds-in-mumbai-in-2024-to-invest-rs-10cr-on-expansion-2397372"
  
      },
      {
        image:ImageFour,
        link:"https://www.rprealtyplus.com/realty-spotlight/co-living-startup-union-living-to-add-1000-beds-in-mumbai-113763.html"
      },
      {
        image:ImageFive,
        link:"https://www.mid-day.com/lifestyle/culture/article/tired-of-high-rentals-in-mumbai-here-is-a-pocket-friendly-co-living-option-23305483"
      },
    {
      image:ImageSix,
      link:"https://startup.outlookindia.com/sector/e-commerce/co-living-start-up-introduces-varsity-by-union-living-in-mumbai-news-9254"
    },
    {
      image:ImageSeven,
      link:"https://mybs.in/2dSkpBP"
    },
    {
      image:ImageEight,
      link:"https://indianexpress.com/article/cities/pune/pune-inc-mumbai-co-living-brand-8893236/lite/"
    },
    {
      image:ImageNine,
      link:"https://www.epcworld.in/p/post/union-living-to-add-1-000-beds-in-mumbai-this-yr-to-invest-rs-10-crore-on-expansion"
    },
    {
      image:ImageTen,
      link:"https://realtynxt.com/news/union-living-invests-10-cr-for-new-centers-in-mumbai"
    },
   
    ]
    const imagesOne = list?.slice(0,5)?.map((image) => ({
      id: crypto.randomUUID(),
      image:image.image,
      link:image.link
    }));
    const imagesTwo = list?.slice(5,10)?.map((image) => ({
      id: crypto.randomUUID(),
      image:image.image,
      link:image.link
    }));
  return (
    <div className='lg:pt-6  lg:mb-0 pb-6 lg:mx-0'>
         <div>
        <h2 className=" font-bold text-[#272727] text-2xl lg:text-5xl font-[NeueBold]">
          <span className=" mx-1  rounded-xl px-4  mt-2 py-2  lg:w-[460px]  ">
           <h4
            
            className="py-2  px-2 inline"
          >   #Event Gallery </h4></span> 
        </h2>
      </div>
      <div className="lg:mt-12 mt-6 lg:mb-0 my-6">
      <EventList images={imagesOne} speed={20000} />
      <EventListTwo images={imagesTwo} speed={20000} />
              {/* <Swiper
          spaceBetween={0}
          className=""
          draggable={true}
          breakpoints={{
        576: {
          width: 576,
          slidesPerView: 2,
        },
        780: {
          width: 780,
          slidesPerView: 3,
        },
       
         1440:{
          width:1440,
          slidesPerView:4
        }
      }}
          autoplay={{
            delay: 800,
            disableOnInteraction:false,
          }}
          loop={true}
          modules={[Autoplay]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
           
       
          <SwiperSlide>
          <div className="mx-1 my-12 lg:my-12">
            <img
              className="xl:w-[700px] ] w-[100%] rounded-xl"
              src={ImageOne}
              alt=""
            />
            
          </div>
            </SwiperSlide>
            <SwiperSlide>
          <div className="mx-1 my-12 lg:my-12">
            <img
              className="xl:w-[700px] ] w-[100%] rounded-xl"
              src={ImageTwo}
              alt=""
            />
            
          </div>
            </SwiperSlide>
            <SwiperSlide>
          <div className="mx-1 my-12 lg:my-12">
            <img
              className="xl:w-[700px] ] w-[100%] rounded-xl"
              src={ImageThree}
              alt=""
            />
            
          </div>
            </SwiperSlide>
            <SwiperSlide>
          <div className="mx-1 my-12 lg:my-12">
            <img
              className="xl:w-[700px] ] w-[100%] rounded-xl"
              src={ImageFour}
              alt=""
            />
            
          </div>
            </SwiperSlide>
            <SwiperSlide>
          <div className="mx-1 my-12 lg:my-12">
            <img
              className="xl:w-[700px] ] w-[100%] rounded-xl"
              src={ImageFive}
              alt=""
            />
            
          </div>
            </SwiperSlide>
            <SwiperSlide>
          <div className="mx-1 my-12 lg:my-12">
            <img
              className="xl:w-[700px] ] w-[100%] rounded-xl"
              src={ImageSix}
              alt=""
            />
            
          </div>
            </SwiperSlide>
            <SwiperSlide>
          <div className="mx-1 my-12 lg:my-12">
            <img
              className="xl:w-[700px] ] w-[100%] rounded-xl"
              src={ImageSeven}
              alt=""
            />
            
          </div>
            </SwiperSlide>
            <SwiperSlide>
          <div className="mx-1 my-12 lg:my-12">
            <img
              className="xl:w-[700px] ] w-[100%] rounded-xl"
              src={ImageEight}
              alt=""
            />
            
          </div>
            </SwiperSlide>
            <SwiperSlide>
          <div className="mx-1 my-12 lg:my-12">
            <img
              className="xl:w-[700px] ] w-[100%] rounded-xl"
              src={ImageNine}
              alt=""
            />
            
          </div>
            </SwiperSlide>
            <SwiperSlide>
          <div className="mx-1 my-12 lg:my-12">
            <img
              className="xl:w-[700px] ] w-[100%] rounded-xl"
              src={ImageTen}
              alt=""
            />
            
          </div>
            </SwiperSlide>
        </Swiper> */}
      </div>
    </div>
  )
}

export default EventGallery