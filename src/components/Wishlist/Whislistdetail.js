// components/Wishlist/Whislistdetail.js
"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadWishlistFromStorage, toggleWishlistItem } from '@/actions/wishlistActions';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Whislistdetail = () => {
	const dispatch = useDispatch();
	const { userProfile } = useSelector((state) => state.user);
	const userId = userProfile?.uid;

	const wishlist = useSelector((state) => state.wishlist.wishlist || {});
	const userWishlist = wishlist?.[userId] || [];

	useEffect(() => {
		dispatch(loadWishlistFromStorage());
	}, [dispatch]);

	console.log(userWishlist)

	if (!userId || userWishlist.length === 0) {
		return <p className="text-center text-gray-500">Your wishlist is empty.</p>;
	}

	useEffect(() => {
		dispatch(loadWishlistFromStorage());
	}, [dispatch]);

	const handleToggle = (product) => {
		dispatch(toggleWishlistItem(userId, product));

		const isInWishlist = wishlist?.[userId]?.some(p => p.id === product.id);
		if (!isInWishlist) {
			toast.success("Product added to wishlist ❤️", { autoClose: 1500 });
		} else {
			toast.info("Product removed from wishlist 🤍", { autoClose: 1500 });
		}
	};

	const isLiked = (productId) => wishlist?.[userId]?.some(p => p.id === productId);

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
								<img
									src={product.productImages?.[1]}
									alt={`${product.title} hover`}
									className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
								/>
							</div>

							<div className="p-3 flex justify-between items-start">
								<div className='flex flex-col gap-2 justify-start items-start'>
									<p className='text-black lg:text-[15px] text-[10px]'>{product?.productCategory}</p>
									<h3 className="lg:text-[20px] text-[12px] font-semibold">{product.productName}</h3>
									<p className="text-gray-700 font-bold lg:-text-[15px] text-[12px]">${product.productPrice}</p>

									{product.variation.map((item, index) => (
										<div key={index} className="flex justify-center items-center gap-2">
											<div
												className="w-5 h-5 rounded-full border border-black"
												style={{ backgroundColor: item.color }}
											/>
										</div>
									))}
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
