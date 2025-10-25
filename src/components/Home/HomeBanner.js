'use client'

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase.config';

import Image from 'next/image';

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const bannerRef = collection(db, 'Banner');
        const q = query(bannerRef, where('status', '==', 'active'));
        const snapshot = await getDocs(q);
        const flattenedSlides = snapshot.docs.flatMap((doc) => {
          const d = doc.data();
          const slideArray = Array.isArray(d.slides) ? d.slides : [];
          return slideArray.map((s, index) => ({
            id: `${doc.id}_${index}`,
            image: s.imageUrl || s.image || '/asset/Home/diffbanner.png',
            title: s.tagLine || s.title || '',
            subtitle: s.subtitle || '',
            description: s.description || '',
            buttonText: s.buttonText || s.ctaText || ''
          }));
        });
        console.log('Active banners:', flattenedSlides);
        setSlides(flattenedSlides);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
    fetchBanners();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (slides.length ? (prev + 1) % slides.length : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (slides.length ? (prev - 1 + slides.length) % slides.length : prev));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || slides.length < 2) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, slides.length]);
  return (
    // <div className='relative font-playfair z-0'>
    //   <div className="absolute w-full lg:h-[80vh] xl:h-[85vh] h-[800px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/asset/Home/bannerhomediff.png')" }}>

    //     <div className="absolute top-[50%] left-[7rem] lg:top-1/2 md:top-1/2 lg:left-10 bg-primary text-white px-4 py-2 rounded-lg shadow-md">
    //       SIGNATURE COLLECTION
    //     </div>
    //     <div className="absolute lg:top-1/2 top-1/3 left-1/2 w-[50%]  overflow-hidden">
    //       <div className="animate-marquee flex gap-5 text-lg font-semibold -z-10 text-[#565449] whitespace-nowrap">
    //         {Array(10).fill("• Be Different").map((text, idx) => (
    //           <span key={`a-${idx}`} className="mr-2">{text}</span>
    //         ))}
    //         {Array(10).fill("• Be Different").map((text, idx) => (
    //           <span key={`b-${idx}`} className="mr-2">{text}</span>
    //         ))}
    //       </div>
    //     </div>
    //     <div className="relative  w-[300px] md:w-[400px] lg:w-[400px]">
    //       <Image src={Tshirt} alt="T-shirt" width={600} height={700} className="w-[500px] lg:top-[0rem] top-[-12rem] xl:h-[450px] relative left-[1%]" />

    //       <div className="absolute lg:top-[20%] top-[-24%] lg:left-[-50px] flex items-center gap-2">

    //         <span className="ml-4 bg-[#D8D4BCB0] lg:px-3 px-2 py-1 lg:py-1 rounded">Comfort</span>
    //         <div className="lg:w-[80px] w-[40px] h-[1px] bg-[#565449] absolute lg:left-[110px] left-[92px]"></div>
    //         <div className="w-4 h-4 bg-white border-[0.5px] border-[#000] rounded-full lg:left-[80px] left-[30px] relative z-10"></div>

    //       </div>

    //       <div className="absolute lg:top-[50%] top-[1%] lg:left-[-80px] left-[-50px] flex items-center ">

    //         <span className="ml-4 bg-[#D8D4BCB0] lg:px-3 px-2 py-1 lg:py-1 relative lg:left-0 left-[19%] rounded">Affordable</span>
    //         <div className="w-4 h-4 bg-[#fff] border-[0.5px] border-[#000] rounded-full relative lg:left-[110px] left-[70px] z-10"></div>
    //         <div className="lg:w-[100px] w-[50px] h-[1px] bg-[#565449] absolute left-[130px]"></div>
    //       </div>

    //       <div className="absolute lg:top-[25%] top-[-18%] lg:right-[-20px] right-[-30px] flex items-center gap-2">
    //         <div className="lg:w-[80px] w-[90px] h-[1px] bg-[#565449] absolute right-[90px]"></div>
    //         <div className="w-4 h-4 bg-white border-[0.5px] border-[#000] lg:left-[-80px] right-[167px] rounded-full absolute z-10"></div>
    //         <span className="mr-4 bg-[#D8D4BCB0]  lg:px-3 px-2 py-1 lg:py-1 rounded lg:left-0 relative left-[-23px]">Style</span>
    //       </div>

    //       <div className="absolute lg:top-[50%] top-[10%] right-[-30px] flex items-center gap-2">
    //         <div className="w-[80px] h-[1px] bg-[#565449] absolute right-[110px]"></div>
    //         <div className="w-4 h-4 bg-white border-[0.5px] border-[#000]  rounded-full relative z-10 left-[-80px]"></div>
    //         <span className="mr-4 bg-[#D8D4BCB0] lg:px-3 px-2 py-1 lg:py-1 rounded lg:left-0 relative left-[-23px]">Quality</span>
    //       </div>

    //       <div className="absolute top-[20%] lg:top-[60%] right-[80px] transform -translate-x-1/2 flex flex-col items-center">
    //         <div className="w-4 h-4 bg-white border-[0.5px] border-[#000] rounded-full relative z-10"></div>
    //         <div className="h-[50px] w-[1px] bg-[#565449] absolute top-2"></div>
    //         <span className="mt-10 bg-[#D8D4BCB0] lg:px-3 px-2 py-1 lg:py-1 rounded">Unique</span>
    //       </div>
    //     </div>


    //     <h1 className="absolute lg:hidden top-[58%] left-[7rem] text-3xl md:text-[80px] font-bold">
    //       <span className="text-white font-playfair font-normal">DIFFERENT</span> <span className="text-black font-playfair font-normal">CLOTHING</span>
    //     </h1>

    //     <h1 className="absolute lg:block hidden top-[80%] text-3xl md:text-[80px] font-bold">
    //       <span className="text-white font-playfair font-normal">DIFFERENT</span> <span className="text-black font-playfair font-normal">CLOTHING</span>
    //     </h1>

    //   </div>
    // </div>
    // <>
    //   <div className="w-full">
    //     <video autoPlay playsInline loop muted className="w-full">
    //       <source src="/asset/Home/diffvedio.mp4" type="video/mp4" />
    //       Your browser does not support the video tag.
    //     </video>
    //   </div>
    // </>
    <>

  


    <div className="relative min-h-[20] w-full overflow-hidden ">
      {/* Slides */}
      <div className="relative w-full h-screen">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-end pb-[100px] px-6 sm:px-12 lg:px-[120px]">
              <div className="max-w-4xl">
                {/* Heading */}
                <h1 className="text-white text-6xl sm:text-7xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 sm:mb-8 animate-fade-in">
                  {slide.title}
                  <br />
                  {slide.subtitle}
                </h1>

                {/* Description */}
                <p className="text-white text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 max-w-3xl animate-fade-in-delay">
                  {slide.description}
                </p>

                {/* CTA Button */}
                <button className="bg-white text-black font-semibold px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base tracking-wider hover:bg-gray-200 transition-colors duration-300 shadow-lg animate-fade-in-delay-2">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
        }}
        className="absolute left-4 lg:block hidden sm:left-8 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
        }}
        className="absolute right-4 lg:block hidden sm:right-8 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-white w-8 sm:w-12 h-2 sm:h-3'
                : 'bg-white bg-opacity-50 w-2 sm:w-3 h-2 sm:h-3 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fade-in-delay {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.2s forwards;
        }

        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.4s forwards;
        }
      `}</style>
    </div>
    </>
  )
}
export default HomeBanner