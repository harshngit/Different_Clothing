import { Input } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const LoginForm = ({ password, setPassword, email, setEmail, showPassword, setShowPassword, handleLogin }) => {
	return (
		<div className='bg-white border-[2px] border-primary lg:mt-0 mt-5 px-5 py-5 rounded-lg lg:w-[30%] w-[90%] flex justify-start items-end flex-col'>
			<div className='flex justify-center items-center flex-col w-[100%] gap-5'>
				<h2 className='text-[#000] font-semibold text-[30px]'>Login</h2>
				<p className='text-gray-400 text-center'>Hey, Enter your details to get sign in <br /> to your account</p>
			</div>
			<div className='flex justify-start items-start flex-col w-[100%] mt-8 gap-5 relative'>
				<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full py-2 px-4 rounded-md border-[2px] border-[#ccc] ' placeholder='Enter Email / Phone No' />
				<Input

					label="Password"
					value={password}

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
					{showPassword ? <FaRegEye className='w-[15px]  text-blue-500' /> : <FaRegEyeSlash className='w-[15px] text-blue-500' />}
				</button>
			</div>
			<div className='flex justify-between items-start  w-[100%] mt-8 gap-5'>
				<p className='text-black'>Having trouble in sign in?</p>
				<Link href="">
					<p className='text-[#004aff]'>Forget Password</p>
				</Link>
			</div>
			<div onClick={handleLogin} className='w-full flex justify-center items-center mt-5 bg-primary px-5 py-2 rounded-lg text-white cursor-pointer hover:bg-[#fff] hover:border-[2px] hover:text-primary'>
				Sign In
			</div>
			<div className='w-full flex justify-center items-center mt-5 px-5 py-2 rounded-lg text-black gap-5'>
				<div className='bg-black w-10 h-[0.5px]'></div>
				<h4 className='text-center text-[12px]'>Don't have an account ? <Link href='/register' className='font-bold'>Register Now</Link></h4>
				<div className='bg-black w-10 h-[0.5px]'></div>
			</div>
			<Link href="/">
				<div className='flex justify-center items-end mt-5  px-5 py-2 rounded-lg cursor-pointer '>
					<p className='text-center text-primary text-[12px]'>Go back</p>
				</div>
			</Link>
		</div>
	)
}

export default LoginForm