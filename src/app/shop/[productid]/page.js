'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
	// const { productId } = useParams();
	// const [product, setProduct] = useState(null);

	// useEffect(() => {
	// 	const fetchProduct = async () => {
	// 		const data = await getProductById(productId);
	// 		setProduct(data);
	// 	};

	// 	fetchProduct();
	// }, [productId]);

	// if (!product) return <p>Loading...</p>;

	return (
		<>shop detail</>
		// <div className="p-4">
		// 	<h1 className="text-2xl font-bold mb-2">{product.name}</h1>
		// 	<img src={product.image} alt={product.name} className="w-full max-w-sm" />
		// 	<p className="mt-4 text-gray-700">{product.description}</p>
		// 	<p className="text-lg font-semibold mt-2">${product.price}</p>
		// </div>
	);
}
