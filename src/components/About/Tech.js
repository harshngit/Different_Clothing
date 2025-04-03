import React from 'react'
import TechImage from "../../asset/tech-min.png"
import Image from 'next/image'
const Tech = ({tech}) => {
  return (
    
    <div className='py-6 lg:mx-16 mx-3   lg:py-12  gap-y-12 lg:gap-16  grid grid-cols-1 lg:grid-cols-5 items-center  lg:grid-flow-col  ' >
        <div className='lg:col-span-3' >
          
        <h2 className="lg:text-3xl text-2xl my-6  text-[#272727] font-bold font-[NeueBold] ">
          Tech is the  Catalyst.
        
        </h2>
        
            <p className=' text-justify font-[NeueRegular] text-base lg:text-lg text-[#555454]' > Traditional renting ways no longer complement our modern lifestyle. <br /> At Union, everything is digitally made smart. Starting from the discovery of a property to managing stays, technology hones the entire process. <br /> The website, application, and social media also induce greater transparency between residents and the team. <br /> With the use of the app, R&M is streamlined, resulting in better TAT and therefore higher appreciation and loyalty.</p>
        </div>
       
        <div className='lg:col-span-2 order-first lg:order-last ' >
           <Image className='' src={TechImage} alt="Co-Living Spaces in Mumbai - Premium Amenities, Modern Living, Community-Focused" />
        </div>
      
    </div>
  )
}

export default Tech