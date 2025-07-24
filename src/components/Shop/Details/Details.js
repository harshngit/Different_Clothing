"use client";
import React, { useEffect, useState } from "react";
import { FaFacebookSquare, FaHeart, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "@/actions/cartAction";
import { loadWishlistFromStorage, toggleWishlistItem } from "@/actions/wishlistActions";

const Details = ({ productDetails }) => {
	const dispatch = useDispatch();
	const variation = productDetails.variation || [];
	const defaultColor = productDetails.productData?.[0]?.productColor || "";
	const defaultSizes = [productDetails.productData?.[0]?.productSize || ""];

	const [selectedColor, setSelectedColor] = useState(defaultColor);
	const [selectedSize, setSelectedSize] = useState("");
	const [openIndex, setOpenIndex] = useState(null);

	const { userProfile } = useSelector((state) => state.user) || {};
	const { cartItems } = useSelector((state) => state.cart);
	const wishlist = useSelector((state) => state.wishlist.wishlist);
	const userId = userProfile?.uid;

	const allVariantColors = [...new Set(variation.map((v) => v.color))];
	const allDefaultColors = [...new Set(productDetails.productData?.map((p) => p.productColor))];
	const allColors = [...new Set([...allDefaultColors, ...allVariantColors])];

	useEffect(() => {
		dispatch(loadWishlistFromStorage());
	}, [dispatch]);

	useEffect(() => {
		if (!selectedSize) {
			setSelectedSize(defaultSizes[0] || "");
		}
	}, [defaultSizes]);

	const sizesToShow =
		selectedColor === defaultColor
			? productDetails.productData
				?.filter((p) => p.productColor?.toLowerCase() === selectedColor?.toLowerCase())
				?.map((p) => p.productSize)
			: variation
				?.filter((v) => v.color?.toLowerCase() === selectedColor?.toLowerCase())
				?.flatMap((v) => v.size || []);

	const getVariantQuantity = () => {
		if (selectedColor === defaultColor) {
			const match = productDetails.productData?.find(
				(p) =>
					p.productColor?.toLowerCase() === selectedColor?.toLowerCase() &&
					p.productSize === selectedSize
			);
			return match?.productInventory ? parseInt(match.productInventory) : 0;
		}
		const match = variation.find(
			(v) =>
				v.color?.toLowerCase() === selectedColor?.toLowerCase() &&
				(v.size || []).includes(selectedSize)
		);
		return match?.quantity ?? 0;
	};

	const getSizeQuantity = (color, size) => {
		if (color === defaultColor) {
			const match = productDetails.productData?.find(
				(p) =>
					p.productColor?.toLowerCase() === color?.toLowerCase() &&
					p.productSize === size
			);
			return match?.productInventory ? parseInt(match.productInventory) : 0;
		}
		const match = variation.find(
			(v) =>
				v.color?.toLowerCase() === color?.toLowerCase() &&
				(v.size || []).includes(size)
		);
		return match?.quantity ?? 0;
	};

	const getSelectedPrice = () => {
		if (selectedColor === defaultColor) {
			const match = productDetails.productData?.find(
				(p) =>
					p.productColor === selectedColor &&
					p.productSize === selectedSize
			);
			return parseInt(match?.productPrice || productDetails.productPrice);
		}
		const match = variation?.find(
			(v) =>
				v.color === selectedColor &&
				v.size?.includes(selectedSize)
		);
		return parseInt(match?.price || productDetails.productPrice);
	};

	const variantQuantity = getVariantQuantity();
	const isSoldOut = variantQuantity <= 0;

	const handleAddToCart = () => {
		if (!selectedSize || !selectedColor) {
			toast.error("Please select size and color");
			return;
		}

		if (isSoldOut) {
			toast.error("Selected variant is out of stock");
			return;
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
			price: getSelectedPrice(),
			image: productDetails.productImages?.[0],
			size: selectedSize,
			quantity: 1,
			totalQuantity: variantQuantity,
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

		const isInWishlist = wishlist?.[userId]?.some((p) => p.id === productDetails.id);
		if (!isInWishlist) {
			toast.success("Product added to wishlist", { autoClose: 1500 });
		} else {
			toast.info("Product removed from wishlist", { autoClose: 1500 });
		}
	};

	const isLiked = () => wishlist?.[userId]?.some((p) => p.id === productDetails.id);
	const toggleAccordion = (index) => setOpenIndex(openIndex === index ? null : index);

	const infoSections = [
		{ title: "Description", content: productDetails.productDescription },
		{ title: "Materials", content: productDetails.productMaterial },
		{ title: "Delivery And Payment", content: productDetails.productDeliveryPayment },
	];

	const handleShare = (platform) => {
		const url = encodeURIComponent(window.location.href);
		const text = encodeURIComponent("Check this out product!");
		let shareUrl = "";

		switch (platform) {
			case "whatsapp":
				shareUrl = `https://wa.me/?text=${text}%20${url}`;
				break;
			case "facebook":
				shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
				break;
			case "twitter":
				shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
				break;
			case "instagram":
				navigator.clipboard.writeText(window.location.href);
				toast.success("Link copied!");
				return;
			default:
				return;
		}

		window.open(shareUrl, "_blank");
	};

	return (
		<div className="px-5 py-5 w-full flex flex-col justify-start items-start gap-[10px]">
			<div className="w-full">
				<p className="font-thin text-[15px] text-[#000]">{productDetails.productCategory}</p>
				<h2 className="font-normal text-[25px] text-[#000]">{productDetails.productName}</h2>
			</div>

			{
				selectedSize ? (
					<h2 className="font-normal text-[20px] text-[#000]">₹{getSelectedPrice()}</h2>
				) : (
					<p className="text-red-500 text-[16px] font-medium">Please select size</p>
				)
			}

			<p className="text-[#666666]">
				{isSoldOut ? (
					!selectedSize ? (
						<span className="text-red-500 font-semibold">Sold Out</span>
					) : (
						<span className="text-black font-medium">Please select a size</span>
					)
				) : (
					<>
						Only <span className="font-bold">{variantQuantity}</span> item(s) left in stock!
					</>
				)}
			</p>

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

			<div className="w-full mt-4">
				<div className="flex justify-between items-center mb-2">
					<div className="text-lg font-semibold">
						Size: <span className="font-normal">{selectedSize || "Select a size"}</span>
					</div>
					<a href="#" className="underline text-black text-sm hover:text-blue-600">
						Size Guide
					</a>
				</div>
				<div className="flex flex-wrap gap-3">
					{sizesToShow.length > 0 ? (
						sizesToShow.map((size, index) => {
							const qty = getSizeQuantity(selectedColor, size);
							const soldOut = qty <= 0;
							return (
								<button
									key={index}
									onClick={() => !soldOut && setSelectedSize(size)}
									disabled={soldOut}
									className={`px-4 py-2 border rounded-md text-sm ${selectedSize === size
										? 'bg-black text-white'
										: soldOut
											? 'bg-gray-200 text-gray-500 cursor-not-allowed'
											: 'bg-white text-black cursor-pointer'
										} border-black`}
								>
									{size} {soldOut && "(Sold Out)"}
								</button>
							);
						})
					) : (
						<p className="text-gray-500 text-sm">No sizes available.</p>
					)}
				</div>
			</div>

			<div className="w-full flex justify-start items-center mt-4">
				<button
					onClick={handleAddToCart}
					disabled={isSoldOut}
					className={`w-[90%] px-4 py-4 text-center font-normal text-[18px] ${isSoldOut ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black text-white cursor-pointer"}`}
				>
					{isSoldOut ? "Sold Out" : "Add to Cart"}
				</button>
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

			<div className="flex items-center gap-3 mt-4 text-black">
				<span className="font-medium">Share</span>
				<FaWhatsapp className="cursor-pointer text-[22px] hover:text-green-600" onClick={() => handleShare("whatsapp")} />
				<FaFacebookSquare className="cursor-pointer text-[22px] hover:text-blue-600" onClick={() => handleShare("facebook")} />
				<FaTwitter className="cursor-pointer text-[22px] hover:text-sky-500" onClick={() => handleShare("twitter")} />
				<FaInstagram className="cursor-pointer text-[22px] hover:text-pink-500" onClick={() => handleShare("instagram")} />
			</div>

			<div className="w-full lg:hidden block divide-y divide-gray-200 mt-4">
				{infoSections.map((item, index) => (
					<div key={index}>
						<button
							className="w-full flex justify-between items-center py-3 font-normal text-[18px] text-left"
							onClick={() => toggleAccordion(index)}
						>
							{item.title}
							<IoIosArrowDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
						</button>
						<div
							className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
						>
							<p className="py-2 text-gray-700">{(item?.content || "").replace(/<[^>]+>/g, "")}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Details;
