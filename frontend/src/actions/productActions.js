import axios from "axios";

export const listProducts = (keyword="") => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    const { data } = await axios.get(`/api/products?keyword=${keyword}`);
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
export const createProduct = ()=> async(dispatch, getState)=>{
  try {
      dispatch({type:"PRODUCT_CREATE_REQUEST"})
      const {userInfo:{token}}= getState().user
      const config = {
          headers:{
              Authorization: `Bearer ${token}`
          }
      }
      //empty {} because we are not sending any data, need empty brackets
      const {data} = await axios.post(`/api/products`, {},config)
      dispatch({type:"PRODUCT_CREATE_SUCCESS", payload:data})

  } catch (error) {
      dispatch({type:"PRODUCT_CREATE_FAIL", payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message})
      
  }
}
export const updateProduct = (product)=> async(dispatch, getState)=>{
  try {
      dispatch({type:"PRODUCT_UPDATE_REQUEST"})
      const {userInfo:{token}}= getState().user
      const config = {
          headers:{
            "Content-Type":"application/json",
              Authorization: `Bearer ${token}`
          }
      }
      //
      await axios.put(`/api/products/${product._id}`,product, config)
      dispatch({type:"PRODUCT_UPDATE_SUCCESS"})

  } catch (error) {
      dispatch({type:"PRODUCT_UPDATE_FAIL", payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message})
      
  }
}
export const createProductReview = (productId, review)=> async(dispatch, getState)=>{
  try {
      dispatch({type:"PRODUCT_REVIEW_REQUEST"})
      const {userInfo:{token}}= getState().user
      const config = {
          headers:{
            "Content-Type":"application/json",
              Authorization: `Bearer ${token}`
          }
      }
      //
      await axios.post(`/api/products/${productId}/reviews`,review, config)
      dispatch({type:"PRODUCT_REVIEW_SUCCESS"})

  } catch (error) {
      dispatch({type:"PRODUCT_REVIEW_FAIL", payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message})
      
  }
}