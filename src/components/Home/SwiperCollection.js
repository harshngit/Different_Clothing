import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

const images = [
	'/asset/Home/abouthome1.png',
	'/asset/Home/abouthome1.png',
	'/asset/Home/abouthome1.png',
	'/asset/Home/abouthome1.png',
	'/asset/Home/abouthome1.png',
	'/asset/Home/abouthome1.png',
	'/asset/Home/abouthome1.png',
	'/asset/Home/abouthome1.png',
	'/asset/Home/abouthome1.png',
];

const SwiperCollection = () => {
	return (
		<div className="w-full h-screen bg-gray-900 flex items-center justify-center">
			<Swiper
				effect={'coverflow'}
				grabCursor={true}
				centeredSlides={true}
				slidesPerView={10}
				loop={true}
				coverflowEffect={{
					rotate: 50,    // Positive = sides tilt backwards
					stretch: -150, // Negative = tighter inward
					depth: 500,    // Same depth
					modifier: 3,   // Same strength
					slideShadows: false,
				}}
				pagination={{ clickable: true }}
				modules={[EffectCoverflow, Pagination]}
				className="w-full max-w-[1600px] h-[300px]"
			>
				{images.map((src, index) => (
					<SwiperSlide key={index} className="rounded-xl overflow-hidden">
						<img
							src={src}
							alt={`Slide ${index + 1}`}
							className="w-full h-full object-cover rounded-xl aspect-video"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>


	)
}

export default SwiperCollection