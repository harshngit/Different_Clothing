import React from 'react'
import RoomCard from './RoomCard'

const Roomstwo = ({rooms,brochure}) => {
  return (
    <div className='lg:mx-16 mx-4 pb-12  ' >
            <div>
                <h3 className='font-[NeueBold] text-[2.5rem]' >Rooms</h3>
                <div className='mt-4 lg:grid grid-cols-4 grid-flow-col gap-4 xl:gap-6' >
                   {
                    rooms.map((room, index) => (
                        <RoomCard image={room.image} title={room.title} content={room.description}  />
                    ))
                   }
                    
                    
                </div>
            </div>
          {brochure &&  <div className='lg:flex hidden  mt-2 lg:mt-3 items-center justify-center' >
           <a target='_blank' rel='noreferrer' href={brochure} download> <button className="uppercase flex items-center justify-center gap-2 lg:gap-3 rounded-lg shadow-md  font-[NeueMedium] ease-in duration-300  text-[12px] md:text-[16px]  hover:shadow-none hover:bg-[#272727] tracking-wider py-[12px] px-[16px] mt-3 md:py-[12px] md:px-[24px] text-[#FFFEFC] bg-[#D64C27]" > What's Included in Rent?  </button></a>
           </div>}
    </div>
  )
}

export default Roomstwo