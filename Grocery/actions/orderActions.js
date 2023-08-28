import axios from "axios";
import backEndUrl from "../host";
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  SAVE_ORDER_REQUEST,
  SAVE_ORDER_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";
import { reomveItemsFromCart } from "./cartActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Create Order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const token = await AsyncStorage.getItem('token');
    console.log(order);
    const { data } = await axios.post(
      `${backEndUrl}/api/v1/orders/new`,
      { order, token },
    );
    order.orderItems.forEach((element) => {
      dispatch(reomveItemsFromCart(element.product));
    });
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const saveOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SAVE_ORDER_REQUEST });
    const token = await AsyncStorage.getItem('token');

    const { data } = await axios.post(
      `${backEndUrl}/api/v1/orders/me`,
      { token }

    );
    dispatch({ type: SAVE_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.msg,
    });
  }
};


// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${backEndUrl}/api/v1/order/${id}`,
      { withCredentials: true }
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
