import React from 'react'
import Link from 'next/link'

const AboutBannerSection = () => {
	return (
		<div className="relative w-full">
			{/* Background image */}
			<div
				className="w-full h-[220px] lg:h-[500px] bg-center bg-cover"
				style={{ backgroundImage: "url('/asset/lastbanner.png')" }}
			/>
			{/* Overlay */}
			<div className="absolute inset-0 bg-black/30" />
			{/* Content */}
			<div className="absolute inset-0 flex flex-col items-center justify-center text-white">
				<h1 className="text-2xl lg:text-6xl uppercase font-playfair tracking-wide">About Us</h1>
				<div className="mt-2 text-xs lg:text-[15px]">
					<Link href="/" className="hover:underline">Home</Link>
					<span className="mx-2">&gt;</span>
					<span>About Us</span>
				</div>
			</div>
		</div>
	)
}

export default AboutBannerSection