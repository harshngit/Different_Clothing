"use client"

import React, { useEffect, useState } from 'react'
import BannerFH from '@/components/Forhim/BannerFH'
import ProductGridFH from '@/components/Forhim/ProductGridFH'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import CollectionHim from '@/components/Forhim/CollectionHim'
import BannerCta from '@/components/Shop/BannerCta'
import { db } from '../firebase.config'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

const ForHim = () => {
	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchProduct = async () => {
		try {
			const productRef = collection(db, "Product");
			const q = query(
				productRef,
				where("productStatus", "==", "Published"),
				where("productCategory", "==", "Him"),
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

	console.log(product)

	return (
		<div className='font-playfair'>
			<Navbar />
			<section className="relative pt-[10px] pb-[50px]">
				<BannerFH
					title={"For Him"}
					desc={"Welcome to Different Clothing , where style meets comfort in every piece. Our collection is designed to offer the perfect balance of quality, versatility, and modern design, making it easy for you to express your unique style."}
				/>
			</section>
			<section>
				<CollectionHim />
			</section>
			<section className="relative px-4 py-6">
				{loading ? (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{Array.from({ length: 4 }).map((_, i) => (
							<div
								key={i}
								className="animate-pulse bg-white p-4 rounded-lg shadow-md space-y-4"
							>
								<div className="w-full h-48 bg-gray-300 rounded-md" />
								<div className="h-4 bg-gray-300 rounded w-3/4" />
								<div className="h-4 bg-gray-200 rounded w-1/2" />
								<div className="h-4 bg-gray-100 rounded w-1/3" />
							</div>
						))}
					</div>
				) : (
					<ProductGridFH product={product} />
				)}
			</section>
			<section>
				<BannerCta />
			</section>
			<Footer />
		</div>
	);
};

export default ForHim;
