'use client';
import { loadWishlistFromStorage, toggleWishlistItem } from '@/actions/wishlistActions';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProductCard = ({ visibleProducts, product, gridView }) => {
	const dispatch = useDispatch();
	const wishlist = useSelector((state) => state.wishlist.wishlist);
	const { userProfile, isAuthenticated } = useSelector((state) => state.user);
	const userId = userProfile?.uid;

	useEffect(() => {
		dispatch(loadWishlistFromStorage());
	}, [dispatch]);

	const handleToggle = (product) => {
		const isInWishlist = wishlist?.[userId]?.some((p) => p.id === product.id);
		dispatch(toggleWishlistItem(userId, product));

		if (!isInWishlist) {
			toast.success('Product added to wishlist', { autoClose: 1500 });
		} else {
			toast.info('Product removed from wishlist', { autoClose: 1500 });
		}
	};

	const isLiked = (productId) => wishlist?.[userId]?.some((p) => p.id === productId);

	const productsToShow = visibleProducts || product || [];

	return (
		<div
			className={`grid transition-all duration-300 ease-in-out gap-y-[20px] gap-x-4 px-4
				${gridView === 'two'
					? 'grid-cols-2'
					: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
				}`}
		>
			{productsToShow.map((product) => (
				<Link key={product.id} href={`/shop/${product.id}`}>
					<div className="bg-white overflow-hidden group transition-all duration-300 relative">
						{/* Product Image Box */}
						<div className="relative flex justify-center items-center">
							<img
								src={product.productImages?.[0]}
								alt={product.title}
								className={`w-full transition-all duration-300 ease-in-out 
									${gridView === 'two'
										? 'lg:h-[550px] h-[200px] lg:object-fill lg:w-[80%] object-fill'
										: 'h-[350px] object-fill'}
									opacity-100 group-hover:opacity-0
								`}
							/>

							{/* Hover Second Image */}
							{product.productImages?.[1] ? (
								<img
									src={product.productImages[1]}
									alt={`${product.title} hover`}
									className={`w-full absolute top-0 left-0 transition-opacity duration-300 ease-in-out 
										${gridView === 'two'
											? 'lg:h-[550px] h-[200px] lg:object-fill lg:w-[80%] object-fill'
											: 'h-[350px] object-fill'}
										opacity-0 group-hover:opacity-100
									`}
								/>
							) : product.productVideo ? (
								<video
									src={product.productVideo}
									muted
									loop
									autoPlay
									playsInline
									className={`w-full absolute top-0 left-0 transition-opacity duration-300 ease-in-out 
										${gridView === 'two'
											? 'lg:h-[550px] h-[200px] lg:object-fill lg:w-[100%] object-fill'
											: 'h-[350px] object-fill'}
										opacity-0 group-hover:opacity-100
									`}
								/>
							) : null}

							{/* Size Hover Overlay */}
							{product?.productData?.length > 0 && (
								<div className="absolute bottom-0 left-0 w-full bg-white/70 text-black text-sm font-semibold flex justify-center items-center gap-3 py-2 transition-all duration-300 transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10">
									{product.productData?.map((item, index) => (
										<span key={index}>{item.productSize}</span>
									))}
								</div>
							)}
						</div>

						{/* Product Info */}
						<div className="p-3 flex justify-between items-start">
							<div className="flex flex-col gap-[5px]">
								<h3 className="lg:text-[20px] text-[15px] font-semibold">
									{product.productName}
								</h3>
								{product?.productData?.map((item) => (
									<p className="text-gray-700 font-bold lg:text-[15px] text-[15px]">
										₹{item.productPrice}
									</p>
								))}

								<div className="flex gap-2 mt-1">
									{product.variation.map((item, index) => (
										<div
											key={index}
											className="w-5 h-5 border border-black"
											style={{ backgroundColor: item.color }}
										/>
									))}
									{product.productData.map((item, index) => (
										<div
											key={index}
											className="w-5 h-5 border border-black"
											style={{ backgroundColor: item.productColor }}
										/>
									))}
								</div>

							</div>

							{
								isAuthenticated ? (
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
								) : (
									<Link href={"/login"}>
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
									</Link>
								)
							}
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ProductCard;
