"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/app/firebase.config";
import { FaJediOrder, FaRightLeft } from "react-icons/fa6";
import Link from "next/link";
import LoadingScreen from "../Loader/LoadingScreen";
import { FaSpinner, FaTruck, FaBoxOpen, FaTimesCircle, FaBox, FaHourglassHalf, FaCheckCircle } from "react-icons/fa";


const Orderpage = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	const { userProfile } = useSelector((state) => state.user) || {};
	const uid = userProfile?.uid;

	useEffect(() => {
		const fetchOrders = async () => {
			if (!uid) return;

			try {
				const orderRef = collection(db, "Order");
				const q = query(orderRef, where("uid", "==", uid));
				const snapshot = await getDocs(q);

				const fetchedOrders = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				setOrders(fetchedOrders);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [uid]);

	if (loading) {
		return <LoadingScreen />;
	}
	if (!orders.length) {
		return <div className="py-2 px-5">
			<div className='flex justify-start items-start lg:px-10 lg:py-10 px-5 py-5'>
				<h2 className='font-semibold lg:text-[30px] text-lg text-[#000]'>My Orders</h2>
			</div>
			<p>No Orders Found</p>
		</div>;
	}

	return (
		<div>
			<div className='flex justify-start items-start lg:px-10 lg:py-10 px-5 py-5'>
				<h2 className='font-semibold lg:text-[30px] text-lg text-[#000]'>My Orders</h2>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 lg:px-10'>
				{orders.map((order, index) => (
					<div key={index} className='bg-white rounded-lg shadow-md p-6'>
						<div className='flex items-center justify-between mb-2'>
							<div className='flex items-center gap-3'>
								<div className='bg-[#000] text-white font-semibold w-10 h-10 flex items-center justify-center rounded-md'>
									{/* {order.id?.slice(0, 2) || "ID"} */}
									<FaBoxOpen />
								</div>
								<div>
									<h3 className='font-semibold text-lg'>{order.customerName || "Customer"}</h3>
									<p className='text-sm text-gray-500'>
										Order {order.OrderID || "#000"} / {order.status || "N/A"}
									</p>
								</div>
							</div>


							<span className={`flex items-center gap-2 font-medium text-sm px-3 py-1 rounded-full transition-all duration-300 ${order.status === "unfulfilled" ? "bg-black text-white" :
								order.status === "Processing" ? "bg-blue-100 text-blue-800" :
									order.status === "Shipped" ? "bg-indigo-100 text-indigo-800" :
										order.status === "Delivered" ? "bg-green-100 text-green-800" :
											order.status === "Cancelled" ? "bg-red-100 text-red-800" :
												order.status === "Return Confirm" ? "bg-green-100 text-green-800" :
													order.status === "Cancel Return" ? "bg-red-100 text-red-800" :
														"bg-yellow-100 text-yellow-800"
								}`}>
								{
									order.status === "Processing" ? (
										<FaSpinner className="animate-spin" />
									) : order.status === "Shipped" ? (
										<FaTruck />
									) : order.status === "Delivered" ? (
										<FaBoxOpen />
									) : order.status === "Cancelled" || order.status === "Cancel Return" ? (
										<FaTimesCircle />
									) : order.status === "Return Confirm" ? (
										<FaCheckCircle />
									) : order.status === "unfulfilled" ? (
										<FaBox />
									) : (
										<FaHourglassHalf />
									)
								}
								{order.status || "Pending"}
							</span>


						</div>

						<div className="flex justify-start items-start gap-[5px] flex-col mb-2">
							<span>
								{order.createdAt?.toDate().toDateString() || "N/A"}
							</span>
							<span>
								{order.createdAt?.toDate().toLocaleTimeString('en-US', {
									hour: '2-digit',
									minute: '2-digit',
									second: '2-digit',
									hour12: true,
								}) || "N/A"}
							</span>
						</div>

						<div className='border-t border-b py-3 mb-3'>
							{order.dimensions?.map((item, idx) => (
								<div key={idx} className='flex justify-between text-sm mb-2'>
									<span>{item.p_name} x  {item.p_qty
									}</span>
									<span>${item.p_price}</span>
								</div>
							))}
						</div>

						{order?.invoices.map((item, index) => (
							<div className='flex justify-between font-semibold text-base mb-4'>
								<span>Total</span>
								<span>${item.n_value?.toFixed(2) || "0.00"}</span>
							</div>
						))}

						<div className='flex gap-2'>
							<Link href={`/orders/${order?.OrderID}`}>
								<button className='bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-md'>
									See Details
								</button>
							</Link>
							<Link href={`/orders/orderbill/${order?.OrderID}`}>
								<button className='bg-black text-white text-sm px-4 py-2 rounded-md'>
									Print Bill
								</button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Orderpage;
