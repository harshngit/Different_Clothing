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
        <div className='flex flex-col w-full bg-[#D9D9D9]'>
            <div className='flex p-6 justify-between  items-center lg:flex-row flex-col gap-10 '>
                <div className=''>
                    <h2 className='lg:text-[32px] text-[20px] text-[#484848]'>Different Clothing</h2>
                </div>
                <div className='flex justify-between lg:gap-[60px] items-center lg:flex-row flex-col'>
                    <Link className='lg:text-[26px] text-[#8A8A8A]' href="/">
                        Home
                    </Link>
                    <Link className='lg:text-[26px] text-[#8A8A8A]' href="/shop">
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