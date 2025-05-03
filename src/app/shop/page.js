'use client'
import CTA from '@/components/Home/CTA'
import Footer from '@/components/Layout/Footer'
import NavbarWhite from '@/components/Layout/NavbarWhite'
import BannerCta from '@/components/Shop/BannerCta'
import ImageAccordion from '@/components/Shop/ImageAccordion'
import ProductGrid from '@/components/Shop/ProductsGrid'
import React from 'react'

const Shop = () => {
	return (
		<div>
			<NavbarWhite />
			<section className="relative pt-[130px] pb-[50px]">
				{/* Adjust padding to avoid navbar overlap */}
				<ImageAccordion />
			</section>
			<section className="relative lg:pt-[10px] xl:pt-[10px] pt-[60px] overflow-hidden">
				<ProductGrid />
			</section>
			<section className="relative">
				<BannerCta />
			</section>
			<section className="relative">
				<CTA />
			</section>
			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default Shop