"use client"


import CartBucket from '@/components/Cart/CartBucket'
import TrendingNow from '@/components/Cart/TrendingNow'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config'
import { orderBy, where } from 'firebase/firestore'

const Cart = () => {
	const [recommendedProducts, setRecommendedProducts] = useState([]);
	useEffect(() => {
		const fetchRecommended = async () => {
			try {
				const productRef = collection(db, 'Product');
				const q = query(
					productRef,
					where('productStatus', '==', 'Published'),
					orderBy('createdAtDate', 'desc')
				);
				const snapshot = await getDocs(q);
				const products = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setRecommendedProducts(products);
			} catch (error) {
				console.error('Error fetching recommended products:', error);
			}
		};

		fetchRecommended();
	}, []);
	return (
		<div className=' font-playfair'>
			<Navbar />
			<section className="relative pt-[10px] pb-[50px]">
				{/* Adjust padding to avoid navbar overlap */}
				<CartBucket />
			</section>
			<section className="relative lg:pt-[10px] xl:pt-[10px] pt-[60px] overflow-hidden">
				<TrendingNow recommendedProducts={recommendedProducts} />
			</section>
			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default Cart