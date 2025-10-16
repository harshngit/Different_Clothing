import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { db } from '@/app/firebase.config'
import img1 from '../../../public/asset/Home/abouthome1.png'
import img2 from '../../../public/asset/Home/abouthome2.png'
import img3 from '../../../public/asset/Home/abouthome1.png'
import Link from 'next/link'
import { Button } from '@material-tailwind/react'
const AboutHome = () => {
    const [arabicBanner, setArabicBanner] = useState(null)
    const [himImage, setHimImage] = useState('')
    const [herImage, setHerImage] = useState('')

    useEffect(() => {
        const fetchArabicBanner = async () => {
            try {
                const ref = collection(db, 'CollectionBanner')
                const q = query(ref, where('status', '==', 'active'), limit(1))
                const snap = await getDocs(q)
                if (!snap.empty) {
                    const doc = snap.docs[0].data()
                    // Expecting structure: { images: { Arabic: url, Him: url, Her: url }, ... }
                    setArabicBanner({
                        image: doc?.images?.Arabic || '',
                        title: 'ARABIC',
                        subtitle: 'COLLECTION',
                        cta: 'EXPLORE MORE'
                    })
                    setHimImage(doc?.images?.Him || '')
                    setHerImage(doc?.images?.Her || '')
                }
            } catch (e) {
                console.error('Error fetching CollectionBanner:', e)
            }
        }
        fetchArabicBanner()
    }, [])

    return (
        <section className=" w-full">
			{/* <div className="lg:block hidden absolute left-[-100px] top-[1000px] -translate-y-1/2 w-[200px] h-[200px] bg-[#D9D9D933] rounded-full"></div>

			<div className="lg:block hidden absolute right-[-100px] top-[1200px] -translate-y-1/2 w-[200px] h-[200px] bg-[#D9D9D933] rounded-full"></div>
			<div className='flex justify-center items-center flex-col lg:flex-row'>
				<div className='flex justify-center items-start lg:w-[60%] w-full flex-col'>
					<div className='flex justify-center items-center gap-8'>
						<h2 className='lg:text-[64px] text-[20px] font-normal text-[#D8D8D8]'>Change</h2>
						<div className='w-[100px] h-2 rounded-lg bg-[#D9D9D966] hidden lg:block'></div>
					</div>
					<h1 className='lg:text-[94px] text-[30px] font-normal text-[#565449]'>Your Style</h1>
				</div>
				<div className='flex justify-start items-center lg:w-[40%] w-full'>
					<p className='lg:text-right text-[#565449] font-normal lg:text-[24px] text-[15px]'>
						Welcome to Different Clothing , where style meets comfort in every piece. Our collection is designed to offer the perfect balance of quality, versatility, and modern design, making it easy for you to express your unique style.
					</p>
				</div>
			</div>
			<div className=" hidden lg:flex flex-col md:flex-row items-center justify-center relative">

				<div className="rounded-[30px] overflow-hidden absolute left-[180px] top-[50px] ">
					<Image
						src={img1}
						alt="look1"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>

				
				<div className="rounded-[30px] overflow-hidden absolute z-20 top-[190px] left-[450px] ">
					<Image
						src={img2}
						alt="look2"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>

				
				<div className="rounded-[30px] overflow-hidden absolute top-[250px]  z-10 right-[150px] ">
					<Image
						src={img3}
						alt="look3"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>
			</div>
			<div className='lg:hidden grid grid-flow-row grid-row-3 mt-5 gap-10'>
				<div className="rounded-[30px] overflow-hidden ">
					<Image
						src={img1}
						alt="look1"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>

				
				<div className="rounded-[30px] overflow-hidden">
					<Image
						src={img2}
						alt="look2"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>

			
				<div className="rounded-[30px] overflow-hidden ">
					<Image
						src={img3}
						alt="look3"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>
			</div> */}
			{/* <div className='flex flex-col  justify-center item-center lg:py-[5rem] py-[2rem] px-5'>
				<div className='flex justify-center items-center'>
					<p className='font-normal font-playfair w-[80%] text-center text-[#565449] lg:text-[24px]'>
						Welcome to Different Clothing , where style meets comfort in every piece. Our collection is designed to offer the perfect balance of quality, versatility, and modern design, making it easy for you to express your unique style.
					</p>
				</div>
				<div className='flex justify-center  items-center mt-5'>
					<Link href="/shop">
						<Button className='bg-black px-3 py-3 !font-playfair !rounded-none !shadow-none uppercase lg:text-[15px] font-thin'>Explore More</Button>
					</Link>
				</div>
			</div> */}

            <div className='relative flex justify-center lg:flex-row flex-col items-center mt-[-70px]'>
				<div className='lg:w-[50%] w-full relative'>
                    <img
                        src={himImage || "/asset/Home/1.png"}
                        alt="For Him"
                        className="w-full lg:h-[701px] object-cover"
                    />
					<h2 className='font-500 group font-playfair text-[18px] absolute z-10 text-white left-[2%] bottom-3'>FOR HIM
					</h2>
					<Link href={'/forhim'}>
						<h2 className='font-500 group font-playfair text-[18px] absolute z-10 text-white right-[2%] bottom-3'>EXPLORE
							<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" /></h2>
					</Link>
				</div>
				<div className='lg:w-[50%] w-full relative'>
                    <img
                        src={herImage || "/asset/Home/2.png"}
                        alt="For Her"
                        className="w-full lg:h-[701px] object-cover"
                    />
					<h2 className='font-500 font-playfair group text-[18px] absolute z-10 text-white left-[2%] bottom-3 hover:uppercase transition duration-500'>FOR HER
					</h2>
					<Link href={'/forher'}>
						<h2 className='font-500 group font-playfair text-[18px] absolute z-10 text-white right-[2%] bottom-3'>EXPLORE
							<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" /></h2>
					</Link>
				</div>
			</div>
			{arabicBanner && (
				<div className='relative'>
					<img
						src={arabicBanner?.image || '/asset/Home/1.png'}
						alt="Arabic Collection"
						className="w-full lg:h-[100%] object-cover"
					/>
					<div className='absolute inset-0 bg-black/30 flex justify-center items-center'>
						<div className='flex justify-center flex-col items-center'>
							<h1 className='text-white font-playfair text-center font-bold text-5xl sm:text-7xl lg:text-8xl leading-none'>
								{arabicBanner?.title}
								<br />
								{arabicBanner?.subtitle}
							</h1>
							<Link href={'/arabic'}>
								<button className='mt-6 bg-white text-black px-6 py-3 text-sm tracking-wide'>
									{arabicBanner?.cta}
								</button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}

export default AboutHome