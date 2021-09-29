import * as types from "../utils/constants";

const initialState = {
  loadedProducts: [],
  loadedProduct: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS: {
      return {
        ...state,
        loadedProducts: action.loadedProducts,
      };
    }
    case types.GET_SIGNLE_PRODUCT: {
      return {
        ...state,
        loadedProduct: action.loadedProduct,
      };
    }
    default:
      return state;
  }
};
