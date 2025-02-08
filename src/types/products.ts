export interface Products {
  _id: string;
  _type: "products";
  name: string;
  price: number;
  description?: string;
  image?: {
    asset: {
      _ref: string;
      _type: "image";
    };
  };
  category: "tshirt" | "short" | "jeans" | "hoodie" | "shirt";
  discountPercent?: number;
  new?: boolean;
  colors: string[];
  sizes: string[];
  slug: {
    _type: "slug";
    current: string;
  };
  inventory: number; // ✅ Added inventory
}
