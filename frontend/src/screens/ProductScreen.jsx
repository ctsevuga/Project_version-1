import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Select,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { addToCart } from "../slices/cartSlice";


const ProductScreen = () => {
  const { id: productId } = useParams();
  // const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState();
  const [measurement, setMeasurement] = useState("250 gm");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // const userId = userInfo?  console.log(userId);

  const addToCartHandler = () => {
    
    // if(userId === undefined) {
    //   navigate('/login')
    // }
    

    const newProduct = (({ _id,name,price }) => ({ _id,name,price  }))(product);
    newProduct.qty = qty;
    newProduct.measurement = measurement;
    dispatch(addToCart({ ...newProduct,qty,measurement }));
      
    // dispatch(addToCart({ ...product, qty }));
    // dispatch(addToCart({ ...product,qty,measurement }));
    // navigate('/login?redirect=/cart');
    navigate('/cart');
    // navigate("/cart");
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  // const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const measurements = [
    { name: "250 gm", id: 1 },
    { name: "500 gm", id: 2 },
    { name: "750 gm", id: 3 },
    { name: "1 kg", id: 4 },
    { name: "1.5 kg", id: 5 },
    { name: "2 kg", id: 6 },
    { name: "2.5 kg", id: 7 },
    { name: "3 kg", id: 8 },
    { name: "4 kg", id: 9 },
    { name: "5 kg", id: 10 },
  ];

  useEffect(() => {
    if (measurement === "250 gm") {
      setQty(Number(1));
    }
    if (measurement === "500 gm") {
      setQty(Number(2));
    }
    if (measurement === "750 gm") {
      setQty(Number(3));
    }
    if (measurement === "1 kg") {
      setQty(Number(4));
    }
    if (measurement === "1.5 kg") {
      setQty(Number(6));
    }
    if (measurement === "2 kg") {
      setQty(Number(8));
    }
    if (measurement === "2.5 kg") {
      setQty(Number(10));
    }
    if (measurement === "3 kg") {
      setQty(Number(12));
    }
    if (measurement === "4 kg") {
      setQty(Number(16));
    }
    if (measurement === "5 kg") {
      setQty(Number(20));
    }
  }, [measurement, qty]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col md={6}>
              {/* <Image src={product.image} alt={product.name} fluid /> */}
              <h5>ingredients</h5>
              {product.ingredient1}
              <hr></hr>
              {product.ingredient2}
              <hr></hr>
              {product.ingredient3}
              <hr></hr>
              {product.ingredient4}
              <hr></hr>
              {product.ingredient5}
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Qty Select */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                    <Row>
                      <Col>KG</Col>

                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setMeasurement(e.target.value)}
                        >
                          {measurements.map((opt) => (
                            <option key={opt.id} value={opt.name}>
                              {opt.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                {/* <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="my-2" controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="my-2" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item> */}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
