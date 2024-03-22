import {
  SAVE_BACK_DESIGN,
  SAVE_FRONT_DESIGN,
  SAVE_IN_DESIGN,
  SAVE_OUT_DESIGN,
  SAVE_RIGHT_DESIGN,
  SAVE_LEFT_DESIGN,
  SAVE_COLORS,
  SAVE_TECHNIQUE,
  SAVE_NAME,
  RESET_DESIGN,
} from './constant';

const frontendState = {
  designs: {
    front: { preview: '', design: '' },
    back: { preview: '', desgin: '' },
    right: { preview: '', design: '' },
    left: { preview: '', design: '' },
    in: { preview: '', design: '' },
    out: { preview: '', design: '' },
  },
};

/*
categories: [{
  "parent_id": 0,
  "name": "string",
  "alias": "string",
  "description": "string",
  "dept": 0,
  "order": 0,
  "trash": true
}]

variants: [{
  "product_id": 0,
  "sku": "string",
  "color_id": 0,
  "size_id": 0,
  "price": 0,
  "image_url": "string"
}]

sizes: [{
  "name": "string",
  "slug": "string",
  "description": "string"
}]

colors: [{
  "hex": "string",
  "name": "string",
  "description": "string"
}]
 */

const backendState = {
  name: '',
  slug: '',
  description: '',
  technique: '',
  trash: false,
  approved: false,
  template_id: 0,
  file_id: 0,
  categories: [],
  variants: [],
  sizes: [],
  colors: [],
};

export const FrontReducer = (state = frontendState, action) => {
  switch (action.type) {
    case SAVE_FRONT_DESIGN:
      return { designs: { ...state.designs, front: action.data } };
    case SAVE_BACK_DESIGN:
      return { designs: { ...state.designs, back: action.data } };
    case SAVE_LEFT_DESIGN:
      return { designs: { ...state.designs, left: action.data } };
    case SAVE_RIGHT_DESIGN:
      return { designs: { ...state.designs, right: action.data } };
    case SAVE_IN_DESIGN:
      return { designs: { ...state.designs, in: action.data } };
    case SAVE_OUT_DESIGN:
      return { designs: { ...state.designs, out: action.data } };
    case RESET_DESIGN:
      return frontendState;
    default:
      return state;
  }
};

export const BackReducer = (state = backendState, action) => {
  switch (action.type) {
    case SAVE_COLORS:
      return { ...state, colors: action.data };
    case SAVE_TECHNIQUE:
      return { ...state, technique: action.data };
    case SAVE_NAME:
      return { ...state, ...setNameAndSlug(action.data) };
    case RESET_DESIGN:
      return backendState;
    default:
      return state;
  }
};

const setNameAndSlug = (name) => {
  return {
    name,
    slug: name,
  };
};
