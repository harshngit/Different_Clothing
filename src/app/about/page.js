'use client';

import Footer from '@/components/Layout/Footer';
import Navbar from '@/components/Layout/Navbar';
import AboutBannerSection from '@/components/About/AboutBannerSection';
import AboutHighlightSection from '@/components/About/AboutHighlightSection';
import AboutCollection from '@/components/About/AboutCollection';
import AboutPerks from '@/components/About/AboutPerks';

export default function AboutPage() {
	return (
		<div className='font-playfair'>
			<Navbar/>
			<AboutBannerSection/>
			<AboutHighlightSection/>
			<AboutCollection/>
			<AboutPerks/>
			<Footer/>
		</div>
	);
}


