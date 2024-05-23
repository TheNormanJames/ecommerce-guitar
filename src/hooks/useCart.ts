import { useEffect, useMemo, useState } from 'react';
import { db } from '../data/db';

import type { Guitar, CartItem } from '../types/types';

export default function useCart() {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  function addToCart(item: Guitar) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    // console.log(itemExist);

    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) return;
      const updateCart = [...cart];
      updateCart[itemExist].quantity++;
      setCart(updateCart);
      console.log('Ya existe');
    } else {
      const newItem: CartItem = { ...item, quantity: 1 };

      setCart([...cart, newItem]);
    }
  }

  useEffect(() => {
    setData(db);
  }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function removeFromCart(id: Guitar['id']) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function decreaseQuantity(id: Guitar['id']) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  }

  function increaseQuantity(id: Guitar['id']) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  }

  function clearCart() {
    setCart([]);
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
}
