import { createAction, createReducer } from "@reduxjs/toolkit";

let initialState = {
  user: {},
};
export const userReducer = createReducer(initialState, {
  LOGIN_REQUEST: (state, action) => {
    return {
      loading: true,
      isAuthenticated: false,
    };
  },

  REGISTER_USER_REQUEST: (state, action) => {},
  LOGIN_SUCCESS: (state, action) => {
    return {
      ...state,
      loading: false,
      isAuthenticated: true,
      user: action.payload,
    };
  },
  LOGIN_FAIL: (state, action) => {
    return {
      ...state,
      loading: false,
      isAuthenticated: false,
      user: null,
      error: action.payload,
    };
  },
  REGISTER_USER_SUCCESS: (state, action) => {},
  SEND_OTP_REQUEST: (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },
  SEND_OTP_SUCCESS: (state, action) => {
    return {
      ...state,
      loading: false,
      isUser: action.payload.isUser,
    };
  },
  SEND_OTP_FAIL: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  REGISTER_USER_FAIL: (state, action) => {
    return {
      ...state,
      loading: false,
      isAuthenticated: false,
      user: null,
      error: action.payload,
    };
  },
  LOGOUT_SUCCESS: (state, action) => {
    return {
      ...state,
      loading: false,
      isAuthenticated: false,
      user: null,
    };
  },
  LOGOUT_FAIL: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  GET_USER_REQUEST: (state, action) => {
    return {
      loading: true,
      isAuthenticated: false,
    };
  },
  GET_USER_SUCCESS: (state, action) => {
    return {
      ...state,
      loading: false,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  },
  GET_USER_FAIL: (state, action) => {
    return {
      ...state,
      loading: false,
    };
  },
  CLEAR_ERRORS: (state, action) => {
    return {
      ...state,
      error: null,
    };
  },
});

export const addPincodeReducer = createReducer(
  { pinCode: 0 },
  {
    ADD_PIN_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    ADD_PIN_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        pinCode: action.payload.pinCode,
      };
    },
    ADD_PIN_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    },
    GET_PIN_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    GET_PIN_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        pinCode: action.payload,
      };
    },
    GET_PIN_FAIL: (state, action) => {
      return {
        ...state,
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

//get all user
export const allUserReducer = createReducer(
  { users: [] },
  {
    ALL_USER_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    ALL_USER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    },
    ALL_USER_FAIL: (state, action) => {
      return {
        ...state,
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

export const userDetailsReducer = createReducer(
  { user: {} },
  {
    USER_DETAILS_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    USER_DETAILS_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    },
    USER_DETAILS_FAIL: (state, action) => {
      return {
        ...state,
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

//update or DELTE User

export const updateUserReducer = createReducer(
  {},
  {
    UPDATE_USER_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_USER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
        message: action.payload.message,
      };
    },
    UPDATE_USER_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_USER_RESET: (state, action) => {
      return {
        ...state,
        isUpdated: false,
      };
    },
    DELETE_USER_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_USER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        isDeleted: true,
      };
    },
    DELETE_USER_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_USER_RESET: (state, action) => {
      return {
        ...state,
        isDeleted: false,
      };
    },
    DELETE_ADDRESS_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_ADDRESS_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };
    },
    DELETE_ADDRESS_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_ADDRESS_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_ADDRESS_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };
    },
    UPDATE_ADDRESS_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  }
);
