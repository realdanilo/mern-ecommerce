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

export const logout = ()=> async(dispatch)=>{
    localStorage.removeItem("userInfo")
    dispatch({type:"USER_LOGOUT"})
}