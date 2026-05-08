export type Brand = "Apple" | "Samsung" | "Google" | "Other";
export type Condition = "New" | "Used";
export type DeliveryMethod = "pickup" | "delivery";
export type OrderStatus = "pending" | "confirmed" | "delivered";

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  model: string;
  storage: string;
  color: string;
  condition: Condition;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryMethod: DeliveryMethod;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  status: OrderStatus;
  total: number;
  createdAt: string;
}
