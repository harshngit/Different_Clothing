"use client"
import Footer from '@/components/Layout/Footer'
import NavbarTwo from '@/components/Layout/Navbar'
import PropertiesList from '@/components/Properties/PropertiesList'
import Banner from '@/components/property/Banner'
import { ThemeProvider } from '@material-tailwind/react'
import React, { Suspense } from 'react'
import SouthsideMainImage from "../../../asset/baysideImages/newImages/BaysideOne.webp"
import SouthsideOneImage from "../../../asset/baysideImages/newImages/canteen.webp"
import SouthsideTwoImage from "../../../asset/baysideImages/newImages/BaysideTwo.webp"
import SouthsideThreeImage from "../../../asset/baysideImages/newImages/BaysideThree.webp"
import SouthsideFourImage from "../../../asset/baysideImages/newImages/BaysideFour.webp"
import SouthsideTwinImage from "../../../asset/baysideImages/newImages/twin.webp"
import SouthsidePrivateImage from "../../../asset/baysideImages/newImages/private.webp"
import Details from '@/components/property/Details'
import Featured from '@/components/property/Featured'
import Rooms from '@/components/property/Rooms'
import WhatSection from '@/components/property/WhatSection'
import Location from '@/components/property/Location'
import Event from '@/components/property/Event'
import TestimonialTwo from '@/components/Home/Testimonial.js'
import BottomNavConstant from '@/components/property/BottomFixed'

const BaysideProperty = () => {
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
     <Banner galleryImages={galleryImages} name="Bayside: Premium Coliving PG in Seawoods, Navi Mumbai" location="Seawoods, Navi Mumbai" images={images} />
   <Details subtitle="Exclusive CoLiving in Navi Mumbai" title="Experience Modern Amenities and a Vibrant Community in Seawoods, Navi Mumbai." description="Discover the perfect blend of comfort and community in Seawoods. Our co-living space offers modern amenities, high-speed Wi-Fi, and engaging events for an unparalleled living experience." />
     <Featured />
     <Rooms rooms={rooms}  />
     <WhatSection youtube="https://www.youtube.com/watch?v=pGugbtjs0ik" />
     <Location map="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15088.513519318227!2d73.0090248!3d19.0140638!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3712075aad084b0f!2sBayside%20by%20Union%20Co-Living!5e0!3m2!1sen!2sin!4v1673696674457!5m2!1sen!2sine" youtube="https://www.youtube.com/embed/pGugbtjs0ik?si=sp-H2rNbxc_dZbA4" />
     <Event />
    <TestimonialTwo />
    <BottomNavConstant name="Bayside"  price="Rs. 19,999" youtube="https://www.youtube.com/watch?v=pGugbtjs0ik"  />
      <Footer />
      </div>
      </ThemeProvider>
  </div>
  )
}

export default BaysideProperty