import * as types from "../utils/constants";

const initialState = {
  isLoading: false,
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_LOADING: {
      return {
        isLoading: true,
      };
    }
    case types.IS_LOADED: {
      return {
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
