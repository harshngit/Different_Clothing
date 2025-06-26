"use client"

import RegisterForm from '@/components/Register/RegisterForm'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { auth, db } from '../firebase.config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


const Register = () => {
	const router = useRouter();
	const [role, setRole] = useState("")
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [contact, setContact] = useState("")
	const handleCreateUser = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;

				// Update display name
				await updateProfile(user, {
					displayName: name,
					phoneNumber: contact,
				});

				// Save user data to Firestore
				await setDoc(doc(db, "users", user.uid), {
					name,
					email,
					contact,
					role: "Customer",
					service: "Different Clothing",
					uid: user.uid,
					password,
				});

				router.push("/login");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="relative w-full h-screen xl:h-screen lg:h-screen flex justify-center items-center overflow-hidden">
			{/* Blurred Background Layer */}
			<div
				className="absolute inset-0 bg-cover bg-no-repeat bg-center blur-sm scale-110"
				style={{ backgroundImage: "url('/asset/Login/loginbanner.png')" }}
			></div>

			{/* Foreground Content */}
			<div className="relative w-[100%] lg:left-[35%] left-[10%] z-10 ">
				<RegisterForm name={name} setName={setName}
					email={email} setEmail={setEmail} handleCreateUser={handleCreateUser}
					password={password} setPassword={setPassword}
					contact={contact} setContact={setContact} />
			</div>
		</div>
	)
}

export default Register