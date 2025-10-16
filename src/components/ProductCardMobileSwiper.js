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
							<div className="bg-white overflow-hidden">
								<div className="relative">
									<img
										src={product.productImages?.[0]}
										alt={product.title}
										className="w-full h-[250px] object-cover"
									/>

									{product.productImages?.[1] ? (
										<img
											src={product.productImages[1]}
											alt={`${product.title} hover`}
											className="w-full h-[250px] object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
										/>
									) : product.productVideo ? (
										<video
											src={product.productVideo}
											muted
											loop
											autoPlay
											playsInline
											className="w-full h-[250px] object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
										/>
									) : null}
								</div>

								<div className="p-3">
									<div className='flex  justify-between items-start'>
										<div className='flex-col flex  justify-between items-start'>
											<h3 className="text-sm font-semibold line-clamp-1">
												{product.productName}
											</h3>
											<p className="text-gray-700 font-bold text-sm">
												₹{product.productPrice}
											</p>

											<div className="flex gap-2 mt-1">
												{product.variation.map((item, index) => (
													<div
														key={index}
														className="w-4 h-4 border border-black"
														style={{ backgroundColor: item.color }}
													/>
												))}
											</div>
										</div>
										<div>
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
