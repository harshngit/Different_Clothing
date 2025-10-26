"use client"

import BannerFH from '@/components/Forhim/BannerFH'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import ProductGridArabic from '@/components/Forhim/ProductGridArabic'
import BannerCta from '@/components/Shop/BannerCta'
import CollectionArabic from '@/components/Forhim/CollectionArabic'
import { db } from '@/app/firebase.config'

const Oversized = () => {
	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchProduct = async () => {
		try {
			const productRef = collection(db, "Product");
			const q = query(
				productRef,
				where("productStatus", "==", "Published"),
				where("productCategory", "==", "Her"),
				where("productType", "==", "Oversized Tee"),
				orderBy("createdAtDate", "desc")
			);
			const querySnapshot = await getDocs(q);

			const products = [];
			querySnapshot.forEach((doc) => {
				products.push({ id: doc.id, ...doc.data() });
			});

			return products;
		} catch (error) {
			console.error("Error fetching products:", error);
			return [];
		}
	};

	useEffect(() => {
		const getProducts = async () => {
			const latestProducts = await fetchProduct();
			setProduct(latestProducts);
			setLoading(false);
		};
		getProducts();
	}, []);

	return (
		<div className='font-playfair'>
			<Navbar />
			<section className="relative pt-[10px] pb-[50px]">
				<BannerFH
					title={"Oversized Tee"}
					desc={"Welcome to Different Clothing, where style meets comfort in every piece. Our collection is designed to offer the perfect balance of quality, versatility, and modern design, making it easy for you to express your unique style."}
				/>
			</section>
			<section className="relative py-6">
				{loading ? (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{Array.from({ length: 8 }).map((_, i) => (
							<div
								key={i}
								className="bg-white p-4 rounded-lg shadow-md space-y-4 border border-gray-100 animate-pulse"
							>
								<div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-pulse" />
								<div className="h-4 bg-gray-300 rounded w-3/4" />
								<div className="h-4 bg-gray-200 rounded w-1/2" />
								<div className="h-4 bg-gray-100 rounded w-1/3" />
							</div>
						))}
					</div>
				) : (
					<ProductGridArabic product={product} />
				)}
			</section>
			<section className="relative">
				<BannerCta />
			</section>
			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default Oversized;
