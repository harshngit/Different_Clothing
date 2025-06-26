"use client"

import Link from 'next/link';
import React from 'react'
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from 'react-redux';
const ProfilePage = () => {
	const { userProfile } = useSelector(state => state.user)
	const menuItems = [
		{
			name: "My Purchases",
			link: "",
		},
		{
			name: "My Details",
			link: "/accoutDetails",
		},
		{
			name: "Wishlist",
			link: "/wishlist",
		}
	];
	return (
		<div className="w-full max-w-md mx-auto p-6">
			<div>
				<h2 className='text-[40px] my-[20px]'>
					{userProfile?.displayName}
				</h2>
			</div>
			<ul className="space-y-5">
				{menuItems.map((item, idx) => (
					<li key={idx} className="flex justify-between items-center text-sm font-medium text-black hover:opacity-70 cursor-pointer">
						<Link href={item.link} className="flex justify-between w-full items-center">
							<span className="uppercase">{item.name}</span>
							<FiArrowRight className="text-lg" />
						</Link>
					</li>
				))}
			</ul>

			<div className="mt-12">
				<button
					// onClick={onSignOut}
					className="text-sm hover:underline text-black hover:text-gray-800"
				>
					Sign out
				</button>
			</div>
		</div>
	)
}

export default ProfilePage