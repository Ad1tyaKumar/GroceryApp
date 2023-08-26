import { createReducer } from "@reduxjs/toolkit";

let initialState = {
  products: [],
};

export const productsReducer = createReducer(initialState, {
  ALL_PRODUCT_REQUEST: (state) => {
    return {
      loading: true,
      products: [],
    };
  },
  ALL_PRODUCT_SUCCESS: (state, action) => {
    return {
      loading: false,
      products: action.payload.data.products.filter((i) => i.Stock > 0),
      productsCount: action.payload.data.productCount,
      getBrands: action.payload.getBrands,
    };
  },
  ALL_PRODUCT_FAIL: (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  },
  ADMIN_PRODUCT_REQUEST: (state, action) => {
    return {
      loading: true,
      products: [],
    };
  },
  ADMIN_PRODUCT_SUCCESS: (state, action) => {
    return {
      loading: false,
      products: action.payload.products,
    };
  },
  ADMIN_PRODUCT_FAIL: (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  },
  CLEAR_ERRORS: (state, action) => {
    return {
      error: null,
      ...state,
    };
  },
});

export const productReducer = createReducer(
  {},
  {
    DELETE_PRODUCT_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_PRODUCT_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_PRODUCT_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_PRODUCT_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_PRODUCT_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_PRODUCT_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_PRODUCT_RESET: (state, action) => {
      return {
        ...state,
        isDeleted: false,
      };
    },
    UPDATE_PRODUCT_RESET: (state, action) => {
      return {
        ...state,
        isUpdated: false,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        error: null,
        ...state,
      };
    },
  }
);

export const productReviewsReducer = createReducer(
  { reviews: [] },
  {
    ALL_REVIEW_REQUEST: (state, action) => {
      return {
        loading: true,
        ...state,
      };
    },
    ALL_REVIEW_SUCCESS: (state, action) => {
      return {
        loading: false,
        reviews: action.payload,
      };
    },
    ALL_REVIEW_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        error: null,
        ...state,
      };
    },
  }
);

export const productDetailReducer = createReducer(
  { product: {} },
  {
    PRODUCT_DETAIL_REQUEST: (state, action) => {
      return {
        loading: true,
        ...state,
      };
    },
    PRODUCT_DETAIL_SUCCESS: (state, action) => {
      return {
        loading: false,
        product: action.payload,
      };
    },
    PRODUCT_DETAIL_FAIL: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        error: null,
        ...state,
      };
    },
  }
);

export const getRelatedProducts = createReducer({ products: [] }, {
  GET_PRODUCT_REQUEST: (state, action) => {
    return {
      ...state,
      loading: true
    }
  },
  GET_PRODUCT_SUCCESS: (state, action) => {
    return {
      ...state,
      loading: false,
      products: action.payload
    }
  },
  GET_PRODUCT_FAIL: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload
    }
  },
  CLEAR_ERRORS: (state, action) => {
    return {
      error: null,
      ...state,
    };
  },
})

export const newReviewReducer = createReducer(
  {},
  {
    NEW_REVIEW_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    NEW_REVIEW_SUCCESS: (state, action) => {
      return {
        loading: false,
        success: action.payload,
      };
    },
    NEW_REVIEW_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    NEW_REVIEW_RESET: (state, action) => {
      return {
        ...state,
        success: false,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        error: null,
        ...state,
      };
    },
  }
);

export const reviewReducer = createReducer(
  {},
  {
    DELETE_REVIEW_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_REVIEW_SUCCESS: (state, action) => {
      return {
        loading: false,
        isDeleted: action.payload,
      };
    },
    DELETE_REVIEW_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_REVIEW_RESET: (state, action) => {
      return {
        ...state,
        isDeleted: false,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        error: null,
        ...state,
      };
    },
  }
);

//Add product

export const newProductReducer = createReducer(
  { product: {} },
  {
    NEW_PRODUCT_REQUEST: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    NEW_PRODUCT_SUCCESS: (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    },
    NEW_PRODUCT_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    NEW_PRODUCT_RESET: (state, action) => {
      return {
        ...state,
        success: false,
      };
    },
  }
);
