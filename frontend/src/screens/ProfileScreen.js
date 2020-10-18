import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col } from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Message from "../components/Message.js"
import Loader from "../components/Loader.js"
import {getUserDetails, updateUserProfile} from "../actions/userActions.js"

const ProfileScreen = ({location, history}) => {
    const [name,setName]= useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [message,setMessagge]=useState(null)

    const dispatch  = useDispatch()
    const {loading, error, user} = useSelector(st=> st.userDetails)

    const { userInfo} = useSelector(st => st.user)
    const redirect = location.search ? location.search.split("=")[1] : "/"

    const {success} = useSelector(st=>st.userUpdateProfile)
    // if logged in , then redirect
    useEffect( ()=>{
        if(!userInfo){
            history.push("/login")
        }else{
            if(!user || !user.name){
                dispatch(getUserDetails("profile"))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[history, userInfo, dispatch, user])
    const submitHandler =(e)=>{
        e.preventDefault()
        // dispatch register
        if(password !== confirmPassword){
            setMessagge("Passwords do not match")
        }else{
            // dispatch update profile
            dispatch(updateUserProfile({id:user._id,name, email,password}))
        }
    }
    
    return (
        <Row>
            <Col md={3}>
            <h2>user Profile</h2>
            {message && <Message>{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name"  value={name}  onChange={(e)=> setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email"  value={email}  onChange={(e)=> setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password </Form.Label>
                    <Form.Control type="password"  placeholder="Enter password" value={password}  onChange={(e)=> setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password </Form.Label>
                    <Form.Control type="password"  placeholder="Confirm password" value={confirmPassword}  onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Update</Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2> Hello Moto</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
