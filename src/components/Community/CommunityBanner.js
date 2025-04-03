import React from 'react'
import "./Community.css"

import House from "../../asset/house.png"
import Image from 'next/image'

const CommunityBanner = () => {
  return (
    <div className='communitywrapper' >
                <div className=' flex items-center justify-center h-[45vh] md:h-[100vh]' >
               
                <div className='flex  items-center  justify-center flex-col'>
                <div className='text-center flex  items-center  justify-center flex-col'>
                    <h1 className='xl:text-[5rem] font-[NeueBold] text-2xl inline  text-[#fff] leading-[4.5rem] font-bold text-center' >
                      A Social Club 
                    </h1>
                    <p className='xl:my-3 font-[NeueRegular] text-sm text-center xl:text-3xl xl:w-[500px] text-[#fff] font-[600]' >Sign a lease and it's your <Image src={House} className='inline w-6 xl:w-6'  /> too.</p>
                    <div>
                       <a href="https://www.instagram.com/union_living/?hl=en" target='_blank' rel='noreferrer'  > <button className='border-2 xl:my-6 my-4 border-[#fff] bg-[#fff]  font-[NeueMedium] px-3 xl:px-6 xl:py-3 py-2 rounded-full text-xs xl:text-xl' >Join Our Community</button></a>
                    </div>
                </div>
                </div>
                
       </div>
    </div>
  )
}

export default CommunityBanner