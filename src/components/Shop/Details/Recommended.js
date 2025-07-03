import { loadWishlistFromStorage, toggleWishlistItem } from '@/actions/wishlistActions'
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
			<div className="grid grid-cols-2 md:grid-cols-4 gap-y-[50px] mb-10">
				{product.slice(0, 4).map((product) => (
					<Link href={`shop/${product.id}`}>
						<div key={product.id} className="bg-white overflow-hidden group">
							<div className="relative">
								{/* Product Image (Hover effect) */}
								<div >
									<img
										src={product.productImages?.[0]} // main image
										alt={product.title}
										className="w-full lg:h-[400px] object-cover transition-opacity duration-300 group-hover:opacity-0"
									/>

									<img
										src={product.productImages?.[1]} // hover image
										alt={`${product.title} hover`}
										className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
									/>

								</div>
							</div>

							{/* Product Info */}
							<div className="p-3 flex justify-between items-start">
								<div className='flex flex-col gap-2 justify-start items-start'>
									<div>
										<p className='text-black lg:text-[15px] text-[10px]'>{product?.productCategory}</p>
										<Link href={`shop/${product.id}`}><h3 className="lg:text-[20px] text-[12px] font-semibold">{product.productName}</h3></Link>
										<p className="text-gray-700 font-bold lg:-text-[15px] text-[12px]">${product.productPrice}</p>
									</div>
									{
										product.variation.map((item) => (
											<div className="flex justify-center items-center gap-2">
												<div className={`w-5 h-5 rounded-full border border-black`} style={{ backgroundColor: item.color }}></div>
											</div>
										))
									}
								</div>
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
			<ToastContainer position="bottom-left" />
		</div>
	)
}

export default Recommended