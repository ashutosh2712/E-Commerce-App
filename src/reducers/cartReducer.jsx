import { CART_ADD_ITEM } from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      console.log("state:", state);
      console.log("array", state.cartItems);
      const existItem = state.cartItems.find(
        (i) => i?.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === existItem.product ? item : i
          ),
        };
      } else {
        console.log("else executed");
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    default:
      return state;
  }
};
