export type CategorySlug = 'amigurumi' | 'wearables' | 'bags' | 'home-decor' | 'blankets';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  categoryName: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  materials: string;
  dimensions: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  customNote?: string;
}