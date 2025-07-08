import { loadWishlistFromStorage, toggleWishlistItem } from '@/actions/wishlistActions'
import ProductCard from '@/components/ProductCard'
import allProducts from '@/data/ProductData'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

const Recommended = ({ product }) => {
	const dispatch = useDispatch();
	const wishlist = useSelector((state) => state.wishlist.wishlist);

	const { userProfile } = useSelector((state) => state.user)
	const userId = userProfile?.uid;

	useEffect(() => {
		dispatch(loadWishlistFromStorage());
	}, [dispatch]);

	const handleToggle = (product) => {
		dispatch(toggleWishlistItem(userId, product));

		const isInWishlist = wishlist?.[userId]?.some(p => p.id === product.id);
		if (!isInWishlist) {
			toast.success("Product added to wishlist", { autoClose: 1500 });
		} else {
			toast.info("Product removed from wishlist", { autoClose: 1500 });
		}
	};

	const isLiked = (productId) => wishlist?.[userId]?.some(p => p.id === productId);
	return (
		<div className='w-full  '>
			<div className='flex justify-between items-center lg:px-5 px-5 py-5 lg:py-5'>
				<div className='flex justify-start items-center gap-5'>
					<h2 className='font-normal lg:text-[32px] text-[22px] text-[#484848]'> Recommended </h2>
					<Link href={"/shop"}>
						<div className='px-5 py-1 bg-[#D9D9D9] text-[#000000] lg:text-[24px] text-[15px]'>
							Show More +
						</div>
					</Link>
				</div>
				<div>
					<Link href="/shop" >
						<FaArrowRight className="text-black text-[30px]" />
					</Link>
				</div>
			</div>
			<div className='felx justify-start item-center  px-5 pb-5'>
				<p className='text-[#8c8c8c] text-[16px]'>Trending Now </p>
			</div>
			<ProductCard isLiked={isLiked} product={product.slice(0, 4)} handleToggle={handleToggle} />

			<ToastContainer position="bottom-left" />
		</div>
	)
}

export default Recommended