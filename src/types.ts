export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  installments: {
    count: number;
    value: number;
    interestFree: boolean;
  };
  image: string;
  badge?: string;
  isOffer?: boolean;
  shortDescription: string;
  features: string[];
  stockSimulated: number;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  label: string;
  iconName?: string;
  description?: string;
}

export type SortOption = 'relevance' | 'price-asc' | 'price-desc';

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  priceRange: 'all' | 'under-50' | '50-150' | 'above-150';
  onlyOffers: boolean;
  sortBy: SortOption;
}

export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  shippingMethod: 'standard' | 'express';
  shippingCost: number;
  paymentMethod: 'pix' | 'credit-card' | 'boleto';
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
  cardInstallments?: number;
}

export interface AnalyticsEventRecord {
  id: string;
  timestamp: string;
  eventName: string;
  payload: Record<string, unknown>;
}
