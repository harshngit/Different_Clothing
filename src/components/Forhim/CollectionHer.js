import Link from 'next/link';
import React from 'react'

const CollectionHer = () => {
	const categories = [
		{ name: "Hoodie", products: 12, image: "/asset/Shop/collectionher/Hoddie.webp", href: "/forher/hoodie" },
		{ name: "Sweatshirt", products: 9, image: "/asset/Shop/collectionher/sweatshirt.webp", href: "/forher/sweatshirt" },
		{ name: "Oversized Tee", products: 15, image: "/asset/Shop/collectionher/oversized.webp", href: "/forher/oversized" },
		{ name: "Sweatpants", products: 7, image: "/asset/Shop/collectionher/sweatpants.webp", href: "/forher/sweatpants" },
		{ name: "Leggings", products: 11, image: "/asset/Shop/collectionher/leggings.webp", href: "/forher/leggings" },
		{ name: "Crop Top", products: 11, image: "/asset/Shop/collectionher/croptop.webp", href: "/forher/croptop" },
	];
	return (
		<div className="bg-[#fff] py-10 px-4 text-center mb-10">
			<h2 className="text-2xl md:text-3xl font-semibold mb-2">Best For Her Collection</h2>
			<p className="text-gray-600 mb-8 text-sm md:text-base">Here’s a pick list of our popular wardrobe items for women and girls</p>
			<div className="flex flex-wrap justify-center gap-6">
				{categories.map((category, index) => (
					<Link href={category.href} className='group'>
						<div key={index} className="flex flex-col items-center">
							<div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md">
								<img
									src={category.image}
									alt={category.name}
									className="w-full h-full object-cover group-hover:shadow-lg"
								/>
							</div>
							<p className="mt-3 font-medium text-[15px]">{category.name}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default CollectionHer