import React from 'react'
import Network from "../../asset/network.png"
import Image from 'next/image'
const Community = () => {
 
  return (
   <div className='py-6 lg:mx-16 mx-3   lg:py-12  gap-y-12 lg:gap-16  grid grid-cols-1 lg:grid-cols-5 items-center  lg:grid-flow-col ' >
        <div className='lg:col-span-3' >
             
        <h2 className="lg:text-3xl text-2xl my-6  text-[#272727] font-bold font-[NeueBold] ">
        Community is what
       escalates the graph. 
       
        </h2>
            <p className=' text-justify font-[NeueRegular] text-base lg:text-lg text-[#555454]' >  There are friends, there is family and then there are friends who turn into family. <br />  At Union, you stay with friends that stay for life. <br />  While sharing a space with peers lets you grow your network and dodge loneliness, workshops and events keep the mood cheered up. <br />  Needless to say, it forms a sustainable revenue model owing to a lower vacancy rate and automated Word of Mouth and therefore higher returns.
</p>
        </div>
      
        <div className='lg:col-span-2 order-first lg:order-last' >
          <Image className='w-[550px]' src={Network} alt="Co-Living Spaces in Mumbai - Premium Amenities, Modern Living, Community-Focused" />
        </div>
        
    </div>
  )
}

export default Community