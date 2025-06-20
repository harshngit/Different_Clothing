'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import ProductDetail from '@/components/Shop/Details/ProductDetail';
import Recommended from '@/components/Shop/Details/Recommended';
import DetailCta from '@/components/Shop/Details/DetailCta';
import { db } from '@/app/firebase.config';

export default function ProductDetailPage({ params }) {
	const [productDetails, setProductDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const id = params.productid; // ✅ Use as string

	useEffect(() => {
		if (!id) return;

		const unsub = onSnapshot(doc(db, "Product", id), (docSnap) => {
			if (docSnap.exists()) {
				setProductDetails({ id: docSnap.id, ...docSnap.data() });
			} else {
				console.warn("No product found.");
				setProductDetails(null);
			}
			setLoading(false);
		}, (error) => {
			console.error("Snapshot error:", error);
			setLoading(false);
		});

		return () => unsub(); // ✅ Cleanup on unmount
	}, [id]);


	console.log(productDetails)

	if (loading) return <div className="text-center py-20">Loading...</div>;
	if (!productDetails) return <div className="text-center py-20 text-red-600">Product not found</div>;

	return (
		<div className="font-playfair">
			<Navbar />
			<section className="relative pt-[130px] pb-[50px]">
				<ProductDetail productDetails={productDetails} />
			</section>
			<section className="relative">
				<Recommended />
			</section>
			<section className="relative">
				<DetailCta />
			</section>
			<Footer />
		</div>
	);
}
