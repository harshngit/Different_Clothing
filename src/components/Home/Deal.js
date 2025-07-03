"use client";

import React, { useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import CountdownTimer from './CountdownTimer';
import ImageSlider from './ImageSlider';
import SimpleSlider from './SimpleSwiper';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistItem, loadWishlistFromStorage } from '@/actions/wishlistActions';
import { toast, ToastContainer } from 'react-toastify';

const Deal = ({ productList = [] }) => {
	const dispatch = useDispatch();
	const wishlist = useSelector((state) => state.wishlist.wishlist);

	const { userProfile } = useSelector((state) => state.user)
	const userId = userProfile?.uid;
	console.log(productList)
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
		<div className='bg-white w-full lg:h-screen h-auto pt-10'>
			{/* Header */}
			<div className='lg:py-5 py-5 px-5 lg:px-10 flex justify-between items-center'>
				<h2 className='font-bold font-playfair lg:text-[32px] text-[18px]'>TRENDING NOW</h2>
				<Link href="/shop" className='font-normal group relative font-playfair lg:text-[20px] text-[15px]'>
					EXPLORE MORE
					<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
				</Link>
			</div>

			{/* Products Grid */}
			<div className="grid grid-cols-2 lg:grid-cols-4 font-playfair">
				{productList.map((product) => (
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

			{/* Toast Message */}
			<ToastContainer position="bottom-left" />
		</div>
	);
};

export default Deal;
