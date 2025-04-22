import FeaturedCategories from "@/components/FeaturedCategories";
import FilterBar from "@/components/product/FilterBar";
import ListItem from "@/components/product/ListItem";
import ProductProvider from "@/providers/ProductProvider";
import productAction from "@/services/axios/actions/product.endpoint";
import { productEndpoint } from "@/services/axios/endpoints/product.endpoint";
import Image from "next/image";

import Link from "next/link";

async function getProducts() {
  const res = await productAction.getAll();
  if (!res) {
    throw new Error("Failed to fetch products");
  }

  return res;
}

export default async function Home() {
  const initialProducts = await getProducts();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Welcome to ShopZ</h1>
            <p className="text-xl mb-8">
              Discover amazing products at great prices
            </p>
            <Link
              href="#products"
              className="bg-white text-black px-8 py-3 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:bg-gray-100 hover:scale-105 hover:shadow-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12" id="products">
        <ProductProvider initialProducts={initialProducts}>
          <div className="flex gap-10">
            <FilterBar />
            <ListItem />
          </div>
        </ProductProvider>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for the latest products and exclusive
            offers
          </p>
        </div>
      </div>
    </main>
  );
}
