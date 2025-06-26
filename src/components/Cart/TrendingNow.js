"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/app/firebase.config'

const TrendingNow = () => {

	const [product, setProduct] = useState([]);

	const fetchProduct = async () => {
		try {
			const productRef = collection(db, "Product");
			const q = query(productRef, where("productStatus", "==", "Published"), orderBy("createdAtDate", "desc"));
			const querySnapshot = await getDocs(q);

			const products = [];
			querySnapshot.forEach((doc) => {
				products.push({ id: doc.id, ...doc.data() });
			});

			return products;
		} catch (error) {
			console.error("Error fetching products:", error);
			return [];
		}
	};

	console.log(product)



	useEffect(() => {
		const getProducts = async () => {
			const latestProducts = await fetchProduct();
			setProduct(latestProducts);
		};
		getProducts();
	}, []);

	const [liked, setLiked] = useState(false);

	const handleToggle = () => {
		setLiked((prev) => !prev);
	};

	return (
		<div className='w-full  '>
			<div className='flex justify-between items-center lg:px-5 px-5 py-5 lg:py-5'>
				<div className='flex justify-start items-center gap-5'>
					<h2 className='font-normal lg:text-[32px] text-[22px] text-[#484848]'> Trending Now  </h2>
				</div>
				<div>
					<Link href="/shop"><h3 className='font-bold text-[20px]'>EXPLORE MORE</h3></Link>
				</div>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-y-[50px] mb-10">
				{product.slice(0, 4).map((product) => (
					<Link href={`shop/${product.id}`}>
						<div key={product.id} className="bg-white overflow-hidden shadow-sm group">
							<div className="relative">
								{/* Product Image (Hover effect) */}
								<div >
									<img
										src={product.productImages?.[0]} // main image
										alt={product.title}
										className="w-full lg:h-[400px] object-cover transition-opacity duration-300 group-hover:opacity-0"
									/>

									<img
										src={product.productImages?.[1]} // hover image
										alt={`${product.title} hover`}
										className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
									/>

								</div>
								{/* Heart Icon */}
								{/* <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 text-gray-800"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21.435 6.577a5.377 5.377 0 00-7.6 0L12 8.412l-1.835-1.835a5.377 5.377 0 00-7.6 7.6l1.835 1.835L12 21.435l7.6-7.6 1.835-1.835a5.377 5.377 0 000-7.6z"
									/>
								</svg>
							</button> */}
							</div>

							{/* Product Info */}
							<div className="p-3 flex justify-between items-start">
								<div className='flex flex-col gap-2 justify-start items-start'>
									<div>
										<p className='text-black lg:text-[15px] text-[10px]'>{product?.productCategory}</p>
										<Link href={`shop/${product.id}`}><h3 className="lg:text-[20px] text-[12px] font-semibold">{product.productName}</h3></Link>
										<p className="text-gray-700 font-bold lg:-text-[15px] text-[12px]">${product.productPrice}</p>
									</div>
									{
										product.variation.map((item) => (
											<div className="flex justify-center items-center gap-2">
												<div className={`w-5 h-5 rounded-full border border-black`} style={{ backgroundColor: item.color }}></div>
											</div>
										))
									}
								</div>
								<button onClick={handleToggle} className="">

									<img
										src={liked ? '/asset/heartred.png' : '/asset/heart.png'}
										alt="heart icon"
										className="w-6 h-6"
									/>
								</button>
							</div>
						</div>
					</Link>
				))}
			</div>

		</div>
	)
}

export default TrendingNow