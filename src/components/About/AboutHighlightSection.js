import React from 'react'
import Link from 'next/link'

const AboutHighlightSection = () => {
	return (
		<section className="w-full bg-[#fff] py-10 lg:py-16">
			<div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
				{/* Left: Large image with rating pill */}
				<div className="lg:col-span-5">
					<div className="relative rounded-2xl overflow-hidden bg-white shadow-sm">
						<img
							src="/asset/Home/abouthome1.png"
							alt="About visual"
							className="w-full h-[320px] lg:h-[420px] object-cover"
						/>
						<div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[12px] flex items-center gap-2 shadow">
							<span className="flex items-center gap-0.5 text-black">
								{/* simple 5 stars */}
								<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
							</span>
							<span className="text-gray-700 font-semibold">(5/5)</span>
						</div>
					</div>
				</div>

				{/* Center: Copy */}
				<div className="lg:col-span-5">
					<h2 className="text-3xl lg:text-5xl font-playfair text-[#2E2A27] leading-tight">
					The Art of Effortless
					</h2>
					<p className="mt-4 text-sm lg:text-base text-[#5A5754] leading-6">
					Embrace a new level of style with our collection of elevated basics, designed to exude subtle attitude and understated elegance. Crafted for versatility, each piece can be styled in countless ways, making it the perfect addition to your everyday wardrobe. Whether it's layered for warmth or worn solo for a chic, minimalist look, these essentials are built to be worn on repeat. Over time, they only get better, becoming more loved with each wear, while effortlessly keeping you ahead of the curve.
					</p>
					<Link
						href="/shop"
						className="inline-block mt-6 px-5 py-3 rounded-full border border-[#D8D2CB] bg-white text-[#2E2A27] text-sm hover:bg-[#f3efe9] transition"
					>
						Learn More
					</Link>
				</div>

				{/* Right: Small image */}
				<div className="lg:col-span-2">
					<div className="rounded-2xl overflow-hidden bg-white shadow-sm">
						<img
							src="/asset/Home/abouthome2.png"
							alt="Detail visual"
							className="w-full h-[220px] lg:h-[260px] object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutHighlightSection


