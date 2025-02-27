import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from "sonner";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCartFromServer();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      saveCartToServer(items);
    }
  }, [items]);

  const loadCartFromServer = async () => {
    try {
      const response = await fetch('/api/store-config/get-cart.php');
      const data = await response.json();
      if (data.cart_data) {
        setItems(JSON.parse(data.cart_data));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const saveCartToServer = async (cartItems: CartItem[]) => {
    try {
      await fetch('/api/store-config/save-cart.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart_data: cartItems }),
      });
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addItem = (item: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      if (existingItem) {
        return currentItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...currentItems, { ...item, quantity: 1 }];
    });
    toast.success("Produto adicionado ao carrinho!");
  };

  const removeItem = (itemId: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
    toast.success("Produto removido do carrinho!");
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    saveCartToServer([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearCart,
      updateQuantity,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};