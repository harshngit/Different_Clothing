"use client"
import Footer from '@/components/Layout/Footer'
import NavbarTwo from '@/components/Layout/Navbar'
import PropertiesList from '@/components/Properties/PropertiesList'
import Banner from '@/components/property/Banner'
import { ThemeProvider } from '@material-tailwind/react'
import React, { Suspense } from 'react'
import SouthsideMainImage from "../../../asset/casa/newImages/mainBanner.webp"
import SouthsideOneImage from "../../../asset/casa/newImages/canteen.webp"
import SouthsideTwoImage from "../../../asset/casa/newImages/casa1.webp"
import SouthsideThreeImage from "../../../asset/casa/newImages/casa3.webp"
import SouthsideFourImage from "../../../asset/casa/newImages/WhatsApp Image 2024-07-30 at 13.10.41.jpeg"
import SouthsideTripleImage from "../../../asset/casa/newImages/triple.webp"
import SouthsideTwinImage from "../../../asset/casa/newImages/twin.webp"
import SouthsidePrivateImage from "../../../asset/casa/newImages/private.webp"
import Details from '@/components/property/Details'
import Featured from '@/components/property/Featured'
import Rooms from '@/components/property/Rooms'
import WhatSection from '@/components/property/WhatSection'
import Location from '@/components/property/Location'
import Event from '@/components/property/Event'
import TestimonialTwo from '@/components/Home/Testimonial.js'
import BottomNavConstant from '@/components/property/BottomFixed'

const CasaProperty = () => {
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
       <Banner galleryImages={galleryImages} name="Casa: Perfect PG Coliving Space in Andheri East " location="Andheri East, Mumbai" images={images} />
     <Details subtitle="Co-Living Redefined in Andheri" title="Enjoy Premier Amenities and a Thriving Community in Andheri, Mumbai" description="Experience vibrant co-living in Andheri with modern amenities, high-speed Wi-Fi, and a welcoming community, perfect for professionals and students alike." />
       <Featured />
       <Rooms rooms={rooms} brochure="https://firebasestorage.googleapis.com/v0/b/grc-logistics.appspot.com/o/files%2FCASA%20by%20Union.pdf?alt=media&token=bb141ea8-23e8-490a-ba24-03cf70971d10" />
       <WhatSection youtube="https://www.youtube.com/watch?v=sP_tmYSOWPE" />
       <Location map="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15077.883075003392!2d72.8629156!3d19.1308596!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2c8a38409d307a53!2sCASA%20by%20Union%20Co-Living!5e0!3m2!1sen!2sin!4v1673692237980!5m2!1sen!2sin" youtube="https://www.youtube.com/embed/sP_tmYSOWPE?si=sp-H2rNbxc_dZbA4" />
       <Event />
      <TestimonialTwo />
      <BottomNavConstant name="Casa"  price="Rs. 35,000" youtube="https://www.youtube.com/watch?v=sP_tmYSOWPE" brochure="https://firebasestorage.googleapis.com/v0/b/grc-logistics.appspot.com/o/files%2FCASA%20by%20Union.pdf?alt=media&token=bb141ea8-23e8-490a-ba24-03cf70971d10"  />
        <Footer />
        </div>
        </ThemeProvider>
    </div>
  )
}

export default CasaProperty