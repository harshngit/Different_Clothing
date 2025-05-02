'use client';
import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';

const allProducts = [
	{ id: 1, title: 'For Him', price: '$44', image: '/asset/shop/shop1.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 2, title: 'For Her', price: '$44', image: '/asset/shop/shop2.png', hoverImage: '/asset/shop/shop3.png' },
	{ id: 3, title: 'Arabic', price: '$44', image: '/asset/shop/shop3.png', hoverImage: '/asset/shop/shop4.png' },
	{ id: 4, title: 'Signature', price: '$44', image: '/asset/shop/shop4.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 5, title: 'For Him', price: '$44', image: '/asset/shop/shop5.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 6, title: 'For Her', price: '$44', image: '/asset/shop/shop6.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 7, title: 'Arabic', price: '$44', image: '/asset/shop/shop7.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 8, title: 'Signature', price: '$44', image: '/asset/shop/shop8.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 9, title: 'For Him', price: '$44', image: '/asset/shop/shop2.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 10, title: 'For Her', price: '$44', image: '/asset/shop/shop3.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 11, title: 'Arabic', price: '$44', image: '/asset/shop/shop4.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 12, title: 'Signature', price: '$44', image: '/asset/shop/shop1.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 13, title: 'For Him', price: '$44', image: '/asset/shop/shop5.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 14, title: 'For Her', price: '$44', image: '/asset/shop/shop6.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 15, title: 'Arabic', price: '$44', image: '/asset/shop/shop7.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 16, title: 'Signature', price: '$44', image: '/asset/shop/shop8.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 17, title: 'For Him', price: '$44', image: '/asset/shop/shop1.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 18, title: 'For Her', price: '$44', image: '/asset/shop/shop2.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 19, title: 'Arabic', price: '$44', image: '/asset/shop/shop3.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 20, title: 'Signature', price: '$44', image: '/asset/shop/shop1.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 21, title: 'Signature', price: '$44', image: '/asset/shop/shop1.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 22, title: 'Signature', price: '$44', image: '/asset/shop/shop1.png', hoverImage: '/asset/shop/shop2.png' },
	{ id: 23, title: 'Signature', price: '$44', image: '/asset/shop/shop1.png', hoverImage: '/asset/shop/shop2.png' },

];

const INITIAL_LOAD = 8;
const LOAD_MORE_COUNT = 4;

export default function ProductGrid() {
	const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
	const [currentPage, setCurrentPage] = useState(1);

	const visibleProducts = allProducts.slice(0, visibleCount);
	const totalPages = Math.ceil(allProducts.length / visibleCount);

	const handleLoadMore = () => {
		setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, allProducts.length));
	};

	const handlePageChange = (pageNum) => {
		setCurrentPage(pageNum);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const [filters, setFilters] = useState({
		priceRange: [500, 3000],
		sizes: [],
		colors: [],
		materials: [],
		categories: [],
	});

	const handleApplyFilters = () => {
		setIsFilterOpen(false);
		// Optional: You can trigger filtering logic here
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

	return (
		<div className="max-w-7xl mx-auto py-8 px-4">
			<div>
				<div className='flex justify-end items-center mb-10'>
					<button
						className='rounded-xl bg-[#565449] text-white px-4 py-2'
						onClick={() => setIsFilterOpen(true)}
					>
						Filter
					</button>
				</div>

				{/* Your ProductGrid here */}

				<FilterSidebar
					isOpen={isFilterOpen}
					onClose={() => setIsFilterOpen(false)}
					filters={filters}
					setFilters={setFilters}
					onApply={handleApplyFilters}
					onReset={handleResetFilters}
				/>
			</div>
			{/* Grid */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
				{visibleProducts.map((product) => (
					<div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm group">
						<div className="relative">
							{/* Product Image (Hover effect) */}
							<img
								src={product.image}
								alt={product.title}
								className="w-[356px] lg:h-[408px] h-[200px] object-cover rounded-[50px] transition-opacity duration-300 group-hover:opacity-0"
							/>
							<img
								src={product.hoverImage} // 👈 Secondary image on hover (add this key in your product object)
								alt={`${product.title} hover`}
								className="w-[356px] h-[408px] object-cover rounded-[50px] absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
							/>

							{/* Heart Icon */}
							<button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 text-gray-800"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21.435 6.577a5.377 5.377 0 00-7.6 0L12 8.412l-1.835-1.835a5.377 5.377 0 00-7.6 7.6l1.835 1.835L12 21.435l7.6-7.6 1.835-1.835a5.377 5.377 0 000-7.6z"
									/>
								</svg>
							</button>
						</div>

						{/* Product Info */}
						<div className="p-3 flex justify-between items-center">
							<div>
								<h3 className="text-sm font-semibold">{product.title}</h3>
								<p className="text-gray-700 font-bold">{product.price}</p>
							</div>
							<div className="flex justify-center items-center gap-2">
								<div className="w-5 h-5 rounded-full bg-[#836953] border border-black"></div>
								<div className="w-5 h-5 rounded-full bg-black border border-black"></div>
								<div className="w-5 h-5 rounded-full bg-white border border-black"></div>
							</div>
						</div>
					</div>

				))}
			</div>

			{/* Load More */}
			{visibleCount < allProducts.length && (
				<div className="flex justify-center mt-6">
					<button
						onClick={handleLoadMore}
						className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
					>
						Load More
					</button>
				</div>
			)}

			{/* Pagination */}
			{visibleCount >= allProducts.length && (
				<div className="flex justify-center items-center gap-2 mt-6 text-sm">
					{[...Array(totalPages)].map((_, index) => (
						<button
							key={index}
							onClick={() => handlePageChange(index + 1)}
							className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-200 text-black'
								}`}
						>
							{index + 1}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
