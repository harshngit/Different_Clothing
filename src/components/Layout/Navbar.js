"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/actions/authActions";
import { FaAngleRight, FaArrowRight, FaSearch, FaUser } from "react-icons/fa";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/app/firebase.config";
import { MdChevronRight } from "react-icons/md";
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
  const [product, setProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  console.log(product)

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

  const navList = (
    <ul className="flex flex-col lg:flex-row items-start gap-1 text-white uppercase font-playfair font-semibold">
      {navItems.map((item, idx) => (
        <li key={idx} className="relative group">
          <Link
            href={item.href}
            className={`relative px-3 py-1 transition lg:text-[12px] block text-black`}
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
    <ul className="flex flex-col lg:flex-row items-end  gap-1 text-white uppercase font-playfair lg:text-[12px] font-semibold">
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
          <div
            className={`fixed top-0 left-0 w-full  z-50 bg-white border-b shadow-md px-6 py-4 transform transition-all duration-700 ease-in-out ${openDropdownSearch ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
              }`}
          >
            <div className="h-auto flex justify-center items-center">
              <h2 className="text-[30px] text-[#8A8A8A]">DIFFERENT CLOTHING</h2>
            </div>

            {/* Top Bar */}
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex items-center space-x-4 flex-grow">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border-b border-black text-black text-sm focus:outline-none flex-1"
                />
                <button
                  onClick={() => setOpenDropdownSearch(false)}
                  className="hover:text-black text-gray-800 text-2xl ml-4"
                >
                  &times;
                </button>
                <div className="flex space-x-4 text-sm text-gray-600 font-medium">
                  {isAuthenticated ? (<>
                    <li
                      className="relative"
                      onMouseEnter={() => setIsOpen(true)}
                      onMouseLeave={() => setIsOpen(false)}
                    >
                      {/* Trigger */}
                      <div className="cursor-pointer mt-2 ml-2 relative text-black">
                        My Profile
                        <span
                          className={`absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-300 ${isOpen ? "w-full" : "w-0"
                            }`}
                        />
                      </div>

                      {/* Dropdown */}
                      {/* <div
                        className={`absolute -left-12 top-full mt-1 w-40 bg-white text-black shadow-lg rounded-lg z-50 transition-all duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                          }`}
                      >
                        <div className="flex justify-start flex-col items-start gap-1 px-4 py-2">
                          <p className="font-thin lg:text-[10px] text-[10px]">HI,</p>
                          <h2 className="font-normal  lg:text-[10px] text-[10px]">
                            {userProfile?.displayName}
                          </h2>
                        </div>
                        <ul>
                          <Link href={"/viewProfile"}>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                              My Account</li>
                          </Link>
                          <Link href={'/orders'} >
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Order</li>
                          </Link>
                          <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                        </ul>
                      </div> */}
                    </li>
                  </>) : (<><Link href="/login" className="relative px-3 py-2 text-black group">
                    Login
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                  </Link></>)}
                  <Link href="/cart" className="relative px-3 py-2 text-black group">
                    Bag ({cartItems.length})
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                  </Link>
                  <Link href="/wishlist" className="relative px-3 py-2 text-black group">
                    Wishlist
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Product Section */}
            <div className="flex flex-col m-5 justify-start items-center w-full">
              <div className="flex w-[30%] justify-start items-start">
                <h4 className="text-xs text-left font-semibold text-gray-700 mb-4">FEATURED PRODUCTS</h4>
              </div>
              <div className="space-y-3  h-[20vh] overflow-y-scroll w-[30%]">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <Link href={`/shop/${item?.id}`}>
                      <div
                        key={item.id}
                        className="flex gap-4 items-center p-3  transition duration-300 "
                      >
                        {/* Product Image */}
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img
                            src={item.productImages?.[1] || "/placeholder.jpg"} // fallback image
                            alt={item.productName}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-center">
                          <span className="text-xs text-gray-500">{item.productSku || "No SKU"}</span>
                          <span className="text-sm font-medium text-gray-800">{item.productName || "Unnamed Product"}</span>
                        </div>
                      </div>
                    </Link>

                  ))
                ) : (
                  <div className="text-sm text-gray-500">No matching products</div>
                )}
              </div>
            </div>
          </div>
        )}

      </li>

      {isAuthenticated ? (
        <>
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
              className={`absolute -left-12 top-[2rem] mt-1 lg:w-[200px] bg-white text-black shadow-lg rounded-lg z-50 transition-all duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
              <div className="flex justify-start flex-col items-start gap-1 px-4 py-2">
                <p className="font-thin lg:text-[10px] text-[10px]">HI,</p>
                <h2 className="font-normal  lg:text-[10px] text-[10px]">
                  {userProfile?.displayName}
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
            <li
              className="lg:hidden relative text-[15px]"
            >
              BAG({cartItems.length})
            </li>

          </Link>
        </>

      ) : (
        <li
          className="relative"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Trigger */}

          <div className="cursor-pointer relative text-black">
            Login
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-300 ${isOpen ? "w-full" : "w-0"
                }`}
            />
          </div>


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
  const [isSticky, setIsSticky] = useState(false);
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
      <div className="bg-black h-[35px] w-full flex justify-center items-center z-10">
        <div className="text-[11px] text-white">
          Complimentary U.S. No-Rush Shipping on orders of $95 or more. Shop now
        </div>
      </div>
      <div ref={navRef}
        className={`w-full z-[9999] bg-white font-playfair transition-all duration-300 ${isSticky ? "fixed top-0 shadow-sm" : "relative"
          }`}>
        <div className="w-full  py-1 bg-[#fff]">
          <div className="w-full flex lg:justify-between items-center px-4 lg:px-8">
            <div className="hidden lg:flex lg:w-[45%]">{navList}</div>
            <div className="lg:hidden flex w-[33.33%] justify-start items-center" onClick={() => setOpenDrawer(true)}>
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
                          {userProfile?.displayName}
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
              </>)}
              {isAuthenticated ? (<div className="flex justify-center items-center">
                <ul className="flex justify-center items-center gap-3">
                  <Link href={'/cart'}>
                    <li
                      className="relative text-[15px]"
                    >
                      BAG({cartItems.length})
                    </li>
                  </Link>
                  <li onClick={() => setIsSearchOpen(true)} className="block lg:hidden cursor-pointer">
                    <FaSearch className="text-xl text-black" />
                  </li>
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
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                                  <img
                                    src={item.productImages?.[1] || "/placeholder.jpg"}
                                    alt={item.productName}
                                    className="object-cover w-full h-full"
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
                          <p className="text-sm text-gray-500">No matching products</p>
                        )}
                      </div>
                    </div>
                  )}
                </ul>
              </div>) : (<>
                <Link href="/login" className="relative px-3 text-[15px] py-2 text-black group">
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link href="/register" className="relative px-3 text-[15px] py-2 text-black group">
                  Sign
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
    </>
  );
}
