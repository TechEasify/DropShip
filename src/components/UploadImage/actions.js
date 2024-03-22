import axios from 'axios';
import Api from '../../config/axious';
import { localStorageConstant } from '../../constant';
import { USER_UPLOAD_IMG } from './constant';

const BASE_URL = process.env.API_URI;
const token = localStorage.getItem(localStorageConstant.ACCESS_TOKEN);

// Direct api --------------------------------------------------------------------
export const UserUploadIMG = async (formData) => {
  const URL = `${BASE_URL}${USER_UPLOAD_IMG}`;

  try {
    const { data } = await axios({
      method: 'post',
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

export const UserDeleteIMG = async (id) => {
  const URL = `${USER_UPLOAD_IMG}/${id}`;
  try {
    const { data } = await Api.delete(URL);
    return data;
  } catch (error) {
    const originError = { ...err.response.data };
    throw originError;
  }
};
