"use client";
import React, { useEffect, useState } from "react";
import { FaHeart, FaStar } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import { LuShare2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/actions/cartAction";
import { toast } from "react-toastify";

const Details = ({ rating = 4, total = 5, count = 3, productDetails }) => {
	const variation = productDetails.variation || [];

	const sizes = Array.from(
		new Set([
			...(variation?.map(v => v.size) || []),
			...(productDetails?.productSize ? [productDetails.productSize] : [])
		])
	);
	const colors = [...new Set(variation.map(v => v.color))] || [];

	const data = [
		{ title: "Description", content: productDetails.productDescription },
		{ title: "Materials", content: productDetails.productMaterial },
		{ title: "Delivery And Payment", content: productDetails.productDeliveryPayment },
	];

	const dispatch = useDispatch();
	const [timeLeft, setTimeLeft] = useState(5 * 60 + 59 + 47 / 100);
	const [selectedSize, setSelectedSize] = useState("");
	const [selectedColor, setSelectedColor] = useState("");
	const [openIndex, setOpenIndex] = useState(null);

	const { userProfile } = useSelector((state) => state.user) || {};
	const { cartItems } = useSelector((state) => state.cart);

	// Countdown timer
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => Math.max(prev - 0.01, 0));
		}, 10);
		return () => clearInterval(timer);
	}, []);

	// Default size & color selector
	useEffect(() => {
		if (sizes.length > 0 && !selectedSize) {
			setSelectedSize(sizes[0]);
		}
		if (colors.length > 0 && !selectedColor) {
			setSelectedColor(colors[0]);
		}
	}, [sizes, colors]);

	const toggle = (index) => {
		setOpenIndex(index === openIndex ? null : index);
	};

	const formatTime = (totalSeconds) => {
		const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
		const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
		const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, "0");
		return { hours, minutes, seconds };
	};

	const { hours, minutes, seconds } = formatTime(timeLeft);
	const fullStars = Math.floor(rating);
	const hasHalf = rating % 1 >= 0.5;
	const emptyStars = total - fullStars - (hasHalf ? 1 : 0);

	const selectedVariation = variation.find(
		(v) =>
			v.size === selectedSize &&
			v.color.toLowerCase() === selectedColor.toLowerCase()
	);

	const handleAddToCart = () => {
		if (!selectedSize || !selectedColor) {
			toast.error("Please select size and color");
		}

		const itemExists = cartItems?.some(
			(item) =>
				item.product === (productDetails._id || productDetails.id) &&
				item.size === selectedSize &&
				item.color === selectedColor
		);

		if (itemExists) {
			toast.success("This item is already in your cart.");
			return;
		}

		const cartItem = {
			user: userProfile,
			product: productDetails._id || productDetails.id,
			name: productDetails.productName,
			price: productDetails.productPrice,
			image: productDetails.productImages?.[0],
			size: selectedSize,
			quantity: 1,
			color: selectedColor,
			couponId: "",
			couponCode: "",
			discountAmount: "",
			couponAmountDetails: "",
		};

		dispatch(addToCart(cartItem));
		toast.success("Item added to cart!");
	};

	return (
		<div className='px-5 py-5 w-full flex flex-col justify-start items-start gap-5'>
			<div className='flex justify-between items-center w-full'>
				<p className='font-thin text-[15px] text-[#666666]'>{productDetails.productSku}</p>
				<FaHeart className='text-[#F24822] text-[25px]' />
			</div>

			<div className='w-full'>
				<h2 className='font-normal text-[25px] text-[#000]'>{productDetails.productName}</h2>
			</div>

			<div className='flex items-center gap-5 w-full'>
				<h2 className='font-normal text-[27px] text-[#000]'>
					₹{productDetails.productPrice}
					{selectedVariation && (
						<span className='text-[18px] text-[#442D2D] ml-3 line-through'>
							₹{selectedVariation.price}
						</span>
					)}
				</h2>
				<div className='bg-[#836953] rounded-xl text-[12px] text-white px-3 py-1'>SAVE 33%</div>
			</div>

			<div className='w-full bg-[#FDEFEE] border-2 border-[#F8CCCC] text-[#FF706B] px-5 py-5 flex justify-between text-[20px]'>
				<h3>Hurry up! Sale ends in:</h3>
				<div className='font-bold tracking-widest flex gap-2'>
					<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
				</div>
			</div>

			<div className='w-full'>
				<p className='text-[18px] text-[#666666]'>
					Only <span className="font-bold">{productDetails.productQuantity}</span> item(s) left in stock!
				</p>
			</div>

			{/* Size */}
			<div className="w-full">
				<div className="flex justify-between items-center mb-4">
					<div className="text-lg font-semibold">
						Size: <span className="font-normal">{selectedSize}</span>
					</div>
					<a href="#" className="underline font-medium text-black hover:text-blue-600">Size Guide</a>
				</div>
				<div className="flex gap-4 mb-6">
					{sizes.map((size) => (
						<button
							key={size}
							onClick={() => setSelectedSize(size)}
							className={`w-10 h-10 text-sm font-medium rounded border transition-all duration-150 ${selectedSize === size ? "bg-black text-white" : "bg-white text-black border-black hover:bg-gray-100"
								}`}
						>
							{size}
						</button>
					))}
				</div>

				{/* Color */}
				<div className="text-lg font-semibold mb-2">
					Color: <span className="font-normal">{selectedColor}</span>
				</div>
				<div className="flex gap-4">
					{colors.map((color) => {
						const isSelected = selectedColor.toLowerCase() === color.toLowerCase();
						return (
							<button
								key={color}
								onClick={() => setSelectedColor(color)}
								className="w-10 h-10 rounded-full border-2 transition-all duration-200"
								style={{
									backgroundColor: color,
									borderColor: isSelected ? "black" : "#ccc",
									boxShadow: isSelected ? "0 0 0 3px rgba(0,0,0,0.3)" : "none",
								}}
							/>
						);
					})}
				</div>
			</div>

			<div
				onClick={handleAddToCart}
				className="w-full px-4 py-4 text-center bg-black text-white font-normal text-[18px] cursor-pointer"
			>
				Add to Cart
			</div>

			{/* Rating */}
			<div className="flex items-center gap-1 text-black">
				{[...Array(fullStars)].map((_, i) => (
					<FaStar key={`full-${i}`} fill="black" className="w-4 h-4" />
				))}
				{hasHalf && <FaStar className="w-4 h-4 opacity-50" />}
				{[...Array(emptyStars)].map((_, i) => (
					<FaStar key={`empty-${i}`} className="w-4 h-4 opacity-20" />
				))}
				<span className="ml-1 text-sm font-medium">({count})</span>
			</div>

			{/* Share */}
			<div className="flex gap-2 items-center cursor-pointer text-black">
				<LuShare2 className="text-[19px]" />
				<h3>Share</h3>
			</div>

			{/* Accordion */}
			<div className="w-full divide-y divide-gray-200">
				{data.map((item, index) => (
					<div key={index}>
						<button
							className="w-full flex justify-between items-center py-3 font-normal text-[18px] text-left"
							onClick={() => toggle(index)}
						>
							{item.title}
							<IoIosArrowDown
								className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
							/>
						</button>
						<div
							className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
								}`}
						>
							<p className="py-2 text-gray-700">
								{(item?.content || '').replace(/<[^>]+>/g, '')}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Details;
