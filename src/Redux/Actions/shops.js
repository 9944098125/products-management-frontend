import {
  GET_SHOPS_START,
  GET_SHOPS_SUCCESS,
  GET_SHOPS_FAIL,
  CREATE_SHOP_START,
  CREATE_SHOP_SUCCESS,
  CREATE_SHOP_FAIL,
  DELETE_SHOP_SUCCESS,
  DELETE_SHOP_FAIL,
  UPDATE_SHOP_SUCCESS,
  UPDATE_PRODUCT_FAIL,
} from "./Types";
import Api from "../Api/Api";
import { alertActions } from "./alert";

export const getShops = () => async (dispatch) => {
  dispatch({
    type: GET_SHOPS_START,
  });
  try {
    const res = await Api.get("/shops");
    if (res) {
      dispatch({
        type: GET_SHOPS_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_SHOPS_FAIL,
      payload: err.response?.data.message,
    });
  }
};

export const createShop = (body, userId) => async (dispatch) => {
  dispatch({
    type: CREATE_SHOP_START,
  });
  try {
    const res = await Api.post(`/shops/create/${userId}`, body);
    if (res) {
      dispatch({
        type: CREATE_SHOP_SUCCESS,
        payload: res.data,
      });
      dispatch(
        alertActions.success(
          res.data && `Shop with id: ${res.data.shop_id} created...`,
        ),
      );
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    dispatch({
      type: CREATE_SHOP_FAIL,
      payload: err.response?.data.message,
    });
    console.log(err);
    dispatch(alertActions.error(err.response?.data.message));
    setTimeout(() => {
      dispatch(alertActions.clear());
    }, 3000);
  }
};

export const deleteShop = (shopId, userId) => async (dispatch) => {
  try {
    const res = await Api.delete(`/shops/delete/${shopId}/${userId}`);
    if (res) {
      dispatch({
        type: DELETE_SHOP_SUCCESS,
        payload: res.data?.message,
      });
      dispatch(alertActions.success(res.data?.message));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    dispatch({
      type: DELETE_SHOP_FAIL,
      payload: err.response?.data.message,
    });
    dispatch(alertActions.error(err.response?.data.message));
    setTimeout(() => {
      dispatch(alertActions.clear());
    }, 3000);
  }
};

export const updateShop = (body, shopId, userId) => async (dispatch) => {
  try {
    const res = await Api.put(`/shops/update/${shopId}/${userId}`, body);
    if (res) {
      dispatch({
        type: UPDATE_SHOP_SUCCESS,
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
