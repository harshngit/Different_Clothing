import React from 'react'
import Image from 'next/image'
import Tshirt from '../../../public/asset/Home/t-shirt.png'
const HomeBanner = () => {
  return (
    <div className="absolute w-full h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/asset/Home/bannerhome.png')" }}>

      {/* Signature Collection Tag */}
      <div className="absolute top-1/3 left-10 bg-black text-white px-4 py-2 rounded-lg shadow-md">
        SIGNATURE COLLECTION
      </div>

      {/* T-shirt Image */}
      <div className="relative w-[300px] md:w-[400px] lg:w-[500px]">
        <Image src={Tshirt} alt="T-shirt" width={500} height={700} className="mx-auto" />

        {/* Labels with Lines */}
        <div className="absolute top-[150px] left-0 flex items-center gap-2">

          <span className="ml-2 bg-gray-200 px-3 py-1 rounded">Comfort</span>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>

        <div className="absolute top-1/2 left-0 flex items-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="ml-2 bg-gray-200 px-3 py-1 rounded">Affordable</span>
        </div>

        <div className="absolute top-1/3 right-0 flex items-center">
          <span className="mr-2 bg-gray-200 px-3 py-1 rounded">Style</span>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>

        <div className="absolute top-1/2 right-0 flex items-center">
          <span className="mr-2 bg-gray-200 px-3 py-1 rounded">Quality</span>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="ml-2 bg-gray-200 px-3 py-1 rounded">Unique</span>
        </div>
      </div>

      {/* Title: Different Clothing */}
      <h1 className="absolute bottom-10 text-4xl md:text-6xl font-bold">
        <span className="text-white">DIFFERENT</span> <span className="text-black">CLOTHING</span>
      </h1>

    </div>
  )
}
export default HomeBanner