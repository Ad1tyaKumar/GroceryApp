import { createReducer } from "@reduxjs/toolkit";

export const newOrderReducer = createReducer(
  {},

  {
    CREATE_ORDER_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },

    CREATE_ORDER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    },

    CREATE_ORDER_FAIL: (state, action) => {
      return {
        loading: true,
        error: action.payload,
      };
    },

    SAVE_ORDER_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },

    SAVE_ORDER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    },

    SAVE_ORDER_FAIL: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },

    CLEAR_ERRORS: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },
  }
);

export const orderReducer = createReducer(
  {},
  {
    UPDATE_ORDER_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_ORDER_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_ORDER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_ORDER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_ORDER_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_ORDER_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_ORDER_RESET: (state, action) => {
      return {
        ...state,
        isUpdated: false,
      };
    },
    DELETE_ORDER_RESET: (state, action) => {
      return {
        ...state,
        isDeleted: false,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },
  }
);

export const orderDetailsReducer = createReducer(
  { order: {} },
  {
    ORDER_DETAILS_REQUEST: (state, action) => {
      return {
        loading: true,
      };
    },
    ORDER_DETAILS_SUCCESS: (state, action) => {
      return {
        loading: false,
        order: action.payload,
      };
    },
    ORDER_DETAILS_FAIL: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },
  }
);

export const allOrdersReducer = createReducer(
  { orders: [] },
  {
    ALL_ORDERS_REQUEST: (state, action) => {
      return {
        loading: true,
      };
    },
    ALL_ORDERS_SUCCESS: (state, action) => {
      return {
        loading: false,
        orders: action.payload,
      };
    },
    ALL_ORDERS_FAIL: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },
  }
);
