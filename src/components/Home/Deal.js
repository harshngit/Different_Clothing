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
import ProductCard from '../ProductCard';

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

	const product = productList

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
			<ProductCard isLiked={isLiked} product={product.slice(0, 4)} handleToggle={handleToggle} />

			{/* Toast Message */}
			<ToastContainer position="bottom-left" />
		</div>
	);
};

export default Deal;
