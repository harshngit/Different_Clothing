"use client"
import BlogList from '@/components/Blogs/BlogList'
import Footer from '@/components/Layout/Footer'
import NavbarTwo from '@/components/Layout/Navbar'
import { ThemeProvider } from '@material-tailwind/react'
import React from 'react'

const BlogsPage = () => {
  return (
    <div>
          <ThemeProvider>
        <NavbarTwo />
        <div className='lg:pt-[120px] pt-[60px]'>
            <BlogList />
            <Footer />
        </div>
        </ThemeProvider>
    </div>
  )
}

export default BlogsPage