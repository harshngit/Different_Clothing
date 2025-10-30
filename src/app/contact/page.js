'use client';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import ContactBannerSection from '@/components/Contact/ContactBannerSection';
import ContactForm from '@/components/Contact/ContactForm';

export default function ContactPage() {
	return (
		<div>
			<Navbar/>
			<ContactBannerSection/>
			<ContactForm/>
			<Footer/>
		</div>
	);
}
