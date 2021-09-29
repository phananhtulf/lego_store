import * as types from "../utils/constants";

const initialState = {
  id: null,
  items: [],
  totalAmount: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ITEM: {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        ...state,
        id: state.id,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case types.REMOVE_ITEM: {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        ...state,
        id: state.id,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case types.CLEAR_CART:
      return initialState;
    case types.LOAD_CART: {
      return {
        ...state,
        id: action.cart.id,
        items: action.cart.items,
        totalAmount: action.cart.totalAmount,
      };
    }
    default:
      return state;
  }
};
