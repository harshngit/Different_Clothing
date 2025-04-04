import React from 'react'
import Image from 'next/image'
import Tshirt from '../../../public/asset/Home/t-shirt.png'
const HomeBanner = () => {
  return (
    <div className="absolute w-full h-[100vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/asset/Home/bannerhome.png')" }}>

      {/* Signature Collection Tag */}
      <div className="absolute top-[80%] left-[5.5rem] lg:top-1/3 lg:left-10 bg-primary text-white px-4 py-2 rounded-lg shadow-md">
        SIGNATURE COLLECTION
      </div>
      <div className="absolute top-1/2 left-1/2 w-[50%]  overflow-hidden">
        <div className="animate-marquee flex gap-5 text-lg font-semibold -z-10 text-[#ffffff8a] whitespace-nowrap">
          <span>• Be Different</span>
          <span>• Be Different</span>
          <span>• Be Different</span>
          <span>• Be Different</span>
          <span>• Be Different</span>
          <span>• Be Different</span>
          <span>• Be Different</span>
          <span>• Be Different</span>
          <span>• Be Different</span>
          <span>• Be Different</span>
        </div>
      </div>
      {/* T-shirt Image */}
      <div className="relative w-[300px] md:w-[400px] lg:w-[400px]">
        <Image src={Tshirt} alt="T-shirt" width={600} height={700} className="w-[500px] relative left-[1%]" />

        {/* Labels with Lines */}
        <div className="absolute top-[20%] left-[-50px] flex items-center gap-2">

          <span className="ml-4 bg-[#D8D4BCB0] px-3 py-1 rounded">Comfort</span>
          <div className="w-[80px] h-[1px] bg-[#565449] absolute left-[110px]"></div>
          <div className="w-4 h-4 bg-white border-[0.5px] border-[#000] rounded-full left-[80px] relative z-10"></div>

        </div>

        <div className="absolute top-[50%] lg:left-[-80px] left-[-50px] flex items-center ">

          <span className="ml-4 bg-[#D8D4BCB0] px-3 py-1 rounded">Affordable</span>
          <div className="w-4 h-4 bg-[#fff] border-[0.5px] border-[#000] rounded-full relative left-[110px] z-10"></div>
          <div className="lg:w-[100px] w-[100px] h-[1px] bg-[#565449] absolute left-[130px]"></div>
        </div>

        <div className="absolute top-[25%] right-[-30px] flex items-center gap-2">
          <div className="w-[80px] h-[1px] bg-[#565449] absolute right-[90px]"></div>
          <div className="w-4 h-4 bg-white border-[0.5px] border-[#000] left-[-80px] rounded-full relative z-10"></div>
          <span className="mr-4 bg-[#D8D4BCB0] px-3 py-1 rounded">Style</span>
        </div>

        <div className="absolute lg:top-[50%] top-[55%] right-[-30px] flex items-center gap-2">
          <div className="w-[80px] h-[1px] bg-[#565449] absolute right-[110px]"></div>
          <div className="w-4 h-4 bg-white border-[0.5px] border-[#000]  rounded-full relative z-10 left-[-80px]"></div>
          <span className="mr-4 bg-[#D8D4BCB0] px-3 py-1 rounded">Quality</span>
        </div>

        <div className="absolute top-[70%] lg:top-[60%] right-[80px] transform -translate-x-1/2 flex flex-col items-center">
          <div className="w-4 h-4 bg-white border-[0.5px] border-[#000] rounded-full relative z-10"></div>
          <div className="h-[50px] w-[1px] bg-[#565449] absolute top-2"></div>
          <span className="mt-10 bg-[#D8D4BCB0] px-3 py-1 rounded">Unique</span>
        </div>
      </div>
      {/* Marquee Text */}


      {/* Title: Different Clothing */}
      <h1 className="absolute bottom-10 text-3xl md:text-[80px] font-bold">
        <span className="text-white">DIFFERENT</span> <span className="text-black">CLOTHING</span>
      </h1>

    </div>
  )
}
export default HomeBanner