import Api from '../../config/axious';
import { USER_UPLOAD_IMG } from './constant';
import { defaultLIMIT } from '../../constant';

export const UserGetIMG = async (limit = defaultLIMIT) => {
  try {
    const { data } = await Api.get(`${USER_UPLOAD_IMG}?perPage=${limit}`);

    return data;
  } catch (error) {
    const originError = { ...error.response.data };
    throw originError;
  }
};
