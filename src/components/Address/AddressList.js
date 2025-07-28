import Link from "next/link";
import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase.config"; // Your firebase config file
import { useRouter } from "next/navigation";

const AddressList = ({ accountDetails, openModal, userProfile }) => {
	const router = useRouter();
	const handleDelete = async (addressId) => {
		try {
			const userDocRef = doc(db, "users", userProfile.uid);
			const updatedAddresses = accountDetails.address.filter(
				(item) => item.id !== addressId
			);
			await updateDoc(userDocRef, {
				address: updatedAddresses,
			});
			router.reload();
		} catch (error) {
			console.error("Error deleting address:", error);
		}
	};

	return (
		<div className="max-w-xl mx-auto py-10 px-4">
			<div className="flex justify-start items-center mb-4">
				<Link href="/viewProfile">
					<FiArrowLeft className="text-lg" />
				</Link>
			</div>

			<div className="flex flex-col justify-center items-center mb-6">
				<h2 className="text-lg font-semibold">MY ADDRESS</h2>
			</div>

			<div className="h-[50vh] overflow-y-scroll scrollbar-hide">
				{/* Check if there are addresses, and map through them */}
				{accountDetails?.address?.length > 0 ? (
					accountDetails.address.map((item, index) => (
						<div
							key={index}
							className="flex justify-between items-start px-4 py-3 border-2 border-black hover:shadow-xl rounded-lg transition-all duration-500 mb-4"
						>
							<div className="flex flex-col gap-1">
								<h5 className="font-semibold">Address</h5>
								<p>{item?.name}</p> {/* Address name */}
								<p>{item?.addressLine1}</p>
								<p>{item?.addressLine2}</p>
								<p>
									{item?.city} - {item?.pincode}, {item?.state}
								</p>
								<p>{item?.country}</p>
							</div>

							{/* Edit button for each address */}
							<div className="pr-3 group">
								<p
									onClick={() => handleDelete(item.id)} // Pass address ID to delete
									className="cursor-pointer relative transition-all duration-300"
								>
									Delete
									<span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
								</p>
							</div>
						</div>
					))
				) : (
					<p className="text-center text-gray-500">No Address Found</p>
				)}
			</div>

			{/* Add Address Button */}
			<div className="flex justify-end items-center relative group cursor-pointer mt-4">
				<p onClick={openModal} className="relative">
					Add Address
					<span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
				</p>
			</div>
		</div>
	);
};

export default AddressList;
