"use client";

import { loginUsingEmail } from '@/actions/authActions';
import LoginForm from '@/components/Login/LoginForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const {
		error = null,
		loading = false,
		isAuthenticated = false,
		users = null,
		userProfile = {}
	} = useSelector((state) => state.user || {});

	const router = useRouter();
	const dispatch = useDispatch();

	const handleLogin = () => {
		if (!email.trim()) {
			alert("Enter Valid Email");
		} else if (!password.trim()) {
			alert("Enter Valid Password");
		} else {
			dispatch(loginUsingEmail({ email, password }));
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/");
		}
	}, [isAuthenticated, router]);

	return (
		<div className="relative w-full xl:h-screen lg:h-screen h-screen flex justify-center items-center overflow-hidden">
			<div
				className="absolute inset-0 bg-cover bg-no-repeat bg-center blur-sm scale-110"
				style={{ backgroundImage: "url('/asset/Login/loginbanner.png')" }}
			></div>

			<div className="relative w-[100%] lg:left-[35%] left-[5%] z-10 ">
				<LoginForm
					handleLogin={handleLogin}
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
				/>
			</div>
		</div>
	);
};

export default Login;
