'use client';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase.config';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { FaSearch } from 'react-icons/fa';
import { FiGrid, FiColumns, FiSquare } from 'react-icons/fi';

const ITEMS_PER_PAGE = 12;

export default function SearchPage() {
	const [products, setProducts] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [gridView, setGridView] = useState('four');

	// Fetch products from Firestore
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const productRef = collection(db, 'Product');
				const q = query(
					productRef,
					where('productStatus', '==', 'Published')
				);
				const querySnapshot = await getDocs(q);

				const productsData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				setProducts(productsData);
			} catch (error) {
				console.error('Error fetching products:', error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	// Filter products based on search query
	const filteredProducts = products.filter((product) =>
		product.productName?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Pagination
	const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const visibleProducts = filteredProducts.slice(startIndex, endIndex);

	const handlePageChange = (pageNum) => {
		setCurrentPage(pageNum);
		window.scrollTo({ top: 300, behavior: 'smooth' });
	};

	// Reset to first page when search query changes
	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery]);

	return (
		<>
			<Navbar />
			<div className="min-h-screen font-playfair bg-white">
				{/* Search Header Section */}
				<div className="bg-gray-50  py-12 px-5">
					<div className="flex justify-start items-start flex-col">
						<h1 className="text-xl lg:text-4xl font-bold text-center mb-8 ">
							SEARCH PRODUCTS
						</h1>
						
						{/* Search Input */}
						<div className="w-[30%] relative">
							<input
								type="text"
								placeholder="Search for products by name..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full px-6 py-4 border-2 border-gray-300 rounded-none focus:outline-none focus:border-black text-base transition-all duration-300"
							/>
							<FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
						</div>

						{/* Results Count */}
						<div className="text-center mt-6 text-gray-600">
							{searchQuery && (
								<p className="text-sm">
									{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
									{searchQuery && ` for "${searchQuery}"`}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Products Section */}
				<div className="py-10">
					{/* Header with Grid Toggle */}
					{filteredProducts.length > 0 && (
						<div className="flex justify-between items-center mb-8 px-5">
							<h2 className="font-semibold text-xl lg:text-2xl ">
								{searchQuery ? 'SEARCH RESULTS' : 'ALL PRODUCTS'}
							</h2>
							<div className="flex gap-2">
								{/* Desktop Grid Toggle */}
								<div className="lg:flex hidden gap-2">
									<button
										onClick={() => setGridView('two')}
										className={`p-2 border transition-colors ${
											gridView === 'two' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
										}`}
									>
										<FiColumns size={20} />
									</button>
									<button
										onClick={() => setGridView('four')}
										className={`p-2 border transition-colors ${
											gridView === 'four' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
										}`}
									>
										<FiGrid size={20} />
									</button>
								</div>
								{/* Mobile Grid Toggle */}
								<div className="flex lg:hidden gap-2">
									<button
										onClick={() => setGridView('two')}
										className={`p-2 border transition-colors ${
											gridView === 'two' ? 'bg-black text-white' : 'bg-white text-black'
										}`}
									>
										<FiColumns size={20} />
									</button>
									<button
										onClick={() => setGridView('four')}
										className={`p-2 border transition-colors ${
											gridView === 'four' ? 'bg-black text-white' : 'bg-white text-black'
										}`}
									>
										<FiSquare size={20} />
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Loading State */}
					{loading && (
						<div className="flex justify-center items-center py-20">
							<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
						</div>
					)}

					{/* No Results */}
					{!loading && searchQuery && filteredProducts.length === 0 && (
						<div className="flex flex-col justify-center items-center py-20">
							<FaSearch className="text-6xl text-gray-300 mb-4" />
							<h3 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
							<p className="text-gray-500">Try searching with different keywords</p>
						</div>
					)}

					{/* Empty State (No Search Query) */}
					{/* {!loading && !searchQuery && (
						<div className="flex flex-col justify-center items-center py-20">
							<FaSearch className="text-6xl text-gray-300 mb-4" />
							<h3 className="text-2xl font-semibold text-gray-700 mb-2">Start Searching</h3>
							<p className="text-gray-500">Enter a product name to search</p>
						</div>
					)} */}

					{/* Product Grid */}
					{!loading && filteredProducts.length > 0 && (
						<>
							<ProductCard 
								visibleProducts={visibleProducts} 
								gridView={gridView}
							/>

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="flex justify-center items-center gap-2 mt-10 text-sm">
									<button
										onClick={() => handlePageChange(currentPage - 1)}
										disabled={currentPage === 1}
										className="w-8 h-8 flex items-center justify-center text-black disabled:opacity-40 hover:bg-gray-100 transition"
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
												className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
													currentPage === page 
														? 'bg-black text-white' 
														: 'text-black hover:bg-gray-100'
												} ${page === '...' && 'cursor-default'}`}
											>
												{page}
											</button>
										));
									})()}
									<button
										onClick={() => handlePageChange(currentPage + 1)}
										disabled={currentPage === totalPages}
										className="w-8 h-8 flex items-center justify-center text-black disabled:opacity-40 hover:bg-gray-100 transition"
									>
										›
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
            <Footer />
		</>
	);
}

