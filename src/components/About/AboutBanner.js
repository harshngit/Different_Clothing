import React from 'react'
import "./About.css"
const AboutBanner = () => {
  return (
    <div  className='lg:mx-16 mx-4  ' >
    <div  className='bg-cover bg-center aboutBanner  rounded-lg flex items-center flex-col justify-center h-[70vh] lg:h-[90vh]' >
    <div className=' rounded-lg px-12 py-12'  >
        <h3 className='font-[NeueRegular] text-center capitalize lg:text-[1.5rem]  text-[.8rem]  text-white' >Transforming the way millennials rent, live and grow</h3>
        
        <h1 className='font-[NeueBold] text-center text-[4rem] leading-[5rem] lg:leading-[10rem] text-white uppercase lg:text-[8rem]' >Our Mission</h1>
        <p className='font-[NeueMedium] lg:mt-[-20px] mt-[-15px] text-[1rem] text-center lg:text-[2rem] text-[#ffffff]' > Through hassle-free amenities and community based living</p>
        </div>
        <a href='https://form.jotform.com/240653157769062'> <button className="uppercase mt-[-10px] lg:mt-0 flex items-center justify-center gap-3 rounded-lg shadow-md  font-[NeueMedium] ease-in duration-300  text-[10px] md:text-[14px]  hover:shadow-none hover:bg-[#272727] tracking-wider py-[12px] px-[24px] md:py-[16px] md:px-[24px] text-[#FFFEFC] bg-[#D64C27]" >I'm Interested  </button></a>
    </div>
    </div>
  )
}

export default AboutBanner