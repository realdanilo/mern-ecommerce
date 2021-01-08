import axios from "axios"

export const login = (email,password)=> async(dispatch)=>{
    try {
        dispatch({type:"USER_LOGIN_REQUEST"})

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        //sent data and receive userInfo
        const {data}= await axios.post("/api/users/login",{email,password},config)
        // sent to final dispatch
        dispatch({type:"USER_LOGIN_SUCCESS", payload:data})
        //save to local
        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        dispatch({type:"USER_LOGIN_FAIL", payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message})
        
    }
}

export const register = (name, email,password)=> async(dispatch)=>{
    try {
        dispatch({type:"USER_REGISTER_REQUEST"})

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        //sent data and receive userInfo
        const {data}= await axios.post("/api/users",{name, email,password},config)
        // sent to final dispatch
        dispatch({type:"USER_REGISTER_SUCCESS", payload:data})
        
       dispatch({type:"USER_LOGIN_SUCCESS",payload:data})
        localStorage.setItem("userInfo", JSON.stringify(data))
       

    } catch (error) {
        dispatch({type:"USER_REGISTER_FAIL", payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message})
        
    }
}
export const getUserDetails = (id)=> async(dispatch, getState)=>{
    try {
        dispatch({type:"USER_DETAILS_REQUEST"})

        // THIS MIGHT BE WRONG
        // 
        // 
        // 
        const {userInfo:{token}}= getState().user
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }
        //sent data and receive userInfo
        const {data}= await axios.get(`/api/users/${id}`,config)
        dispatch({type:"USER_DETAILS_SUCCESS", payload:data})

    } catch (error) {
        dispatch({type:"USER_DETAILS_FAIL", payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message})
        
    }
}
export const updateUserProfile = (user)=> async(dispatch, getState)=>{
    try {
        dispatch({type:"USER_UPDATE_PROFILE_REQUEST"})

        
        const {userInfo:{token}}= getState().user
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }
        //sent data and receive userInfo
        const {data}= await axios.put(`/api/users/profile`,user, config)
        dispatch({type:"USER_UPDATE_PROFILE_SUCCESS", payload:data})

    } catch (error) {
        dispatch({type:"USER_UPDATE_PROFILE_FAIL", payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message})
        
    }
}
export const listUsers = ()=> async(dispatch, getState)=>{
    try {
        dispatch({type:"USER_LIST_REQUEST"})
        const {userInfo:{token}}= getState().user
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        //sent data and receive userInfo
        const {data}= await axios.get(`/api/users`, config)
        dispatch({type:"USER_LIST_SUCCESS", payload:data})

    } catch (error) {
        dispatch({type:"USER_LIST_FAIL", payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message})
        
    }
}
export const deleteUser = (id)=> async(dispatch, getState)=>{
    try {
        dispatch({type:"USER_DELETE_REQUEST"})
        const {userInfo:{token}}= getState().user
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        //sent data and receive userInfo
        console.log(token)
        await axios.delete(`/api/users/${id}`, config)
        dispatch({type:"USER_DELETE_SUCCESS"})

    } catch (error) {
        dispatch({type:"USER_DELETE_FAIL", payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message})
        
    }
}


export const logout = ()=> async(dispatch)=>{
    localStorage.removeItem("userInfo")
    dispatch({type:"USER_LOGOUT"})
    dispatch({type:"USER_DETAILS_RESET"})
    dispatch({type:"ORDER_LIST_MY_RESET"})
    dispatch({type:"USER_LIST_RESET"})
}