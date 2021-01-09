import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    const { data } = await axios.get("/api/products");
    dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
  } catch (e) {
    dispatch({
      type: "PRODUCT_LIST_FAIL",
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
  } catch (e) {
    dispatch({
      type: "PRODUCT_DETAILS_FAIL",
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
export const deleteProductById = (id)=> async(dispatch, getState)=>{
  try {
      dispatch({type:"PRODUCT_DELETE_REQUEST"})
      const {userInfo:{token}}= getState().user
      const config = {
          headers:{
              Authorization: `Bearer ${token}`
          }
      }
      //sent data and receive userInfo
      await axios.delete(`/api/products/${id}`, config)
      dispatch({type:"PRODUCT_DELETE_SUCCESS"})

  } catch (error) {
      dispatch({type:"PRODUCT_DELETE_FAIL", payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message})
      
  }
}