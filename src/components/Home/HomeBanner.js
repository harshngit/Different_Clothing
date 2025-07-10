'use client'

import React from 'react'
import Image from 'next/image'
import Tshirt from '../../../public/asset/Home/t-shirt.png'

const HomeBanner = () => {
  return (
    <div className='relative font-playfair z-0'>
      <div className="absolute w-full lg:h-[80vh] xl:h-[85vh] h-[85vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/asset/Home/bannerhomediff.png')" }}>

        <div className="absolute top-[70%] left-1/2 lg:top-1/2 md:top-1/2 lg:left-10 bg-primary text-white px-4 py-2 rounded-lg shadow-md">
          SIGNATURE COLLECTION
        </div>
        <div className="absolute lg:top-1/2 top-1/3 left-1/2 w-[50%]  overflow-hidden">
          <div className="animate-marquee flex gap-5 text-lg font-semibold -z-10 text-[#565449] whitespace-nowrap">
            {Array(10).fill("• Be Different").map((text, idx) => (
              <span key={`a-${idx}`} className="mr-2">{text}</span>
            ))}
            {Array(10).fill("• Be Different").map((text, idx) => (
              <span key={`b-${idx}`} className="mr-2">{text}</span>
            ))}
          </div>
        </div>
        <div className="relative  w-[300px] md:w-[400px] lg:w-[400px]">
          <Image src={Tshirt} alt="T-shirt" width={600} height={700} className="w-[500px] lg:top-[-10rem] top-[-5rem] xl:h-[450px] relative left-[1%]" />

          <div className="absolute lg:top-[20%] top-[2%] lg:left-[-50px] flex items-center gap-2">

            <span className="ml-4 bg-[#D8D4BCB0] lg:px-3 px-2 py-1 lg:py-1 rounded">Comfort</span>
            <div className="lg:w-[80px] w-[40px] h-[1px] bg-[#565449] absolute lg:left-[110px] left-[92px]"></div>
            <div className="w-4 h-4 bg-white border-[0.5px] border-[#000] rounded-full lg:left-[80px] left-[30px] relative z-10"></div>

          </div>

          <div className="absolute lg:top-[50%] top-[20%] lg:left-[-80px] left-[-50px] flex items-center ">

            <span className="ml-4 bg-[#D8D4BCB0] lg:px-3 px-2 py-1 lg:py-1 relative lg:left-0 left-[19%] rounded">Affordable</span>
            <div className="w-4 h-4 bg-[#fff] border-[0.5px] border-[#000] rounded-full relative lg:left-[110px] left-[70px] z-10"></div>
            <div className="lg:w-[100px] w-[50px] h-[1px] bg-[#565449] absolute left-[130px]"></div>
          </div>

          <div className="absolute lg:top-[25%] top-[8%] lg:right-[-20px] right-[-30px] flex items-center gap-2">
            <div className="lg:w-[80px] w-[90px] h-[1px] bg-[#565449] absolute right-[90px]"></div>
            <div className="w-4 h-4 bg-white border-[0.5px] border-[#000] lg:left-[-80px] right-[167px] rounded-full absolute z-10"></div>
            <span className="mr-4 bg-[#D8D4BCB0]  lg:px-3 px-2 py-1 lg:py-1 rounded lg:left-0 relative left-[-23px]">Style</span>
          </div>

          <div className="absolute lg:top-[50%] top-[30%] right-[-30px] flex items-center gap-2">
            <div className="w-[80px] h-[1px] bg-[#565449] absolute right-[110px]"></div>
            <div className="w-4 h-4 bg-white border-[0.5px] border-[#000]  rounded-full relative z-10 left-[-80px]"></div>
            <span className="mr-4 bg-[#D8D4BCB0] lg:px-3 px-2 py-1 lg:py-1 rounded lg:left-0 relative left-[-23px]">Quality</span>
          </div>

          <div className="absolute top-[50%] lg:top-[60%] right-[80px] transform -translate-x-1/2 flex flex-col items-center">
            <div className="w-4 h-4 bg-white border-[0.5px] border-[#000] rounded-full relative z-10"></div>
            <div className="h-[50px] w-[1px] bg-[#565449] absolute top-2"></div>
            <span className="mt-10 bg-[#D8D4BCB0] lg:px-3 px-2 py-1 lg:py-1 rounded">Unique</span>
          </div>
        </div>


        <h1 className="absolute lg:hidden top-[80%]  text-3xl md:text-[80px] font-bold">
          <span className="text-white font-playfair font-normal">DIFFERENT</span> <span className="text-black font-playfair font-normal">CLOTHING</span>
        </h1>

        <h1 className="absolute lg:block hidden bottom-14 text-3xl md:text-[80px] font-bold">
          <span className="text-white font-playfair font-normal">DIFFERENT</span> <span className="text-black font-playfair font-normal">CLOTHING</span>
        </h1>

      </div>
    </div>
    // <>
    //   <div className="w-full">
    //     <video autoPlay playsInline loop muted className="w-full">
    //       <source src="/asset/Home/diffvedio.mp4" type="video/mp4" />
    //       Your browser does not support the video tag.
    //     </video>
    //   </div>
    // </>
  )
}
export default HomeBanner