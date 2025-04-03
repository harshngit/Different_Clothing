import React from 'react'
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlineYoutube } from "react-icons/ai";

const BottomNavConstant = ({name,price,youtube,brochure}) => {
  return (
    <div className='fixed z-[999] bottom-0 lg:flex items-center justify-between py-2 px-4 lg:px-16 lg:py-2 w-full bg-gray-100'>
    <div>
        <h3 className='font-[NeueMedium] lg:text-left text-center text-[1.2rem]  text-[#272727] capitalize lg:text-[2rem]'>{name}</h3>
        <h3 className='font-[NeueRegular] lg:text-left text-center lg:text-[1rem]  text-[.7rem] ' >Starting At: {price}</h3>
    </div>
        <div className='flex items-center gap-2 lg:gap-12 justify-center' >
            
          {youtube &&  <a href={youtube}> <button className="uppercase w-[155px] lg:w-[280px]  flex items-center justify-center lg:gap-3 gap-2 rounded-lg shadow-md  font-[NeueMedium] ease-in duration-300  text-[10px] md:text-[16px]  hover:shadow-none hover:bg-[#272727] tracking-wider py-[8px] px-[6px] mt-3 md:py-[12px] md:px-[24px] text-[#FFFEFC] bg-[#D64C27]" > <AiOutlineYoutube className="text-[1rem] lg:text-[1.5rem]" />Property Tour</button></a>}
          {brochure &&  <a target='_blank' rel='noreferrer' href={brochure} download> <button className="uppercase flex items-center justify-center gap-2 lg:gap-3 rounded-lg shadow-md  font-[NeueMedium] ease-in duration-300 w-[155px] lg:w-[280px]  text-[10px] md:text-[16px]  hover:shadow-none hover:bg-[#272727] tracking-wider py-[8px] px-[6px] mt-3 md:py-[12px] md:px-[24px] text-[#FFFEFC] bg-[#D64C27]" > <MdOutlineFileDownload className="text-[1rem] lg:text-[1.5rem]" /> Download Brochure  </button></a>
       }
            
        </div>
    </div>
  )
}

export default BottomNavConstant