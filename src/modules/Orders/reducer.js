import {
  USER_ADD_PRODUCT,
  USER_REMOVE_PRODUCT,
  USER_SET_INFO,
} from './constant';

const orderState = {
  product: [],
  info_buyer: {
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
  },
};

export default (state = orderState, action) => {
  switch (action.type) {
    case USER_ADD_PRODUCT:
      return { ...state, product: action.payload };
    case USER_REMOVE_PRODUCT:
      return { ...state, product: action.payload };
    case USER_SET_INFO:
      return { ...state, info_buyer: action.payload };
    default:
      return state;
  }
};
