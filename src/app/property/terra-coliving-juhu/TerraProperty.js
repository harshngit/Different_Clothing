"use client"
import Footer from '@/components/Layout/Footer'
import NavbarTwo from '@/components/Layout/Navbar'
import PropertiesList from '@/components/Properties/PropertiesList'
import Banner from '@/components/property/Banner'
import { ThemeProvider } from '@material-tailwind/react'
import React, { Suspense } from 'react'
import SouthsideMainImage from "../../../asset/terraImages/newImages/mainBanner.webp"
import SouthsideOneImage from "../../../asset/terraImages/newImages/1.webp"
import SouthsideTwoImage from "../../../asset/terraImages/newImages/new4.webp"
import SouthsideThreeImage from "../../../asset/terraImages/newImages/canteen.webp"
import SouthsideFourImage from "../../../asset/terraImages/newImages/new.webp"
import SouthsideQuadImage from "../../../asset/terraImages/newImages/quad.png"
import SouthsideTripleImage from "../../../asset/terraImages/newImages/triple.png"
import SouthsideTwinImage from "../../../asset/terraImages/newImages/twi.webp"
import SouthsidePrivateImage from "../../../asset/terraImages/newImages/pri.webp"
import Details from '@/components/property/Details'
import Featured from '@/components/property/Featured'
import Rooms from '@/components/property/Rooms'
import WhatSection from '@/components/property/WhatSection'
import Location from '@/components/property/Location'
import Event from '@/components/property/Event'
import TestimonialTwo from '@/components/Home/Testimonial.js'
import Roomstwo from '@/components/property/Roomstwo'
import BottomNavConstant from '@/components/property/BottomFixed'

const TerraProperty = () => {
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
          title:"Quad",
          description:"Spacious quad sharing room with modern amenities, high-speed Wi-Fi, and ample storage space.",
          image:SouthsideQuadImage
        },
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
       <Banner galleryImages={galleryImages} name="Terra: Luxurious Coliving PG in Juhu, Mumbai" location="Juhu" images={images} />
     <Details subtitle="Walking Distance from Juhu Colleges" title="Spacious Student Studio Rooms, Close to Action of Juhu." description="Welcome to Terra, your sunlit haven in the heart of Juhu. Experience the perfect blend of comfort and nature with our cozy, terrarium-inspired living spaces. Each room is bathed in natural light, creating a warm and inviting atmosphere. Terra offers a unique, eco-friendly environment that fosters a sense of tranquility and well-being, making it the ideal retreat for students seeking both comfort and inspiration." />
       <Featured />
       <Roomstwo brochure="https://firebasestorage.googleapis.com/v0/b/grc-logistics.appspot.com/o/files%2FCopy%20%20%20Terra%20by%20Union%20(1).pdf?alt=media&token=a7876f47-e86b-4c7c-a82e-293918a142d2" rooms={rooms} />
       <WhatSection youtube="https://youtu.be/4uAQ2Hr0ku8?si=U_Y4ypNcrFVEW4Ux" />
       <Location map="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15079.663821938235!2d72.8389376!3d19.1113426!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c93fc7fa60af%3A0x71920bbde6e70ed6!2sTerra%20by%20Union%20Living!5e0!3m2!1sen!2sin!4v1717177015017!5m2!1sen!2sin" youtube="https://www.youtube.com/embed/4uAQ2Hr0ku8?si=AQX1Z4zGZDYOM39w" />
       <Event />
      <TestimonialTwo />
      <BottomNavConstant name="Terra"  price="Rs. 45,000" youtube="https://www.youtube.com/watch?v=3euMGmLNcIc&embeds_referring_euri=http%3A%2F%2Flocalhost%3A3000%2F&source_ve_path=MjM4NTE&feature=emb_title" brochure="https://firebasestorage.googleapis.com/v0/b/grc-logistics.appspot.com/o/files%2FCopy%20%20%20Terra%20by%20Union%20(1).pdf?alt=media&token=a7876f47-e86b-4c7c-a82e-293918a142d2"  />
        <Footer />
        </div>
        </ThemeProvider>
    </div>
  )
}

export default TerraProperty