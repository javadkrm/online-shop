import type { CartItem } from "./types/CartItem";

const STORAGE_KEY = "cart";

export function loadCart(): CartItem[] {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items)
  );
}