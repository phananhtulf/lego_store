import * as types from "../utils/constants";
export const setIsLoading = () => {
  return {
    type: types.IS_LOADING,
  };
};

export const setIsLoaded = () => {
  return {
    type: types.IS_LOADED,
  };
};
