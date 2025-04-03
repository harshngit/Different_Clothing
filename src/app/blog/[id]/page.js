

import { getSinglePost } from '@/app/firebasefunctions';
import BlogContentMain from './BlogContentMain'

export async function generateMetadata({ params }) {


  // Fetch the blog post data from Firebase
  const blogPost = await getSinglePost(params?.id);

  if (!blogPost) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  // Return dynamic metadata
  return {
    title: blogPost?.metatitle ? blogPost?.metatitle : blogPost?.name,
    description: blogPost?.introContent.slice(0, 120), // Use excerpt or truncate content
    openGraph: {
      title: blogPost?.metatitle ? blogPost?.metatitle : blogPost?.name,
      description: blogPost?.metadescription ? blogPost?.metadescription : blogPost?.introContent.slice(0, 120),
      images: blogPost.coverImage,
    },
    alternates: {
      canonical: `https://unionliving.in/blogs/${blogPost?.url}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: blogPost?.metatitle ? blogPost?.metatitle : blogPost?.name,
      description: blogPost?.metadescription ? blogPost?.metadescription : blogPost?.introContent.slice(0, 120),
      images: blogPost.coverImage,
    },
  };
}


const BlogContent = async ({ params }) => {


  // Fetch the blog post data again to pass to the client component
  const blogPost = await getSinglePost(params?.id);

  if (!blogPost) {
    return <div>Blog post not found</div>;
  }

  return (
    <div>

      <BlogContentMain blogContent={blogPost} />

    </div>
  )
}

export default BlogContent