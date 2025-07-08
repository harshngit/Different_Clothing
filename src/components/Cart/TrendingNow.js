"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/app/firebase.config'
import { useDispatch, useSelector } from 'react-redux'
import { loadWishlistFromStorage, toggleWishlistItem } from '@/actions/wishlistActions'
import { toast, ToastContainer } from 'react-toastify'
import ProductCard from '../ProductCard'

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

	const dispatch = useDispatch();
	const wishlist = useSelector((state) => state.wishlist.wishlist);

	const { userProfile } = useSelector((state) => state.user)
	const userId = userProfile?.uid;

	useEffect(() => {
		dispatch(loadWishlistFromStorage());
	}, [dispatch]);

	const handleToggle = (product) => {
		dispatch(toggleWishlistItem(userId, product));

		const isInWishlist = wishlist?.[userId]?.some(p => p.id === product.id);
		if (!isInWishlist) {
			toast.success("Product added to wishlist", { autoClose: 1500 });
		} else {
			toast.info("Product removed from wishlist", { autoClose: 1500 });
		}
	};

	const isLiked = (productId) => wishlist?.[userId]?.some(p => p.id === productId);


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

			<ProductCard isLiked={isLiked} product={product.slice(0, 4)} handleToggle={handleToggle} />

			<ToastContainer position="bottom-left" />
		</div>
	)
}

export default TrendingNow