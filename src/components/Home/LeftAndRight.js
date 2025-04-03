"use client"
import React from "react";
import HostelImage from "../../asset/hostel.jpg";
import Guesswork from "../../asset/guesswork-min.webp";
import Mobile from "../../asset/mobile-min.webp";
import Responsive from "../../asset/responsive-min.webp";
import Checklist from "../../asset/checklist-min.webp";
import Image from "next/image";
const LeftAndRight = ({ homeContent }) => {
  return (
    <div className=" px-4 py-8 lg:px-16 mx-4 my-16 rounded-xl bg-[#ebe3d6] lg:py-24">
      <div className="flex items-center justify-center">
        <h2 className="lg:text-5xl text-[#272727] text-2xl my-6 font-[700] font-[Neue Haas Grotesk Display Pro]  mx-3 lg:mx-6 mb-8 lg:mb-20 mt-6  leading-[1.2] text-center  ">
          There's Never Been a{" "}
          <span className=" rounded-xl px-6 lg:mt-4 py-0 block lg:w-[650px]  ">
            <span
              style={{
                background:
                  "linear-gradient(to right, #ee0979 0%, #ff6a00 100%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
              }}
              className="py-2 lg:text-6xl  inline"
            >
              Better time to move
            </span>
          </span>
        </h2>
      </div>
      <div className="py-4 lg:px-8 flex items-center flex-col lg:flex-row justify-center">
        <div className=" lg:mx-4 mx-2">
          <h2 className="lg:text-[2.8rem] w-full  text-[#272727] text-2xl font-[700] font-[NeueBold] lg:mx-12  leading-[1.1]  lg:w-[650px] ">
           We Have Taken the 
            <span className="  ">
              {" "}
              <span
                style={{
                  background:
                    "linear-gradient(to right, #ee0979 0%, #ff6a00 100%)",
                  "-webkit-background-clip": "text",
                  "-webkit-text-fill-color": "transparent",
                }}
                className="pt-0 pb-3  "
              >
                Guesswork Out of the Picture
              </span>
            </span>
          </h2>
          <p className="lg:text-[1.2rem] text-md lg:w-[650px] font-[NeueRegular] text-justify text-[#252525] mt-6 lg:mx-12 ">
          Settling in can be overwhelming. With big & little things
        already taken care of, you will be at ease throughout.
          </p>
        </div>
  
          <div className="my-6 lg:my-0">
            <Image
              src={
               Guesswork
              }
              className="rounded-none mx-4  w-[250px] lg:w-[500px]"
              alt=""
            />
          </div>
      
      </div>
      <div className="">
        <div className="lg:py-6 mt-6 lg:mt-20 lg:px-8 flex-col-reverse lg:flex-row flex items-center justify-center">
         
            <div className="my-6 xl:ml-6 lg:my-0">
       <Image
                src={
                Checklist
                }
                className="w-[250px] mx-6 shadow-lg rounded-xl lg:w-[580px]"
                alt=""
              />
            </div>
          
          <div className="lg:ml-24  mx-2 ">
            <h2 className="lg:text-[2.8rem] text-2xl text-[#272727] font-[700] font-[NeueBold] lg:mx-12  leading-[1.1]  lg:w-[650px] ">
            What’s missing is you.
              <span className="   ">
                <p
                  style={{
                    background:
                      "linear-gradient(to right, #ee0979 0%, #ff6a00 100%)",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "transparent",
                  }}
                  className="py-6  inline"
                >
                 Everything else is ready.
                </p>
              </span>{" "}
            </h2>
            <p className="lg:text-[1.2rem] text-md font-[NeueRegular] lg:w-[650px] text-justify text-[#252525] mt-6 lg:mx-12 ">
            Settling in can be overwhelming. With big & little things already taken care of, you will be at ease throughout. 
            </p>
          </div>
        </div>
      </div>
      <div className="py-6 lg:px-4 flex items-center flex-col lg:flex-row justify-center">
        <div className="mx-2 lg:mr-12">
          <h2 className="lg:text-[2.8rem] text-2xl font-[700] font-[NeueBold] lg:mx-12 text-[#272727]  leading-[1.1]  lg:w-[650px] ">
            {" "}
            <span
              style={{
                background:
                  "linear-gradient(to right, #ee0979 0%, #ff6a00 100%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
              }}
              className=""
            >
              Pay rent,
            </span>{" "}
            manage your lease, and stay updated in a few clicks
          </h2>
          <p className="lg:text-[1.2rem] font-[NeueRegular] text-md lg:w-[650px] text-justify text-[#252525] mt-6 lg:mx-12 ">
          No more splitting bills. Everyone pays and manages their stay directly through the app.
          </p>
        </div>
      
          <div className="my-2 lg:my-0">
         <Image
              src={
              Mobile
              }
              className=" w-[250px] lg:w-[420px] mr-0 lg:mr-20  "
              alt=""
            />
          </div>
      
      </div>
      <div className="">
        <div className="py-6 lg:mt-0 lg:px-4 flex items-center flex-col-reverse lg:flex-row justify-center">
        
            <div className="my-6 lg:my-0 mr-12">
            <Image
                src={
                Responsive
                }
                className="w-[100%]   lg:w-[400px]"
                alt=""
              />
            </div>
       
          <div className="lg:mr-[16px] mx-2  ">
            <h2 className="lg:text-[2.8rem] text-2xl font-[700] text-[#272727]  font-[Neue Haas Grotesk Display Pro] lg:mx-12  leading-[1.1]  lg:w-[600px] ">
            A responsive team
              <span
                style={{
                  background:
                    "linear-gradient(to right, #ee0979 0%, #ff6a00 100%)",
                  "-webkit-background-clip": "text",
                  "-webkit-text-fill-color": "transparent",
                }}
                className=""
              >
                is always looking out
              </span>{" "}
              for you.
            </h2>
            <p className="lg:text-[1.2rem] text-md lg:w-[600px] text-justify text-[#252525] mt-6 lg:mx-12 ">
            Unexpected needs pop up anytime, and cannot be postponed. A team will always respond and attend to each of them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftAndRight;
