import React from "react";
import Modern from "../../asset/oldandmodern-min.png";
import Image from "next/image";
const OurVision = ({vision}) => {
  return (
    <div className="py-6 lg:mx-16 mx-3  items-center  lg:py-12  gap-y-12 lg:gap-16   lg:grid grid-cols-5 grid-flow-col  ">
 
      <div className=" col-span-2 ">
       <Image className="" src={Modern} alt="Co-Living Spaces in Mumbai - Premium Amenities, Modern Living, Community-Focused" />
       
      </div>
      
      <div className=" col-span-3 ">
        <p className="text-gray-500 text-lg lg:text-2xl font-[600] font-[NeueMedium]">
          Our Vision
        </p>
        <div className="border-b-[1px] border-[#d0d0d0] w-20 my-3"></div>
        <p className="lg:text-3xl text-2xl  my-6  text-[#272727] font-bold font-[NeueBold] ">
          Housing is broken. We are creating a  win-win for everyone  involved. 
        </p>
        <p className=" text-justify font-[NeueRegular] text-base lg:text-lg text-[#555454]">
          From the lack of discoverability of millennial friendly spaces to having to deal with leaks and locks by yourself, it’s a vicious cycle. <br /> By spotlighting the resident experience and zeroing in on their unique concerns and housing needs, our occupancy rates are best-in-class. <br />  Whilst coliving is being recognised as a form of asset-class, we have started to create and design our own supply, generating rental yield like never before. 
        </p>
      </div>
    </div>
  );
};

export default OurVision;
