"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartQuantity, removeCartItem, applyCouponToCart } from "@/actions/cartAction";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import Link from "next/link";
import { db } from "@/app/firebase.config";
import { useRouter } from "next/navigation";

const CartBucket = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { cartItems } = useSelector((state) => state.cart);
	const { isAuthenticated, userProfile } = useSelector((state) => state.user);

	const [quantities, setQuantities] = useState({});
	const [couponList, setCouponList] = useState([]);
	const [showCoupon, setShowCoupon] = useState(false);
	const [appliedCoupon, setAppliedCoupon] = useState(null);
	const [finalTotal, setFinalTotal] = useState(0);

	useEffect(() => {
		const initQuantities = cartItems.reduce((acc, item) => {
			const key = `${item.product}-${item.size}-${item.color}`;
			acc[key] = item.quantity;
			return acc;
		}, {});
		setQuantities(initQuantities);
	}, [cartItems]);

	useEffect(() => {
		const fetchCoupons = async () => {
			try {
				const q = query(collection(db, "Coupon"), where("couponStatus", "==", "Active"));
				const snapshot = await getDocs(q);
				const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
				setCouponList(list);
			} catch (error) {
				console.error("Error fetching coupons:", error);
			}
		};
		fetchCoupons();
	}, []);

	const handleManualQuantityChange = (item, value) => {
		const key = `${item.product}-${item.size}-${item.color}`;
		const qty = Math.max(1, parseInt(value) || 1);
		setQuantities({ ...quantities, [key]: qty });
		dispatch(updateCartQuantity(item.product, item.size, item.color, qty));
	};

	const handleRemove = (item) => {
		dispatch(removeCartItem(item.product, item.size, item.color));
	};

	const baseTotal = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

	const handleApply = async (coupon) => {
		setAppliedCoupon(coupon);

		let discountAmount = 0;
		if (coupon.couponAmountDetails === "price") {
			discountAmount = Number(coupon.couponAmount);
		} else {
			discountAmount = (Number(coupon.couponAmount) / 100) * baseTotal;
		}

		const discountedTotal = Math.max(baseTotal - discountAmount, 0);
		setFinalTotal(discountedTotal);

		dispatch(applyCouponToCart(coupon));
	};

	useEffect(() => {
		if (!appliedCoupon) setFinalTotal(baseTotal);
	}, [baseTotal, appliedCoupon]);

	const handleCheckout = async () => {
		try {
			if (appliedCoupon && userProfile?.uid) {
				const couponRef = doc(db, "Coupon", appliedCoupon.id);
				await updateDoc(couponRef, {
					appliedBy: arrayUnion(userProfile.uid),
				});
			}

			dispatch(applyCouponToCart(appliedCoupon));
			router.push("/checkout");
		} catch (err) {
			console.error("Checkout failed:", err);
		}
	};

	return (
		<div className="w-full bg-white flex justify-center items-center flex-col lg:px-10 lg:py-10 py-5 px-5">
			<h2 className="font-playfair text-[24px] lg:text-[42px] font-normal mb-2">Shopping Cart</h2>

			<div className="w-full">
				<h2 className="text-[18px] lg:text-[22px] font-normal mb-4">Your Cart</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y-2 py-5 border-gray-300">
					{cartItems.length === 0 ? (
						<p className="col-span-3 text-center text-gray-500">Your cart is empty</p>
					) : (
						cartItems.map((item, idx) => {
							const key = `${item.product}-${item.size}-${item.color}`;
							const qty = quantities[key] || item.quantity;

							return (
								<div key={idx} className="flex gap-5 p-4">
									<img src={item.image} className="w-[168px] h-[180px] object-cover" />
									<div className="flex flex-col w-[50%]">
										<p className="text-[22px] font-semibold mb-2">{item.name}</p>
										<p className="text-sm mb-2">Size: {item.size}</p>
										<div className="flex items-center gap-2 mb-2">
											<p className="text-sm">Color:</p>
											<div className="w-5 h-5 border-[1px  ] border-black" style={{ backgroundColor: item.color }} />
										</div>
										<p className="font-semibold mb-2">₹{Number(item.price).toFixed(2)}</p>
										<input
											type="number"
											min={1}
											max={item?.totalQuantity}
											value={qty}

											onChange={(e) => handleManualQuantityChange(item, e.target.value)}
											className="w-[50px] px-2 py-1 border text-sm"
										/>
										<button onClick={() => handleRemove(item)} className="text-sm text-gray-500 mt-2 underline">
											Remove
										</button>
									</div>
								</div>
							);
						})
					)}
				</div>

				{/* Order Summary */}
				<div className="flex justify-end">
					<div className="w-full lg:w-[40%] mt-8">
						{/* Coupon Toggle */}
						<div className="flex justify-between cursor-pointer mb-2" onClick={() => setShowCoupon(!showCoupon)}>
							<span className="text-[18px] text-gray-700">Discount</span>
							<span className="underline text-gray-700">{showCoupon ? "Hide" : "Add"}</span>
						</div>

						{/* Coupon List */}
						<div className={`transition-all duration-300 ${showCoupon ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
							{couponList.map((coupon) => (
								<div key={coupon.id} className="border p-3 mb-3 rounded-md bg-gray-50 flex justify-between items-center">
									<div>
										<p className="text-sm font-medium">{coupon.couponName}</p>
										<p className="text-xs text-gray-500 mb-1">
											{coupon.couponAmountDetails === "price"
												? `₹${coupon.couponAmount}`
												: `${coupon.couponAmount}% off`}
										</p>
										<span className="bg-white border px-2 py-1 rounded text-sm font-mono">{coupon.couponCode}</span>
									</div>
									<button
										onClick={() => handleApply(coupon)}
										className={`text-sm px-4 py-1 rounded ${appliedCoupon?.id === coupon.id
											? "bg-green-600 text-white"
											: "bg-black text-white hover:bg-gray-800"
											}`}
									>
										{appliedCoupon?.id === coupon.id ? "Applied" : "Apply"}
									</button>
								</div>
							))}
						</div>

						{/* Totals */}
						<div className="border-t-2 pt-4 mt-4">
							<div className="flex justify-between mb-2">
								<span className="text-[18px]">Order Value</span>
								<span className="text-[18px]">₹{baseTotal.toFixed(2)}</span>
							</div>
							<div className="flex justify-between mb-2">
								<span className="text-[18px]">Estimated Delivery Fee</span>
								<span className="text-[18px]">Free</span>
							</div>
							<div className="flex justify-between text-[22px] font-semibold">
								<span>Total</span>
								<span>₹{finalTotal.toFixed(2)}</span>
							</div>

							{isAuthenticated ? (
								cartItems.length > 0 ? (
									<Link href="/checkout">
										<button
											onClick={handleCheckout}
											className="w-full mt-4 bg-black text-white py-2 hover:bg-gray-900"
										>
											Checkout
										</button>
									</Link>
								) : (
									<Link href="/shop">
										<button className="w-full mt-4 bg-black text-white py-2 hover:bg-gray-900">Shop</button>
									</Link>
								)
							) : (
								<Link href="/login">
									<button className="w-full mt-4 bg-black text-white py-2 hover:bg-gray-900">Login</button>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartBucket;
