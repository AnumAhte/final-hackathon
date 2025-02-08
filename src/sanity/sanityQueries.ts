import { Products } from "@/types/products";
import { client } from "./lib/client";

export async function getProductBySlug(slug: string): Promise<Products | null> {
    const query = `*[_type == "products" && slug.current == $slug][0]{
      _id,
      name,
      price,
      description,
      image, // ✅ Keep original structure
      category,
      discountPercent,
      new,
      colors,
      sizes,
      slug,
      inventory
    }`;
  
    try {
      const product = await client.fetch(query, { slug });
      return product || null;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  }
  