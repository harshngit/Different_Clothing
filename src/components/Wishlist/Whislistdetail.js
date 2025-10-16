// components/Wishlist/Whislistdetail.js
"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadWishlistFromStorage, toggleWishlistItem } from '@/actions/wishlistActions';
import Link from 'next/link';
// toast removed
import { Button } from '@material-tailwind/react';

const Whislistdetail = () => {
	const dispatch = useDispatch();
	const { userProfile } = useSelector((state) => state.user);
	const userId = userProfile?.uid;

	const wishlist = useSelector((state) => state.wishlist.wishlist || {});
	const userWishlist = wishlist?.[userId] || [];

	// ✅ Hooks should always be called
	useEffect(() => {
		dispatch(loadWishlistFromStorage());
	}, [dispatch]);

	const handleToggle = (product) => {
		dispatch(toggleWishlistItem(userId, product));

		const isInWishlist = wishlist?.[userId]?.some(p => p.id === product.id);
    // optionally show inline indicator (toast removed)
	};

	const isLiked = (productId) => wishlist?.[userId]?.some(p => p.id === productId);

	// ✅ Safe to return after hooks
	if (!userId || userWishlist.length === 0) {
		return <div className="text-center h-[500px] flex justify-center gap-2 items-center flex-col">
			<h2 className='text-black text-[2rem]'> Your Wishlist is empty</h2>
			<Link href={"/shop"}>
				<button className='h-[45px] bg-black hover:bg-gray-800 text-white px-2 py-2'>EXPLORE MORE</button>
			</Link>
		</div>;
	}
	return (
		<div className="px-5 lg:px-10">
			<h2 className="text-[28px] font-semibold mb-6">Your Wishlist</h2>
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{userWishlist.map((product) => (
					<Link key={product.id} href={`shop/${product.id}`}>
						<div className="bg-white overflow-hidden group">
							<div className="relative">
								<img
									src={product.productImages?.[0]}
									alt={product.title}
									className="w-full lg:h-[400px] object-cover transition-opacity duration-300 group-hover:opacity-0"
								/>
								{product.productImages?.[1] ? (
									<img
										src={product.productImages[1]}
										alt={`${product.title} hover`}
										className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
									/>
								) : product.productVideo ? (
									<video
										src={product.productVideo}
										muted
										loop
										autoPlay
										playsInline
										className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
									/>
								) : null}
							</div>

							<div className="p-3 flex justify-between items-start">
								<div className='flex flex-col gap-2 justify-start items-start'>
									<p className='text-black lg:text-[15px] text-[10px]'>{product?.productCategory}</p>
									<h3 className="lg:text-[20px] capitalize text-[12px] font-semibold">{product.productName}</h3>
									<p className="text-gray-700 font-bold lg:text-[15px] text-[12px]">$₹{product?.productData?.[0]?.productPrice ?? ''}</p>

									<div className="flex gap-2 mt-1">
									{product.variation.map((item, index) => (
										<div
											key={index}
											className="w-5 h-5 border rounded-full border-black"
											style={{ backgroundColor: item.color }}
										/>
									))}
									{product.productData.map((item, index) => (
										<div
											key={index}
											className="w-5 h-5 border rounded-full border-black"
											style={{ backgroundColor: item.productColor }}
										/>
									))}
								</div>
								</div>

								{/* Wishlist Toggle */}
								<button
									onClick={(e) => {
										e.preventDefault();
										handleToggle(product);
									}}
								>
									<img
										src={isLiked(product.id) ? '/asset/heartred.png' : '/asset/heart.png'}
										alt="heart icon"
										className="w-6 h-6"
									/>
								</button>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Whislistdetail;
