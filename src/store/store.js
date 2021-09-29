import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { cartReducer } from "../reducers/cartReducer";
import { loadingReducer } from "../reducers/loadingRecuder";
import { productReducer } from "../reducers/productReducer";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ cartReducer, loadingReducer, productReducer })
);

const configureStore = (initialState) => {
  const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(thunkMiddleware)
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

const initialState = {};

const { store } = configureStore(initialState);

export default store;
