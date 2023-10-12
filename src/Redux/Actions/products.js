import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "./Types";
import Api from "../Api/Api";
import { alertActions } from "./alert";

export const getProducts = (shopId) => async (dispatch) => {
  try {
    const res = await Api.get(`/products/${shopId}`);
    if (res) {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: err.response?.data.message,
    });
  }
};

export const createProduct = (body, shopId, userId) => async (dispatch) => {
  dispatch({
    type: CREATE_PRODUCT_START,
  });
  try {
    const res = await Api.post(`/products/create/${shopId}/${userId}`, body);
    if (res) {
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: res.data.message,
      });
      dispatch(alertActions.success(res.data?.message));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: err.response?.data.message,
    });
    dispatch(alertActions.error(err.response?.data.message));
    setTimeout(() => {
      dispatch(alertActions.clear());
    }, 3000);
  }
};

export const updateProduct =
  (body, shopId, userId, productId) => async (dispatch) => {
    try {
      const res = await Api.put(
        `/products/update/${shopId}/${userId}/${productId}`,
        body,
      );
      if (res) {
        dispatch({
          type: UPDATE_PRODUCT_SUCCESS,
          payload: res.data,
        });
        dispatch(alertActions.success(res.data?.message));
        setTimeout(() => {
          dispatch(alertActions.clear());
        }, 3000);
      }
    } catch (err) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: err.response?.data.message,
      });
      dispatch(alertActions.error(err.response?.data.message));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 3000);
    }
  };

export const deleteProduct =
  (shopId, userId, productId) => async (dispatch) => {
    try {
      const res = await Api.delete(
        `/products/delete/${shopId}/${userId}/${productId}`,
      );
      if (res) {
        dispatch({
          type: DELETE_PRODUCT_SUCCESS,
          payload: res.data,
        });
        dispatch(alertActions.success(res.data?.message));
        setTimeout(() => {
          dispatch(alertActions.clear());
        }, 3000);
      }
    } catch (err) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: err.response?.data.message,
      });
      dispatch(alertActions.error(err.response?.data.message));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 3000);
    }
  };
