'use client';
import { loadWishlistFromStorage, toggleWishlistItem } from '@/actions/wishlistActions';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';

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
			// toast.success('Product added to wishlist', { autoClose: 1500 });
		} else {
			// toast.info('Product removed from wishlist', { autoClose: 1500 });
		}
	};

	const isLiked = (productId) => wishlist?.[userId]?.some((p) => p.id === productId);

	const productsToShow = visibleProducts || product || [];

	console.log(visibleProducts)

	return (
		<div
			className={`grid transition-all duration-300 ease-in-out 
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
								src={product?.productImages?.[0]}
								alt={product.title}
								className={`w-full transition-all duration-300 ease-in-out 
									${gridView === 'two'
										? 'lg:h-[550px] h-[200px] lg:object-fill lg:w-[80%] object-fill'
										: 'h-[450px] object-fill'}
									opacity-100 group-hover:opacity-0
								`}
							/>

							{/* Hover Second Image */}
							{product?.productImages?.[1] ? (
								<img
									src={product?.productImages?.[1]}
									alt={`${product.title} hover`}
									className={`w-full absolute top-0 left-0 transition-opacity duration-300 ease-in-out 
										${gridView === 'two'
											? 'lg:h-[550px] h-[200px] lg:object-fill lg:w-[80%] object-fill'
											: 'h-[450px] object-fill'}
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
											? 'lg:h-[450px] h-[200px] lg:object-fill lg:w-[100%] object-fill'
											: 'h-[450px] object-fill'}
										opacity-0 group-hover:opacity-100
									`}
								/>
							) : null}

							{/* Size Hover Overlay */}
							{(product?.productData?.length > 0 || product?.variation?.length > 0) && (
								<div className="absolute bottom-0 left-0 w-full bg-white/70 text-black text-sm font-semibold flex justify-center items-center gap-3 py-2 transition-all duration-300 transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10">
									{/* Sizes from productData */}
									{product.productData?.map((item, index) => (
										<span key={`pd-${index}`}>{item.productSize}</span>
									))}

									{/* Sizes from variation */}
									{/* {product.variation?.flatMap((variant, idx) =>
										(variant.size || []).map((size, sIdx) => (
											<span key={`var-${idx}-${sIdx}`}>{size}</span>
										))
									)} */}
								</div>
							)}
						</div>

						{/* Product Info */}
						<div className="p-3 flex justify-between items-start">
							<div className="flex flex-col gap-[0px]">
							<p className="lg:text-[12px] text-[10px] font-semibold capitalize">
									{product.productCategory}
								</p>
								<h3 className="lg:text-[15px] text-[15px] font-semibold capitalize">
									{product.productName}
								</h3>
                                <p className="text-black font-bold lg:text-[16px] text-[18px]">
                                    ₹{product?.productData?.[0]?.productPrice ?? ''}
                                </p>

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

							<div className="flex-shrink-0 ml-2">
								{
									isAuthenticated ? (
										<button
											onClick={(e) => {
												e.preventDefault();
												handleToggle(product);
											}}
											className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
										>
											{isLiked(product.id) ? (
												<FaHeart className="w-6 h-6 text-red-500" />
											) : (
												<CiHeart className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors duration-200" />
											)}
										</button>
									) : (
										<Link href={"/login"}>
											<button
												onClick={(e) => {
													e.preventDefault();
													handleToggle(product);
												}}
												className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
											>
												{isLiked(product.id) ? (
													<FaHeart className="w-6 h-6 text-red-500" />
												) : (
													<CiHeart className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors duration-200" />
												)}
											</button>
										</Link>
									)
								}
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ProductCard;
