import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// reducers
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer
} from "./reducers/productListReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";
import {orderCreateReducer, orderDetailsReducer, orderPayReducer,orderListMyReducer,orderListReducer, orderDeliverReducer} from "./reducers/orderReducers"
import {userLoginReducer,userRegister,userDetails, userUpdateProfile,userListReducer, userDeleteReducer, userUpdateReducer} from "./reducers/userReducers.js"

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete:productDeleteReducer,
  productCreate:productCreateReducer,
  productUpdate:productUpdateReducer,
  cart: cartReducer,
  user:userLoginReducer,
  userRegister: userRegister,
  userDetails:userDetails,
  userUpdateProfile:userUpdateProfile,
  userList: userListReducer,
  userUpdate:userUpdateReducer,
  userDelete:userDeleteReducer,
  orderCreate:orderCreateReducer,
  orderDetails:orderDetailsReducer,
  orderPay:orderPayReducer,
  orderListMy:orderListMyReducer,
  orderList:orderListReducer,
  orderDeliver:orderDeliverReducer
});

const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo")) || null
const cartShippingAddressFromStorage = JSON.parse(localStorage.getItem("shippingAddress")) || {}

const initialState = {
  cart: {
    cartItems:cartItemsFromStorage,
    shippingAddress:cartShippingAddressFromStorage
  },
  user: {userInfo:userInfoFromStorage}
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
