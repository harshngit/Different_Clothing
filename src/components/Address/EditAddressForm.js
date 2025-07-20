import React, { useState } from "react";
import { db } from "@/app/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { Input } from "@material-tailwind/react";

const EditAddressForm = ({ address, closeModal }) => {
	// Ensure the address has an ID (use address.userId as fallback if no address.id exists)
	const [formData, setFormData] = useState({
		...address,
		id: address.id || address.userId, // Fallback to userId if id is not present
	});

	// Function to handle input changes
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Function to handle form submission (updating Firestore)
	const handleSubmit = async () => {
		try {
			// Ensure that formData.id exists before updating Firestore
			if (!formData.id) {
				console.error("Address ID is missing");
				return;
			}

			// If 'address' is not an array, we just update the document directly
			const userRef = doc(db, "users", address.userId); // Assuming address has userId field

			// Directly update the address object (since it's not an array)
			await updateDoc(userRef, {
				// Update the address object directly
				address: formData, // Assuming address is an object, not an array
			});

			console.log("Address updated:", formData);
			closeModal(); // Close the modal after successful update
		} catch (error) {
			console.error("Error updating address:", error);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
				<h2 className="text-2xl font-semibold mb-4">Edit Address</h2>

				{/* Name Input */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Name</label>
					<Input
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="mt-1"
						required
					/>
				</div>

				{/* Address Line 1 */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Address Line 1</label>
					<Input
						name="addressLine1"
						value={formData.addressLine1}
						onChange={handleChange}
						className="mt-1"
						required
					/>
				</div>

				{/* Address Line 2 */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Address Line 2</label>
					<Input
						name="addressLine2"
						value={formData.addressLine2}
						onChange={handleChange}
						className="mt-1"
					/>
				</div>

				{/* City Input */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">City</label>
					<Input
						name="city"
						value={formData.city}
						onChange={handleChange}
						className="mt-1"
						required
					/>
				</div>

				{/* State Input */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">State</label>
					<Input
						name="state"
						value={formData.state}
						onChange={handleChange}
						className="mt-1"
						required
					/>
				</div>

				{/* Country Input */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Country</label>
					<Input
						name="country"
						value={formData.country}
						onChange={handleChange}
						className="mt-1"
					/>
				</div>

				{/* Pincode Input */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Pincode</label>
					<Input
						name="pincode"
						value={formData.pincode}
						onChange={handleChange}
						className="mt-1"
						required
					/>
				</div>

				{/* Submit Button */}
				<div className="mb-4 flex justify-between">
					<button
						type="button"
						onClick={handleSubmit}
						className="py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800"
					>
						Save Changes
					</button>
					<button
						type="button"
						className="py-2 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
						onClick={closeModal}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditAddressForm;
