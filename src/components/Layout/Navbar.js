import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
// import Logo from "../../asset/logoblack.png"
import Link from "next/link";
import Image from "next/image";
export default function NavbarTwo() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col font-[NeueMedium] text-white gap-2 lg:mb-0 lg:mt-0 lg:justify-start lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"

        color="white"
        className="p-1 font-[NeueMedium] tracking-wider lg:text-[#fff] text-[#8b8b8b] text-[17px]"
      >
        <Link href="/" className="flex items-center">
          Home
        </Link>
      </Typography>

      <Typography
        as="li"

        color="white"
        className="p-1 font-[NeueMedium] lg:text-[#fff] text-[#8b8b8b] tracking-wider text-[17px]"
      >
        <Link href="/" className="flex items-center">
          Shop
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-[NeueMedium] lg:text-[#fff] text-[#8b8b8b] tracking-wider text-[17px]"
      >
        <Link href="/" className="flex items-center">
          About
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-[NeueMedium] lg:text-[#fff] text-[#8b8b8b] tracking-wider text-[17px]"
      >
        <Link href="/" className="flex items-center">
          Contact us
        </Link>
      </Typography>
    </ul>
  );

  return (
    <div
    // className="relative w-full h-screen bg-no-repeat bg-cover bg-center"
    // style={{ backgroundImage: "url('/asset/Home/bannerhome.png')" }}
    >
      {/* Navbar */}
      <nav className="lg:absolute fixed backdrop-blur-sm z-10 top-0 left-0  w-full text-white py-4 lg:py-6 shadow-none">
        <div className="grid lg:grid-cols-9 items-center px-4 lg:px-16">
          <div className="hidden lg:block col-span-8">{navList}</div>

          <div className="col-span-1 hidden md:flex items-center justify-center">
            <a href="">
              <button className="uppercase flex items-center justify-center rounded-lg shadow-md text-[12px] md:text-[16px] tracking-wider py-[8px] px-[24px] md:py-[12px] md:px-[15px] text-white bg-black hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition-all">
                My Account
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <IconButton
            variant="text"
            className="ml-auto col-span-4 text-secondary lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton>
        </div>

        {/* Mobile Navigation */}
        <Collapse className="w-full backdrop-blur-sm" open={openNav}>
          <div className="container backdrop-blur-sm  mx-4">{navList}</div>
        </Collapse>
      </nav>
    </div>
  );
}