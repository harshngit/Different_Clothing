'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import ProductDetail from '@/components/Shop/Details/ProductDetail';

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
		<>
			<div className=' font-playfair'>
				<Navbar />
				<section className="relative pt-[130px] pb-[50px]">
					{/* Adjust padding to avoid navbar overlap */}
					<ProductDetail />
				</section>

				<section className="relative">
					<Footer />
				</section>
			</div>
		</>
	);
}
