"use client";
import { useState } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";
import { useRouter } from "next/navigation";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
  currentSort: string;
}

const Home = ({ products, bannerData, currentSort }: HomeProps) => {
  const router = useRouter();

  const handleSortChange = (value: string) => {
    router.push(`/?sort=${value}`);
  };
  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="mb-4 flex items-center flex-col">
        <h1
          className=" headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
         font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
        {/* <p className=" text-base text-secondary">Best in the Market</p> */}
      </section>
      <div className="flex justify-center items-center gap-2">
        <span className="text-secondary">Sort by:</span>
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          className="price-sort-select"
          value={currentSort}
        >
          <option value="asc">low to high</option>
          <option value="desc">high to low</option>
        </select>
      </div>
      {/* === SHOW PRODUCTS  */}
      <section
        className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3
       lg:mx-20 overflow-hidden
      "
      >
        {/* === MAP PRODUCTS  */}
        {products?.map((products: ProductsTypes) => {
          return <Products key={products._id} products={products} />;
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
