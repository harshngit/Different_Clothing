import { loadWishlistFromStorage, toggleWishlistItem } from '@/actions/wishlistActions';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProductCard = ({ visibleProducts, product }) => {
	const dispatch = useDispatch();
	const wishlist = useSelector((state) => state.wishlist.wishlist);
	const { userProfile } = useSelector((state) => state.user);
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
		<div className="grid grid-cols-2 md:grid-cols-4 gap-y-[20px] gap-x-2">
			{productsToShow.map((product) => (
				<Link key={product.id} href={`/shop/${product.id}`}>
					<div className="bg-white overflow-hidden ">
						{/* Product Image + Hover */}
						<div className="relative group">
							<img
								src={product.productImages?.[0]}
								alt={product.title}
								className="w-full lg:h-[450px] h-[250px] lg:object-cover object-fill transition-opacity duration-300 group-hover:opacity-0"
							/>
							{product.productImages?.[1] ? (
								<img
									src={product.productImages[1]}
									alt={`${product.title} hover`}
									className="w-full lg:h-[450px] h-[250px] lg:object-cover object-fill absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
								/>
							) : product.productVideo ? (
								<video
									src={product.productVideo}
									muted
									loop
									autoPlay
									playsInline
									className="w-full lg:h-[450px] h-[250px] lg:object-cover object-fill absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
								/>
							) : null}
						</div>

						{/* Product Info + Wishlist */}
						<div className="p-3 flex justify-between items-start">
							<div className="flex flex-col gap-[5px]">
								{/* <p className="text-black lg:text-[15px] text-[10px]">
									{product?.productCategory}
								</p> */}
								<h3 className="lg:text-[20px] text-[15px] font-semibold">
									{product.productName}
								</h3>
								<p className="text-gray-700 font-bold lg:text-[15px] text-[15px]">
									${product.productPrice}
								</p>

								<div className="flex gap-2">
									{product.variation.map((item, index) => (
										<div
											key={index}
											className="w-5 h-5 border border-black"
											style={{ backgroundColor: item.color }}
										/>
									))}
								</div>
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
	);
};

export default ProductCard;
