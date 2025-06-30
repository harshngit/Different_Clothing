"use client"

import BannerFH from '@/components/Forhim/BannerFH'
import ProductGridFHER from '@/components/Forhim/ProductGridFHER'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import BannerCta from '@/components/Shop/BannerCta'

const ForHer = () => {
	const [product, setProduct] = useState([]);

	const fetchProduct = async () => {
		try {
			const productRef = collection(db, "Product");
			const q = query(productRef, where("productStatus", "==", "Published"), where("productCategory", "==", "For Her"), orderBy("createdAtDate", "desc"));
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

	console.log(product)



	useEffect(() => {
		const getProducts = async () => {
			const latestProducts = await fetchProduct();
			setProduct(latestProducts);
		};
		getProducts();
	}, []);
	return (
		<div className=' font-playfair'>
			<Navbar />
			<section className="relative pt-[10px] pb-[50px]">
				{/* Adjust padding to avoid navbar overlap */}
				<BannerFH title={"For Her"} desc={"Welcome to Different Clothing , where style meets comfort in every piece. Our collection is designed to offer the perfect balance of quality, versatility, and modern design, making it easy for you to express your unique style."} />
			</section>
			<section className="relative">

				<ProductGridFHER product={product} />
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

export default ForHer