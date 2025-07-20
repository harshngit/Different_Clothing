import React from "react";
import { Input, Select, Option, Button } from "@material-tailwind/react";

const AddressForm = ({
	address,
	setAddress,
	handleCreateUser,
	handleSkipAddress,
	handleBackStep,
	loading,
}) => {
	// Working on the first address object in the array
	const currentAddress = address[0];

	const handleChange = (field, value) => {
		const updated = [...address];
		updated[0] = { ...updated[0], [field]: value };
		setAddress(updated);
	};

	return (
		<div className="w-full max-w-md mx-auto p-6 bg-white">
			<h2 className="text-2xl font-semibold mb-4 text-center">Address Details</h2>

			<div className="space-y-4">
				<div>
					<label>Address Line 1</label>
					<Input
						label="Address Line 1"
						value={currentAddress.addressLine1}
						onChange={(e) => handleChange("addressLine1", e.target.value)}
					/>
				</div>
				<div>
					<label>Address Line 2</label>
					<Input
						label="Address Line 2"
						value={currentAddress.addressLine2}
						onChange={(e) => handleChange("addressLine2", e.target.value)}
					/>
				</div>
				<div>
					<label>Pincode</label>
					<Input
						label="Pincode"
						value={currentAddress.pincode}
						onChange={(e) => handleChange("pincode", e.target.value)}
					/>
				</div>
				<div>
					<label>State</label>
					<Input
						label="State"
						value={currentAddress.state}
						onChange={(e) => handleChange("state", e.target.value)}
					/>
				</div>
				<div>
					<label>City</label>
					<Input
						label="City"
						value={currentAddress.city}
						onChange={(e) => handleChange("city", e.target.value)}
					/>
				</div>
				<div>
					<label>Country</label>
					<Select
						label="Country"
						value={currentAddress.country}
						onChange={(val) => handleChange("country", val)}
					>
						<Option value="India">India</Option>
						<Option value="USA">USA</Option>
						<Option value="Canada">Canada</Option>
						<Option value="UK">UK</Option>
						<Option value="Australia">Australia</Option>
					</Select>
				</div>

				<div className="flex flex-col gap-3 pt-4">
					<Button disabled={loading} onClick={handleCreateUser} fullWidth>
						{loading ? "Submitting" : "Submit"}
					</Button>
					<Button variant="outlined" onClick={handleSkipAddress} fullWidth>
						Skip Address
					</Button>
					<Button variant="text" onClick={handleBackStep} fullWidth>
						Back
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddressForm;
