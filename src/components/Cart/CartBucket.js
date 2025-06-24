"use client";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartQuantity, removeCartItem } from '@/actions/cartAction';
import { Input } from '@material-tailwind/react';

const CartBucket = () => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector(state => state.cart);

	const [quantities, setQuantities] = useState(() => {
		return cartItems.reduce((acc, item) => {
			const key = `${item.product}-${item.size}-${item.color}`;
			acc[key] = item.quantity;
			return acc;
		}, {});
	});

	const handleRemove = (item) => {
		dispatch(removeCartItem(item.product, item.size, item.color));
	};

	const handleManualQuantityChange = (item, value) => {
		const key = `${item.product}-${item.size}-${item.color}`;
		const quantity = Math.max(1, parseInt(value) || 1);
		setQuantities({ ...quantities, [key]: quantity });
		dispatch(updateCartQuantity(item.product, item.size, item.color, quantity));
	};

	const total = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

	return (
		<div className='w-full bg-white flex justify-center items-center flex-col lg:px-10 lg:py-10 py-5 px-5'>
			<div className='flex flex-col justify-center items-center'>
				<h2 className='font-normal font-playfair lg:text-[42px] text-[20px] '>Shopping Cart</h2>
				<div className='flex justify-center items-center gap-2'>
					<h5 className='font-300 font-playfair lg:text-[15px] '>Home</h5>
					<img src="/asset/SVG.png" alt="" />
					<h4 className='font-300 font-playfair lg:text-[16px] '>Your Shopping Cart</h4>
				</div>
			</div>

			<div className="w-full">
				<h2 className="lg:text-[22px] font-normal mb-4">Your Cart</h2>
				<div className="grid grid-cols-1 border-y-[2px] py-5 border-[#00000063] md:grid-cols-3 gap-4">
					{cartItems.length === 0 ? (
						<p className="col-span-3 text-center text-gray-500">Your cart is empty</p>
					) : (
						cartItems.map((item, idx) => {
							const key = `${item.product}-${item.size}-${item.color}`;
							const quantity = quantities[key] || item.quantity;

							return (
								<div key={`${item.product}-${idx}`} className="flex gap-5 justify-start items-start p-4 rounded-md">
									<img src={item.image} alt={item.name} className="w-[168px] object-cover" />
									<div className="w-[50%] flex-col flex justify-start items-start">
										<p className="font-semibold text-[22px] mb-2">{item.name}</p>
										<p className="text-sm text-[22px] mb-2 text-[#8A8A8A]">Color: {item.color}</p>
										<p className="font-semibold mb-2">₹{Number(item.price).toFixed(2)}</p>

										<div className="w-fit overflow-hidden">
											<input
												type="number"
												label=" "
												min={1}
												value={quantity}
												onChange={(e) => handleManualQuantityChange(item, e.target.value)}
												className="!w-[50px] px-2 py-1 text-sm !border !border-gray-300"
												containerProps={{
													className: "min-w-0",
												}}
											/>
										</div>

										<button onClick={() => handleRemove(item)} className="text-sm text-[22px] text-gray-500 mt-2 underline">Remove</button>
									</div>
								</div>
							);
						})
					)}
				</div>

				{/* Order Summary */}
				<div className='flex justify-end items-end'>
					<div className="mt-8 lg:w-[40%] w-full">
						<div className="mt-6 md:mt-0">
							<div className="flex justify-between mb-2">
								<span className="font-300 text-gray-700 text-[18px]">Discount</span>
								<span className="text-gray-700 underline">Add</span>
							</div>
							<div className="border-t-2">
								<div className="flex justify-between mb-2">
									<span className="font-300 lg:text-[22px] text-[18px]">Order Value</span>
									<span className="text-black lg:text-[22px] text-[18px]">₹{total.toFixed(2)}</span>
								</div>
								<div className="flex justify-between mb-2">
									<span className="font-300 lg:text-[22px] text-[18px]">Estimated Delivery Fee</span>
									<span className="text-black lg:text-[22px] text-[18px]">Free</span>
								</div>
								<div className="flex justify-between font-semibold lg:text-[32px] text-[25px]">
									<span>Total</span>
									<span>₹{total.toFixed(2)}</span>
								</div>
								<button className="w-full mt-4 bg-black shadow-lg text-white py-2 hover:bg-gray-900">
									Checkout
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartBucket;
