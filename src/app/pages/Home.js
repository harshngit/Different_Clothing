"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase.config.js";

import Head from "next/head.js";
import { ThemeProvider } from "@material-tailwind/react";
import HomeBanner from "@/components/Home/HomeBanner.js";
import NavbarTwo from "../../components/Layout/Navbar.js";
import AboutHome from "@/components/Home/AboutHome.js";
import Deal from "@/components/Home/Deal.js";
import ProductsHome from "@/components/Home/ProductsHome.js";
import CTA from "@/components/Home/CTA.js";
import Footer from "@/components/Layout/Footer.js";
import Photosection from "@/components/Home/Photosection.js";
import Topbar from "@/components/Layout/Topbar.js";
import "../../components/Home/Home.css";

const Home = () => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const productRef = collection(db, "Product");
      const q = query(productRef, where("productStatus", "==", "Published"), orderBy("createdAtDate", "desc"), limit(5));
      const querySnapshot = await getDocs(q);

      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  console.log(product)

  useEffect(() => {
    const getProducts = async () => {
      const latestProducts = await fetchProduct();
      setProduct(latestProducts);
    };
    getProducts();
  }, []);

  return (
    <div className="font-playfair">
      {/* <ThemeProvider> */}
      <NavbarTwo />
      <section className="relative -top-[65px] pt-[0px]">
        <HomeBanner />
      </section>
      <section className=" ">
        <AboutHome />
      </section>
      <section className="relative overflow-hidden">
        <Deal productList={product} />
      </section>
      <section className="relative overflow-hidden">
        <Photosection />
      </section>
      <section className="relative overflow-hidden">
        {/* Optionally pass the latest product data to ProductsHome */}
        {/* <ProductsHome /> */}
      </section>
      <section className='relative overflow-hidden'>
        <CTA />
      </section>
      <section className="">
        <Footer />
      </section>
      {/* </ThemeProvider> */}
    </div>
  );
};

export default Home;
