import React from 'react'
import Community from "../../asset/community.webp"
import Link from 'next/link'
import Image from 'next/image'
const Unite = ({homeContent}) => {
  return (
    <Link href="/community">
    <div className='py-8 lg:py-0 mx-4 my-16 rounded-xl  bg-gradient-to-r from-[#002a3f] to-[#000000] lg:px-16 flex items-center flex-col lg:flex-row justify-center' >
            <div className='mx-4 lg:mx-0 pt-6 lg:pt-0 ' >
                <h2 className='lg:text-6xl text-white text-3xl font-[700] font-[NeueBold] lg:mx-12   leading-[1.1] w-full  lg:w-[550px] ' >Connect. Celebrate.<span className="  " > <span style={{"background":"linear-gradient(to right, #ee0979 0%, #ff6a00 100%)","-webkit-background-clip":"text","-webkit-text-fill-color":"transparent"}}  className="pt-0 pb-3  " >Cherish.</span></span></h2>
                <p className='lg:text-[1.5rem] font-[NeueRegular] leading-8 text-base text-md lg:w-[500px] text-justify text-[#acacac] mt-6 lg:mx-12 ' >It’s always a Saturday night at Unite. Bringing life to your life with a variety of events, workshops, and parties </p>
            </div>
           
            <div className='my-0' >
            <Image  src={Community}  className="rounded-none   w-[350px] lg:w-[850px]" alt="" />
            </div>
           
        </div>
        </Link>
  )
}

export default Unite