import React, { useEffect, useState } from 'react';

const images = [
	'/asset/Home/collection1.png',
	'/asset/Home/collection5.png',
	'/asset/Home/collection2.png',
	'/asset/Home/collection3.png',
	'/asset/Home/collection4.png',
];

const SwiperCollection = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [prevIndex, setPrevIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setPrevIndex(activeIndex);
			setActiveIndex((prev) => (prev + 1) % images.length);
		}, 3000);
		return () => clearInterval(interval);
	}, [activeIndex]);

	const getPos = (index, base) => {
		const total = images.length;
		const middle = Math.floor(total / 2);
		let pos = index - base;
		if (pos < -middle) pos += total;
		if (pos > middle) pos -= total;
		return pos;
	};

	const getTransform = (index) => {
		const total = images.length;
		const middle = Math.floor(total / 2);

		const pos = getPos(index, activeIndex);
		const prevPos = getPos(index, prevIndex);

		const baseTranslate = 350;
		const translateX = pos * baseTranslate;

		// Scale logic
		let scale = 0.8;
		if (Math.abs(pos) === 0) scale = 0.5;
		else if (Math.abs(pos) === 1) scale = 0.7;

		// Size
		let height = '400px';
		let width = '400px';
		if (Math.abs(pos) === 0) {
			height = '400px';
			width = '400px';
		} else if (Math.abs(pos) === 1) {
			height = '350px';
			width = '350px';
		}

		// ❗ Hide image ONLY when it moves from pos === 2 → -2
		const isDisappearing = prevPos === 2 && pos === -2;

		return {
			transform: `translateX(${translateX}px) scale(${scale})`,
			zIndex: pos === 0 ? 50 : 20 - Math.abs(pos),
			opacity: isDisappearing ? 0 : 1,
			height,
			width,
			noTransition: isDisappearing,
		};
	};

	return (
		<div className="flex justify-center items-center w-[80%] mb-[300px]">
			<div className="relative w-full h-[200px] carousel-3d">
				{images.map((src, index) => {
					const styles = getTransform(index);
					return (
						<div
							key={index}
							className="absolute top-1/2 left-1/2"
							style={{
								transform: styles.transform,
								zIndex: styles.zIndex,
								opacity: styles.opacity,
								height: styles.height,
								width: styles.width,
								transformStyle: 'preserve-3d',
								transformOrigin: 'center center',
								top: '50%',
								left: '50%',
								transition: styles.noTransition ? 'none' : 'all 0.7s ease-in-out',
							}}
						>
							<img
								src={src}
								className="object-cover rounded-xl shadow-xl"
								style={{
									height: '100%',
									width: '100%',
									transition: styles.noTransition ? 'none' : 'height 0.7s ease-in-out',
								}}
								alt={`img-${index}`}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SwiperCollection;
