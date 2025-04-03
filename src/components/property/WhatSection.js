import React from 'react'
import Checklist from "../../asset/checklist-min.webp"
import { HiArrowLongRight } from "react-icons/hi2";
import { AiOutlineYoutube } from "react-icons/ai";
import Image from 'next/image';
const WhatSection = ({youtube}) => {
  return (
    <div className='lg:mx-16 mx-4 pt-12 pb-12  '>
        <div className='lg:grid grid-cols-2 items-center justify-center grid-flow-col ' >
        <div>
        <h4 className='font-[NeueBold] leading-[2.4rem] lg:leading-[3.5rem] text-[2rem] lg:text-[3rem]' >What’s missing is you, <br /> Everything else is ready.</h4>
        <p className='font-[NeueRegular] mt-3 mb-6 text-[1rem] lg:text-[1.3rem]' >Settling in can be overwhelming. With big & little things <br className='hidden lg:block' /> already taken care of,  you will be at ease throughout.</p>
        <div className='flex items-center justify-start gap-4' >
       {youtube && <a target='_blank' rel='noreferrer' href={youtube}> <button className="uppercase lg:w-[250px] w-[140px] flex items-center justify-center lg:gap-3 gap-1 rounded-lg shadow-md  font-[NeueMedium] ease-in duration-300  text-[0.6rem] md:text-[16px]  hover:shadow-none hover:bg-[#272727] tracking-wider py-[8px] px-[12px]  md:py-[12px] md:px-[24px] text-[#FFFEFC] bg-[#D64C27]" > <AiOutlineYoutube className="text-[1.2rem] lg:text-[1.5rem]" />Property Tour</button></a>}
        <a href='https://form.jotform.com/241691749314462'> <button className="uppercase lg:w-[250px] w-[140px] flex items-center justify-center lg:gap-3 gap-1 rounded-lg shadow-md  font-[NeueMedium] ease-in duration-300  text-[0.6rem] md:text-[16px]  hover:shadow-none hover:bg-[#272727] tracking-wider py-[8px] px-[12px]  md:py-[12px] md:px-[24px] text-[#FFFEFC] bg-[#D64C27]" >Book Now <HiArrowLongRight className="text-[1.2rem] lg:text-[1.5rem]" /> </button></a>
        </div>
       
        </div>
        <div className='lg:flex mt-6 lg:mt-0 items-center justify-end' >
            <Image className='lg:w-[500px]' src={Checklist} />
        </div>
        </div>
    </div>
  )
}

export default WhatSection