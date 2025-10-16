import Link from 'next/link'
import React from 'react'

const Photosection = () => {
	return (
		<div className='font-playfair'>
			<div className="min-h-screen bg-white flex flex-col lg:flex-row relative overflow-hidden">
      {/* Left Section - Clothing Display with Image */}
      <div className="lg:w-[50%] w-full bg-black flex items-center justify-center p-4 md:p-12 relative">
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          {/* Main Clothing Display Image */}
          <div className="relative w-full h-96 md:h-[600px] flex items-center justify-center">
            {/* Actual Image Container */}
            <div className="relative w-full h-full overflow-hidden shadow-2xl">
              <img
                src="/asset/Frame.png"
                alt="Different Clothing Collection Banner"
                
                className="object-cover"
              />
              {/* Fallback Placeholder - shown when image fails to load */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center" style={{display: 'none'}}>
                <div className="text-center text-gray-600">
                  <div className="text-6xl mb-4">👕</div>
                  <p className="text-xl font-medium">Clothing Collection</p>
                  <p className="text-sm mt-2">Add your image to /public/images/clothing-rack-hero.jpg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Text and Call to Action */}
      <div className="lg:w-[50%] w-full bg-black flex items-center justify-center p-4 md:p-12 relative">
        <div className="max-w-xl text-center lg:text-center">
          {/* Headline */}
          <div className="mb-6 sm:mb-8 text-center lg:text-left ml-12 ">
            <h1 className="text-3xl  md:text-9xl text-white leading-tight font-playfair sm:mb-4">
              Just Be
            </h1>
            <div className="inline-block">
              <h1 className="text-3xl md:text-9xl mt-[-10px]  text-black bg-gray-200/80 px-3 md:px-4 py-1 leading-tight">
                Different
              </h1>
            </div>
          </div>

          {/* Body Text */}
          <p className="text-white text-base md:text-xl mb-8 sm:mb-12 leading-relaxed">
            Welcome to Different Clothing, where style meets comfort in every piece. Our collection is designed to offer the perfect balance of quality, versatility, and modern design, making it easy for you to express your unique style.
          </p>

          {/* Call to Action Button */}
          <div className="flex justify-center">
            <button className="bg-white text-black font-bold uppercase px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm tracking-wider hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Explore More
            </button>
          </div>
        </div>
      </div>
    </div>
		</div>
	)
}

export default Photosection