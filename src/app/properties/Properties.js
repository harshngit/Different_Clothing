"use client"
import Footer from '@/components/Layout/Footer'
import NavbarTwo from '@/components/Layout/Navbar'
import PropertiesList from '@/components/Properties/PropertiesList'
import { ThemeProvider } from '@material-tailwind/react'
import React, { Suspense } from 'react'

const PropertiesPage = () => {
  return (
    <div>
      <ThemeProvider>
        <NavbarTwo />
        <div className='lg:pt-[120px] pt-[60px]'>
        <div className='lg:px-12 px-4 lg:pb-12 pb-4' >
        <div className='lg:grid grid-cols-4 items-center grid-flow-col' >
            <div className='col-span-3' >
                <h1 className='font-[NeueBold] text-[1.4rem] lg:text-[2.8rem]' >Explore Our Premium Coliving Properties.</h1>
               
            </div>
                
        </div>
    </div>
        <PropertiesList />
       
        <Footer />
        </div>
        </ThemeProvider>
    </div>
  )
}

export default PropertiesPage