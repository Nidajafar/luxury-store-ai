"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

const SubCategoryPage = () => {
  const params = useParams();

  const categoryName = params?.categoryName?.toLowerCase().trim();
  const subcategory = params?.subcategory
    ?.toLowerCase()
    .replaceAll("-", " ")
    .trim();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryName || !subcategory) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/auth/product");

        const filtered = res.data.filter((p) => {
          const dbCategory = p.category?.toLowerCase().trim();
          const dbSub = p.subCategory?.toLowerCase().trim();

          return (
            dbCategory === categoryName &&
            dbSub?.includes(subcategory)
          );
        });

        setProducts(filtered);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName, subcategory]);

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold uppercase text-[#1a2b4b]">
          {categoryName}
        </h1>

        <p className="text-gray-500 mt-3 capitalize text-xl">
          {subcategory}
        </p>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No products found
        </p>
      )}
    </div>
  );
};

export default SubCategoryPage;