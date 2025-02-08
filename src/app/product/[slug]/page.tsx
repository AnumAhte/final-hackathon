"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "./ProductDetails";
import { Products } from "@/types/products";
import { getProductBySlug } from "@/sanity/sanityQueries";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!params?.slug) return;
      setLoading(true);
      const fetchedProduct = await getProductBySlug(params.slug as string);
      setProduct(fetchedProduct);
      setLoading(false);
    }

    fetchProduct();
  }, [params?.slug]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!product) return <div className="text-center text-red-500 py-10">Product not found</div>;

  return <ProductDetail product={product} />;
}
