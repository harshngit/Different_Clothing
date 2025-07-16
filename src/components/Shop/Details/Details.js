"use client";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { LuShare2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/actions/cartAction";
import { toast } from "react-toastify";
import { loadWishlistFromStorage, toggleWishlistItem } from "@/actions/wishlistActions";

const Details = ({ productDetails }) => {
	const dispatch = useDispatch();
	const variation = productDetails.variation || [];
	const defaultColor = productDetails.productColor || "";
	const defaultSizes = productDetails.productSize || [];

	const [selectedColor, setSelectedColor] = useState(defaultColor);
	const [selectedSize, setSelectedSize] = useState("");
	const [openIndex, setOpenIndex] = useState(null);

	const { userProfile } = useSelector((state) => state.user) || {};
	const { cartItems } = useSelector((state) => state.cart);
	const wishlist = useSelector((state) => state.wishlist.wishlist);
	const userId = userProfile?.uid;

	const allVariantColors = [...new Set(variation.map(v => v.color))];
	const allColors = [...new Set([defaultColor, ...allVariantColors])];

	useEffect(() => {
		dispatch(loadWishlistFromStorage());
	}, [dispatch]);

	// Auto set default size from productDetails
	useEffect(() => {
		if (!selectedSize) {
			setSelectedSize(defaultSizes[0] || "");
		}
	}, [defaultSizes]);

	// Update available sizes when color changes
	const sizesToShow = selectedColor === defaultColor
		? defaultSizes
		: variation.find(v => v.color.toLowerCase() === selectedColor.toLowerCase())?.size || [];

	const handleAddToCart = () => {
		if (!selectedSize || !selectedColor) {
			toast.error("Please select size and color");
			return;
		}

		const itemExists = cartItems?.some(
			item =>
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
			totalQuantity: productDetails.productQuantity,
			color: selectedColor,
			couponId: "",
			couponCode: "",
			discountAmount: "",
			couponAmountDetails: "",
		};

		dispatch(addToCart(cartItem));
		toast.success("Item added to cart!");
	};

	const handleToggleWishlist = () => {
		if (!userId) {
			toast.error("Please log in to use wishlist.");
			return;
		}
		dispatch(toggleWishlistItem(userId, productDetails));

		const isInWishlist = wishlist?.[userId]?.some(p => p.id === productDetails.id);
		if (!isInWishlist) {
			toast.success("Product added to wishlist", { autoClose: 1500 });
		} else {
			toast.info("Product removed from wishlist", { autoClose: 1500 });
		}
	};

	const isLiked = () =>
		wishlist?.[userId]?.some(p => p.id === productDetails.id);

	const toggleAccordion = index => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const infoSections = [
		{ title: "Description", content: productDetails.productDescription },
		{ title: "Materials", content: productDetails.productMaterial },
		{ title: "Delivery And Payment", content: productDetails.productDeliveryPayment },
	];

	return (
		<div className="px-5 py-5 w-full flex flex-col justify-start items-start gap-[10px]">
			{/* Title & Category */}
			<div className="w-full">
				<p className="font-thin text-[15px] text-[#000]">{productDetails.productCategory}</p>
				<h2 className="font-normal text-[25px] text-[#000]">{productDetails.productName}</h2>
			</div>

			{/* Price */}
			<h2 className="font-normal text-[20px] text-[#000]">
				₹{productDetails.productPrice}
			</h2>

			{/* Stock */}
			<p className="text-[#666666]">
				Only <span className="font-bold">{productDetails.productQuantity}</span> item(s) left in stock!
			</p>

			{/* Color Selection */}
			<div className="flex flex-col gap-2 mt-4 w-full">
				<div className="text-base font-medium">Select Color</div>
				<div className="flex flex-wrap gap-3">
					{allColors.map((color, idx) => (
						<div
							key={idx}
							onClick={() => {
								setSelectedColor(color);
								setSelectedSize("");
							}}
							className={`w-6 h-6 rounded-full border cursor-pointer ${selectedColor === color ? "ring-2 ring-black" : "border-black"}`}
							style={{ backgroundColor: color }}
						/>
					))}
				</div>
			</div>

			{/* Size Selection */}
			<div className="w-full mt-4">
				<div className="flex justify-between items-center mb-2">
					<div className="text-lg font-semibold">
						Size: <span className="font-normal">{selectedSize || "Select a size"}</span>
					</div>
					<a href="#" className="underline text-black text-sm hover:text-blue-600">Size Guide</a>
				</div>
				<div className="flex flex-wrap gap-3">
					{sizesToShow.length > 0 ? (
						sizesToShow.map((size, index) => (
							<button
								key={index}
								onClick={() => setSelectedSize(size)}
								className={`px-4 py-2 border rounded-md text-sm ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"} cursor-pointer border-black`}
							>
								{size}
							</button>
						))
					) : (
						<p className="text-gray-500 text-sm">No sizes available.</p>
					)}
				</div>
			</div>

			{/* Add to Cart & Wishlist */}
			<div className="w-full flex justify-start items-center mt-4">
				<div
					onClick={handleAddToCart}
					className="w-[90%] px-4 py-4 text-center bg-black text-white font-normal text-[18px] cursor-pointer"
				>
					Add to Cart
				</div>
				<button
					onClick={handleToggleWishlist}
					className="px-4 py-4 bg-white border border-black text-[18px]"
				>
					<img
						src={isLiked() ? "/asset/heartred.png" : "/asset/heart.png"}
						alt="heart"
						className="w-6 h-6"
					/>
				</button>
			</div>

			{/* Share */}
			<div className="flex gap-2 items-center cursor-pointer text-black mt-3">
				<LuShare2 className="text-[19px]" />
				<h3>Share</h3>
			</div>

			{/* Accordion Info */}
			<div className="w-full divide-y divide-gray-200 mt-4">
				{infoSections.map((item, index) => (
					<div key={index}>
						<button
							className="w-full flex justify-between items-center py-3 font-normal text-[18px] text-left"
							onClick={() => toggleAccordion(index)}
						>
							{item.title}
							<IoIosArrowDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
						</button>
						<div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
							<p className="py-2 text-gray-700">{(item?.content || "").replace(/<[^>]+>/g, "")}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Details;
