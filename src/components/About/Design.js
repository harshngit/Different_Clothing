import React from 'react'
import Designs from "../../asset/design.jpg"
import Image from 'next/image'
const Design = ({design}) => {
  return (
    <div className='py-6 lg:mx-16 mx-3   lg:py-12  gap-y-12 lg:gap-16  grid grid-cols-1 lg:grid-cols-5 items-center  lg:grid-flow-col ' >
   
     <div className='lg:col-span-2 ' >
          <Image className=' shadow-xl ' src={Designs} alt="Co-Living Spaces in Mumbai - Premium Amenities, Modern Living, Community-Focused" />
        </div>
  
        <div className='lg:col-span-3' >
          
        <h2 className="lg:text-3xl text-2xl my-6  text-[#272727] font-bold font-[NeueBold] ">
          We are  design obsessed.
        </h2>
            <p className=' text-justify font-[NeueRegular] text-base lg:text-lg text-[#555454]' >Conventional rental provisions such as PGs and apartments in the unorganized sector- fail to offer a sense of design. <br/> With most of the time spent indoors, the space has a major role in uplifting the vibes. <br/> Each of the properties are thoughtfully designed and tastefully decorated to complement your personality. <br/> And of course, notwithstanding functionality by making sure each nook and corner serves a purpose.
</p>
        </div>
       
    </div>
  )
}

export default Design