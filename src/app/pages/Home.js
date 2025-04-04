"use client"
import HomeBanner from '@/components/Home/HomeBanner.js'
import NavbarTwo from '../../components/Layout/Navbar.js'
import React from 'react'
import { Suspense } from 'react'
import Head from 'next/head.js'
import '../../components/Home/Home.css'
import { ThemeProvider } from "@material-tailwind/react";
const Home = () => {
  return (
    <div>
      <ThemeProvider>
        <NavbarTwo />
        <div className='relative lg:pt-[120px] pt-[60px]'>
          <HomeBanner />
          {/* <Featured />
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