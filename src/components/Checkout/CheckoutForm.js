"use client";

import React, { useEffect, useState } from "react";
import { Input, Select, Option, Radio } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { placeOrder } from "@/actions/orderAction";
// toast removed
import CartAddress from "./CartAddress";
import { db } from "@/app/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";

const CheckoutForm = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { cartItems } = useSelector((state) => state.cart);
	const { userProfile } = useSelector((state) => state.user);

	const [accountDetails, setAccountDetails] = useState({});
	const [addressList, setAddressList] = useState([]);

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

	const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	const totalDiscount = cartItems.reduce((acc, item) => acc + parseFloat(item?.discountAmount || 0), 0);
	const finalAmount = Math.max(totalAmount - totalDiscount, 0);
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
            .then(() => {})
			.catch((error) => console.error(error));
	};

	const handleAddressSelect = (selectedAddress) => {
		setFormData((prev) => ({
			...prev,
			firstName: selectedAddress.firstName || "",
			lastName: selectedAddress.lastName || "",
			address: selectedAddress.addressLine1 || "",
			apartment: selectedAddress.addressLine2 || "",
			city: selectedAddress.city || "",
			state: selectedAddress.state || "",
			pincode: selectedAddress.pincode || "",
			phone: selectedAddress.phone || "",
			country: selectedAddress.country || "",
		}));
	};

	useEffect(() => {
		if (!userProfile?.uid) return;

		const unsubscribe = onSnapshot(doc(db, "users", userProfile.uid), (docSnap) => {
			if (docSnap.exists()) {
				const data = docSnap.data();
				setAccountDetails(data);
			}
		}, (error) => {
			console.error("Error fetching user data:", error);
		});

		return () => unsubscribe();
	}, [userProfile?.uid]);

	console.log(accountDetails)

	return (
		<>
            {/* toast removed */}
			<div className="lg:h-[100vh] h-auto overflow-y-scroll">
				<div className='flex flex-col  justify-start items-start px-10 py-10'>
					<h2 className='text-[20px] font-semibold'>Select the address</h2>
					<CartAddress accountDetails={accountDetails} onSelect={handleAddressSelect} />
				</div>

				<div className="max-w-lg mx-auto px-4 py-6">
					<h2 className="text-xl font-bold mb-4">Contact</h2>
					<Input type="email" name="email" placeholder="Enter Your Email" label="Email" value={formData.email} onChange={handleChange} className="mb-4" />
				</div>

				<div className="max-w-lg mx-auto px-4 py-6 rounded-md">
					<h2 className="text-xl font-bold mb-4">Delivery</h2>
					<div className="mb-4">
						<label className="text-sm font-medium text-gray-700 mb-1 block">Country/Region</label>
						<Select label="Country/Region" value={formData.country} onChange={(val) => setFormData({ ...formData, country: val })}>
							<Option value="India">India</Option>
							<Option value="USA">USA</Option>
						</Select>
					</div>

					<div className="flex gap-4 mb-4">
						<Input label="First name" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full" />
						<Input label="Last name" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full" />
					</div>

					<div className="flex flex-col gap-4 space-y-2">
						<Input className="mb-4" label="Address" name="address" value={formData.address} onChange={handleChange} />
						<Input className="mb-4" label="Apartment, suite, etc." name="apartment" value={formData.apartment} onChange={handleChange} />
					</div>

					<div className="flex mt-4 mb-4 gap-4">
						<Input label="City" name="city" value={formData.city} onChange={handleChange} className="w-full" />
						<Select label="State" value={formData.state} onChange={(val) => setFormData({ ...formData, state: val })}>
							<Option value="Maharashtra">Maharashtra</Option>
							<Option value="Delhi">Delhi</Option>
							<Option value="Gujarat">Gujarat</Option>
						</Select>
					</div>

					<div className="flex flex-col gap-4">
						<Input className="mb-4" label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
						<Input className="mb-4" label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
					</div>
				</div>

				<div className="max-w-lg mx-auto px-4 py-6 rounded-md">
					<h2 className="text-xl font-bold">Payment Methods</h2>
					<p className="text-sm font-light mb-4">All transactions are secure and encrypted.</p>
					<Radio defaultChecked value="cod" label="COD (Cash On Delivery)" name="paymentMethod" onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} />
				</div>

				<div className="max-w-lg mx-auto px-4 py-6">
					<div className="text-sm text-gray-700 mb-2 flex justify-between">
						<span>Total:</span>
						<span>₹{finalAmount.toFixed(2)}</span>
					</div>
					<button onClick={handlePlaceOrder} className="bg-black px-5 text-white py-2 w-full">Place Order</button>
				</div>
			</div>
		</>
	);
};

export default CheckoutForm;
