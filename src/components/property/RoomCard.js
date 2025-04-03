import Image from 'next/image';
import React from 'react'
import { HiArrowLongRight } from "react-icons/hi2";
const RoomCard = ({image,title,content,subContent}) => {
  
  return (
    <div className='shadow-md bg-[#ebe3d67b] hover:shadow-xl rounded-lg my-3 lg:my-0' >
        <div className='px-3 py-3' >
            <Image className='rounded-lg' src={image} />
        </div>
        <div className='my-0 flex items-center px-3 lg:px-3 justify-center flex-col text-center' >
            <h4 className='font-[NeueMedium] text-[2rem]' >{title}</h4>
            
            <p className='font-[NeueRegular] mt-1 ' >{content}</p>
            <div className='my-6' >
            
            </div>
        </div>
    </div>
  )
}

export default RoomCard