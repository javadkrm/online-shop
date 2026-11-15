import { useAppSelector } from "../../../app/hooks";

export function useCart() {
  return useAppSelector(state => ({
    items: state.cart.items,
    quantity: state.cart.items.reduce((total, item) => total + item.quantity, 0),
  }));
}
