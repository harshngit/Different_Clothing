"use client"
import HomeBanner from '@/components/Home/HomeBanner.js'
import NavbarTwo from '../../components/Layout/Navbar.js'
import React from 'react'
import { Suspense } from 'react'
import Featured from '@/components/Home/Featured.js'
import Amenities from '@/components/Home/Amenities.js'
import Unite from '@/components/Home/Unite.js'
import LeftAndRight from '@/components/Home/LeftAndRight.js'
import TestimonialTwo from '@/components/Home/Testimonial.js'
import Footer from '@/components/Layout/Footer.js'
import Head from 'next/head.js'
import { ThemeProvider } from "@material-tailwind/react";
const Home = () => {
  return (
    <div>
      <ThemeProvider>
        <NavbarTwo />
        <div className='lg:pt-[120px] pt-[60px]'>
          {/* <Suspense fallback={<p>Loading video...</p>}>
            <HomeBanner />
          </Suspense>
          <Featured />
          <Amenities />
          <Unite />
          <LeftAndRight />
          <TestimonialTwo /> */}

          {/* <Footer /> */}
        </div>
      </ThemeProvider>
    </div>
  )
}

export default Home