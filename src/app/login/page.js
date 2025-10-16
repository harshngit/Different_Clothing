"use client";

import { loadUser, loginUsingEmail } from "@/actions/authActions";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import LoginForm from "@/components/Login/LoginForm";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatFirebaseAuthError } from "@/utils/errorText";

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false)
	const [errorText, setErrorText] = useState('')
	const dispatch = useDispatch();
	const router = useRouter();

	const { isAuthenticated, loading, error, users } = useSelector((state) => state.user || {});

	const handleLogin = async () => {
		setErrorText('');
		if (!email || !password) {
			setErrorText('Email and password are required');
			return;
		}

		try {
			const user = await dispatch(loginUsingEmail({ email, password })).unwrap();
			console.log('User logged in:', user);
			router.push('/');
		} catch (err) {
			setErrorText(formatFirebaseAuthError(err));
		}
	};

	useEffect(() => {
		dispatch(loadUser()); // auto-login if session exists
	}, [dispatch]);

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/');
		}
	}, [isAuthenticated, router]);

	return (
		<div className=' font-playfair'>
			<Navbar />
			<section className="relative flex justify-center items-center w-full pt-[10px] pb-[50px]">
				<LoginForm
					handleLogin={handleLogin}
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
					loading={loading}
					errorText={errorText}
				/>
			</section>
			<section className="relative">
				<Footer />
			</section>
		</div>
	);
};

export default Login;
