import { createReducer } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

let initialState = {
  cartItems: [],
  shippingInfo: {},
};

// const loadInitialState = async () => {
//   try {
//     const cartItems = await AsyncStorage.getItem("cartItems");
//     const shippingInfo = await AsyncStorage.getItem("shippingInfo");

//     if (cartItems !== null) {
//       const cartlength = JSON.parse(cartItems).length;
//       var parsedItems=JSON.parse(cartItems);
//       // console.log(parsedItems);
//       initialState.cartItems = cartlength ? JSON.parse(cartItems) : [];
//     }
//     console.log(8);
//     console.log(initialState.cartItems);
//   } catch (error) {
//     console.error("Error loading initial state:", error);
//   }
// };

export const cartReducer = createReducer(initialState, {
  ADD_TO_CART: (state, action) => {
    const item = action.payload;
    const isItemExists = state.cartItems.find((i) => i.product === item.product);
    if (isItemExists) {
      return {
        ...state,
        cartItems: state.cartItems.map((i) =>
          i.product === isItemExists.product ? item : i
        ),
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    }
  },
  REMOVE_CART_ITEM: (state, action) => {
    return {
      ...state,
      cartItems: state.cartItems.filter((i) => i.product !== action.payload),
    };
  },
  SAVE_SHIPPING_INFO: (state, action) => {
    return {
      ...state,
      shippingInfo: action.payload,
    };
  },
  INIT_ITEMS: (state, action) => {
    return {
      ...state,
      cartItems: action.payload.cart,
      shippingInfo: action.payload.shipping,
    }
  }
});

// Load initial state from AsyncStorage



