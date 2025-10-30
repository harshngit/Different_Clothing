"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/actions/authActions";
import { FaAngleRight, FaArrowRight, FaSearch, FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { collection, doc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/app/firebase.config";
import { MdChevronRight } from "react-icons/md";
const navItems = [
  {
    label: "FOR HIM",
    href: "/forhim",
    children: [
      { label: "Hoodie", href: "/forhim/hoodie" },
      { label: "Sweatshirt", href: "/forhim/sweatshirt" },
      { label: "Oversized tee", href: "/forhim/oversized" },
      { label: "Sweatpants", href: "/forhim/sweatpants" },
      { label: "Regular tee", href: "/forhim/regular" },
    ],
  },
  {
    label: "FOR HER",
    href: "/forher",
    children: [
      { label: "Hoodie", href: "/forher/hoodie" },
      { label: "Sweatshirt", href: "/forher/sweatshirt" },
      { label: "Oversized tee", href: "/forher/oversized" },
      { label: "Leggings", href: "/forher/leggings" },
      { label: "Crop tops", href: "/forher/croptop" },
      { label: "Sweatpants", href: "/forher/sweatpants" },
    ],
  },
  {
    label: "ARABIC",
    href: "",
    children: [
      { label: "Hoodie", href: "/arabic/hoodie" },
    ],
  },
];



export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { cartItems } = useSelector((state) => state.cart);
  // const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlist = useSelector((state) => state.wishlist.wishlist || {});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdownSearch, setOpenDropdownSearch] = useState(false);
  const [product, setProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
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

  // User Profile 
  const [accountDetails, setAccountDetails] = useState({});
  useEffect(() => {
    if (!userProfile?.uid) return;

    const unsubscribe = onSnapshot(doc(db, "users", userProfile.uid), (docSnap) => {
      if (docSnap.exists()) {
        setAccountDetails(docSnap.data());
      } else {
        console.warn("User document not found");
      }
    }, (error) => {
      console.error("Error fetching user data:", error);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [userProfile?.uid]);
  // console.log(accountDetails)

  const fetchProduct = async () => {
    try {
      const productRef = collection(db, "Product");
      const q = query(
        productRef,
        where("productStatus", "==", "Published"),
        // orderBy("createdAtDate", "desc") // Ensure `createdAtDate` is a Firestore Timestamp
      );
      const querySnapshot = await getDocs(q);

      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProduct(products); // <-- move setProduct here instead of returning
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };


  useEffect(() => {
    fetchProduct();
  }, []);


  const filteredProducts = product.filter((p) =>
    p.productName?.toLowerCase().includes(searchQuery.toLowerCase())
  );



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

  const [isOpenlogin, setIsOpenlogin] = useState(false);
  const dropdownReflogin = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownReflogin.current && !dropdownReflogin.current.contains(event.target)) {
        setIsOpenlogin(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // Mobile

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const [timer, setTimer] = useState(null);

  // Mobile drawer controls (open from left, close to right)
  const [drawerTranslate, setDrawerTranslate] = useState('-translate-x-full');
  const openMobileDrawer = () => {
    setOpenDrawer(true);
    // next tick ensure transition runs from left
    requestAnimationFrame(() => setDrawerTranslate('translate-x-0'));
  };
  const closeMobileDrawer = () => {
    // animate back to the LEFT
    setDrawerTranslate('-translate-x-full');
    setTimeout(() => {
      setOpenDrawer(false);
      // keep positioned off-screen to the LEFT for next open
      setDrawerTranslate('-translate-x-full');
    }, 300);
  };

  // Mobile submenu toggles
  const [mobileOpenHim, setMobileOpenHim] = useState(false);
  const [mobileOpenHer, setMobileOpenHer] = useState(false);

  const handleMouseEnter = (index) => {
    // Clear any previous timer before setting the active dropdown
    if (timer) {
      clearTimeout(timer);
    }
    setActiveDropdown(index); // Show dropdown when hovering over the parent item
  };

  const handleMouseLeave = () => {
    // Set a timer to hide the dropdown after a short delay
    const newTimer = setTimeout(() => {
      setActiveDropdown(null); // Hide dropdown after cursor leaves
    }, 300); // Adjust delay in milliseconds as per your preference

    setTimer(newTimer);
  };


  const navList = (
    <ul className="flex flex-col lg:flex-row items-start gap-1 text-white uppercase font-playfair font-semibold">
      {navItems.map((item, idx) => (
        <li
          key={idx}
          className="relative"
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={item.href}
            onClick={(e) => {
              if (item.label === "ARABIC") {
                e.preventDefault();
              }
            }}
            className="relative px-3 group py-1 transition lg:text-[14px]  text-black flex items-center gap-2"
          >
            {item.label}
            {item.label === 'ARABIC' ? (
              <span className="ml-1 text-[9px] lg:text-[10px] normal-case animate-pulse text-red-500">(Coming soon)</span>
            ) : null}
            {item.label === 'FOR HIM' || item.label === 'FOR HER' ? (
              <span className="inline-block"><MdChevronRight /></span>
            ) : null}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Mega Menu Dropdown (disabled for Arabic) */}
          {item.children && activeDropdown === idx && item.label !== 'ARABIC' && (
            <div
              className={`fixed ${isSticky ? 'top-[3.5rem]' : 'top-[5rem]'} left-0 right-0 bg-white text-black shadow-2xl z-50 border-t border-gray-200`}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="flex gap-16">
                  {/* Left Side - Categories */}
                  <div className="w-1/4 border-r border-gray-200 pr-8">
                    <ul className="space-y-1">
                      {/* Main Category Link */}
                      <li className="group">
                          <Link 
                            href={"/shop"} 
                            className="block py-2 text-sm font-normal text-black transition uppercase tracking-wide relative group"
                          >
                            Shop All
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-[50%]" />
                          </Link>
                        </li>
                      
                      {/* Subcategories */}
                      {item.children.map((child, childIdx) => (
                        <li key={childIdx} className="group">
                          <Link 
                            href={child.href} 
                            className="block py-2 text-sm font-normal text-black transition uppercase tracking-wide relative group"
                          >
                            {child.label}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-[50%]" />
                          </Link>
                        </li>
                      ))}
                      
                      {/* Additional Links */}
                     
                    </ul> 
                  </div>

                  {/* Right Side - Product Images Grid */}
                  <div className="flex-1">
                    <div className="grid grid-cols-4 gap-6">
                      {(() => {
                        let filteredProducts = [];
                        
                        if (item.label === "FOR HIM") {
                          filteredProducts = product.filter(p => 
                            p.productCategory?.toLowerCase().includes('him') || 
                            p.productCategory?.toLowerCase().includes('for him') ||
                            p.productGender?.toLowerCase() === 'men' ||
                            p.productGender?.toLowerCase() === 'male'
                          );
                        } else if (item.label === "FOR HER") {
                          filteredProducts = product.filter(p => 
                            p.productCategory?.toLowerCase().includes('her') || 
                            p.productCategory?.toLowerCase().includes('for her') ||
                            p.productGender?.toLowerCase() === 'women' ||
                            p.productGender?.toLowerCase() === 'female'
                          );
                        } else if (item.label === "ARABIC") {
                          filteredProducts = product.filter(p => 
                            p.productCategory?.toLowerCase().includes('arabic') ||
                            p.productName?.toLowerCase().includes('arabic') ||
                            p.productSubCategory?.toLowerCase().includes('arabic')
                          );
                        } else {
                          filteredProducts = product;
                        }
                        
                        // If no products found, show first 4 products as fallback
                        if (filteredProducts.length === 0) {
                          filteredProducts = product.slice(0, 4);
                        }
                        
                        return filteredProducts.slice(0, 4).map((productItem, idx) => (
                          <Link 
                            key={idx} 
                            href={`/shop/${productItem.id}`}
                            className="group relative overflow-hidden"
                          >
                            <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                              <img
                                src={productItem.productImages?.[0] || '/placeholder.jpg'}
                                alt={productItem.productName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            {/* <div className="mt-3 text-center">
                              <p className="text-xs text-gray-500 uppercase tracking-wide">
                                {productItem.productCategory || productItem.productName}
                              </p>
                            </div> */}
                          </Link>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
      {/* Extra static links */}
      <li className="relative">
        <Link href="/about" className="relative px-3 group py-1 transition lg:text-[14px] block text-black">
          About
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
        </Link>
      </li>
      <li className="relative">
        <Link href="/contact" className="relative px-3 group py-1 transition lg:text-[14px] block text-black">
          Contact
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
        </Link>
      </li>
    </ul>
  );

  const [isOpen, setIsOpen] = useState(false);

  const navListExtra = (
    <ul className="flex flex-col lg:flex-row items-end  gap-1 text-white uppercase font-playfair lg:text-[14px] font-semibold">
      <li className="relative" ref={dropdownRef}>
        <Link
          href="/search"
          className="relative px-3 py-2 text-black group"
        >
          Search
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
        </Link>

       

      </li>

      {isAuthenticated ? (
        <>
          <li
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* Trigger */}
            <div className="cursor-pointer relative !text-[14px] text-black">
              My Profile
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-300 ${isOpen ? "w-full" : "w-0"
                  }`}
              />
            </div>

            {/* Dropdown */}
            <div
              className={`absolute -left-12 top-[2rem] mt-1 lg:w-[200px] bg-white text-black shadow-lg rounded-lg z-50 transition-all duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
              <div className="flex justify-start flex-col items-start gap-1 px-4 py-2">
                <p className="font-thin lg:text-[10px] text-[10px]">HI,</p>
                <h2 className="font-normal  lg:text-[10px] text-[10px]">
                  {accountDetails?.name}
                </h2>
              </div>
              <ul className="divide-y divide-gray-200 !text-[12px] ">
                <Link href="/viewProfile">
                  <li className="flex justify-between border-t border-b border-gray-300 items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                    <span className=" text-gray-800">My account</span>
                    <span className="text-gray-400 text-base"><MdChevronRight /></span>
                  </li>
                </Link>

                <Link href="/orders">
                  <li className="flex justify-between border-b border-gray-300 items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                    <span className=" text-gray-800">My purchases</span>
                    <span className="text-gray-400 text-base"><MdChevronRight /></span>
                  </li>
                </Link>

                <Link href="#">
                  <li className="flex justify-between border-t border-b border-gray-300 items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                    <span className=" text-gray-800">Help</span>
                    <span className="text-gray-400 text-base"><MdChevronRight /></span>
                  </li>
                </Link>

                <li
                  onClick={handleLogout}
                  className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <span className=" text-gray-800">Sign out</span>
                  <span className="text-gray-400 text-base"><MdChevronRight /></span>
                </li>
              </ul>

            </div>
          </li>
          <Link href={'/cart'}>
            <li className="lg:hidden relative cursor-pointer">
              <FaShoppingCart className="text-2xl text-black" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </li>
          </Link>
        </>

      ) : (
        <li
          className="relative group " 
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Trigger */}

         
          <Link href="/login" className="relative px-3 py-2 text-black group">
          Login
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
        </Link>
         


          {/* Dropdown */}
          <div
            className={`absolute -left-24 top-[3rem] mt-1 w-[200px] p-3 bg-white text-black shadow-lg z-50 transition-all duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
          >
            {/* <ul>
              <Link href={"/viewProfile"}>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  View Profile</li>
              </Link>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Order</li>
              <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul> */}

            <Link href={"/login"}>
              <div className="bg-[#000] text-white text-center px-2 py-3">
                SIGN IN
              </div>
            </Link>
            <div className="px-2 py-3 text-black flex justify-center items-center">
              <h2 className="text-[10px] font-thin">DONT HAVE AN ACCOUNT? <Link href={"/register"} className="font-bold text-[10px] hover:underline">REGISTER</Link></h2>
            </div>
          </div>
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

  // Main Navbar js 
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop >= 35); // once black bar is scrolled
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);





  return (
    <>
      <div className="bg-black h-[40px] w-full flex justify-center items-center z-10">
        <div className="lg:text-[11px] text-[10px] pb-2 text-white flex justify-center items-center">
          Complimentary U.S. No-Rush Shipping on orders of $95 or more. <Link href={"/shop"}>Shop Now</Link>
        </div>
      </div>
      <div ref={navRef}
        className={`w-full z-[999] top-[-5px] font-playfair transition-all duration-300 ${isSticky ? "sticky top-0 bg-white shadow-sm" : "relative bg-white"
          }`}>
        <div className="w-full  py-1 bg-white">
          <div className="w-full flex lg:justify-between items-center px-4 lg:px-4">
            <div className="hidden lg:flex lg:w-[75%]">{navList}</div>
            <div className="lg:hidden flex w-[33.33%] justify-start items-center" onClick={openMobileDrawer}>
              <img src="/asset/Home/menu.png" className="w-[38px]" alt="Menu" />
            </div>
            <Link href="/" className="w-[40%] flex justify-center items-center">
              <img src="/asset/Navbar/logo.png" className="lg:w-[55px] w-[50px]" alt="Logo" />
            </Link>
            <div className="hidden lg:flex lg:w-[45%] justify-end">{navListExtra}</div>
            <div className="lg:hidden flex justify-center items-center w-[20%]">
              {isAuthenticated ? (<>
                <ul className="">
                  <li
                    className="relative"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {/* Trigger */}
                    <div className="cursor-pointer relative text-black">
                      <FaUser className="w-10" />
                    </div>

                    {/* Dropdown */}
                    <div
                      className={`absolute left-0 top-[1rem] text-[10px] mt-1 w-[120px] bg-white text-black shadow-lg rounded-lg z-50 transition-all duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                    >
                      <div className="flex justify-start flex-col items-start gap-1 px-4 py-2">
                        <p className="font-thin lg:text-[10px] text-[10px]">HI,</p>
                        <h2 className="font-normal  lg:text-[10px] text-[10px]">
                          {accountDetails?.name}
                        </h2>
                      </div>
                      <ul className="divide-y divide-gray-200 !text-[10px] ">
                        <Link href="/viewProfile">
                          <li className="flex justify-between border-t border-b border-gray-300 items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                            <span className=" text-gray-800">My account</span>
                            <span className="text-gray-400 text-base"><MdChevronRight /></span>
                          </li>
                        </Link>

                        <Link href="/orders">
                          <li className="flex justify-between border-b border-gray-300 items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                            <span className=" text-gray-800">My purchases</span>
                            <span className="text-gray-400 text-base"><MdChevronRight /></span>
                          </li>
                        </Link>

                        <Link href="#">
                          <li className="flex justify-between border-t border-b border-gray-300 items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                            <span className=" text-gray-800">Help</span>
                            <span className="text-gray-400 text-base"><MdChevronRight /></span>
                          </li>
                        </Link>

                        <li
                          onClick={handleLogout}
                          className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          <span className=" text-gray-800">Sign out</span>
                          <span className="text-gray-400 text-base"><MdChevronRight /></span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </>) : (<>
                <ul className="">
                  <li
                    className="relative"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {/* Trigger */}
                    <div className="cursor-pointer relative text-black">
                      <FaUser className="w-10" />
                    </div>

                    {/* Dropdown */}
                    <div
                      className={`absolute left-[-0.75rem] top-[1rem] text-[10px] mt-1 w-[120px] bg-white text-black shadow-lg rounded-lg z-50 transition-all duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                    >
                      <div className="flex justify-start flex-col items-start gap-1 px-4 py-2">
                        <p className="font-thin lg:text-[10px] text-[10px]">Welcome</p>
                        <h2 className="font-normal lg:text-[10px] text-[10px]">
                          Guest User
                        </h2>
                      </div>
                      <ul className="divide-y divide-gray-200 !text-[10px] ">
                        <Link href="/login">
                          <li className="flex justify-between border-t border-b border-gray-300 items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                            <span className=" text-gray-800">Login</span>
                            <span className="text-gray-400 text-base"><MdChevronRight /></span>
                          </li>
                        </Link>

                        <Link href="/register">
                          <li className="flex justify-between border-b border-gray-300 items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                            <span className=" text-gray-800">Sign Up</span>
                            <span className="text-gray-400 text-base"><MdChevronRight /></span>
                          </li>
                        </Link>
                      </ul>
                    </div>
                  </li>
                </ul>
              </>)}
              <div className="flex justify-center items-center">
                <ul className="flex justify-center items-center gap-3">
                  <Link href={'/wishlist'}>
                    <li className="relative cursor-pointer">
                      <FaHeart className="text-2xl text-black" />
                    </li>
                  </Link>
                  {isAuthenticated ? (
                    <Link href={'/cart'}>
                      <li className="relative cursor-pointer">
                        <FaShoppingCart className="text-2xl text-black" />
                        {cartItems.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {cartItems.length}
                          </span>
                        )}
                      </li>
                    </Link>
                  ) : null}
                  <Link href="/search">
                  <li  className="block lg:hidden cursor-pointer">
                    <FaSearch className="text-xl text-black" />
                  </li>
                  </Link>
                  {isSearchOpen && (
                    <div className="fixed inset-0 z-[9999] bg-white transition-all duration-500 ease-in-out lg:hidden">
                      <div className="flex justify-center items-center"></div>
                      {/* Header */}
                      <div className="flex justify-between items-center px-4 py-4 border-b shadow">
                        <h2 className="text-lg font-semibold text-gray-800">Search</h2>
                        <button
                          onClick={() => setIsSearchOpen(false)}
                          className="text-2xl text-gray-700 hover:text-black"
                        >
                          &times;
                        </button>
                      </div>

                      {/* Search Input */}
                      <div className="p-4">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black text-sm"
                          placeholder="Search for products..."
                        />
                      </div>

                      {/* Search Results */}
                      <div className="p-4 overflow-y-auto h-[70vh] space-y-3">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((item) => (
                            <Link href={`/shop/${item.id}`}>
                              <div
                                key={item.id}
                                className="flex gap-4 items-center p-3 border rounded-lg shadow-sm hover:shadow-md transition duration-300"
                              >
                                <div className="w-12 h-12 overflow-hidden bg-gray-100">
                                  <img
                                    src={item.productImages?.[0] || "/placeholder.jpg"}
                                    alt={item.productName}
                                    className="object-fill w-full h-full"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500">{item.productSku}</span>
                                  <span className="text-sm font-medium text-gray-800">{item.productName}</span>
                                </div>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="flex justify-center items-center h-[500px]">
                            <p className="text-[20px]">No Match Found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`fixed top-0 left-0 w-screen h-screen bg-white z-[9998] px-6 pt-6 transform transition-transform duration-300 ${drawerTranslate} ${openDrawer ? '' : 'pointer-events-none'}`}>
          <div className="flex justify-between items-center border-b border-gray-600 pb-4">
            <Link href="/" onClick={closeMobileDrawer}>
              <img src="/asset/Navbar/logo.png" className="w-[100px]" alt="Logo" />
            </Link>
            <RxCross1 className="text-[20px] cursor-pointer" onClick={closeMobileDrawer} />
          </div>
          <ul className="flex flex-col gap-4 mt-6 text-[#2F3435] font-playfair text-[20px]">
            <li>
              <button className="w-full flex justify-between items-center" onClick={() => setMobileOpenHim(!mobileOpenHim)}>
                <span>For Him</span>
                <MdChevronRight className={`${mobileOpenHim ? 'rotate-90' : ''} transition-transform`} />
              </button>
              {mobileOpenHim && (
                <ul className="mt-2 ml-4 text-[16px] space-y-2">
                  {navItems[0].children.map((child, i) => (
                    <li key={i}>
                      <Link href={child.href} onClick={closeMobileDrawer}>{child.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <button className="w-full flex justify-between items-center" onClick={() => setMobileOpenHer(!mobileOpenHer)}>
                <span>For Her</span>
                <MdChevronRight className={`${mobileOpenHer ? 'rotate-90' : ''} transition-transform`} />
              </button>
              {mobileOpenHer && (
                <ul className="mt-2 ml-4 text-[16px] space-y-2">
                  {navItems[1].children.map((child, i) => (
                    <li key={i}>
                      <Link href={child.href} onClick={closeMobileDrawer}>{child.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link href="/arabic" onClick={(e) => { e.preventDefault(); }}>
                Arabic <span className="text-[12px] ml-2 uppercase tracking-wide">(Coming Soon)</span>
              </Link>
            </li>
            <li><Link href="/about" onClick={closeMobileDrawer}>About</Link></li>
            <li><Link href="/contact" onClick={closeMobileDrawer}>Contact</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}