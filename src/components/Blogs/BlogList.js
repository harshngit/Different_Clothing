import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../app/firebase.config'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const BlogList = () => {
    const [blogs, setBlogs] = useState([])
    console.log(blogs)
    const fetchAllProperties = async () =>{
      const q = query(collection(db, "blogs"),orderBy("createdAt","desc")) 
        const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
          
          setBlogs((prev)=>[...prev,{
            id:doc.id,
            ...doc.data()
           }])
       
         });
    }
    useEffect(() => {
       fetchAllProperties()
    }, [])
  
  return (
    <div  className='my-12 mx-12 xl:mx-6  ' >
    <h1   className='font-[NeueBold] text-5xl  text-[#272727] text-center  ' >Welcome to the Union Living Blog    </h1> 
     {blogs.length === 0 ? 
     (
      <div>
        <h5 className='text-gray-500 text-center my-16 text-[1.5rem]' >No Blogs Yet</h5>
      </div>
     )
     
      : (<div className='lg:grid grid-cols-3 grid-flow-row gap-6 my-6 xl:my-16 xl:mx-4  ' >
        {blogs && blogs.map((blog)=>(
          <>
           <Link href={`/blog/${blog.url}`} >
            <div className='xl:w-[350px] 2xl:w-[400px] w-full xl:mx-8 xl:my-8 my-8 mx-3 ' >
              {blog.coverImage &&  <img className='rounded-lg w-full ' src={blog.coverImage} alt="" />}
          <h3  className='mt-3 font-[NeueMedium] xl:text-[1.6rem]  text-[1.1rem]  ' >{blog?.name}</h3>
          {blog?.introContent &&  <p className='text-[0.8rem] font-[NeueRegular]' > {blog?.introContent.slice(0,120)}<span className='font-[500]' >...read more</span></p>}
            </div>
            </Link> 
            </>
        ))}
      </div>)}
</div>
  )
}

export default BlogList