"use client"
import HomeBanner from '@/components/Home/HomeBanner.js'
import NavbarTwo from '../../components/Layout/Navbar.js'
import React from 'react'
import { Suspense } from 'react'
import Head from 'next/head.js'
import '../../components/Home/Home.css'
import { ThemeProvider } from "@material-tailwind/react";
import AboutHome from '@/components/Home/AboutHome.js'
import Deal from '@/components/Home/Deal.js'
const Home = () => {
  return (
    <div className='relative'>
      {/* <ThemeProvider> */}
      <NavbarTwo />
      <section className="relative pt-[0px]">
        {/* Adjust padding to avoid navbar overlap */}
        <HomeBanner />
      </section>

      {/* Second Section Below */}
      <section className="relative lg:pt-[690px] pt-[600px] overflow-hidden">
        <AboutHome />
      </section>
      {/* Second Section Below */}
      <section className="relative  overflow-hidden">
        <Deal />
      </section>
      {/* <Featured />
          <Amenities />
          <Unite />
          <LeftAndRight />
          <TestimonialTwo /> */}

      {/* <Footer /> */}
      {/* </ThemeProvider> */}
    </div>
  )
}

export default Home