'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import FilterSidebar from '../Shop/FilterSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { loadWishlistFromStorage, toggleWishlistItem } from '@/actions/wishlistActions';
import { toast, ToastContainer } from 'react-toastify';


const ITEMS_PER_PAGE = 8;
const ProductGridFHER = ({ product }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const [filters, setFilters] = useState({
		priceRange: [500, 3000],
		sizes: [],
		colors: [],
		materials: [],
		categories: [],
	});

	const totalPages = Math.ceil(product.length / ITEMS_PER_PAGE);

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const visibleProducts = product.slice(startIndex, endIndex);

	const handlePageChange = (pageNum) => {
		setCurrentPage(pageNum);
		window.scrollTo({ top: 500, behavior: 'smooth' });
	};

	const handleApplyFilters = () => {
		setIsFilterOpen(false);
		// Add filtering logic here if needed
	};

	const handleResetFilters = () => {
		setFilters({
			priceRange: [500, 3000],
			sizes: [],
			colors: [],
			materials: [],
			categories: [],
		});
	};
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
		<div className="pb-5 overflow-hidden">
			{/* Filter Button */}
			<div className='flex justify-between px-5 items-center mb-10 w-[100%] lg:ml-[0.5rem]'>
				<div>
					<h2 className='font-normal font-600 lg:text-[32px]'>
						COLLECTION
					</h2>
				</div>
				<button
					className='bg-[#565449] text-white px-5 py-3'
					onClick={() => setIsFilterOpen(true)}
				>
					Filter
				</button>
			</div>

			{/* Sidebar */}
			<FilterSidebar
				isOpen={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				filters={filters}
				setFilters={setFilters}
				onApply={handleApplyFilters}
				onReset={handleResetFilters}
			/>

			{/* Grid */}
			{visibleProducts && visibleProducts.length > 0 ? (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-y-[50px] gap-x-4">
					{visibleProducts.map((product) => (
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
			) : (
				<div className="flex justify-center gap-[20px] flex-col items-center h-[200px]">
					<h2 className="text-gray-600 text-lg font-medium">No Collection Till Now</h2>
					<Link
						href="/shop"
						className='bg-[#000] text-white px-5 py-3'

					>
						Shop
					</Link>
				</div>
			)}


			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-2 mt-6 text-sm">
					{/* Previous Button */}
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className="w-8 h-8 flex items-center justify-center text-black disabled:opacity-40"
					>
						‹
					</button>

					{(() => {
						const pageNumbers = [];
						if (totalPages <= 7) {
							for (let i = 1; i <= totalPages; i++) {
								pageNumbers.push(i);
							}
						} else {
							pageNumbers.push(1);

							if (currentPage > 4) {
								pageNumbers.push('...');
							}

							const start = Math.max(2, currentPage - 1);
							const end = Math.min(totalPages - 1, currentPage + 1);

							for (let i = start; i <= end; i++) {
								pageNumbers.push(i);
							}

							if (currentPage < totalPages - 3) {
								pageNumbers.push('...');
							}

							pageNumbers.push(totalPages);
						}

						return pageNumbers.map((page, index) => (
							<button
								key={index}
								onClick={() => typeof page === 'number' && handlePageChange(page)}
								disabled={page === '...'}
								className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === page
									? 'bg-black text-white'
									: ' text-black'
									} ${page === '...' && 'cursor-default'}`}
							>
								{page}
							</button>
						));
					})()}

					{/* Next Button */}
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="w-8 h-8 flex items-center justify-center text-black disabled:opacity-40"
					>
						›
					</button>
				</div>
			)}
			<ToastContainer position="bottom-left" />
		</div>
	)
}

export default ProductGridFHER