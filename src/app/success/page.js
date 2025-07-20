"use client";

import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessComponent = () => {
	// const [counter, setCounter] = useState(10);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setCounter((prev) => prev - 1);
	// 	}, 1000);

	// 	return () => clearInterval(interval);
	// }, []);

	return (
		<div className="font-playfair">
			<Navbar />
			<div className="flex h-[50vh] flex-col justify-center items-center text-center">
				<FaCheckCircle className="text-green-600 text-6xl mb-4" />
				<h2 className="text-2xl font-semibold text-green-700">Registration Successful!</h2>
			</div>
			<Footer />
		</div>
	);
};

export default SuccessComponent;
