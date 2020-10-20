import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  //find item info, then pass info with qty to state
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: "CART_ADD_ITEM",
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => async(dispatch,getState) => {
  dispatch({type:"CART_REMOVE_ITEM", payload:id})
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}

export const saveShippingAddress = data =>async(dispatch)=>{
  dispatch({type:"CART_SAVE_SHIPPING_ADDRESS", payload:data})
  localStorage.setItem("shippingAddress", JSON.stringify(data));
}

export const savePaymentMethod = method =>async(dispatch)=>{
  dispatch({type:"SAVE_PAYMENT_METHOD", payload:method})
  localStorage.setItem("paymentMethod", JSON.stringify(method));

}
