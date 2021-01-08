import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button,} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Message from "../components/Message.js"
import Loader from "../components/Loader.js"
import {getUserDetails, updateUser} from "../actions/userActions.js"
import FormContainer from "../components/FormContainer.js"

const UserEditScreen = ({match, history}) => {
    const userId = match.params.id 
    const [name,setName]= useState("")
    const [email,setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState("")

    const dispatch  = useDispatch()
    const {loading, error, user} = useSelector(st=> st.userDetails)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = useSelector(st=> st.userUpdate)

    useEffect( ()=>{
      if(successUpdate){
          dispatch({type:"USER_UPDATE_RESET"})
          history.push("/admin/userlist")
      }else{
          if(!user || !user.name || user._id !== userId){
              dispatch(getUserDetails(userId))
          }else{
              setName(user.name)
              setEmail(user.email)
              setIsAdmin(user.isAdmin)
          }
      }
    },[user,userId, dispatch, successUpdate, history])

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(updateUser({
            _id:userId,
            name,
            email,
            isAdmin
        }))
       
    }

    return (
        <>
        <Link to="/admin/userList" className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer>
            <h2>Edit User</h2>
            {error && <Message variant="danger">{error}</Message>}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {loading && <Loader/>}
            {loadingUpdate && <Loader/>}
            {user && (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name"  value={name} required={true} onChange={(e)=> setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email"  value={email} required={true} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="isAdmin">
                        <Form.Check type="checkbox" label="is admin"  checked={isAdmin}  onChange={(e)=> setIsAdmin(e.target.checked)}></Form.Check>
                    </Form.Group>
                   
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
            )}
           
           
        </FormContainer>
        </>
    )
}

export default UserEditScreen
