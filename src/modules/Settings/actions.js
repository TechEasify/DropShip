import axios from 'axios';

import Api from '../../config/axious';
import { localStorageConstant } from '../../constant';

import { USER_PROFILE } from './constant';

export const UserProfile = async () => {
  try {
    const { data } = await Api.get(`${USER_PROFILE}`);

    return data;
  } catch (error) {
    const originError = { ...error.response.data };
    throw originError;
  }
};

export const UserPutProfile = async (user) => {
  return {success : true};
  const URL = `https://api-kingify.tvtprod.com${USER_PROFILE}`;
  const token = localStorage.getItem(localStorageConstant.ACCESS_TOKEN);
  const formData = new FormData();
  formData.append('name', user.name);
  formData.append('gender', user.gender);
  try {
    const { data } = await axios({
      method: 'put',
      url: URL,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    const originError = { ...err.response.data };
    throw originError;
  }
};
