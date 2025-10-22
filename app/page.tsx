import { useState } from "react";
import Home from "../comps/Home";

import { client } from "../lib/client";

export interface ProductsTypes {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  details: string;
  image: [[Object], [Object], [Object]];
  model: string;
  name: string;
  price: number;
  oldPrice: number;
  slug: { _type: string; current: string };
  quantity: number;
}

export interface BannerDataTypes {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  buttonText: string;
  desc: string;
  discount: string;
  image: { _type: string; asset: [Object] };
  largeText1: string;
  midText: string;
  product: string;
  saleTime: string;
}

async function getData(selectedSort: string = "desc") {
  const query = `*[_type == "product"] | order(price ${selectedSort})`;
  const products: ProductsTypes[] = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData: BannerDataTypes[] = await client.fetch(bannerQuery);

  console.log({
    products,
    bannerData,
  });

  return {
    products,
    bannerData,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { sort?: string };
}) {
  const sortOrder = searchParams.sort || "desc";
  const { products, bannerData } = await getData(sortOrder);
  return (
    <>
      <Home
        products={products}
        bannerData={bannerData}
        currentSort={sortOrder}
      />
    </>
  );
}
