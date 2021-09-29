import * as types from "../utils/constants";
import getTempCart from "../api/api";
import { setIsLoading, setIsLoaded } from "./loadingActions";

export const addItem = (item) => {
  return {
    type: types.ADD_ITEM,
    item: item,
  };
};

export const removeItem = (itemId) => {
  return {
    type: types.REMOVE_ITEM,
    id: itemId,
  };
};

export const clearCart = () => {
  return {
    type: types.CLEAR_CART,
  };
};

export const loadCart = (cart) => {
  return {
    type: types.LOAD_CART,
    cart,
  };
};

export const actFetchTempCart = () => {
  return (dispatch) => {
    dispatch(setIsLoading());
    return getTempCart("GET", null)
      .then((res) => {
        if (Object.keys(res.data).length > 0) {
          dispatch(
            loadCart({
              id: Object.keys(res.data)[0],
              items: res.data[Object.keys(res.data)[0]].orderedItems,
              totalAmount: res.data[Object.keys(res.data)[0]].totalAmount,
            })
          );
        }
      })
      .finally(() => {
        dispatch(setIsLoaded());
      });
  };
};
