'use client';
import React, { useState } from 'react';

const formatRupees = (value) =>
	`Rs. ${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

const FilterSidebar = ({
	isOpen,
	onClose,
	filters,
	setFilters,
	onApply,
	onReset,
}) => {
	const [activeTab, setActiveTab] = useState('price');

	const sizes = ['XS', 'S', 'M', 'L', 'XL'];
	const colors = ['#000000', '#FFFFFF'];
	const materials = ['Cotton', 'Polyester', 'Linen', 'Wool'];
	const categories = ['For Him', 'For Her', 'Arabic', 'Signature'];

	const handleCheckboxChange = (key, value) => {
		const current = filters[key];
		setFilters({
			...filters,
			[key]: current.includes(value)
				? current.filter((item) => item !== value)
				: [...current, value],
		});
	};

	const handleMinChange = (e) => {
		const value = Math.min(Number(e.target.value), filters.priceRange?.[1]);
		setFilters({ ...filters, priceRange: [value, filters.priceRange?.[1]] });
	};

	const handleMaxChange = (e) => {
		const value = Math.max(Number(e.target.value), filters.priceRange?.[0]);
		setFilters({ ...filters, priceRange: [filters.priceRange?.[0], value] });
	};

	return (
		<div className={`fixed top-0 right-0 lg:w-[40%] w-[80%] h-full bg-white shadow-xl transform transition-transform duration-300 z-[1000] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
			{/* Header */}
			<div className="flex justify-between items-center px-6 py-5">
				<h2 className="w-full text-center font-bold text-gray-900 uppercase tracking-wider">
					Filters
				</h2>
				<button onClick={onClose} className="text-2xl text-black hover:text-gray-800">
					&times;
				</button>
			</div>

			{/* Tabs */}
			<div className="flex h-[calc(92%-100px)]">
				{/* Sidebar Tabs */}
				<div className="lg:w-40 pl-2 border-r border-black">
					{['price', 'size', 'color', 'material', 'category'].map((val) => (
						<div
							key={val}
							onClick={() => setActiveTab(val)}
							className={`relative cursor-pointer text-left text-lg py-3 px-4 font-medium transition text-[25px] ${activeTab === val
								? `text-[#000] before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-3 before:bg-[#000] before:rounded-tr-full before:rounded-br-full`
								: 'text-gray-700 hover:text-black'
								}`}
						>
							{val.charAt(0).toUpperCase() + val.slice(1)}
						</div>
					))}
				</div>

				{/* Tab Panels */}
				<div className="flex-1 overflow-y-auto">
					{/* Price Tab */}
					{activeTab === 'price' && (
						<div className="p-5">
							<h3 className="text-lg font-semibold text-black mb-3">
								Select Price Range
							</h3>

							<div className="flex justify-between text-sm text-black mb-2 font-medium">
								<span>{formatRupees(filters.priceRange?.[0] ?? 0)}</span>
								<span>{formatRupees(filters.priceRange?.[1] ?? 10000)}</span>
							</div>

							{/* Dual Slider */}
							<div className="relative h-12">
								{/* Full Track */}
								<div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded-full transform -translate-y-1/2 z-0" />

								{/* Active Range Track (black between two thumbs) */}
								<div
									className="absolute top-1/2 h-1 bg-black z-0 rounded-full transform -translate-y-1/2"
									style={{
										left: `${(filters.priceRange?.[0] / 10000) * 100}%`,
										width: `${((filters.priceRange?.[1] - filters.priceRange?.[0]) / 10000) * 100}%`,
									}}
								/>

								{/* Min Thumb */}
								<input
									type="range"
									min="0"
									max="10000"
									step="100"
									value={filters.priceRange?.[0] ?? 0}
									onChange={handleMinChange}
									className="absolute z-10 w-full h-2 bg-transparent appearance-none pointer-events-none"
									style={{ WebkitAppearance: 'none' }}
								/>

								{/* Max Thumb */}
								<input
									type="range"
									min="0"
									max="10000"
									step="100"
									value={filters.priceRange?.[1] ?? 10000}
									onChange={handleMaxChange}
									className="absolute z-10 w-full h-2 bg-transparent appearance-none pointer-events-none"
									style={{ WebkitAppearance: 'none' }}
								/>

								{/* Thumb styling */}
								<style jsx>{`
				input[type='range']::-webkit-slider-thumb {
					-webkit-appearance: none;
					height: 16px;
					width: 16px;
					border-radius: 50%;
					background: black;
					cursor: pointer;
					margin-top: 40px;
					pointer-events: auto;
				}
				input[type='range']::-moz-range-thumb {
					height: 16px;
					width: 16px;
					border-radius: 50%;
					background: black;
					cursor: pointer;
					pointer-events: auto;
				}
			`}</style>
							</div>
						</div>
					)}

					{/* Size Tab */}
					{activeTab === 'size' && (
						<div className="p-5">
							<h3 className="text-lg font-semibold text-black mb-3">Select Sizes</h3>
							<div className="flex flex-wrap gap-2">
								{sizes.map((size) => (
									<button
										key={size}
										onClick={() => handleCheckboxChange('sizes', size)}
										className={`px-3 py-1 border  text-sm transition ${filters.sizes.includes(size)
											? 'bg-black text-white border-black'
											: 'bg-white text-black border-gray-300'
											}`}
									>
										{size}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Color Tab */}
					{activeTab === 'color' && (
						<div className="p-5">
							<h3 className="text-lg font-semibold text-black mb-3">Select Colors</h3>
							<div className="flex flex-wrap gap-3">
								{colors.map((color) => (
									<button
										key={color}
										onClick={() => handleCheckboxChange('colors', color)}
										className={`w-7 h-7 rounded-full border-2 transition ${filters.colors.includes(color)
											? 'ring-2 ring-black'
											: 'border-gray-300'
											}`}
										style={{ backgroundColor: color }}
									/>
								))}
							</div>
						</div>
					)}

					{/* Material Tab */}
					{activeTab === 'material' && (
						<div className="p-5">
							<h3 className="text-lg font-semibold text-black mb-3">Select Materials</h3>
							<div className="flex flex-col gap-2 text-sm">
								{materials.map((material) => (
									<label key={material} className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={filters.materials.includes(material)}
											onChange={() => handleCheckboxChange('materials', material)}
										/>
										{material}
									</label>
								))}
							</div>
						</div>
					)}

					{/* Category Tab */}
					{activeTab === 'category' && (
						<div className="p-5">
							<h3 className="text-lg font-semibold text-black mb-3">Select Category</h3>
							<div className="flex flex-col gap-2 text-sm">
								{categories.map((cat) => (
									<label key={cat} className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={filters.categories.includes(cat)}
											onChange={() => handleCheckboxChange('categories', cat)}
										/>
										{cat}
									</label>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Footer */}
			<div className="p-5 border-t border-black flex justify-start gap-10">
				<button
					onClick={onApply}
					className="px-6 py-2 w-[240px] h-[50px] text-sm bg-black text-white hover:bg-gray-800"
				>
					Apply
				</button>
				<button
					onClick={onReset}
					className="px-5 py-2 w-[240px] h-[50px] border bg-white text-sm border-gray-400 text-gray-700 hover:bg-gray-100"
				>
					Reset
				</button>
			</div>
		</div>
	);
};

export default FilterSidebar;
