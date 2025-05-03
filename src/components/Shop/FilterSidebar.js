'use client';
import { Slider, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import React from 'react';


export default function FilterSidebar({ isOpen, onClose, filters, setFilters, onApply, onReset }) {
	const sizes = ['XS', 'S', 'M', 'L', 'XL'];
	const colors = ['#000000', '#FFFFFF', '#C2B280', '#A0522D', '#808080'];
	const materials = ['Cotton', 'Polyester', 'Linen', 'Wool'];
	const categories = ['For Him', 'For Her', 'Arabic', 'Signature'];

	const handlePriceChange = (_, newValue) => {
		setFilters({ ...filters, priceRange: newValue });
	};

	const handleCheckboxChange = (key, value) => {
		const current = filters[key];
		setFilters({
			...filters,
			[key]: current.includes(value)
				? current.filter((item) => item !== value)
				: [...current, value],
		});
	};

	return (
		<div
			className={`fixed top-0 right-0 lg:w-[40%] w-[80%] h-full bg-[#f5f5f5] shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
		>
			{/* Header */}
			<div className="flex justify-between items-center px-5 py-4 border-b border-gray-300">
				<h2 className="text-sm font-semibold uppercase tracking-wider text-gray-800">Filter</h2>
				<button onClick={onClose} className="text-2xl text-gray-600 hover:text-black">&times;</button>
			</div>

			{/* Tabs */}
			<div className="flex h-[calc(100%-150px)]"> {/* minus height of header+buttons */}
				<Tabs className="flex lg:flex-row flex-col w-full" value="price" orientation="vertical">
					<TabsHeader className="lg:w-40 w-full bg-transparent border-r border-gray-300 rounded-none">
						<Tab key="price" value="price" className="justify-start text-left text-sm font-semibold text-[#000]">
							Price Range
						</Tab>
						<Tab key="size" value="size" className="justify-start text-left text-sm font-semibold text-[#000]">
							Size
						</Tab>
						<Tab key="color" value="color" className="justify-start text-left text-sm font-semibold text-[#000]">
							Color
						</Tab>
						<Tab key="material" value="material" className="justify-start text-left text-sm font-semibold text-[#000]">
							Material
						</Tab>
						<Tab key="category" value="category" className="justify-start text-left text-sm font-semibold text-[#000]">
							Category
						</Tab>
					</TabsHeader>

					<TabsBody className="flex-1  overflow-y-auto ">
						<TabPanel key="price" value="price">
							<h3 className="font-semibold text-[#A6784B] mb-3">Price Range</h3>
							<Slider
								value={filters.priceRange}
								min={500}
								max={3000}
								onChange={handlePriceChange}
								valueLabelDisplay="auto"
								sx={{
									color: 'black'
								}}
							/>
							<div className="flex justify-between text-sm text-gray-600 mt-2">
								<span>Rs. {Array.isArray(filters?.priceRange) ? filters.priceRange[0] : 500}</span>
								<span>Rs. {Array.isArray(filters?.priceRange) ? filters.priceRange[1] : 3000}</span>
							</div>
						</TabPanel>

						<TabPanel key="size" value="size">
							<h3 className="font-semibold text-[#A6784B] mb-3">Sizes</h3>
							<div className="flex flex-wrap gap-2">
								{sizes.map((size) => (
									<button
										key={size}
										onClick={() => handleCheckboxChange('sizes', size)}
										className={`px-3 py-1 border rounded-full text-sm ${filters.sizes.includes(size)
											? 'bg-black text-white border-black'
											: 'bg-gray-100 text-black border-gray-300'
											}`}
									>
										{size}
									</button>
								))}
							</div>
						</TabPanel>

						<TabPanel key="color" value="color">
							<h3 className="font-semibold text-[#A6784B] mb-3">Colors</h3>
							<div className="flex flex-wrap gap-3">
								{colors.map((color) => (
									<button
										key={color}
										onClick={() => handleCheckboxChange('colors', color)}
										className={`w-6 h-6 rounded-full border-2 ${filters.colors.includes(color) ? 'ring-2 ring-black' : ''
											}`}
										style={{ backgroundColor: color }}
									></button>
								))}
							</div>
						</TabPanel>

						<TabPanel key="material" value="material">
							<h3 className="font-semibold text-[#A6784B] mb-3">Clothing Material</h3>
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
						</TabPanel>

						<TabPanel key="category" value="category">
							<h3 className="font-semibold text-[#A6784B] mb-3">Category</h3>
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
						</TabPanel>
					</TabsBody>
				</Tabs>
			</div>

			{/* Buttons */}
			<div className="p-5 border-t border-gray-300 flex justify-between mb-5">
				<button
					onClick={onApply}
					className="px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 text-sm"
				>
					Apply
				</button>
				<button
					onClick={onReset}
					className="px-6 py-2 bg-white border border-gray-400 text-black rounded-xl hover:bg-gray-100 text-sm"
				>
					Reset
				</button>
			</div>
		</div>

	);
}
