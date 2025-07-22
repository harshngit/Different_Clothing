"use client";

import { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { db } from '@/app/firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import { Input, Button } from '@material-tailwind/react';
import ImageUploading from 'react-images-uploading';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

const ReturnForm = ({ orderDetails }) => {
	// Function to generate a 5-digit random number
	const generateRandomNumber = () => {
		return Math.floor(10000 + Math.random() * 90000); // Generates a number between 10000 and 99999
	}

	// State to store the returnOrder object (returnId, returnReason, and images)
	const [returnOrder, setReturnOrder] = useState({
		returnId: generateRandomNumber(),  // Generate returnId
		returnReason: "",  // Store return reason here
		images: [],  // Store uploaded images here
	});

	const [loading, setLoading] = useState(false);

	const router = useRouter();

	console.log(orderDetails?.OrderID); // Debugging to check if OrderID exists

	// Handle image selection
	const handleImageChange = (imageList) => {
		setReturnOrder({ ...returnOrder, images: imageList });  // Update images in the returnOrder object
	};

	// Handle return reason selection
	const handleReturnReasonChange = (e) => {
		setReturnOrder({ ...returnOrder, returnReason: e.target.value });  // Update returnReason in returnOrder object
	};

	// Handle form submission
	const handleSubmit = async () => {
		if (!returnOrder.returnReason || returnOrder.images.length === 0) {
			alert("Please fill in all fields and upload images.");
			return;
		}

		setLoading(true);

		try {
			const updatedOrderRef = doc(db, 'Order', orderDetails.OrderID);

			// Create an array of image URLs from the uploaded images
			const uploadedImageURLs = returnOrder.images.map((image) => image.data_url);

			// Update the Firestore document with the new return data
			await updateDoc(updatedOrderRef, {
				returnId: returnOrder.returnId,
				returnReason: returnOrder.returnReason,
				returnImages: uploadedImageURLs,
				orderStatus: "Return Processing",
				status: "Processing",
			});

			toast.success("Return request submitted successfully!");
			router.push("/orders"); // Redirect to the orders page
			setLoading(false);
		} catch (error) {
			console.error("Error updating order:", error);
			setLoading(false);
		}
	};

	// Predefined return reasons
	const reason = [
		{ value: "", label: "Select a reason" },
		{ value: "Damaged", label: "Damaged" },
		{ value: "Incorrect Size", label: "Incorrect Size" },
		{ value: "Not as Expected", label: "Not as Expected" },
		{ value: "Order of T-shirt brand", label: "Order of T-shirt brand" },

	];

	return (
		<div className="max-w-xl mx-auto py-10 px-4">
			<ToastContainer />
			{/* Back to Orders Button */}
			<div className="flex justify-start items-center">
				<Link href="/orders">
					<FiArrowLeft className="text-lg" />
				</Link>
			</div>

			{/* Form Title */}
			<div className="flex flex-col justify-center items-center">
				<h2 className="text-lg font-semibold mb-8">RETURN & REFUND FORM</h2>
			</div>

			{/* Order Details */}
			<div className="space-y-5 mb-5">
				<div>
					<label htmlFor="" className="block text-sm font-medium mb-2">Customer Name</label>
					<Input
						disabled
						value={orderDetails?.customerName}
					/>
				</div>
				<div>
					<label htmlFor="" className="block text-sm font-medium mb-2">Phone Number</label>
					<Input
						disabled
						value={orderDetails?.phone}
					/>
				</div>
				<div>
					<label htmlFor="" className="block text-sm font-medium mb-2">Address</label>
					<Input
						disabled
						value={orderDetails?.dropoff_location?.address}
					/>
				</div>
				<div>
					<label htmlFor="" className="block text-sm font-medium mb-2">City</label>
					<Input
						disabled
						value={orderDetails?.dropoff_location?.city}
					/>
				</div>
				<div>
					<label htmlFor="" className="block text-sm font-medium mb-2">State</label>
					<Input
						disabled
						value={orderDetails?.dropoff_location?.region}
					/>
				</div>
				<div>
					<label htmlFor="" className="block text-sm font-medium mb-2">Pincode</label>
					<Input
						disabled
						value={orderDetails?.dropoff_location?.zip}
					/>
				</div>
			</div>

			{/* Return Reason Select */}
			<div className="mb-6">
				<label htmlFor="returnReason" className="block text-sm font-medium mb-2">Return Reason</label>
				<select
					value={returnOrder.returnReason}
					onChange={handleReturnReasonChange}  // Set the selected return reason
					className="w-full p-2 border border-gray-300 rounded-lg"
				>
					{reason.map((reason) => (
						<option key={reason.value} value={reason.value}>
							{reason.label}
						</option>
					))}
				</select>
			</div>

			{/* Image Uploading Section */}
			<div className="mb-6">
				<label className="block text-sm font-medium mb-2">Upload Images</label>
				<ImageUploading
					multiple
					value={returnOrder.images}
					onChange={handleImageChange}
					dataURLKey="data_url"
				>
					{({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove }) => (
						<div>
							{/* Display the uploaded images */}
							<div className="flex gap-8 flex-wrap border-[1px] rounded-lg px-5 py-5 border-[#000]">
								{imageList.map((image, index) => (
									<div key={index} className="relative flex justify-center">
										<img
											src={image.data_url}
											alt={`Uploaded image ${index}`}
											className="w-24 h-24 object-cover rounded-md border"
										/>
										<div className="absolute -bottom-3 flex justify-center gap-1 mt-1">
											<button
												type="button"
												onClick={() => onImageUpdate(index)}
												className="text-xs bg-green-500 text-white px-2 py-1 rounded"
											>
												Update
											</button>
											<button
												type="button"
												onClick={() => onImageRemove(index)}
												className="text-xs bg-red-500 text-white px-2 py-1 rounded"
											>
												Remove
											</button>
										</div>
									</div>
								))}
							</div>
							<Button type="button" className="mt-4 mr-4" onClick={onImageUpload}>
								Upload Images
							</Button>
							<Button type="button" onClick={onImageRemoveAll} className="mt-4 mr-4">
								Remove All
							</Button>
						</div>
					)}
				</ImageUploading>
			</div>

			{/* Submit Button */}
			<div className="flex justify-end mt-5">
				<Button
					onClick={handleSubmit}
					disabled={loading}
					className=""
				>
					{loading ? "Submitting..." : "Submit Return"}
				</Button>
			</div>
		</div>
	);
};

export default ReturnForm;
