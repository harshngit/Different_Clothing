import React from 'react'
import Network from "../../asset/network.png"
import Plans from "../../asset/plans-min.png"
import Image from 'next/image'
const Portfolio = ({portfolio}) => {
  return (
   <div className='py-6 lg:mx-16 mx-3   lg:py-12  gap-y-12 lg:gap-16  grid grid-cols-1 lg:grid-cols-5 items-center  lg:grid-flow-col ' >
   
   <div className='lg:col-span-2' >
           <Image className='' src={Plans} alt="Co-Living Spaces in Mumbai - Premium Amenities, Modern Living, Community-Focused" />
        </div>
      
        <div className='lg:col-span-3' >
            <h2 className="text-3xl   text-[#272727] font-bold font-[NeueBold] ">
         We are here for the 
        Long Haul.
       
        
        </h2>
            <p className=' text-justify font-[NeueRegular]  text-base lg:text-lg text-[#555454]' >Union is the first coliving approach based in the city of dreams, Mumbai. <br /> With property management demanding time, effort, and constant improvements, Union has drawn an exceptional graph of growth in the given amount of time. <br /> The plans for the future are mapped out with 5+ cities</p>
        </div>
        
    </div>
  )
}

export default Portfolio