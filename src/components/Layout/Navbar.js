"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/actions/authActions";
import { FaUser } from "react-icons/fa";

const navItems = [
  { label: "FOR HIM", href: "/forhim", children: [] },
  { label: "FOR HER", href: "/forher" },
  { label: "SIGNATURE", href: "/signature" },
  { label: "ARABIC", href: "/arabic" },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { cartItems } = useSelector((state) => state.cart);
  // const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdownSearch, setOpenDropdownSearch] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const userState = useSelector((state) => state.user);

  const {
    error,
    loading,
    isAuthenticated,
    users,
    userProfile,
  } = userState || {};

  console.log(isAuthenticated)
  console.log(userProfile)

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href) => pathname === href;

  const navList = (
    <ul className="flex flex-col lg:flex-row items-start gap-3 text-white uppercase font-playfair text-sm">
      {navItems.map((item, idx) => (
        <li key={idx} className="relative group">
          <Link
            href={item.href}
            className={`relative px-3 py-2 transition lg:text-[15px] block text-black`}
          >
            {item.label}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
          </Link>
        </li>
      ))}
    </ul>
  );

  const [isOpen, setIsOpen] = useState(false);

  const navListExtra = (
    <ul className="flex flex-col lg:flex-row items-end gap-3 text-white uppercase font-playfair text-sm">
      <li className="relative" ref={dropdownRef}>
        <Link
          href="#"
          className="relative px-3 py-2 text-black group"
          onClick={(e) => {
            e.preventDefault();
            setOpenDropdownSearch((prev) => !prev);
          }}
        >
          Search
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
        </Link>
        {openDropdownSearch && (
          <div className="absolute left-0 mt-2 z-20 shadow-lg w-60 bg-white p-3 rounded border">
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full px-3 py-2 border border-gray-300 rounded text-black text-sm focus:outline-none"
            />
          </div>
        )}
      </li>
      {isAuthenticated ? (
        <li
          className="relative"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Trigger */}
          <div className="cursor-pointer relative text-black">
            My Profile
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-300 ${isOpen ? "w-full" : "w-0"
                }`}
            />
          </div>

          {/* Dropdown */}
          <div
            className={`absolute left-0 top-full mt-1 w-40 bg-white text-black shadow-lg rounded-lg z-50 transition-all duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
          >
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                View Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          </div>
        </li>


      ) : (
        <li>
          <Link href="/login" className="relative px-3 py-2 text-black group">
            Login
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
          </Link>
        </li>
      )}
      <li>
        <Link href="/wishlist" className="relative px-3 py-2 text-black group">
          Wishlist
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
        </Link>
      </li>
      <li>
        <Link href="/cart" className="relative px-3 py-2 text-black group">
          Bag ({cartItems.length})
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
        </Link>
      </li>
    </ul>
  );

  return (
    <div className="fixed font-playfair top-0 left-0 w-screen z-[9999]">
      <div className='bg-black h-[35px] w-full flex justify-center items-center'>
        <div className='text-[11px] text-white'>
          Complimentary U.S. No-Rush Shipping on orders of $95 or more. Shop now
        </div>
      </div>

      <div className="w-full py-4 bg-[#fff]">
        <div className="w-full flex lg:justify-between items-center px-4 lg:px-8">
          <div className="hidden lg:flex lg:w-[45%]">{navList}</div>
          <div className="lg:hidden flex w-[33.33%] justify-start items-center" onClick={() => setOpenDrawer(true)}>
            <img src="/asset/Home/menu.png" className="w-[38px]" alt="Menu" />
          </div>
          <Link href="/" className="w-[33.33%] flex justify-center items-center">
            <img src="/asset/Navbar/logo.png" className="lg:w-[55px] w-[50px]" alt="Logo" />
          </Link>
          <div className="hidden lg:flex lg:w-[45%] justify-end">{navListExtra}</div>
          <div className="lg:hidden flex justify-end items-end w-[25%]">
            {isAuthenticated ? (<>
              <ul className="">
                <li
                  className="relative"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {/* Trigger */}
                  <div className="cursor-pointer relative text-black">
                    <FaUser className="w-24" />
                  </div>

                  {/* Dropdown */}
                  <div
                    className={`absolute left-0 top-full text-[10px] mt-1 w-20 bg-white text-black shadow-lg rounded-lg z-50 transition-all duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                  >
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        View Profile</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </>) : (<>
              <Link href="/login" className="relative px-3 py-2 text-black group">
                Login
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
              </Link>
            </>)}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 w-screen h-screen bg-white z-[9998] px-6 pt-6 transition-transform duration-300 ${openDrawer ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end">
          <RxCross1 className="text-[20px] cursor-pointer" onClick={() => setOpenDrawer(false)} />
        </div>
        <ul className="flex flex-col gap-6 mt-6 text-[#2F3435] font-playfair text-[20px]">
          <li><Link href="/forhim">For Him</Link></li>
          <li><Link href="/forher">For Her</Link></li>
          <li><Link href="/signature">Signature</Link></li>
          <li><Link href="/arabic">Arabic</Link></li>
          <li><Link href="/wishlist">Wishlist</Link></li>
        </ul>
      </div>
    </div>
  );
}
