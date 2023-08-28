import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  CLEAR_ERRORS,
  SEND_OTP_FAIL,
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  ADD_PIN_REQUEST,
  ADD_PIN_SUCCESS,
  ADD_PIN_FAIL,
  GET_PIN_REQUEST,
  GET_PIN_SUCCESS,
  GET_PIN_FAIL,
  DELETE_ADDRESS_FAIL,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  // UPDATE_PROFILE_REQUEST,
  // UPDATE_PROFILE_SUCCESS,
  // UPDATE_PROFILE_FAIL,
} from "../constants/userConstants.js";
import axios from "axios";
import backEndUrl from "../host";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveShippingInfo } from "./cartActions.js";

//sendOTP
export const checkUser = (phoneNo) => async (dispatch) => {
  try {
    dispatch({ type: SEND_OTP_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${backEndUrl}/api/v1/checkUser`,
      { phoneNo }
    );
    dispatch({ type: SEND_OTP_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: SEND_OTP_FAIL, payload: e.response.data.msg });
  }
};

//login
export const login = (phoneNo) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${backEndUrl}/api/v1/login`,
      { phoneNo },
      config
    );
    if (data.success) {
      await AsyncStorage.setItem('token', data.token)
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${backEndUrl}/api/v1/register`,
      userData,
      config
    );
    if (data.success) {
      await AsyncStorage.setItem('token', data.token)
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.msg,
    });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${backEndUrl}/api/v1/logout`, {
      withCredentials: true,
    });
    await AsyncStorage.setItem('token', '');
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.msg });
  }
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    const token = await AsyncStorage.getItem('token');
    const { data } = await axios.post(
      `${backEndUrl}/api/v1/user`,
      { token: token },
    );
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const token = await AsyncStorage.getItem('token');
    const { data } = await axios.patch(
      `${backEndUrl}/api/v1/user`,
      { userData, token },
    );
      console.log(data);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};


//add pinCode --NON USER

export const addPinCode = (pinCode) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PIN_REQUEST });
    console.log(pinCode);
    const { data } = await axios.post(
      `${backEndUrl}/api/v1/user/save/pincode`,
      { pinCode: pinCode },
    );
    await AsyncStorage.setItem('pinCode', data.pin)
    dispatch({ type: ADD_PIN_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_PIN_FAIL, payload: error.response.data.msg });
  }
};

export const getPin = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PIN_REQUEST });
    const pin = await AsyncStorage.getItem('pinCode');
    const { data } = await axios.post(
      `${backEndUrl}/api/v1/user/pincode`,
      { pin }
    );

    dispatch({ type: GET_PIN_SUCCESS, payload: data.pinCode });
  } catch (error) {
    dispatch({ type: GET_PIN_FAIL, payload: error.response.data.msg });
  }
};

export const deleteAddress = () => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADDRESS_REQUEST });
    dispatch(saveShippingInfo({}));
    dispatch({ type: DELETE_ADDRESS_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_ADDRESS_FAIL, payload: error.response.data.msg });
  }
};

export const updateAddress = (addressInfo) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });
    const token = await AsyncStorage.getItem('token');
    axios.post(
      `${backEndUrl}/api/v1/address/save`,
      { shippingInfo: addressInfo, token },
    );
    dispatch({ type: UPDATE_ADDRESS_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_ADDRESS_FAIL, payload: error.response.data.msg });
  }
};
