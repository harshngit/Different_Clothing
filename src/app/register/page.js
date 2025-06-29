"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import RegisterForm from "@/components/Register/RegisterForm";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { toast } from "react-toastify";

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
					password: password,
					contact,
					role: "Customer",
					service: "Diiferent Clothing",
					uid: user.uid,
				})
				router.push("/login")
				toast.success("Account Created")
			}).catch((err) => {
				console.log(err)
			})
	}


	return (
		<div className=' font-playfair'>
			<Navbar />
			<section className="relative flex justify-center items-center w-full pt-[130px] pb-[50px]">
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
			</section>
			<section className="relative">
				<Footer />
			</section>
		</div>
	);
};

export default Register;
