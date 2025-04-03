"use client"
import Category from '@/components/Community/Category'
import CommunityBanner from '@/components/Community/CommunityBanner'
import EventGallery from '@/components/Community/EventGallery'
import UpcomingEvents from '@/components/Community/UpcomingEvents'
import Footer from '@/components/Layout/Footer'
import NavbarTwo from '@/components/Layout/Navbar'
import { ThemeProvider } from '@material-tailwind/react'
import React from 'react'

const CommunityPage = () => {
  return (
    <div>
       <ThemeProvider>
        <NavbarTwo />
        <div className='lg:pt-[120px] pt-[60px]'>
        <CommunityBanner />
      {/* <UpcomingEvents /> */}
       <Category />
       <EventGallery />
        <Footer />
        </div>
        </ThemeProvider>
    </div>
  )
}

export default CommunityPage