import React from 'react'
import Link from 'next/link'

const ContactBannerSection = () => {
	return (
		<div className="relative w-full">
			<div
				className="w-full h-[220px] lg:h-[500px] bg-center bg-cover"
				style={{ backgroundImage: "url('/asset/Shop/shopbanner1.png')" }}
			/>
			<div className="absolute inset-0 bg-black/30" />
			<div className="absolute inset-0 flex flex-col items-center justify-center text-white">
				<h1 className="text-2xl lg:text-6xl uppercase font-playfair tracking-wide">Contact Us</h1>
				<div className="mt-2 text-xs lg:text-[15px]">
					<Link href="/" className="hover:underline">Home</Link>
					<span className="mx-2">&gt;</span>
					<span>Contact Us</span>
				</div>
			</div>
		</div>
	)
}

export default ContactBannerSection


