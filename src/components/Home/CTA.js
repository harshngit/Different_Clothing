import { Button } from '@material-tailwind/react'
import React from 'react'

const CTA = () => {
	return (
		<div className="w-full bg-gray-100 py-8 md:py-12 lg:py-16">
		<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
		  {/* Main Banner Image - Simple Layout */}
		  <div className="relative w-full h-80 md:h-[700px]   rounded-lg overflow-hidden shadow-lg">
			<img
			  src="/asset/lastbanner.png"
			  alt="Different Clothing Collection - Models Showcase"
			  className="object-cover w-full h-full"
			/>
		  </div>
		</div>
	  </div>
	)
}

export default CTA