"use client";
import AddressList from '@/components/Address/AddressList';
import AddAddressForm from '@/components/Address/AddAddressForm';
import Footer from '@/components/Layout/Footer';
import Navbar from '@/components/Layout/Navbar';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { useSelector } from 'react-redux';

const Address = () => {
	const [accountDetails, setAccountDetails] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { userProfile } = useSelector((state) => state.user);

	useEffect(() => {
		if (!userProfile?.uid) return;

		const unsubscribe = onSnapshot(doc(db, "users", userProfile.uid), (docSnap) => {
			if (docSnap.exists()) {
				setAccountDetails(docSnap.data());
			} else {
				console.warn("User document not found");
			}
		}, (error) => {
			console.error("Error fetching user data:", error);
		});

		return () => unsubscribe();
	}, [userProfile?.uid]);

	return (
		<div className='font-playfair'>
			<Navbar />

			<section>
				<AddressList userProfile={userProfile} accountDetails={accountDetails} openModal={() => setIsModalOpen(true)} />
			</section>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed top-0 inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white h-[80vh] p-6 rounded-lg w-[90%] max-w-xl relative">
						<button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-3 text-xl font-bold">×</button>
						<AddAddressForm closeModal={() => setIsModalOpen(false)} />
					</div>
				</div>
			)}

			<Footer />
		</div>
	);
};

export default Address;
