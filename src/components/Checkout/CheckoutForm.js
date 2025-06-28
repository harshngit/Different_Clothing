"use client";

import React, { useState } from "react";
import { Input, Select, Option, Radio } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { placeOrder } from "@/actions/orderAction";
import { toast, ToastContainer } from "react-toastify";

const CheckoutForm = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { cartItems } = useSelector((state) => state.cart);
	const { userProfile } = useSelector((state) => state.user);

	const [formData, setFormData] = useState({
		email: "",
		country: "",
		firstName: "",
		lastName: "",
		address: "",
		apartment: "",
		city: "",
		state: "",
		pincode: "",
		phone: "",
		paymentMethod: "cod",
	});

	// 🧮 Total Price (before discount)
	const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

	// 🧾 Total Discount
	const totalDiscount = cartItems.reduce((acc, item) => {
		const discount = parseFloat(item?.discountAmount || 0);
		return acc + discount;
	}, 0);

	// ✅ Final Amount after discount
	const finalAmount = Math.max(totalAmount - totalDiscount, 0);

	// Get first coupon info (assuming one coupon applies across cart)
	const appliedCoupon = cartItems.find(item => item?.couponId);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handlePlaceOrder = () => {
		const orderData = {
			...formData,
			name: `${formData.firstName} ${formData.lastName}`,
			couponId: appliedCoupon?.couponId || null,
			couponCode: appliedCoupon?.couponCode || null,
			discountAmount: totalDiscount.toFixed(2),
		};

		dispatch(placeOrder(orderData, cartItems, userProfile, finalAmount, router))
			.then(() => {
				toast.success("Order placed successfully!");
			})
			.catch((error) => {
				console.error(error); // toast already handled in action
			});
	};

	return (
		<>
			<ToastContainer />
			<div className="lg:h-[100vh] h-auto overflow-y-scroll">
				<div className="max-w-lg mx-auto px-4 py-6">
					<h2 className="text-xl font-bold mb-4">Contact</h2>
					<Input
						type="email"
						name="email"
						placeholder="Enter Your Email"
						label="Email"
						value={formData.email}
						onChange={handleChange}
						className="mb-4"
					/>
				</div>

				<div className="max-w-lg mx-auto px-4 py-6 rounded-md">
					<h2 className="text-xl font-bold mb-4">Delivery</h2>

					<div className="mb-4">
						<label className="text-sm font-medium text-gray-700 mb-1 block">Country/Region</label>
						<Select label="Country/Region" onChange={(val) => setFormData({ ...formData, country: val })}>
							<Option value="India">India</Option>
							<Option value="USA">USA</Option>
						</Select>
					</div>

					<div className="flex gap-4 mb-4">
						<Input
							label="First name"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							className="w-full"
						/>
						<Input
							label="Last name"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className="w-full"
						/>
					</div>

					<div className="mb-4">
						<Input
							label="Address"
							name="address"
							value={formData.address}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-4">
						<Input
							label="Apartment, suite, etc."
							name="apartment"
							value={formData.apartment}
							onChange={handleChange}
						/>
					</div>

					<div className="flex gap-4 mb-4">
						<Input
							label="City"
							name="city"
							value={formData.city}
							onChange={handleChange}
							className="w-full"
						/>
						<Select
							label="State"
							onChange={(val) => setFormData({ ...formData, state: val })}
						>
							<Option value="Maharashtra">Maharashtra</Option>
							<Option value="Delhi">Delhi</Option>
							<Option value="Gujarat">Gujarat</Option>
						</Select>
					</div>

					<div className="mb-4">
						<Input
							label="Pincode"
							name="pincode"
							value={formData.pincode}
							onChange={handleChange}
						/>
					</div>

					<div className="mb-4">
						<Input
							label="Phone"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="max-w-lg mx-auto px-4 py-6 rounded-md">
					<h2 className="text-xl font-bold">Payment Methods</h2>
					<p className="text-sm font-light mb-4">All transactions are secure and encrypted.</p>
					<Radio
						defaultChecked
						value="cod"
						label="COD (Cash On Delivery)"
						name="paymentMethod"
						onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
					/>
				</div>

				<div className="max-w-lg mx-auto px-4 py-6">
					<div className="text-sm text-gray-700 mb-2 flex justify-between">
						<span>Total:</span>
						<span>₹{finalAmount.toFixed(2)}</span>
					</div>
					<button onClick={handlePlaceOrder} className="bg-black px-5 text-white py-2 w-full">
						Place Order
					</button>
				</div>
			</div>
		</>
	);
};

export default CheckoutForm;
