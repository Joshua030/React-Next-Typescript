import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PizzaDetails } from "../../../types";
import { RootState } from "../../store";

interface CartState {
  cart: PizzaDetails[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<PizzaDetails>) => {
      state.cart.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    decreaseItemQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity -= 1;
        item.totalPrice = item.unitPrice * item.quantity;
      }

      if (item?.quantity === 0) {
        cartSlice.caseReducers.deleteItem(
          state,
          action as PayloadAction<number>,
        ); // Use deleteItem to remove the item if quantity is zero
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// Other code such as selectors can use the imported `RootState` type

export const getTotalCartQuanntity = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (state: RootState, pizzaId: number) =>
  state.cart.cart.find((item) => item.pizzaId === pizzaId)?.quantity || 0;

// 'reselct' is not used in this file, but it can be useful for performance optimization
