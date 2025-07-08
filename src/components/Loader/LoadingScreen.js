import React from 'react';
import Lottie from 'lottie-react';
import tshirtLoader from '../../../public/asset/loader/tshirtanimation.json'; // Update with your path

const LoadingScreen = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-white text-black">
			<div className="w-40 h-40 mb-4">
				<Lottie animationData={tshirtLoader} loop={true} />
			</div>
			<p className="text-lg font-medium tracking-wide">Loading your fit...</p>
		</div>
	);
};

export default LoadingScreen;
