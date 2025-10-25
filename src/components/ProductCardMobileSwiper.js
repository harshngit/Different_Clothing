'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadWishlistFromStorage, toggleWishlistItem } from '@/actions/wishlistActions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';

const ProductCardMobileSwiper = ({ visibleProducts, product }) => {
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

		// optionally show inline indicator (toast removed)
	};

	const isLiked = (productId) => wishlist?.[userId]?.some((p) => p.id === productId);

	const productsToShow = visibleProducts || product || [];

	return (
		<div className="w-full px-4 py-4">
			<Swiper
				modules={[Navigation, Autoplay]}
				spaceBetween={16}
				slidesPerView={1.1}
				navigation
				autoplay={{ delay: 2500 }}
				className="!px-2 swiper-deal"
			>
				{productsToShow.map((product) => (
					<SwiperSlide key={product.id}>
						<Link href={`/shop/${product.id}`} className="block">
							<div className="bg-white overflow-hidden group transition-all duration-300 relative">
								{/* Product Image Box */}
								<div className="relative flex justify-center items-center">
									<img
										src={product?.productImages?.[0]}
										alt={product.title}
										className="w-full h-[380px] object-fill opacity-100 group-hover:opacity-0 transition-all duration-300 ease-in-out"
									/>

									{/* Hover Second Image */}
									{product?.productImages?.[1] ? (
										<img
											src={product?.productImages?.[1]}
											alt={`${product.title} hover`}
											className="w-full h-[380px] object-fill absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
										/>
									) : product.productVideo ? (
										<video
											src={product.productVideo}
											muted
											loop
											autoPlay
											playsInline
											className="w-full h-[250px] object-fill absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
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
											{product.variation?.map((item, index) => (
												<div
													key={index}
													className="w-5 h-5 border rounded-full border-black"
													style={{ backgroundColor: item.color }}
												/>
											))}
											{product.productData?.map((item, index) => (
												<div
													key={index}
													className="w-5 h-5 border rounded-full border-black"
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
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ProductCardMobileSwiper;