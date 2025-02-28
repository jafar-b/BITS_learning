import { Product } from '@/models/Product';
import { create } from 'zustand';

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart:(ProductId:number)=>void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (product: Product) => set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart:(productId:number)=>set((state)=>({cart:state.cart.filter((item)=>item.id!==productId)}))
}));

