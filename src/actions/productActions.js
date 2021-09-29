import * as types from "../utils/constants";
import { fetchAllProduct, fetchSingleProduct } from "../api/api";
import { setIsLoading, setIsLoaded } from "./loadingActions";

export const getAllProduct = (loadedProducts) => {
  return {
    type: types.GET_ALL_PRODUCTS,
    loadedProducts,
  };
};

export const actFetchAllProduct = () => {
  return (dispatch) => {
    dispatch(setIsLoading());
    return fetchAllProduct()
      .then((res) => {
        const loadedProducts = [];

        for (const key in res.data) {
          loadedProducts.push({
            id: key,
            ...res.data[key],
          });
        }
        if (Object.keys(res.data).length > 0) {
          dispatch(getAllProduct(loadedProducts));
        }
      })
      .finally(() => {
        dispatch(setIsLoaded());
      });
  };
};

export const getSingleProduct = (loadedProduct) => {
  return {
    type: types.GET_SIGNLE_PRODUCT,
    loadedProduct,
  };
};

export const actFetchSingleProduct = (productId) => {
  return (dispatch) => {
    dispatch(setIsLoading());
    return fetchSingleProduct(productId)
      .then((res) => {
        const loadedProduct = {
          id: productId,
          ...res.data,
        };
        if (Object.keys(res.data).length > 0) {
          dispatch(getSingleProduct(loadedProduct));
        }
      })
      .finally(() => {
        dispatch(setIsLoaded());
      });
  };
};
