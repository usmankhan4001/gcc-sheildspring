export type Category = "men" | "women" | "kids" | "accessories";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  colors: string[];
  sizes: string[];
  description: string;
  details: string[];
  palette: [string, string];
  image: string;
  images?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartLine {
  slug: string;
  size: string;
  color: string;
  quantity: number;
}
