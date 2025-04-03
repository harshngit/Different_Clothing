"use client"
import Footer from '@/components/Layout/Footer'
import NavbarTwo from '@/components/Layout/Navbar'
import PropertiesList from '@/components/Properties/PropertiesList'
import Banner from '@/components/property/Banner'
import { ThemeProvider } from '@material-tailwind/react'
import React, { Suspense } from 'react'
import SouthsideMainImage from "../../../asset/housemate/1_1_11zon.webp"
import SouthsideOneImage from "../../../asset/baysideImages/newImages/canteen.webp"
import SouthsideTwoImage from "../../../asset/housemate/2_2_11zon.webp"
import SouthsideThreeImage from "../../../asset/housemate/3_3_11zon.webp"
import SouthsideFourImage from "../../../asset/housemate/4_4_11zon.webp"
import SouthsideFiveImage from "../../../asset/housemate/5_5_11zon.webp"
import SouthsideSixImage from "../../../asset/housemate/6_1_11zon.webp"
import SouthsideSevenImage from "../../../asset/housemate/7_2_11zon.webp"
import SouthsideEightImage from "../../../asset/housemate/8_3_11zon.webp"
import SouthsideNineImage from "../../../asset/housemate/9_4_11zon.webp"
import SouthsideTenImage from "../../../asset/housemate/10_5_11zon.webp"
import SouthsideElevenImage from "../../../asset/housemate/11_6_11zon.webp"
import SouthsideTwelveImage from "../../../asset/housemate/12_7_11zon.webp"
import SouthsideThirteenImage from "../../../asset/housemate/13_8_11zon.webp"
import SouthsideFourteenImage from "../../../asset/housemate/14_9_11zon.webp"
import SouthsideFifteenImage from "../../../asset/housemate/15_11zon.webp"
import SouthsideTwinImage from "../../../asset/housemate/twin.webp"
import SouthsidePrivateImage from "../../../asset/housemate/private.webp"
import Details from '@/components/property/Details'
import Featured from '@/components/property/Featured'
import Rooms from '@/components/property/Rooms'
import WhatSection from '@/components/property/WhatSection'
import Location from '@/components/property/Location'
import Event from '@/components/property/Event'
import TestimonialTwo from '@/components/Home/Testimonial.js'
import BottomNavConstant from '@/components/property/BottomFixed'

const HousemateProperty = () => {
    const images = [SouthsideMainImage,SouthsideOneImage,SouthsideTwoImage,SouthsideThreeImage,SouthsideFourImage,SouthsideFiveImage,SouthsideSixImage,SouthsideSevenImage,SouthsideEightImage,SouthsideNineImage,SouthsideTenImage,SouthsideElevenImage,SouthsideTwelveImage,SouthsideThirteenImage,SouthsideFourteenImage,SouthsideFifteenImage]
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
     <Banner galleryImages={galleryImages} name="Housemate: Best Coliving PG Spaces in Kharadi" location="Kharadi, Pune" images={images} />
   <Details subtitle="New & Spacious Coliving Spaces in Pune" title="Modern, Comfortable, and Affordable Shared Living for Housemates in Pune" description="Housemate by Union Living offers a fresh take on coliving in Pune with newly built, spacious accommodations designed for comfort and community. Perfectly suited for young professionals, students, and anyone seeking an affordable, vibrant living environment, Housemate blends modern amenities with a shared lifestyle. " />
     <Featured />
     <Rooms rooms={rooms}  />
     <WhatSection  />
     <Location map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.1914063280096!2d73.9445731!3d18.5654075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3ce43f61f57%3A0xc2f23b2846c9e109!2sHousemate%20Hotels%20%26%20Restaurant!5e0!3m2!1sen!2sin!4v1738178166872!5m2!1sen!2sin" />
     <Event />
    <TestimonialTwo />
    <BottomNavConstant name="Housemate"  price="Rs. 30,000" brochure="https://firebasestorage.googleapis.com/v0/b/grc-logistics.appspot.com/o/files%2FHousemate%20Hotels%20%26%20Restaurant.pdf?alt=media&token=6ef83b09-6a0f-47ed-930a-c147d6113188"  />
      <Footer />
      </div>
      </ThemeProvider>
  </div>
  )
}

export default HousemateProperty