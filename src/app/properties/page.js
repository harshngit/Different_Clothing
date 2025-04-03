
import Head from 'next/head'
import PropertiesPage from './Properties'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  title: "Find Your Perfect Luxury Co-Living Space in Mumbai, Pune, and Navi Mumbai | Union Living",
  description: "Find luxurious co-living spaces in Mumbai, Pune, and Navi Mumbai with modern amenities. Fully furnished rooms, ideal for students and working professionals. Check our properties.",
  keywords: ['Union Living','Union Living Mumbai','Community Living in Mumbai', 'Community Living in Pune', 'Community Living in Thane','Community Living in Navi Mumbai', "Premium Co-living",'Best Community'],

  openGraph: {
    title: 'Find Your Perfect Luxury Co-Living Space in Mumbai, Pune, and Navi Mumbai | Union Living',
    description: 'Find luxurious co-living spaces in Mumbai, Pune, and Navi Mumbai with modern amenities. Fully furnished rooms, ideal for students and working professionals. Check our properties.',
    url: 'https://unionliving.in/properties/',
    siteName: 'Union Living',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/union-living.appspot.com/o/files%2Ffavicon.png?alt=media&token=63384a08-8830-4c2b-82b0-0355cf50bbff', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/union-living.appspot.com/o/files%2Ffavicon.png?alt=media&token=63384a08-8830-4c2b-82b0-0355cf50bbff', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
  
  },
  alternates: {
    canonical: 'https://unionliving.in/properties/',
  },
  
 
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/union-living.appspot.com/o/files%2Ffavicon.png?alt=media&token=63384a08-8830-4c2b-82b0-0355cf50bbff',
    shortcut: 'https://firebasestorage.googleapis.com/v0/b/union-living.appspot.com/o/files%2Ffavicon.png?alt=media&token=63384a08-8830-4c2b-82b0-0355cf50bbff',
    apple: 'https://firebasestorage.googleapis.com/v0/b/union-living.appspot.com/o/files%2Ffavicon.png?alt=media&token=63384a08-8830-4c2b-82b0-0355cf50bbff',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: 'https://firebasestorage.googleapis.com/v0/b/union-living.appspot.com/o/files%2Ffavicon.png?alt=media&token=63384a08-8830-4c2b-82b0-0355cf50bbff',
    },
  },
}

const Properties = () => {
  return (
    <>
    <Head>
    <meta name="robots" content="follow, index" />

    </Head>
    <PropertiesPage />
    <GoogleAnalytics gaId="G-RZN1HJ2RWE" />
    </>
   
  )
}

export default Properties