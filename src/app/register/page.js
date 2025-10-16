"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import RegisterForm from "@/components/Register/RegisterForm";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
// toast removed
import AddressForm from "@/components/Register/AddressForm";

const Register = () => {
	const router = useRouter();

	// Form States
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [contact, setContact] = useState("");
	const [loading, setloading] = useState(false);
	// Helper function to generate a random 5-letter ID
	const generateRandomId = () => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		let randomId = '';
		for (let i = 0; i < 5; i++) {
			randomId += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return randomId;
	};
	// Address State
	const [address, setAddress] = useState([
		{
			id: generateRandomId(),
			name: name,
			addressLine1: "",
			addressLine2: "",
			pincode: "",
			state: "",
			city: "",
			country: "",
		},
	]);

	const [step, setStep] = useState(1); // 1 = User Info, 2 = Address

	const handleNextStep = () => {
        if (!name || !email || !password || !contact) {
            // inline validation message (toast removed)
			return;
		}
		setStep(2);
	};

	const handleBackStep = () => {
		setStep(1);
	};

	const handleCreateUser = () => {
		setloading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;

				await updateProfile(user, {
					displayName: name,
					phoneNumber: contact,
				});

				await setDoc(doc(db, "users", user.uid), {
					name,
					email,
					password,
					contact,
					role: "Customer",
					service: "Diiferent Clothing",
					uid: user.uid,
					address: address,
				});

                // success notification removed
				router.push("/success");
			})
			.catch((err) => {
				console.log(err);
                // error notification removed
			})
			.finally(() => {
				setloading(false);
			});
	};

	const handleSkipAddress = () => {
		handleCreateUser();
	};

	return (
		<div className="font-playfair">
			<Navbar />
			<section className="relative flex justify-center items-center w-full pt-[10px] pb-[50px]">
				{step === 1 ? (
					<RegisterForm
						name={name}
						setName={setName}
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						contact={contact}
						setContact={setContact}
						handleNextStep={handleNextStep}
					/>
				) : (
					<AddressForm
						setloading={setloading}
						loading={loading}
						address={address}
						setAddress={setAddress}
						handleCreateUser={handleCreateUser}
						handleSkipAddress={handleSkipAddress}
						handleBackStep={handleBackStep}
					/>
				)}
			</section>
			<section className="relative">
				<Footer />
			</section>
		</div>
	);
};

export default Register;
