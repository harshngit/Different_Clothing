"use client"
import React, { useEffect, useState } from 'react';
import printJS from 'print-js'; // Import print-js
import LoadingScreen from '@/components/Loader/LoadingScreen';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/app/firebase.config';
import { Button } from '@material-tailwind/react';

export default function PrintBill({ params }) {
	const id = params?.OrderID;
	const [orderDetails, setOrderDetails] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!id) return;

		const unsubscribe = onSnapshot(
			doc(db, "Order", id),
			(docSnap) => {
				if (docSnap.exists()) {
					setOrderDetails({ id: docSnap.id, ...docSnap.data() });
				} else {
					console.warn("No product found.");
					setOrderDetails(null);
				}
				setLoading(false);
			},
			(error) => {
				console.error("Snapshot error:", error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, [id]);

	if (loading) {
		return <LoadingScreen />;
	}

	// Function to print using print.js
	const downloadPDF = () => {
		printJS({
			printable: 'invoice-container', // The ID of the element to print
			type: 'html',
			targetStyles: ['*'], // Target all styles
			styles: `
				@media print {
					@page { size: landscape;
					
					}
				}
			`, // Optional: Use CSS for landscape page
		});
	};

	return (
		<div className='flex justify-center items-center flex-col w-full'>
			{/* Print Section */}
			<div
				id="invoice-container"
				className=" font-playfair p-6 bg-white rounded-lg"
			>
				{/* Header */}
				<div className="flex justify-center flex-col mb-5 items-center">
					<div>
						<img src="/asset/Navbar/logo.png" className="w-20 h-20" alt="" />
					</div>
					<h1 className="text-2xl">Invoice</h1>
				</div>

				{/* Billing Info */}
				<div className="grid grid-cols-2 gap-4 mb-6">
					<div>
						<h3 className="font-semibold">Bill To:</h3>
						<p>{orderDetails?.customerName}</p>
						<p>{orderDetails?.dropoff_location?.address}</p>
						<p>{orderDetails?.dropoff_location?.city}</p>
						<p>{orderDetails?.dropoff_location?.region}</p>
						<p>{orderDetails?.dropoff_location?.zip}</p>
					</div>
					<div>
						<h3 className="font-semibold">Shipping Info:</h3>
						<p>{orderDetails?.email}</p>
						<p>{orderDetails?.dropoff_location?.phone}</p>
					</div>
				</div>

				{/* Invoice Table */}
				<div className="grid grid-cols-4 gap-4 bg-gray-100 py-2 px-4">
					<div className="font-semibold">Product</div>
					<div className="font-semibold">Name</div>
					<div className="font-semibold">Quantity</div>
					<div className="font-semibold">Unit Cost</div>
				</div>
				{orderDetails?.dimensions?.map((invoice, index) => (
					<div key={index} className="grid grid-cols-4 gap-4 border-b py-2 px-4">
						<div className="flex justify-center items-center">
							<img
								src={invoice?.p_img || "/path/to/placeholder.jpg"}
								className="w-16 h-16 object-cover"
								alt={`Product Image - ${invoice?.p_name}`}
							/>
						</div>
						<div className="capitalize flex justify-start items-start flex-col">
							{invoice?.p_name}
							<span className="text-xs">Size: {invoice?.p_size}</span>
						</div>
						<div className="flex justify-center items-center">{invoice?.p_qty || 1}</div>
						<div className="flex justify-center items-center">${invoice?.p_price}</div>
					</div>
				))}

				{/* Totals */}
				{orderDetails?.invoices?.map((item, index) => (
					<div key={index} className="flex justify-start items-end flex-col text-sm">
						<div>
							<h2 className="text-lg">Total: ${item?.n_value}</h2>
						</div>
					</div>
				))}
				<div className="flex flex-col justify-start items-start">
					<div>
						<h3 className="font-semibold">Bill To:</h3>
						<p>Different Clothing</p>
						<p>Different Store,</p>
						<p>Dubai,</p>
					</div>
				</div>
			</div>



			{/* Print Button */}
			<div className="mt-8 text-center">
				<Button
					onClick={downloadPDF}
				>
					Print Invoice
				</Button>
			</div>
		</div>
	);
}
