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
import ProductsHome from '@/components/Home/ProductsHome.js'
import CTA from '@/components/Home/CTA.js'
import Footer from '@/components/Layout/Footer.js'
const Home = () => {
  return (
    <div className='relative'>
      {/* <ThemeProvider> */}
      <NavbarTwo />
      <section className="relative pt-[0px]">
        {/* Adjust padding to avoid navbar overlap */}
        <HomeBanner />
      </section>
      {/* lg:pt-[690px] xl:pt-[695px] pt-[600px] */}
      {/* Second Section Below */}
      <section className="relative 
       overflow-hidden">
        <AboutHome />
      </section>
      {/* Second Section Below */}
      <section className="relative  overflow-hidden">
        <Deal />
      </section>
      <section className='relative overflow-hidden'>
        <ProductsHome />
      </section>
      <section className='relative overflow-hidden'>
        <CTA />
      </section>
      <section className='relative overflow-hidden'>
        <Footer />
      </section>
      {/* <Footer /> */}
      {/* </ThemeProvider> */}
    </div>
  )
}

export default Home