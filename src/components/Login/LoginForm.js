import { Input } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const LoginForm = ({ password, setPassword, email, setEmail, showPassword, setShowPassword, handleLogin }) => {
	return (
		<div className='lg:mt-0 mt-5 px-5 py-5 rounded-lg lg:w-[30%] w-[90%] flex justify-start items-end flex-col'>
			<div className='flex justify-center items-start flex-col w-[100%] gap-5'>
				<h2 className='text-[#000] font-semibold text-[30px]'>Login</h2>
			</div>
			<div className='flex justify-start items-start flex-col w-[100%] mt-8 gap-5 relative'>
				<Input label='Email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full py-2 px-4 border-[2px] border-[#000] ' placeholder='Enter Your Email' />
				<Input

					label="Password"
					value={password}
					placeholder='Enter Your Password'
					onChange={(e) => { setPassword(e.target.value) }}
					type={showPassword ? "text" : "password"}
					className="pr-20 "
					containerProps={{
						className: "min-w-0",
					}}
				/>
				<button


					disabled={!password}
					onClick={() => setShowPassword(!showPassword)}
					className="!absolute  right-2 top-[70%]"
				>
					{showPassword ? <FaRegEye className='w-[15px]  text-black' /> : <FaRegEyeSlash className='w-[15px] text-gray-500' />}
				</button>
			</div>
			{/* <div className='flex justify-between items-start  w-[100%] mt-8 gap-5'>
				<p className='text-black'>Having trouble in sign in?</p>
				<Link href="">
					<p className='text-[#004aff]'>Forget Password</p>
				</Link>
			</div> */}
			<div className="w-full flex flex-col items-center space-y-4 mt-5">
				<button
					onClick={handleLogin}
					className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 transition duration-500"
				>
					Sign in
				</button>

				<Link href={"/register"} className='w-full border text-center border-black text-black font-semibold py-3 hover:bg-black hover:text-white transition duration-500'>
					<button
						className=''
					>
						Create account
					</button>
				</Link>

				<button
					// onClick={handleForgotPassword}
					className="text-sm text-black hover:underline transition duration-500 font-medium mt-2 "
				>
					Forgotten your password?
				</button>
			</div>
		</div>
	)
}

export default LoginForm