import { configureStore } from "@reduxjs/toolkit";
import {
  addPincodeReducer,
  allUserReducer,
  updateUserReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer.js";
import {
  productDetailReducer,
  productReducer,
  productsReducer,
  newProductReducer,
  newReviewReducer,
  productReviewsReducer,
  reviewReducer,
  getRelatedProducts,
} from "./reducers/productReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";
// import loadInitialState from './reducers/cartReducer.js'
import {
  allOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer.js";

// loadInitialState();

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    order: newOrderReducer,
    newProduct: newProductReducer,
    product: productReducer,
    updateUser: updateUserReducer,
    allUsers: allUserReducer,
    userDetails: userDetailsReducer,
    newReview: newReviewReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    pinCode: addPincodeReducer,
    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    updateOrDeleteOrder: orderReducer,
    relatedProducts: getRelatedProducts,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })]
});
export default store;
