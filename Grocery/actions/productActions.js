import axios from "axios";
import backEndUrl from "../host";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  CLEAR_ERRORS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
} from "../constants/productConstants.js";
console.log(backEndUrl);
export const getProduct =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 20000],
    category,
    subCategory,
    ratings = 0
  ) =>
    async (dispatch) => {
      try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        let modifiedString = "";
        if (keyword[0] === "&") {
          function replaceSpecialCharacters(inputString) {
            const replacedAmpersand = inputString.replace(/&/g, "%26");
            const replacedSpaces = replacedAmpersand.replace(/ /g, "%20");
            return replacedSpaces;
          }
          modifiedString = `&${replaceSpecialCharacters(keyword.slice(1))}`;
        } else {
          modifiedString = keyword;
        }
        let link = `${backEndUrl}/api/v1/products?keyword=${modifiedString}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
          link += `&category=${category}`;
        }
        if (subCategory) {
          link += `&subCategory=${subCategory}`;
        }
        console.log(link);
        const { data } = await axios.get(link);
        let getBrands = [];
        const uniqueBrandsSet = new Set();

        data.products.forEach((p) => {
          if (p.Stock) {

            //Removing trailing or leading spaces
            var index, index1;
            for (index = 0; index < p.brand.length; index++) {
              if (p.brand[index] !== " ") {
                break;
              }
            }
            for (index1 = p.brand.length - 1; index1 >= 0; index1--) {
              if (p.brand[index1] !== " ") {
                break;
              }
            }
            uniqueBrandsSet.add(p.brand.slice(index, index1 + 1));
          }
        });
        getBrands.push(...uniqueBrandsSet);
        const newData = {
          data,
          getBrands,
        };
        dispatch({
          type: ALL_PRODUCT_SUCCESS,
          payload: newData,
        });
      } catch (error) {
        console.log('h');
        console.log(error);
        dispatch({
          type: ALL_PRODUCT_FAIL,
          payload: error.response.data.msg,
        });
      }
    };

//get products by brands
export const getProductsByBrands =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 20000],
    category,
    brand,
    getBrands,
    subCategory,
    ratings = 0
  ) =>
    async (dispatch) => {
      try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        let modifiedString = "";
        if (keyword[0] === "&") {
          function replaceSpecialCharacters(inputString) {
            const replacedAmpersand = inputString.replace(/&/g, "%26");
            const replacedSpaces = replacedAmpersand.replace(/ /g, "%20");
            return replacedSpaces;
          }
          modifiedString = `&${replaceSpecialCharacters(keyword.slice(1))}`;
        } else {
          modifiedString = keyword;
        }
        let link = `${backEndUrl}/api/v1/products?keyword=${modifiedString}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        
        if (category) {
          link += `&category=${category}`;
        }
        brand.forEach((element) => {
          if (element) {
            link += `&brand=${element}`;
          }
        });
        console.log(brand);
        if (subCategory) {
          link += `&subCategory=${subCategory}`;
        }
        const { data } = await axios.get(link);
        const newData = {
          data,
          getBrands,
        };

        dispatch({
          type: ALL_PRODUCT_SUCCESS,
          payload: newData,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: ALL_PRODUCT_FAIL,
          payload: error.response.data.msg,
        });
      }
    };

//get related Products
export const getRelatedProducts = (subCategory) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });
    const replacedAmpersand = subCategory.replace(/&/g, "%26");
    const replacedSpaces = replacedAmpersand.replace(/ /g, "%20");

    const { data } = await axios.get(`${backEndUrl}/api/v1/products?keyword=&subCategory=${replacedSpaces}`)


    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: data.products,
    })

  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload: error.response.data.msg
    })
  }
}

//Get all products for ADMIN
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `${backEndUrl}/api/v1/admin/products`,
      config
    );
    // console.log(data);
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.msg,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(
      `${backEndUrl}/api/v1/product/${id}`
    );
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//New Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${backEndUrl}/api/v1/review`,
      reviewData,
      config
    );
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//Get all reviews of a product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(
      `${backEndUrl}/api/v1/reviews?id=${id}`
    );
    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//Delete Review of a product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.delete(
      `${backEndUrl}/api/v1/reviews?reviewId=${reviewId}&productId=${productId}`,
      config
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.msg,
    });
  }
};

// ADD PRODUCT
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${backEndUrl}/api/v1/admin/product/new`,
      productData,
      config
    );
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//EDIT PRODUCT
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${backEndUrl}/api/v1/admin/product/${id}`,
      productData,
      config
    );
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.delete(
      `${backEndUrl}/api/v1/admin/product/${id}`,
      config
    );
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//GET all reviews
export const getReviews = () => async (dispatch) => { };

//Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
