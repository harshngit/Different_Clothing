"use client";

import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessComponent = () => {
	const [counter, setCounter] = useState(10);

	useEffect(() => {
		const interval = setInterval(() => {
			setCounter((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex flex-col justify-center items-center text-center">
			<FaCheckCircle className="text-green-600 text-6xl mb-4" />
			<h2 className="text-2xl font-semibold text-green-700">Registration Successful!</h2>
			<p className="text-gray-600 mt-2">Redirecting to login in {counter} seconds...</p>
		</div>
	);
};

export default SuccessComponent;
