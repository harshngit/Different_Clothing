import React from "react";

const CartAddress = ({ accountDetails, onSelect }) => {
	return (
		<div className="space-y-4">
			{accountDetails?.address?.length > 0 ? (
				accountDetails?.address.map((addr, index) => (
					<div
						key={index}
						className="p-4 border rounded cursor-pointer hover:border-blue-500 transition-all"
						onClick={() => onSelect(addr)}
					>
						<p><strong>{addr.name}</strong></p>
						<p>{addr.addressLine1}, {addr.addressLine2}</p>
						<p>{addr.city}, {addr.state}, {addr.pincode}</p>
						<p>{addr.phone}</p>
					</div>
				))
			) : (
				<p>No saved addresses found.</p>
			)}
		</div>
	);
};

export default CartAddress;
