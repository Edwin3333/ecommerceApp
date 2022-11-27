import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../UserContext";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Swal from "sweetalert2";
import { Navigate } from 'react-router-dom'
const Order = () => {

  const { user } = useContext(UserContext);


  const [allProducts, setAllProducts] = useState([]);

  const [productId, setProductId] = useState("");
  const [productCategories, setProductCategories] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [productScreenSize, setProductScreenSize] = useState("");
  const [productCPU, setProductCPU] = useState("");
  const [productVideoCard, setProductVideoCard] = useState("");
  const [productRAM, setProductRAM] = useState("");
  const [productStorage, setProductStorage] = useState("");
  const [productOS, setProductOS] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imgSource, setImgSource] = useState("");

  const [dataId, setDataId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [status, setStatusId] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [products, setProducts] = useState([])
  const [orderAmount, setOrderAmount] = useState(0)
  const [isActive, setIsActive] = useState(false);

  const [creditCard, setCreditCard] = useState("");
  const [cardExpDate, setCardExpDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const [modalOrder, setModalOrder] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);


  const userOrderOpen = () => setModalEdit(true);
  const userOrderClose = () => setModalEdit(false);


  const [modalEditQuantity, setModalEditQuantity] = useState(false);
  const editOrderQuantityOpen = () => setModalEditQuantity(true);
  const editOrderQuantityClose = () => setModalEditQuantity(false);

  console.log(orderId.orderId)

  if (user.id === null) {
    Swal.fire({
      title: "User is not allowed to access this page!",
      icon: "error",
      text: "Please try again."
    })
  }


  if (user.isAdmin === true) {
    Swal.fire({
      title: "User is not allowed to access this page!",
      icon: "error",
      text: "Please try again."
    })
  }


  const editProduct = (id, productId) => {
    setProductId(id)
    console.log(id + " ang id na get")
    fetch(`${process.env.REACT_APP_API_URL}/users/order`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {


        data.forEach(element => {

          if (element._id === id) {
            element.products.forEach(productData => {
              if (productData._id === productId) {
                setDataId({
                  productId: productId
                })
                setProductCategories(productData.productCategories)
                setProductBrand(productData.productBrand)
                setProductName(productData.productName)
                setProductPrice(productData.productPrice)
                setQuantity(productData.quantity)
              }

            })
          }


        });


        // setProductCategories(data.categories);
        // setProductBrand(data.brand);
        // setProductName(data.name);
        // setProductScreenSize(data.screenSize);
        // setProductCPU(data.cpu);
        // setProductVideoCard(data.videoCard);
        // setProductRAM(data.ram);
        // setProductStorage(data.storage)
        // setProductOS(data.OS)
        // setImgSource(data.source);
        // setProductPrice(data.price)
      });

    setModalEditQuantity(true)
  }


  const deleteProduct = (id, productId) => {
    setProductId(id)
    console.log(id + " ang id na get")
    fetch(`${process.env.REACT_APP_API_URL}/orders/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },

      body: JSON.stringify({
        productId: productId
      })
    })
      .then(res => res.json())
      .then(data => {


        if (data) {
          Swal.fire({
            title: "Order deleted successfully",
            icon: "success",
            text: `The order product is deleted successfully`
          });

          fetchData();
          closeEdit();
        } else {
          Swal.fire({
            title: "Order deleted Unsuccessful",
            icon: "error",
            text: "Something went wrong. Please try again later"
          })
        }



      });


  }



  const deleteAllOrder = (id) => {

    fetch(`${process.env.REACT_APP_API_URL}/orders/delete/${id}/all`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },

      body: JSON.stringify({
        productId: productId
      })
    })
      .then(res => res.json())
      .then(data => {


        if (data) {
          Swal.fire({
            title: "Deleted Successful",
            icon: "success",
            text: `The order product is deleted successfully`
          });

          fetchData();
        } else {
          Swal.fire({
            title: "Deleted Unsuccessful",
            icon: "error",
            text: "Something went wrong. Please try again later"
          })
        }



      });


  }

  const closeEdit = () => {

    setCreditCard('');
    setCardExpDate('');
    setCardNumber('');
    setSecurityCode('');

    setModalEdit(false);
  };

  const payOrder = (e) => {

    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/orders/pay`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        orderId: orderId.orderId,
        creditCard: creditCard,
        cardExpDate: cardExpDate,
        cardNumber: cardNumber,
        securityCode: securityCode
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data) {
          Swal.fire({
            title: "Payment Transaction Successful!",
            icon: "success",
            text: `Your Product will be delivered 3-8 days`,
          });

          fetchData();
          closeEdit();

        }
        else {
          Swal.fire({
            title: "PRODUCT EDIT UNSUCCESSFUL!",
            icon: "error",
            text: `The system is experiencing trouble at the moment. Please try again later.`,
          });

          closeEdit();
        }
      })


    setProductCategories('');
    setProductBrand('');
    setProductName('');
    setProductScreenSize('');
    setProductCPU('');
    setProductVideoCard('');
    setProductRAM('');
    setProductStorage('')
    setProductOS('')
    setImgSource('');
    setProductPrice(0)
  }



  const editProductQuantity = (e) => {
    e.preventDefault()

    fetch(`${process.env.REACT_APP_API_URL}/orders/${orderId.orderId}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        productId: dataId.productId,
        quantity: quantity
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log(" na edit pala ang " + data)
        if (data) {
          Swal.fire({
            title: "Update successfully!",
            icon: "success",
            text: `Successfully update your order product quantity`,
          });

          fetchData();
          editOrderQuantityClose();

        }
        else {
          Swal.fire({
            title: "Updating order product quantity is not successful!",
            icon: "error",
            text: `The system is experiencing trouble at the moment. Please try again later.`,
          });

          editOrderQuantityClose();
        }

      })


    setQuantity('')

  }



  /* GET ALL PRODUCTS */
  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/order`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {


        setAllProducts(data.map(products => {

          setOrderId({
            orderId: products._id
          })


          return (
            <>

              <tr key={products._id}>
                <td>{products._id}</td>
                <td>{products.firstName}</td>
                <td>{products.lastName}</td>
                <td>
                  {
                    products.products.map(dataProduct => {


                      return (
                        <>
                          <div className='orderProducts'>
                            <Image className="editModal-img-fit mb-2"
                              src={dataProduct.source}
                            />
                            <td> Category: {dataProduct.productCategories}</td>
                            <td> Brand:  {dataProduct.productBrand}</td>
                            <td> Name: {dataProduct.productName}</td>
                            <td> Price: {dataProduct.productPrice}</td>
                            <td> Quantity: {dataProduct.quantity}</td>
                            <td className='mt-4 mb-4'>
                              {
                                (products.isPaid === true) ?
                                  <>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "70%" }}>
                                      <Button variant="info" disabled>Edit Quantity</Button>
                                      <Button variant="danger" disabled>Delete</Button>
                                    </div>
                                  </>
                                  :
                                  <>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "70%" }}>
                                      <Button variant="primary" onClick={() => editProduct(products._id, dataProduct._id)}>Edit Quantity</Button>

                                      <Button variant="danger" onClick={() => deleteProduct(products._id, dataProduct._id)}>Delete</Button>
                                    </div>
                                  </>
                              }

                            </td>
                          </div>
                        </>
                      )
                    })
                  }
                </td>
                <td>{products.totalAmount}</td>
                <td>{products.purchased}</td>
                <td>{products.status}</td>

                <td>{products.isPaid.toString()}</td>
                <td>
                  {
                    (products.isPaid)
                      ?
                      <>
                        <Button variant="success" size="sm" disabled>Order</Button>
                        <Button variant="danger" className="mx-1" size="sm" disabled>Delete</Button>
                      </>
                      :
                      (products.products.length === 0)
                        ?
                        <>
                          <Button variant="success" className="mx-1" size="sm" disabled>Order Now!</Button>
                          <Button variant="danger" className="mx-1" size="sm" onClick={() => deleteAllOrder(products._id)}>Delete</Button>
                        </>
                        :
                        <>
                          <Button variant="success" className="mx-1" size="sm" onClick={userOrderOpen}>Order Now!</Button>
                          <Button variant="danger" className="mx-1" size="sm" onClick={() => deleteAllOrder(products._id)}>Delete</Button>
                        </>
                  }



                </td>
              </tr>
            </>
          )
        }));


      });
  }

  useEffect(() => {
    fetchData();


  }, [])




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
              <div>
                <h3> Order Information</h3>
                <div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Order Id</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Products</th>
                        <th>Total Amount</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>isPaid</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allProducts}
                    </tbody>
                  </Table>
                </div>

              </div>

              {/* Add product modal */}
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalEdit}
              >
                <Form onSubmit={e => payOrder(e)}>

                  <Modal.Header className="banner-bg text-light bg-primary">
                    <Modal.Title>Pay Order</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Row>
                      <Col xs={6} md={6} lg={6}>
                        <Image className="editModal-img-fit mb-2"
                          src={imgSource}
                        />

                        <Form.Group controlId="creditCard" className="mb-3">
                          <Form.Label>Credit Card:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder=" Enter credit card"
                            value={creditCard}
                            onChange={e => setCreditCard(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="productBrand" className="mb-3">
                          <Form.Label>Card Expiration Date</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder=" Enter card expiration date"
                            value={cardExpDate}
                            onChange={e => setCardExpDate(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="cardNumber" className="mb-3">
                          <Form.Label>Card Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter card number"
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="securityCode" className="mb-3">
                          <Form.Label>Security Code</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter security code"
                            value={securityCode}
                            onChange={e => setSecurityCode(e.target.value)}
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
                        <Button variant="secondary" type="submit" id="submitBtn">
                          Order
                        </Button>
                        :
                        <Button variant="primary" type="submit" id="submitBtn">
                          Order
                        </Button>
                    }


                    <Button variant="secondary" onClick={userOrderClose}>
                      Close
                    </Button>
                  </Modal.Footer>

                </Form>
              </Modal>


              {/* Edit Quantity */}

              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalEditQuantity}
              >
                <Form onSubmit={e => editProductQuantity(e)}>

                  <Modal.Header className="banner-bg text-light bg-primary">
                    <Modal.Title>Edit Product Quantity</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Row>
                      <Col xs={6} md={6} lg={6}>
                        <Image className="editModal-img-fit mb-2"
                          src={imgSource}
                        />

                        <Form.Group controlId="productCategories" className="mb-3">
                          <Form.Label>Category</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder=" Enter Category"
                            value={productCategories}
                            onChange={e => setProductCategories(e.target.value)}
                            required
                            disabled
                          />
                        </Form.Group>
                        <Form.Group controlId="productBrand" className="mb-3">
                          <Form.Label>Brand</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder=" Enter brand"
                            value={productBrand}
                            onChange={e => setProductBrand(e.target.value)}
                            required
                            disabled
                          />
                        </Form.Group>
                        <Form.Group controlId="productName" className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={productName}
                            onChange={e => setProductName(e.target.value)}
                            required
                            disabled
                          />
                        </Form.Group>
                        <Form.Group controlId="productPrice" className="mb-3">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter price"
                            value={parseInt(productPrice)}
                            onChange={e => setProductPrice(e.target.value)}
                            required
                            disabled
                          />
                        </Form.Group>

                        <Form.Group controlId="quantity" className="mb-3">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter quantity"
                            value={parseInt(quantity)}
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
                        <Button variant="secondary" type="submit" id="submitBtn">
                          Save
                        </Button>
                        :
                        <Button variant="primary" type="submit" id="submitBtn">
                          Save
                        </Button>
                    }


                    <Button variant="secondary" onClick={editOrderQuantityClose}>
                      Close
                    </Button>
                  </Modal.Footer>

                </Form>
              </Modal>

            </>
          : <Navigate to='/login' />



      }
    </>
  )
}

export default Order