"use client"
import Footer from '@/components/Layout/Footer'
import NavbarTwo from '@/components/Layout/Navbar'
import PropertiesList from '@/components/Properties/PropertiesList'
import Banner from '@/components/property/Banner'
import { ThemeProvider } from '@material-tailwind/react'
import React, { Suspense } from 'react'
import SouthsideMainImage from "../../../asset/southsideImage/newImages/mainBanner.webp"
import SouthsideOneImage from "../../../asset/southsideImage/newImages/canteen.webp"
import SouthsideTwoImage from "../../../asset/southsideImage/newImages/gym-min.webp"
import SouthsideThreeImage from "../../../asset/southsideImage/newImages/Untitled design - 2024-06-07T221841.049.webp"
import SouthsideFourImage from "../../../asset/southsideImage/newImages/forth.webp"
import SouthsideTwinImage from "../../../asset/southsideImage/newImages/twin.webp"
import SouthsidePrivateImage from "../../../asset/southsideImage/newImages/private.webp"
import Details from '@/components/property/Details'
import Featured from '@/components/property/Featured'
import Rooms from '@/components/property/Rooms'
import WhatSection from '@/components/property/WhatSection'
import Location from '@/components/property/Location'
import Event from '@/components/property/Event'
import TestimonialTwo from '@/components/Home/Testimonial.js'
import BottomNavConstant from '@/components/property/BottomFixed'

const SouthsideProperty = () => {
    const images = [SouthsideMainImage,SouthsideOneImage,SouthsideTwoImage,SouthsideThreeImage,SouthsideFourImage]
    const galleryImages=[
            
        {
            src: SouthsideMainImage,
            width: "100%",
            height: "100%",
          },
          {
            src: SouthsideOneImage,
            width: "100%",
            height: "100%",
          },
          {
            src: SouthsideTwoImage,
            width: "100%",
            height: "100%",
          },
          {
            src: SouthsideThreeImage,
            width: "100%",
            height: "100%",
          },
          {
            src: SouthsideFourImage,
            width: "100%",
            height: "100%",
          },
         
]
      const rooms = [
        {
          title:"Twin",
          description:"Cozy twin room with modern amenities, perfect for sharing and fostering community connections.",
          image:SouthsideTwinImage
        },
        {
          title:"Private",
          description:"Private room with en-suite bathroom, fully furnished, high-speed Wi-Fi, and regular housekeeping.",
          image:SouthsidePrivateImage
        },
      ]
  return (
    <div>
      <ThemeProvider>
        <NavbarTwo />
        <div className='lg:pt-[120px] pt-[60px]'>
       <Banner galleryImages={galleryImages} name="Southside: Premier CoLiving PG in Mahalaxmi, Mumbai" location="Mahalaxmi" images={images} />
     <Details subtitle="Mahalaxmi's Premier CoLiving Space" title="Discover a Lifestyle of Ease and Connection in Our Mahalaxmi CoLiving Space." description="Welcome to our co-living space in Mahalaxmi, a sanctuary where contemporary comfort meets a thriving community atmosphere. Situated in one of Mumbai’s most dynamic neighborhoods, our space offers an unparalleled living experience designed for modern urbanites. Whether you're a young professional, a digital nomad, or simply looking for a place that feels like home, we provide everything you need to live, work, and connect." />
       <Featured />
       <Rooms rooms={rooms} brochure="https://firebasestorage.googleapis.com/v0/b/grc-logistics.appspot.com/o/files%2FSouthside%20by%20Union%20Digital%20(2).pdf?alt=media&token=113cfd63-377c-4aa4-a362-01cdb240478a" />
       <WhatSection youtube="https://youtu.be/YukkDVVWgm0?si=OG8L4_vGW86mRxco" />
       <Location map="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15091.720798709732!2d72.8258839!3d18.9786898!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cfc462de8a1f%3A0x2a4ee6362fbea170!2sSouthside%20by%20Union%20Living!5e0!3m2!1sen!2sin!4v1714534828670!5m2!1sen!2sin" youtube="https://www.youtube.com/embed/YukkDVVWgm0?si=sp-H2rNbxc_dZbA4" />
       <Event />
      <TestimonialTwo />
      <BottomNavConstant name="Southside"  price="Rs. 49,999" youtube="https://youtu.be/YukkDVVWgm0?si=OG8L4_vGW86mRxco" brochure="https://firebasestorage.googleapis.com/v0/b/grc-logistics.appspot.com/o/files%2FSouthside%20by%20Union%20Digital%20(2).pdf?alt=media&token=113cfd63-377c-4aa4-a362-01cdb240478a"  />
        <Footer />
        </div>
        </ThemeProvider>
    </div>
  )
}

export default SouthsideProperty