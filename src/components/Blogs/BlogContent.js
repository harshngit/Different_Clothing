import React from 'react'
import parse from 'html-react-parser';
const SingleBlogContent = ({blogContent}) => {
  
  return (
    <div className='mx-3 my-12 xl:mx-36 xl:my-16 ' >
        <div className='flex items-start justify-start flex-col ' >
          
           <img className=' w-full rounded-xl ' src={blogContent?.bannerImage} alt={blogContent?.imagealt ? blogContent?.imagealt : blogContent.name} />
         
          <div className='border-[1px] rounded-xl border-[#d0d0d0] mt-6  w-[100%] px-4 py-3 lg:px-12 lg:py-12  ' >
          {blogContent?.name && <h1  className='text-left font-[NeueBold] text-[#3c3c3c] my-6 text-[1.5rem] lg:text-[2.5rem] ' >{blogContent?.name} </h1>}
         {blogContent?.subTitle && <h2 className='mb-2 font-[NeueMedium] text-[1.3rem]'>{blogContent?.subTitle}</h2>}
       <p className='' >
        {parse(blogContent?.contentOne)}
        </p>
       {blogContent?.imageOne && <img className='my-4' src={blogContent?.imageOne} />}
       <p className='' >
        {blogContent?.contentTwo && parse(blogContent?.contentTwo)}
        </p>
          </div>
        </div>
    </div>
  )
}

export default SingleBlogContent