'use client'
import CTA from '@/components/Home/CTA'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import BannerCta from '@/components/Shop/BannerCta'
import ImageAccordion from '@/components/Shop/ImageAccordion'
import ProductGrid from '@/components/Shop/ProductsGrid'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

const Shop = () => {

	const [product, setProduct] = useState([]);

	const fetchProduct = async () => {
		try {
			const productRef = collection(db, "Product");
			const q = query(productRef, where("productStatus", "==", "Published"), orderBy("createdAtDate", "desc"));
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
			<section className="relative pt-[110px] pb-[50px]">
				{/* Adjust padding to avoid navbar overlap */}
				<ImageAccordion />
			</section>
			<section className="relative lg:pt-[10px] xl:pt-[10px] pt-[60px] overflow-hidden">
				<ProductGrid product={product} />
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

export default Shop