import { Button } from '@material-tailwind/react'
import React from 'react'
import CountdownTimer from './CountdownTimer'

const Deal = () => {
	return (
		<div className='bg-[#FAFAFA] w-full h-screen lg:py-10 lg:px-20 py-5 px-5'>
			<div className='flex justify-start items-start lg:flex-col flex-row'>
				<div className='lg:w-[40%] w-full flex justify-start items-start flex-col gap-10'>
					<div className='flex flex-col gap-10'>
						<h2 className='lg:text-[46px] text-[30px] font-normal text-[#484848]'>Deals Of The Month</h2>
						<p className='font-normal text-[#8A8A8A] text-[16px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin </p>
					</div>
					<div className='flex justify-start items-start w-full'>
						<Button className='py-[15px] px-[20px] w-[50%] shadow-[#000] shadow-sm text-[16px]'>Buy Now</Button>
					</div>
					<div className='flex justify-start items-start flex-col gap-10'>
						<h2 className='lg:text-[28px] text-[18px] font-normal'>Hurry, Before It’s Too Late!</h2>
						<CountdownTimer />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Deal