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

