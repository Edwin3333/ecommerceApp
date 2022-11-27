import { useState, useEffect, useContext } from "react";

import { Card, Button, Row, Col, Image } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate } from 'react-router-dom'

export default function CourseView() {

  const { user } = useContext(UserContext);

  const { productId } = useParams();




  const [categories, setCategories] = useState('');
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [screenSize, setScreenSize] = useState('');
  const [cpu, setCPU] = useState('');
  const [videoCard, setVideoCard] = useState('');
  const [ram, setRam] = useState('');
  const [storage, setStorage] = useState('');
  const [OS, setOS] = useState('');
  const [price, setPrice] = useState(0);
  const [source, setSource] = useState('');
  const [totalAmount, setTotalAmount] = useState(0)
  const [quantity, setQuantity] = useState('');
  const [modalOrder, setModalOrder] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const orderProductOpen = () => setModalOrder(true);
  const orderProductClose = () => setModalOrder(false);


  const [modalCart, setModalCart] = useState(false);


  const cartProductOpen = () => setModalCart(true);
  const cartProductClose = () => setModalCart(false);

  useEffect(() => {


    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then(res => res.json())
      .then(data => {


        setCategories(data.categories)
        setBrand(data.brand);
        setName(data.name);
        setScreenSize(data.screenSize)
        setCPU(data.cpu);
        setRam(data.ram);
        setVideoCard(data.videoCard);

        setStorage(data.storage);
        setOS(data.OS);
        setPrice(data.price);
        setSource(data.source);
        setTotalAmount(data.price)
      });

  }, [productId])


  const orderProduct = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/orders/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        productId: productId,
        quantity: parseInt(quantity)
      })
    })
      .then(res => res.json())
      .then(data => {


        if (data) {
          Swal.fire({
            title: "SUCCESSFULLY ORDERED!",
            icon: "success",
            text: `"Product will be added in your order list.`,
          });



          orderProductClose();
        }
        else {
          Swal.fire({
            title: "ORDER UNSSUCCESSFUL!",
            icon: "error",
            text: `The system is experiencing trouble at the moment. Please try again later.`,
          });
          orderProductClose();
        }

      })

    setQuantity(0)
  }


  useEffect(() => {

    if (quantity > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  })


  const cartProduct = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/carts/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        productId: productId,
        quantity: parseInt(quantity)
      })
    })
      .then(res => res.json())
      .then(data => {


        if (data) {
          Swal.fire({
            title: "ADDED TO CARD",
            icon: "success",
            text: `"Product has added in your cart.`,
          });



          cartProductClose();
        }
        else {
          Swal.fire({
            title: "ADD TO CART UNSUCCESSFUL!",
            icon: "error",
            text: `The system is experiencing trouble at the moment. Please try again later.`,
          });
          cartProductClose();
        }

      })

    setQuantity(0)
  }


  useEffect(() => {

    if (quantity > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  })

  console.log(categories + "categoies item")
  return (


    <>
      {
        (user.id !== null)
          ?
          (user.isAdmin === true)
            ?
            <Navigate to="/dashboard" />
            :
            <>
              <div className="containerSingle" style={{ marginTop: "2rem" }}>
                <Card className="imageContainer">
                  <Card.Img variant="top" src={source} className="imageSize" />
                </Card>

                <div>
                  {
                    (categories.toString() === 'Peripheral') ?
                      <Card style={{ width: '50rem' }}>
                        <Card.Header>Category:  {categories}</Card.Header>
                        <ListGroup variant="flush">
                          <ListGroup.Item>Brand: {brand.toUpperCase()}</ListGroup.Item>
                          <ListGroup.Item>Name: {name}</ListGroup.Item>
                          <ListGroup.Item> &#x20B1;{price}</ListGroup.Item>
                        </ListGroup>
                      </Card>

                      :
                      <Card style={{ width: '40rem' }}>
                        <Card.Header>Category:  {categories}</Card.Header>
                        <ListGroup variant="flush">
                          <ListGroup.Item>Brand: {brand.toUpperCase()}</ListGroup.Item>
                          <ListGroup.Item>Name: {name}</ListGroup.Item>
                          <ListGroup.Item>Screen size: {screenSize}</ListGroup.Item>
                          <ListGroup.Item>CPU: {cpu}</ListGroup.Item>
                          <ListGroup.Item>VideoCard: {videoCard}</ListGroup.Item>
                          <ListGroup.Item>RAM: {ram}</ListGroup.Item>
                          <ListGroup.Item>Storage: {storage}</ListGroup.Item>
                          <ListGroup.Item>OS: {OS}</ListGroup.Item>
                          <ListGroup.Item> &#x20B1;{price}</ListGroup.Item>
                        </ListGroup>
                      </Card>

                  }


                  <div className="button-Container">
                    <Button className="button-single" onClick={orderProductOpen}> Order Now </Button>
                    <Button className="button-single" onClick={cartProductOpen}> Add To Cart </Button>
                  </div>
                </div>

              </div>


              {/* Order Modal */}

              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalOrder}
              >
                <Form onSubmit={e => orderProduct(e)}>

                  <Modal.Header className="banner-bg text-light bg-primary">
                    <Modal.Title>Order Product</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Row>
                      <Col xs={6} md={6} lg={6}>
                        <Image className="editModal-img-fit mb-2"
                          src={source} style={{ width: "20rem" }}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Category: {categories}</Form.Label> <br />
                        <Form.Label>Brand: {categories}</Form.Label><br />
                        <Form.Label>Name: {name}</Form.Label><br />
                        <Form.Label>Price: {price}</Form.Label><br />
                        <Form.Label>TotalAmout: {totalAmount * quantity}</Form.Label><br />

                        <Form.Group controlId="productBrand" className="mb-3">
                          <Form.Label>Quantity:</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Product brand"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>


                    </Row>
                  </Modal.Body>

                  <Modal.Footer>


                    {
                      (isActive === true)
                        ?
                        <Button variant="primary" type="submit" id="submitBtn">
                          Save
                        </Button>
                        :
                        <Button variant="danger" type="submit" id="submitBtn" disabled>
                          Save
                        </Button>
                    }




                    <Button variant="secondary" onClick={orderProductClose}>
                      Close
                    </Button>
                  </Modal.Footer>

                </Form>
              </Modal>

              {/* Cart Modal */}
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalCart}
              >
                <Form onSubmit={e => cartProduct(e)}>

                  <Modal.Header className="banner-bg text-light bg-primary">
                    <Modal.Title>Add to Cart</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Row>
                      <Col xs={6} md={6} lg={6}>
                        <Image className="editModal-img-fit mb-2"
                          src={source} style={{ width: "20rem" }}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Category: {categories}</Form.Label> <br />
                        <Form.Label>Brand: {categories}</Form.Label><br />
                        <Form.Label>Name: {name}</Form.Label><br />
                        <Form.Label>Price: {price}</Form.Label><br />
                        <Form.Label>TotalAmout: {totalAmount * quantity}</Form.Label><br />

                        <Form.Group controlId="productBrand" className="mb-3">
                          <Form.Label>Quantity:</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Product brand"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>


                    </Row>
                  </Modal.Body>

                  <Modal.Footer>


                    {
                      (isActive === true)
                        ?
                        <Button variant="primary" type="submit" id="submitBtn">
                          Save
                        </Button>
                        :
                        <Button variant="danger" type="submit" id="submitBtn" disabled>
                          Save
                        </Button>
                    }




                    <Button variant="secondary" onClick={cartProductClose}>
                      Close
                    </Button>
                  </Modal.Footer>

                </Form>
              </Modal>


            </>
          : <Navigate to="/login" />
      }

    </>



  )

}