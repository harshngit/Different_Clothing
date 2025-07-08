"use client";
import React, { useState, useMemo } from "react";
import { FaPlayCircle } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const ProductMediaGrid = ({ productDetails }) => {
	const productImages = productDetails?.productImages || [];
	const variationImages = productDetails?.variation?.map(v => v.img) || [];
	const productVideo = productDetails?.productVideo || "";
	const allImages = [...productImages, ...variationImages];
	const allMedia = productVideo ? [...allImages, productVideo] : allImages;

	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const isVideo = (file) => {
		const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
		return videoExtensions.some(ext => file?.toLowerCase().includes(ext));
	};

	const slides = useMemo(() => {
		return allMedia.map(media =>
			isVideo(media)
				? {
					type: "video",
					width: 1280,
					height: 720,
					sources: [{ src: media, type: "video/mp4" }]
				}
				: {
					src: media,
					width: 1600,
					height: 1000
				}
		);
	}, [allMedia]);

	const handleImageClick = (index) => {
		setCurrentIndex(index);
		setOpen(true);
	};

	return (
		<div>
			{/* Grid View */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
				{allMedia.map((media, index) => (
					<div
						key={index}
						onClick={() => handleImageClick(index)}
						className="relative w-full aspect-square cursor-pointer"
					>
						{isVideo(media) ? (
							<>
								<video src={media} className="w-full h-full object-cover" muted />
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

			{/* Lightbox */}
			<Lightbox
				open={open}
				index={currentIndex}
				close={() => setOpen(false)}
				slides={slides}
				plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
			/>
		</div>
	);
};

export default ProductMediaGrid;
