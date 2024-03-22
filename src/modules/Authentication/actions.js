import Api from '../../config/axious';

import {
  USER_REGISTER_ENDPOINT,
  USER_LOGIN_ENDPOINT,
  USER_FIND_ME_ENDPOINT,
} from './constant';


// Direct api --------------------------------------------------------------------
export const UserRegister = async (body) => {
  try {
    const { data } = await Api.post(USER_REGISTER_ENDPOINT, body);

    return data;
  } catch (err) {
    const originError = { ...err.response.data };
    throw originError;
  }
};

export const UserLogin = async (body) => {
  try {
    const { data } = await Api.post(USER_LOGIN_ENDPOINT, body);

    return data;
  } catch (err) {
    const originError = { ...err.response.data };
    throw originError;
  }
};

export const UserFindMe = async () => {
  try {
    const { data } = await Api.get(USER_FIND_ME_ENDPOINT);

    return data;
  } catch (error) {
    const originError = { ...error.response.data };
    throw originError;
  }
};
