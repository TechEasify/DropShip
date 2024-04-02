import Api from '../../config/axious';

import {
  SAVE_BACK_DESIGN,
  SAVE_FRONT_DESIGN,
  SAVE_LEFT_DESIGN,
  SAVE_RIGHT_DESIGN,
  SAVE_IN_DESIGN,
  SAVE_OUT_DESIGN,
  SAVE_COLORS,
  SAVE_NAME,
  SAVE_TECHNIQUE,
  RESET_DESIGN,
  GET_CATEGORIES_ENDPOINT,
  SAVE_PRODUCT_DATA,
} from './constant';

// Action for redux --------------------------------------------------------------
export const SaveDesign = (design, template) => async (dispatch) => {
  switch (design) {
    case 'front':
      dispatch({ type: SAVE_FRONT_DESIGN, data: template });
      break;
    case 'back':
      dispatch({ type: SAVE_BACK_DESIGN, data: template });
      break;
    case 'left':
      dispatch({ type: SAVE_LEFT_DESIGN, data: template });
      break;
    case 'right':
      dispatch({ type: SAVE_RIGHT_DESIGN, data: template });
      break;
    case 'in':
      dispatch({ type: SAVE_IN_DESIGN, data: template });
      break;
    case 'out':
      dispatch({ type: SAVE_OUT_DESIGN, data: template });
      break;
    default:
  }
};

export const SaveColors = (colors) => async (dispatch) => {
  dispatch({ type: SAVE_COLORS, data: colors });
};

export const SaveName = (name) => async (dispatch) => {
  dispatch({ type: SAVE_NAME, data: name });
};

export const SaveTechnique = (technique) => async (dispatch) => {
  dispatch({ type: SAVE_TECHNIQUE, data: technique });
};

export const ResetDesign = () => async (dispatch) => {
  dispatch({ type: RESET_DESIGN });
};

export const saveProductData = (productData) => {
  console.log(productData, "productData");
  return {
    type: SAVE_PRODUCT_DATA,
    data: productData,
  };
};

// Direct api --------------------------------------------------------------------
export const GetCategories = async () => {
  try {
    const { data } = await Api.get(GET_CATEGORIES_ENDPOINT);
    return data;
  } catch (err) {
    throw err;
  }
};
