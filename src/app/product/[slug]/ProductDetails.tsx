import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Products } from "@/types/products";
import AddToCartButton from "@/app/components/AddToCartButton";

interface ProductDetailProps {
  product: Products;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  // 🛠 Ensure product image URL is valid
  const imageUrl = product.image ? urlFor(product.image)?.width(500).height(500).url() : "/placeholder.jpg";

  return (
    <div className="flex flex-col md:flex-row gap-10 p-5">
      {/* ✅ Image Fix */}
      <div className="w-full md:w-1/2">
        <Image
          src={imageUrl}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg"
          priority
        />
      </div>

      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-700 my-2">{product.description}</p>
        <p className="text-xl font-semibold">${product.price}</p>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
