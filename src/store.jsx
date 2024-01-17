import { composeWithDevTools } from "@redux-devtools/extension";

import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { thunk } from "redux-thunk";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  // cart: { cartItemsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
