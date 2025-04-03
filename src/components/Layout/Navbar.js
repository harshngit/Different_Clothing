import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import Logo from "../../asset/logoblack.png"
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
    <ul className="mb-4 mt-2 flex flex-col font-[NeueMedium] text-black gap-2 lg:mb-0 lg:mt-0 lg:justify-start lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"

        color="blue-gray"
        className="p-1 font-[NeueMedium] tracking-wider text-[17px]"
      >
        <Link href="/" className="flex items-center">
          Home
        </Link>
      </Typography>

      <Typography
        as="li"

        color="blue-gray"
        className="p-1 font-[NeueMedium] tracking-wider text-[17px]"
      >
        <Link href="/" className="flex items-center">
          Shop
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-[NeueMedium] tracking-wider text-[17px]"
      >
        <Link href="/" className="flex items-center">
          About
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-[NeueMedium] tracking-wider text-[17px]"
      >
        <Link href="/" className="flex items-center">
          Contact us
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className=" fixed z-[999] opacity-100 bg-transparent w-[100vw !important] max-w-full  border-none shadow-none  rounded-none  py-2 px-4 lg:px-16 lg:py-6">
      <div className=" grid grid-cols-9 justify-center items-center text-blue-gray-900">

        <div className="hidden lg:block  col-span-8 ">{navList}</div>
        {/* <Link className="col-span-2 flex justify-center items-center" href="/">
          <Image className="w-[120px]" src={Logo} alt="" />

        </Link> */}
        <div className="col-span-1 hidden md:col-span-1 md:flex items-center justify-center " >
          <a href=''> <button className="uppercase flex items-center justify-center gap-3 rounded-lg shadow-md  font-[NeueMedium] ease-in duration-300  text-[12px] md:text-[16px]  hover:shadow-none hover:bg-[#fff] hover:text-[#000] hover:border-[2px] hover:border-[#272727] tracking-wider py-[8px] px-[24px] md:py-[12px] md:px-[15px] text-[#FFFEFC] bg-[#000]" >My Account</button></a>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 col-span-4 text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}

        </div>
      </MobileNav>
    </Navbar>
  );
}