"use client";
import React, { useEffect, useState, useMemo } from "react";
import { FaPlayCircle } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LightBox = ({ productDetails }) => {
	const productImages = productDetails?.productImages || [];
	const variationImages = productDetails?.variation?.map(v => v.img) || [];
	const productVideo = productDetails?.productVideo || "";
	const allMedia = productVideo ? [...productImages, ...variationImages, productVideo] : [...productImages, ...variationImages];

	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		handleResize(); // initialize on mount
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const isVideo = (file) => {
		const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
		return videoExtensions.some(ext => file?.toLowerCase().includes(ext));
	};

	const getMimeType = (file) => {
		const ext = file?.split('.').pop()?.toLowerCase();
		const mimeTypes = {
			mp4: "video/mp4",
			webm: "video/webm",
			ogg: "video/ogg",
			mov: "video/quicktime",
		};
		return mimeTypes[ext] || "video/mp4";
	};

	const slides = useMemo(() => {
		return allMedia.map((media) =>
			isVideo(media)
				? {
					type: "video",
					width: 1280,
					height: 720,
					sources: [{ src: media, type: getMimeType(media) }],
				}
				: {
					type: "image",
					src: media,
					width: 1600,
					height: 1000,
				}
		);
	}, [allMedia]);

	const handleMediaClick = (index) => {
		setCurrentIndex(index);
		setOpen(true);
	};

	return (
		<>
			{isMobile ? (
				<Swiper
					spaceBetween={10}
					slidesPerView={1}
					modules={[Navigation, Pagination]}
					navigation
					pagination={{ clickable: true }}>
					{allMedia.map((media, index) => (
						<SwiperSlide key={index}>
							{isVideo(media) ? (
								<div className="relative w-full aspect-square">
									<video
										src={media}
										className="w-full h-[400px] object-fill"
										muted
										preload="metadata"
										controls
									/>
									<div className="absolute inset-0 flex items-center justify-center bg-black/30">
										<FaPlayCircle className="text-white w-8 h-8" />
									</div>
								</div>
							) : (
								<img
									src={media}
									alt={`Media ${index}`}
									className="w-full h-[400px] object-fill"
								/>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
						{allMedia.map((media, index) => (
							<div
								key={index}
								onClick={() => handleMediaClick(index)}
								className="relative w-full aspect-square cursor-pointer"
							>
								{isVideo(media) ? (
									<>
										<video
											src={media}
											className="w-full h-full object-cover"
											muted
											preload="metadata"
										/>
										<div className="absolute inset-0 flex items-center justify-center bg-black/30">
											<FaPlayCircle className="text-white w-8 h-8" />
										</div>
									</>
								) : (
									<img
										src={media}
										alt={`Media ${index}`}
										className="w-full h-full object-cover"
									/>
								)}
							</div>
						))}
					</div>

					<Lightbox
						open={open}
						close={() => setOpen(false)}
						index={currentIndex}
						slides={slides}
						plugins={[Captions, Fullscreen, Thumbnails, Video, Zoom]}
						styles={{
							container: { zIndex: 9999 },
						}}
					/>
				</>
			)}
		</>
	);
};

export default LightBox;
