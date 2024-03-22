import React, {  useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';
import { useAddressMutation } from '../slices/usersApiSlice';


const ShippingScreen = () => {
  const {userId } = useParams();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber || '');

 
//  const [userAddress, { isLoading: loadingAddress }] =
//  useAddressMutation(userId);

const [userAddress] = useAddressMutation(userId);

//  const [address, setAddress] = useState('');
//   const [city, setCity] = useState('') ;
//   const [postalCode, setPostalCode] =useState('') ;
  // const [phoneNumber, setPhoneNumber] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  

  const fetchAddress = async (e) => {
    console.log("userAddress");
    try {
      const data = await userAddress({
        userId,     
      }).unwrap();
      setAddress(data.address);
      setCity(data.city);
      setPostalCode(data.postalCode);
      setPhoneNumber(data.phoneNumber);
      setIsDisabled(true);
     
      } catch (err) {  
    }
  }

  const differentAddress = async (e) => {
    console.log("userAddress");
    setAddress('');
    setCity('');
    setPostalCode('');
    setPhoneNumber('');
    setIsDisabled(false);
      
  }
 
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, phoneNumber }));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Button className='m-2 '  onClick={fetchAddress}  variant='primary' >
          Get Shipping Address
        </Button>
        <Button className='m-2 '  onClick={differentAddress}  variant='primary'>
          Different Address?
        </Button>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2 ' controlId='address'  >
          <Form.Label>Address</Form.Label>
          <Form.Control
            disabled={isDisabled}
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='city' >
          <Form.Label>City</Form.Label>
          <Form.Control
            disabled={isDisabled}
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            disabled={isDisabled}
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='phoneNumber'>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            disabled={isDisabled}
            type='text'
            placeholder='Enter Phone Number'
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
