"use client"
import Footer from '@/components/Layout/Footer'
import NavbarTwo from '@/components/Layout/Navbar'
import PropertiesList from '@/components/Properties/PropertiesList'
import Banner from '@/components/property/Banner'
import { ThemeProvider } from '@material-tailwind/react'
import React, { Suspense } from 'react'
import SouthsideMainImage from "../../../asset/chapterImages/newImages/mainBanner.webp"
import SouthsideOneImage from "../../../asset/baysideImages/newImages/canteen.webp"
import SouthsideTwoImage from "../../../asset/chapterImages/newImages/chap1.webp"
import SouthsideThreeImage from "../../../asset/chapterImages/newImages/chap2.webp"
import SouthsideFourImage from "../../../asset/chapterImages/newImages/chap3.webp"
import SouthsideTripleImage from "../../../asset/chapterImages/newImages/triple.webp"
import SouthsideTwinImage from "../../../asset/chapterImages/newImages/twin.webp"
import SouthsidePrivateImage from "../../../asset/chapterImages/newImages/private.webp"
import Details from '@/components/property/Details'
import Featured from '@/components/property/Featured'
import Rooms from '@/components/property/Rooms'
import WhatSection from '@/components/property/WhatSection'
import Location from '@/components/property/Location'
import Event from '@/components/property/Event'
import TestimonialTwo from '@/components/Home/Testimonial.js'
import BottomNavConstant from '@/components/property/BottomFixed'

const Chapter1Property = () => {
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
            title:"Triple",
            description:"Comfortable triple sharing room with modern amenities, high-speed Wi-Fi, and ample storage space.",
            image:SouthsideTripleImage
          },
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
     <Banner galleryImages={galleryImages} name="Chapter 1 by Union Living: Luxury Coliving Spaces in CBD, Navi Mumbai" location="CBD Belapur" images={images} />
   <Details subtitle="Prime CoLiving in Navi Mumbai" title="Modern Amenities and a Thriving Community in CBD Belapur" description="Discover exceptional co-living in CBD Belapur with contemporary amenities, high-speed Wi-Fi, and an engaging community, ideal for professionals and students seeking comfort and connection." />
     <Featured />
     <Rooms rooms={rooms}  />
     <WhatSection />
     <Location map="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15088.784048897862!2d73.0302992!3d19.0110825!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3dde9c5be97%3A0xc877a9113d600ddc!2sChapter%201%20by%20Union%20Co-Living!5e0!3m2!1sen!2sin!4v1718741621357!5m2!1sen!2sin" />
     <Event />
    <TestimonialTwo />
    <BottomNavConstant name="Chapter 1"  price="Rs.28,000"  />
      <Footer />
      </div>
      </ThemeProvider>
  </div>
  )
}

export default Chapter1Property