"use client";

import React from 'react';
import { useSelector } from 'react-redux';

const CartCheckoutDetails = () => {
	const { cartItems } = useSelector(state => state.cart);

	// 🧮 Calculate subtotal (before discount)
	const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

	// 🧾 Calculate total discount
	const totalDiscount = cartItems.reduce((acc, item) => {
		const discount = parseFloat(item?.discountAmount || 0);
		return acc + discount;
	}, 0);

	// ✅ Calculate final total after discount
	const finalTotal = Math.max(subtotal - totalDiscount, 0);

	return (
		<div className='bg-gray-600 px-5 py-5 pt-[50px]'>
			<div className="max-w-xl w-full mx-auto p-6 bg-white rounded-md shadow-md">
				{/* Cart Items */}
				<div className='flex flex-col gap-5 h-[250px] overflow-y-scroll scroll-smooth'>
					{cartItems.map((item, index) => (
						<div key={index} className="flex items-start gap-4 relative">
							<div className="relative w-[70px] h-[70px]">
								<img
									src={item.image}
									alt={item.name}
									className="w-full h-full object-cover rounded"
								/>
								<div className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
									{item.quantity}
								</div>
							</div>

							<div className="flex-1">
								<h2 className="text-sm font-medium text-gray-800">{item.name}</h2>
								<div className='flex justify-start items-center'>
									<p className="text-xs text-gray-500 mt-1">{item.size}</p> /
									<div
										style={{ background: item?.color }}
										className="w-5 h-5 rounded-full border ml-1"
									/>
								</div>
							</div>

							<p className="text-sm font-semibold text-gray-900">
								₹{(item.price * item.quantity).toFixed(2)}
							</p>
						</div>
					))}
				</div>

				{/* Price Summary */}
				<div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-2">
					<div className="flex justify-between">
						<span>Subtotal</span>
						<span>₹{subtotal.toFixed(2)}</span>
					</div>

					{/* Display Applied Coupon Info */}
					{cartItems.map((item, idx) => (
						<div key={idx} className='flex justify-between'>
							<span>Coupon</span>
							{item?.couponCode ? (
								<span>
									{item.couponCode} (-₹{parseFloat(item.discountAmount || 0).toFixed(2)})
								</span>
							) : (
								<span>No Coupon Used</span>
							)}
						</div>
					))}

					{/* Shipping */}
					<div className="flex justify-between">
						<span>
							Shipping <span className="text-xs text-gray-500">(Free)</span>
						</span>
						<span>₹0</span>
					</div>
				</div>

				{/* Final Total */}
				<div className="mt-4 flex justify-between items-center text-black text-base font-bold">
					<span>Total</span>
					<span className="text-right">INR ₹{finalTotal.toFixed(2)}</span>
				</div>
			</div>
		</div>
	);
};

export default CartCheckoutDetails;
