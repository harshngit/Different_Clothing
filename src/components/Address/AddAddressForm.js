"use client";
import React, { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "@/app/firebase.config";
// toast removed
import { Input, MenuItem, Select } from "@material-tailwind/react";

const AddAddressForm = ({ closeModal }) => {
	const { userProfile } = useSelector((state) => state.user);

	const [formData, setFormData] = useState({
		name: "",
		addressLine1: "",
		addressLine2: "",
		city: "",
		state: "",
		country: "",
		pincode: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Generate a random 5-letter ID
		const generateRandomId = () => {
			const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
			let randomId = '';
			for (let i = 0; i < 5; i++) {
				randomId += characters.charAt(Math.floor(Math.random() * characters.length));
			}
			return randomId;
		};

		// Add the generated ID to the form data
		const addressWithId = {
			...formData,
			id: generateRandomId(), // Add random ID to form data
		};

		try {
			const userRef = doc(db, "users", userProfile.uid);
			await updateDoc(userRef, {
				address: arrayUnion(addressWithId),
			});
            // success notification removed

			// Reset the form data
			setFormData({
				name: "",
				addressLine1: "",
				addressLine2: "",
				city: "",
				state: "",
				country: "",
				pincode: "",
				id: "", // Keep it here for consistency
			});
			closeModal();
		} catch (error) {
			console.error("Error adding address:", error);
		}
	};


	return (
		<div className="max-w-xl mx-auto h-[65vh] overflow-y-scroll p-6 space-y-4 border mt-10 bg-white rounded-lg shadow-lg">
			<h2 className="text-2xl font-semibold text-center">Add New Address</h2>

			{/* Name Input */}
			<div className="w-full">
				<label className="block text-sm font-medium text-gray-700">Name</label>
				<Input
					label="Name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Full Name"
					className="mb-4"
				/>
			</div>

			{/* Address Line 1 Input */}
			<div className="w-full">
				<label className="block text-sm font-medium text-gray-700">Address Line 1</label>
				<Input
					label="Address Line 1"
					name="addressLine1"
					value={formData.addressLine1}
					onChange={handleChange}
					placeholder="Address Line 1"
					className="mb-4"
				/>
			</div>

			{/* Address Line 2 Input */}
			<div className="w-full">
				<label className="block text-sm font-medium text-gray-700">Address Line 2</label>
				<Input
					label="Address Line 2"
					name="addressLine2"
					value={formData.addressLine2}
					onChange={handleChange}
					placeholder="Address Line 2 (Optional)"
					className="mb-4"
				/>
			</div>

			{/* City Input */}
			<div className="w-full">
				<label className="block text-sm font-medium text-gray-700">City</label>
				<Input
					label="City"
					name="city"
					value={formData.city}
					onChange={handleChange}
					placeholder="City"
					className="mb-4"
				/>
			</div>

			{/* State Input */}
			<div className="w-full">
				<label className="block text-sm font-medium text-gray-700">State</label>
				<Input
					label="State"
					name="state"
					value={formData.state}
					onChange={handleChange}
					placeholder="State"
					className="mb-4"
				/>
			</div>

			{/* Country Select */}
			<div className="w-full">
				<label className="block text-sm font-medium text-gray-700">Country</label>
				<Input
					name="country"
					value={formData.country}
					onChange={handleChange}
					label="Country"
					className="mb-4"
				/>
			</div>

			{/* Pincode Input */}
			<div className="w-full">
				<label className="block text-sm font-medium text-gray-700">Pincode</label>
				<Input
					label="Pincode"
					name="pincode"
					value={formData.pincode}
					onChange={handleChange}
					placeholder="Pincode"
					className="mb-4"
				/>
			</div>

			{/* Submit Button */}
			<div className="w-full">
				<button
					onClick={handleSubmit}
					className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					Add Address
				</button>
			</div>
		</div>
	);
};

export default AddAddressForm;
