"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import RegisterForm from "@/components/Register/RegisterForm";

const Register = () => {
	const router = useRouter();

	// Form States
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [contact, setContact] = useState("")

	// Register function
	const handleCreateUser = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;

				// Update display name
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
					service: "Nutan",
					uid: user.uid,
				})
				router.push("/login")
			}).catch((err) => {
				console.log(err)
			})
	}


	return (
		<div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
			{/* Blurred Background Layer */}
			<div
				className="absolute inset-0 bg-cover bg-no-repeat bg-center blur-sm scale-110"
				style={{ backgroundImage: "url('/asset/Login/loginbanner.png')" }}
			></div>

			{/* Foreground Content */}
			<div className="relative w-[100%] lg:left-[35%] left-[10%] z-10">
				<RegisterForm
					name={name}
					setName={setName}
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					contact={contact}
					setContact={setContact}
					handleCreateUser={handleCreateUser}
				/>
			</div>
		</div>
	);
};

export default Register;
