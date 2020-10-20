import React , {useState} from "react"
import {Form,Button} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import FormContainer from "../components/FormContainer.js"
import {saveShippingAddress} from "../actions/cartActions.js"

const ShippingScreen = ({history})=>{

    const {shippingAddress} = useSelector(st=> st.cart)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)


    const dispatch = useDispatch()
    const submitHandler = e =>{
        e.preventDefault()
        console.log("submit")
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push("/payment")
    }
    return(<><FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>

            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text"
                required={true}
                placeholder="Enter Address"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text"
                required={true}
                placeholder="Enter City"
                value={city}
                onChange={(e)=>setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text"
                required={true}
                placeholder="Enter Postal Code"
                value={postalCode}
                onChange={(e)=>setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text"
                required={true}
                placeholder="Enter Country"
                value={country}
                onChange={(e)=>setCountry(e.target.value)}></Form.Control>
            </Form.Group>

        <Button type="submit" variant="primary">Continue</Button>
            {/* end of form */}
        </Form>
        </FormContainer></>)
}

export default ShippingScreen