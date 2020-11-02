import axios from "axios"

export const createOrder = (order)=> async(dispatch, getState)=>{
    try {
        dispatch({type:"ORDER_CREATE_REQUEST"})

        
        const {userInfo:{token}}= getState().user
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }
        //sent data and receive userInfo
        const {data}= await axios.post(`/api/orders`,order, config)
        dispatch({type:"ORDER_CREATE_SUCCESS", payload:data})

    } catch (error) {
        dispatch({type:"ORDER_CREATE_FAIL", payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message})
        
    }
}



export const getOrderDetails = (id)=> async(dispatch, getState)=>{
    try {
        dispatch({type:"ORDER_DETAILS_REQUEST"})
        const {userInfo:{token}}= getState().user
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        //sent data and receive userInfo
        const {data}= await axios.get(`/api/orders/${id}`, config)
        dispatch({type:"ORDER_DETAILS_SUCCESS", payload:data})

    } catch (error) {
        dispatch({type:"ORDER_DETAILS_FAIL", payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message})
        
    }
}
export const payOrder = (orderId,paymentResult)=> async(dispatch, getState)=>{
    try {
        dispatch({type:"ORDER_PAY_REQUEST"})
        const {userInfo:{token}}= getState().user
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }
        //sent data and receive userInfo
        const {data}= await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
        dispatch({type:"ORDER_PAY_SUCCESS", payload:data})

    } catch (error) {
        dispatch({type:"ORDER_PAY_FAIL", payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message})
        
    }
}