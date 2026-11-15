import type { Middleware } from "@reduxjs/toolkit";
import { saveCart } from "../CartStorage";

export const cartStorageMiddleware: Middleware =
  (store) => (next) => (action) => {

    const result = next(action);

    if (
      typeof action === "object" &&
      action !== null &&
      "type" in action &&
      typeof action.type === "string" &&
      action.type.startsWith("cart/")
    ) {
      const cartItems = store.getState().cart.items;

      saveCart(cartItems);
    }

    return result;
  };