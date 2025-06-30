'use client';

import { useEffect, useState } from 'react';
import {
	doc,
	onSnapshot,
	collection,
	query,
	where,
	orderBy,
	getDocs,
} from 'firebase/firestore';

import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import ProductDetail from '@/components/Shop/Details/ProductDetail';
import Recommended from '@/components/Shop/Details/Recommended';
import DetailCta from '@/components/Shop/Details/DetailCta';
import { db } from '@/app/firebase.config';

export default function ProductDetailPage({ params }) {
	const [productDetails, setProductDetails] = useState(null);
	const [recommendedProducts, setRecommendedProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const id = params?.productid;

	// 🔁 Fetch product details by ID
	useEffect(() => {
		if (!id) return;

		const unsubscribe = onSnapshot(
			doc(db, 'Product', id),
			(docSnap) => {
				if (docSnap.exists()) {
					setProductDetails({ id: docSnap.id, ...docSnap.data() });
				} else {
					console.warn('No product found.');
					setProductDetails(null);
				}
				setLoading(false);
			},
			(error) => {
				console.error('Snapshot error:', error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, [id]);

	// 📦 Fetch recommended products
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

	// 📄 Loading / Not Found States
	if (loading) return <div className="text-center py-20">Loading...</div>;
	if (!productDetails) return <div className="text-center py-20 text-red-600">Product not found</div>;

	// ✅ Render
	return (
		<div className="font-playfair">
			<Navbar />
			<section className="relative pt-[10px] pb-[50px]">
				<ProductDetail productDetails={productDetails} />
			</section>
			<section className="relative">
				<Recommended product={recommendedProducts} />
			</section>
			<section className="relative">
				<DetailCta />
			</section>
			<Footer />
		</div>
	);
}
