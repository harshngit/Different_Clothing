"use client"
import React from 'react'
import { IoMdArrowRoundUp } from 'react-icons/io'
import { PiLinkedinLogo } from "react-icons/pi";
import { PiInstagramLogo } from "react-icons/pi";
import { PiYoutubeLogo } from "react-icons/pi";
import Link from "next/link"
import Image from 'next/image';
const Footer = () => {
    return (
        // <div className='md:px-12 mx-4 lg:mx-12 my-3 rounded-lg px-4 py-12 shadow-lg bg-[#ebe3d654]' >
        // <div className='md:grid grid-col-7 grid-flow-col' >
        //     <div className='col-span-1' >
        //         <Image className='w-[130px]' src={Logo} />
        //         <p className='font-[NeueRegular] text-[1rem] text-[#272727]' >Live Easy, Live United</p>
        //         <a href='https://form.jotform.com/241691749314462'> <button className="uppercase flex items-center justify-center gap-3 rounded-lg shadow-md  font-[NeueMedium] ease-in duration-300  text-[12px] md:text-[16px]  hover:shadow-none hover:bg-[#272727] tracking-wider py-[8px] px-[24px] mt-3 md:py-[12px] md:px-[24px] text-[#FFFEFC] bg-[#D64C27]" >Book Now  </button></a>
        //     </div>
        //     <div className='col-span-5 flex lg:items-start justify-around pb-4 lg:flex-row flex-col gap-6    mt-3 md:mt-4' >
        //             <div>
        //                 <h3 className='font-[NeueMedium] text-[1.5rem] text-[#272727]'>Sitemap</h3>
        //                 <div>
        //                     <Link href="/"><p> Home</p></Link>
        //                     <Link href="/properties"><p> Properties</p></Link>
        //                     <Link href="/community"><p> Community</p></Link>
        //                     <Link href="/ourstory"><p> Our Story</p></Link>
        //                     <Link href="/blogs"><p> Our Blogs</p></Link>
        //                 </div>
        //             </div>
        //             <div>
        //                 <h3 className='font-[NeueMedium] text-[1.5rem] text-[#272727]'>Important Links</h3>
        //                 <div>
        //                     <Link href="/onboardingpolicy"><p> Rules and Regulations</p></Link>
        //                     <Link href="/termsandcondition"><p> Terms and Condition</p></Link>
        //                     <Link href="/privacy-policy"><p> Privacy Policy</p></Link>
        //                 </div>
        //             </div>
        //     </div>
        //     <div className='col-span-1 mt-3 md:mt-6' >
        //         <p className='font-[NeueRegular]'>
        //      <strong className='font-[NeueMedium]' >  Customer Service </strong> 
        //      <br />
        //    <a className='' href='mailto:csteam.unionliving@gmail.com' > csteam.unionliving@gmail.com</a>
        //     <br /> 
        //     <strong className='font-[NeueMedium]' >  General Enquiry </strong> 
        //     <br />
        //     <a className='' href='mailto:info@unionliving.in' > info@unionliving.in </a>
        //         </p>
        //        <h3 className='font-[NeueRegular] py-2'>+919137915406</h3>

        //     </div>
        // </div>
        // <div className='md:grid grid-cols-7 mt-6  grid-flow-col'>
        //     <div className='col-span-1' ></div>
        //     <div className='col-span-5 flex items-center justify-center' >
        //         <h3 className='font-[NeueRegular]' >2024 Union Living. All right reserved</h3>
        //     </div>
        //     <div className='col-span-1 flex items-center md:ml-[-25px] justify-center md:justify-start gap-3' >
        //        <a target='_blank' rel='noreferrer' href='https://www.instagram.com/union_living/?hl=en'> <PiInstagramLogo className='text-[25px]' /></a>

        //         <a target='_blank' rel='noreferrer' href='https://www.youtube.com/@unioncoliving'>  <PiYoutubeLogo className='text-[25px]' /> </a>
        //     </div>
        // </div>
        //     </div>
        <div className='flex flex-col w-full bg-[#D9D9D9]'>
            <div className='flex p-6 justify-between  items-center lg:flex-row flex-col gap-10 '>
                <div className=''>
                    <h2 className='lg:text-[32px] text-[20px] text-[#484848]'>Different Clothing</h2>
                </div>
                <div className='flex justify-between lg:gap-[60px] items-center lg:flex-row flex-col'>
                    <Link className='lg:text-[26px] text-[#8A8A8A]' href="/">
                        Home
                    </Link>
                    <Link className='lg:text-[26px] text-[#8A8A8A]' href="/">
                        Shop
                    </Link>
                    <Link className='lg:text-[26px] text-[#8A8A8A]' href="/">
                        About
                    </Link>

                    <Link className='lg:text-[26px] text-[#8A8A8A]' href="/">
                        Contact Us
                    </Link>
                </div>
            </div>
            <div className='text-[#8A8A8A] text-[12px] text-center p-5'>
                <p>Copyright © 2022 Diff Clothing . All Rights Reseved.</p>
            </div>
        </div>
    )
}

export default Footer