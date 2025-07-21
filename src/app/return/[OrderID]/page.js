"use client"

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
import Footer from '@/components/Layout/Footer';
import { db } from '@/app/firebase.config';
import Navbar from '@/components/Layout/Navbar';

export default function ReturnForm({ params }) {
	const [orderDetails, setOrderDetails] = useState({})
	const [loading, setLoading] = useState(true);
	const id = params?.OrderID
	console.log(id)
	useEffect(() => {
		if (!id) return;

		const unsubscribe = onSnapshot(
			doc(db, 'Order', id),
			(docSnap) => {
				if (docSnap.exists()) {
					setOrderDetails({ id: docSnap.id, ...docSnap.data() });
				} else {
					console.warn('No product found.');
					setOrderDetails(null);
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
	return (
		<div className="font-playfair">
			<Navbar />
			<section className="relative pt-[10px] pb-[50px]">
				<ReturnForm />
			</section>
			<Footer />
		</div>
	)
}