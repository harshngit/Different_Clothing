import React from 'react'
import Declutter from "../../asset/category/declutter.gif"
import Better from "../../asset/category/better.gif"
import Elevate from "../../asset/category/Elevate.gif"
import Junior from "../../asset/category/junior.gif"
import Mixtape from "../../asset/category/mixtape.gif"
import Moodboard from "../../asset/category/moodboard.gif"
import Image from 'next/image'
const Category = ({community}) => {
  return (
    <div >
        <div className=' py-8  lg:py-12 text-center '>
            <h2 className='font-[NeueBold]  xl:text-4xl text-2xl xl:pb-4 pb-4 '  >Enjoy community events every week</h2>
            <div className='lg:px-12 px-4 py-6 flex gap-6 lg:gap-12 flex-wrap items-center justify-center' >
        
                    <div className='2xl:w-[400px] xl:w-[350px]  ' >
                    <Image className='rounded-lg' src={Declutter} alt="" />
                    <p  style={{
                background:
                  "linear-gradient(to right, #ee0979 0%, #ff6a00 100%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
                padding:"10px 0px",
              
              }} className='xl:text-4xl text-2xl mt-1 mb-2 text-[#272727] font-[NeueBold] text-left font-[700]' >Declutter</p>
                    <p  className='text-sm mt-1 text-justify font-[NeueRegular]  text-[#272727] font-[500]' >Pause your routine hovering round-the-clock and dive into the calmness within</p>
                </div>
                <div className='2xl:w-[400px] xl:w-[350px]  ' >
                    <Image className='rounded-lg' src={Mixtape} alt="" />
                    <p  style={{
                background:
                  "linear-gradient(to right, #ee0979 0%, #ff6a00 100%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
                padding:"10px 0px",
              
              }} className='xl:text-4xl text-2xl mt-1 mb-2 text-[#272727] font-[NeueBold] text-left font-[700]' >Mixtape Sessions</p>
                    <p  className='text-sm mt-1 text-justify font-[NeueRegular]  text-[#272727] font-[500]' >Bringing conceptually curated events with an infuse of Indie music artists</p>
                </div>
                <div className='2xl:w-[400px] xl:w-[350px]  ' >
                    <Image className='rounded-lg' src={Junior} alt="" />
                    <p  style={{
                background:
                  "linear-gradient(to right, #ee0979 0%, #ff6a00 100%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
                padding:"10px 0px",
              
              }} className='xl:text-4xl text-2xl mt-1 mb-2 text-[#272727] font-[NeueBold] text-left font-[700]' >Junior Senior</p>
                    <p  className='text-sm mt-1 text-justify font-[NeueRegular]  text-[#272727] font-[500]' >Interact with your alumni buddies and exchange ideas, thoughts, learnings and experiences.</p>
                </div>
                <div className='2xl:w-[400px] xl:w-[350px]  ' >
                    <Image className='rounded-lg' src={Elevate} alt="" />
                    <p  style={{
                background:
                  "linear-gradient(to right, #ee0979 0%, #ff6a00 100%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
                padding:"10px 0px",
              
              }} className='xl:text-4xl text-2xl mt-1 mb-2 text-[#272727] font-[NeueBold] text-left font-[700]' >Elevate</p>
                    <p  className='text-sm mt-1 text-justify font-[NeueRegular]  text-[#272727] font-[500]' >Exercise under a certified trainer to power up your day and boost your productivity</p>
                </div>
                <div className='2xl:w-[400px] xl:w-[350px]  ' >
                    <Image className='rounded-lg' src={Moodboard} alt="" />
                    <p  style={{
                background:
                  "linear-gradient(to right, #ee0979 0%, #ff6a00 100%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
                padding:"10px 0px",
              
              }} className='xl:text-4xl text-2xl mt-1 mb-2 text-[#272727] font-[NeueBold] text-left font-[700]' >Moodboard</p>
                    <p  className='text-sm mt-1 text-justify font-[NeueRegular]  text-[#272727] font-[500]' >Experience hours of art gigs while you harmoniously sip, paint, munch & draw</p>
                </div>
                <div className='2xl:w-[400px] xl:w-[350px]  ' >
                    <Image className='rounded-lg' src={Better} alt="" />
                    <p  style={{
                background:
                  "linear-gradient(to right, #ee0979 0%, #ff6a00 100%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
                padding:"10px 0px",
              
              }} className='xl:text-4xl text-2xl mt-1 mb-2 text-[#272727] font-[NeueBold] text-left font-[700]' >Better Together</p>
                    <p  className='text-sm mt-1 text-justify font-[NeueRegular]  text-[#272727] font-[500]' >Binge together on your favourite meals garnished with conversations and chuckles.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Category