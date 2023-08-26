import {
  ADD_TO_CART,
  INIT_ITEMS,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

import backEndUrl from "../host";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {

  try {
    const { data } = await axios.get(
      `${backEndUrl}/api/v1/product/${id}`
    );
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });
    const token = await AsyncStorage.getItem('token');
    await AsyncStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );

    await axios.post(
      `${backEndUrl}/api/v1/cart`,
      { cartItems: getState().cart.cartItems, token },
    );
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

// Get Items from user
export const getItems = () => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('token');
    let { data } = await axios.post(`${backEndUrl}/api/v1/cart/all`, { token: token });

    data.cart.forEach(async (element) => {
      const { data } = await axios.get(
        `${backEndUrl}/api/v1/product/${element.product}`
      );
      // console.log(data);
      if (data.product.Stock < element.stock) {
        dispatch({
          type: REMOVE_CART_ITEM,
          payload: element.product,
        });


        await AsyncStorage.setItem(
          "cartItems",
          JSON.stringify(getState().cart.cartItems)
        );
        console.log(' jk', getState().cart.cartItems);
        await axios.post(
          `${backEndUrl}/api/v1/cart`,
          { cartItems: getState().cart.cartItems, token },
        );

      }
    });

    let { data: data1 } = await axios.post(
      `${backEndUrl}/api/v1/cart/all`,
      {
        token
      }
    );
    const shippingInfo = await AsyncStorage.getItem('shippingInfo');
    dispatch({ type: INIT_ITEMS, payload: { cart: data1.cart, shipping: shippingInfo ? shippingInfo : {} } })
    await AsyncStorage.setItem("cartItems", JSON.stringify(data1.cart))

  } catch (error) {
    console.error("Error getting cart items:", error);
  }
};

export const reomveItemsFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
    await AsyncStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
    const token = await AsyncStorage.getItem('token');
    await axios.post(
      `${backEndUrl}/api/v1/cart`,
      { cartItems: getState().cart.cartItems, token },
    );
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

// Save Shipping info
export const saveShippingInfo = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
    const token = await AsyncStorage.getItem('token');
    await axios.post(
      `${backEndUrl}/api/v1/address/save`,
      { shippingInfo: getState().cart.shippingInfo, token },
    );
    await AsyncStorage.setItem(
      "shippingInfo",
      JSON.stringify(getState().cart.shippingInfo)
    );
  } catch (error) {
    console.error("Error saving shipping info:", error);
  }
};
