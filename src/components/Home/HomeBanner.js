import React from 'react'
import Video from 'next-video';
const HomeBanner = ({homeContent}) => {
  
  return (
    <div className='relative' >
    <div className=' overflow-hidden'>
    <video className=' z-[-1]  h-auto w-full' playsInline={true}   loop="true" autoplay="autoplay" muted>
            <source src="https://firebasestorage.googleapis.com/v0/b/grc-logistics.appspot.com/o/files%2Funion.webm?alt=media&token=06d11556-dba6-4825-b973-9f84421ee27a" type="video/mp4" />
        </video>
        <h1 className="text-white z-[-1] opacity-5 text-center text-[.5rem]" >Top Luxurious Co-Living Spaces </h1>
        </div>
      
        <div className='absolute left-0 bottom-0 flex items-center justify-center flex-col right-0 m-auto w-full text-center z-[3] top-[10px] lg:top-[-205px]'>
            <h2 className='bg-[#ebe3d67d] my-2 font-[600]  xl:w-[30%] w-[60%] font-[Neue Haas Grotesk Display Pro] px-3 py-3 lg:py-6 lg:text-6xl' >Live <span className="italic" > Easy,</span> </h2>
            <h2 className='bg-[#ebe3d67d]   font-[600]   xl:w-[30%] w-[60%] px-3 py-3 lg:py-6 lg:text-6xl'>Live <span className="italic" > United </span></h2>
            </div>
      
    </div>
  )
}

export default HomeBanner