'use client';
import React, { useEffect, useState } from 'react';
import FilterSidebar from './FilterSidebar';
import ProductCard from '../ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { loadWishlistFromStorage, toggleWishlistItem } from '@/actions/wishlistActions';
import { FiGrid, FiColumns, FiBox, FiSquare } from 'react-icons/fi';

const ITEMS_PER_PAGE = 16;

export default function ProductGrid({ product }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [gridView, setGridView] = useState('four'); // 'four' by default

	const [filters, setFilters] = useState({
		priceRange: [500, 3000],
		sizes: [],
		colors: [],
		materials: [],
		categories: [],
	});

	const dispatch = useDispatch();
	const wishlist = useSelector((state) => state.wishlist.wishlist);
	const { userProfile } = useSelector((state) => state.user);
	const userId = userProfile?.uid;

	useEffect(() => {
		dispatch(loadWishlistFromStorage());
	}, [dispatch]);

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

	const handleToggle = (product) => {
		dispatch(toggleWishlistItem(userId, product));

		const isInWishlist = wishlist?.[userId]?.some(p => p.id === product.id);
    // optionally show inline indicator (toast removed)
	};

	const isLiked = (productId) => wishlist?.[userId]?.some(p => p.id === productId);

	return (
		<div className="pb-5">
			{/* Header */}
			<div className='flex justify-between px-5 items-center mb-10 w-full'>
				<h2 className='font-semibold text-2xl lg:text-[32px]'>COLLECTION</h2>
				<div className='flex items-center gap-4'>
					{/* Grid Toggle */}
					<div className='lg:flex hidden gap-2 overflow-hidden'>
						<button
							onClick={() => setGridView('two')}
							className={`p-2 ${gridView === 'two' ? 'bg-black text-white' : 'text-black'}`}
						>
							<FiColumns size={20} />
						</button>
						<button
							onClick={() => setGridView('four')}
							className={`p-2 ${gridView === 'four' ? 'bg-black text-white' : 'text-black'}`}
						>
							<FiGrid size={20} />
						</button>
					</div>
					<div className='flex lg:hidden gap-2 overflow-hidden'>
						<button
							onClick={() => setGridView('two')}
							className={`p-2 ${gridView === 'two' ? 'bg-black text-white' : 'text-black'}`}
						>
							<FiColumns size={20} />
						</button>
						<button
							onClick={() => setGridView('four')}
							className={`p-2 ${gridView === 'four' ? 'bg-black text-white' : 'text-black'}`}
						>
							<FiSquare size={20} />
						</button>
					</div>
					<button
						className='bg-[#000] text-white px-5 py-3'
						onClick={() => setIsFilterOpen(true)}
					>
						Filter
					</button>
				</div>
			</div>

			{/* Filter Sidebar */}
			<FilterSidebar
				isOpen={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				filters={filters}
				setFilters={setFilters}
				onApply={handleApplyFilters}
				onReset={handleResetFilters}
			/>

			{/* Product Grid */}
			<ProductCard
				visibleProducts={visibleProducts}
				gridView={gridView}
				handleToggle={handleToggle}
				isLiked={isLiked}
			/>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-2 mt-6 text-sm">
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
							for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
						} else {
							pageNumbers.push(1);
							if (currentPage > 4) pageNumbers.push('...');
							const start = Math.max(2, currentPage - 1);
							const end = Math.min(totalPages - 1, currentPage + 1);
							for (let i = start; i <= end; i++) pageNumbers.push(i);
							if (currentPage < totalPages - 3) pageNumbers.push('...');
							pageNumbers.push(totalPages);
						}
						return pageNumbers.map((page, i) => (
							<button
								key={i}
								onClick={() => typeof page === 'number' && handlePageChange(page)}
								disabled={page === '...'}
								className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === page ? 'bg-black text-white' : 'text-black'} ${page === '...' && 'cursor-default'}`}
							>
								{page}
							</button>
						));
					})()}
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="w-8 h-8 flex items-center justify-center text-black disabled:opacity-40"
					>
						›
					</button>
				</div>
			)}
            {/* toast removed */}
		</div>
	);
}
