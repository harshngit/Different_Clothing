"use client";

import { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { db } from '@/app/firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import { Input, Button, Select, Option } from '@material-tailwind/react';
import ImageUploading from 'react-images-uploading';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

const ReturnForm = ({ orderDetails }) => {
	const [returnReason, setReturnReason] = useState('');
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	console.log(orderDetails?.OrderID); // Debugging to check if OrderID exists

	const handleImageChange = (imageList) => {
		setImages(imageList);  // Update image state with the selected images
	};

	const handleSubmit = async () => {
		// if (!returnReason || images.length === 0) {
		// 	alert("Please fill in all fields and upload images.");
		// 	return;
		// }

		setLoading(true);

		try {
			const updatedOrderRef = doc(db, 'Order', orderDetails.OrderID);

			// Create an array of image URLs from the uploaded images
			const uploadedImageURLs = images.map((image) => image.data_url);

			// Update the Firestore document with the new return reason and images
			await updateDoc(updatedOrderRef, {
				returnReason,
				returnImages: uploadedImageURLs,
				orderStatus: 'Return Requested',
				status: 'Return',
			});

			toast.success("Return request submitted successfully!");
			router.push("/orders"); // Redirect to the orders page
			setLoading(false);
		} catch (error) {
			console.error("Error updating order:", error);
			setLoading(false);
		}
	};

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
				{/* <Select
					id="returnReason"
					value={returnReason}
					onChange={(e) => setReturnReason(e.target.value)}
					className="w-full"
				>
					<Option value="">Select a reason</Option>
					<Option value="Damaged">Damaged</Option>
					<Option value="Incorrect Size">Incorrect Size</Option>
					<Option value="Not as Expected">Not as Expected</Option>
					<Option value="Other">Other</Option>
				</Select> */}
			</div>

			{/* Image Uploading Section */}
			<div className="mb-6">
				<label className="block text-sm font-medium mb-2">Upload Images</label>
				<ImageUploading
					multiple
					value={images}
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
					className="bg-black text-white px-4 py-2 rounded-md"
				>
					{loading ? "Submitting..." : "Submit Return"}
				</Button>
			</div>
		</div>
	);
};

export default ReturnForm;
