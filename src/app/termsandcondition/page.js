import Head from "next/head"
import Termsandconditionpage from "./Termsandconditionpage"
import { GoogleAnalytics } from "@next/third-parties/google"



export const metadata = {
  title: "Union Living Terms & Conditions | Co-Living in Mumbai - Rules & Policies",
  description: "Review the Terms & Conditions for Union Living's luxury co-living spaces in Mumbai. Stay informed about policies, rules, and guidelines for a comfortable living experience.",
  keywords: ['Union Living','Union Living Mumbai','Community Living in Mumbai', 'Community Living in Pune', 'Community Living in Thane','Community Living in Navi Mumbai', "Premium Co-living",'Best Community'],

  openGraph: {
    title: "Union Living Terms & Conditions | Co-Living in Mumbai - Rules & Policies",
  description: "Review the Terms & Conditions for Union Living's luxury co-living spaces in Mumbai. Stay informed about policies, rules, and guidelines for a comfortable living experience.",
    url: 'https://unionliving.in/termsandcondition/',
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
        alt: '',
      },
    ],
  
  },
  alternates: {
    canonical: 'https://unionliving.in/termsandcondition/',
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



const TermsandCondition = () => {
  return (
    <div>
       <Head>
      <meta name="robots" content="follow, index" />

      </Head>
      <Termsandconditionpage />
      <GoogleAnalytics gaId="G-RZN1HJ2RWE" />
    </div>
   
  )
}

export default TermsandCondition