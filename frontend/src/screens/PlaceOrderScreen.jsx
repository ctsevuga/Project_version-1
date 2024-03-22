// import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { GlobalContext } from "../context/GlobalState";
import { isValidElement, createElement } from 'react';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);
  const id = user._id;
  
  const cart = useSelector((state) => state.cart);
  const [orderItems, setOrderItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({});
  

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const dispatch = useDispatch();

  


  const placeOrderHandler = async () => {
        try {
         
      const res = await createOrder({
        userId: id,
        orderItems: cart.cartItems,
        
       
        
        shippingAddress:cart.shippingAddress,
        
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.phoneNumber}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        {/* <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col> */}
                        <Col>
                          {/* <Link to={`/product/₹{item.product}`}> */}
                            ({item.name})
                          {/* </Link> */}
                        </Col>
                        <Col md={2}>({item.measurement})</Col>
                        <Col md={2}>({item.price * item.qty})</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
  
};

export default PlaceOrderScreen;
