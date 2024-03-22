import Api from '../../config/axious';
import {
  GET_CATEGORIES,
  USER_PROFILE,
  USER_ADD_PRODUCT,
  USER_REMOVE_PRODUCT,
  USER_SET_INFO,
  CHECK_VOUCHER,
} from './constant';

export const GetCategories = async () => {
  try {
    const { data } = await Api.get(`${GET_CATEGORIES}`);
    console.log(data, "data");

    return data;
  } catch (error) {
    const originError = { ...error.response.data };
    throw originError;
  }
};

export const GetUser = async () => {
  try {
    const { data } = await Api.get(`${USER_PROFILE}`);
    return data;
  } catch (error) {
    const originError = { ...error.response.data };
    throw originError;
  }
};

export const SetInfoShipping = (info) => async (dispatch) => {
  dispatch({ type: USER_SET_INFO, payload: info });
};

export const addProduct = (product) => async (dispatch) => {
  console.log(product, "product");
  dispatch({ type: USER_ADD_PRODUCT, payload: product });
};
export const removeProduct = (product) => async (dispatch) => {
  dispatch({ type: USER_REMOVE_PRODUCT, payload: product });
};

export const CheckVoucher = async (url) => {
  try {
    const { data } = await Api.get(`${CHECK_VOUCHER + url}`);
    return data;
  } catch (err) {
    const error = { ...err.response.data };
    throw error;
  }
};
