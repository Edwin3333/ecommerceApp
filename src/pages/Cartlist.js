import { useState, useEffect, useContext } from 'react';

import Table from 'react-bootstrap/Table';

import Image from 'react-bootstrap/Image';
import { Navigate } from 'react-router-dom'

import UserContext from "../UserContext";

const ProductList = function () {
  const { user, userAll } = useContext(UserContext);
  const [allProducts, setAllProducts] = useState([]);
  const [allCheck, setAllCheck] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [cartId, setCartId] = useState("");

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/all`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {

        setAllProducts(data.map(products => {

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
                            <td> Category: {dataProduct.productCategories[0]}</td>
                            <td> Brand:  {dataProduct.productBrand}</td>
                            <td> Name: {dataProduct.productName}</td>
                            <td> Price: {dataProduct.productPrice}</td>
                            <td> Quantity: {dataProduct.quantity}</td>
                            <td> Quantity: {dataProduct.totalAmount}</td>
                          </div>
                        </>
                      )
                    })
                  }

                </td>
                <td>{products.Subtotal}</td>
                <td>{products.purchased}</td>
                <td>{products.isActive.toString()}</td>

              </tr>
            </>
          )
        }));

      }
      )
  }
  useEffect(() => {
    fetchData();


  }, [])


  /* Get Check All */

  const fetchCheckAll = () => {
    fetch(`${process.env.REACT_APP_API_URL}/checkAll/all`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {


        setAllCheck(data.map(products => {

          console.log(products + "this is my id data")
          return (


            <tr key={products._id}>
              <td>{products._id}</td>
              <td>
                {
                  products.cart.map(cart => {
                    setCartId({
                      dataCartId: products._id
                    })

                    return (
                      <>
                        <div className='orderProducts '>
                          <td> firstname: {cart.firstName}</td>
                          <td> lastname: {cart.lastName}</td>
                          <td>
                            {
                              cart.products.map(dataProduct => {
                                return (
                                  <>
                                    <div className='checkAllProducts'>
                                      <td> categories: {dataProduct.productCategories}</td>
                                      <td> brand: {dataProduct.productBrand}</td>
                                      <td> name: {dataProduct.productName}</td>
                                      <td> price: {dataProduct.productPrice}</td>
                                      <td> quantity: {dataProduct.quantity}</td>
                                      <td> totalAmount: {dataProduct.totalAmount}</td>

                                    </div>
                                  </>
                                )
                              })
                            }

                          </td>
                          <td> SubTotal: {cart.Subtotal}</td>

                        </div>
                      </>
                    )
                  })
                }
              </td>
              <td>{products.status}</td>
              <td>{products.isPaid.toString()}</td>
              <td>{products.createdOn}</td>

            </tr>

          )
        }));


      });
  }

  useEffect(() => {
    fetchCheckAll();



  }, [])
  return (
    <>
      {
        (user.id !== null)
          ?
          (user.isAdmin == true)
            ? <>
              <div>
                <h3 className='tableData' style={{ marginTop: "1rem" }}> Cart List Information</h3>
                <div>
                  <Table striped bordered hover className='tableData' style={{ marginTop: "1rem" }}>
                    <thead>
                      <tr>
                        <th>Cart Id</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Products</th>
                        <th>Total Amount</th>
                        <th>Date & Time</th>
                        <th>isPaid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allProducts}
                    </tbody>
                  </Table>
                </div>

              </div>

              <div>
                <h3 className='tableData' style={{ marginTop: "1rem" }}> Check All Information</h3>
                <div>
                  <Table striped bordered hover className='tableData' style={{ marginTop: "1rem" }}>
                    <thead>
                      <tr>
                        <th>OC Id</th>
                        <th>Cart</th>
                        <th>Status</th>
                        <th>isPaid</th>
                        <th>Date & Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allCheck}
                    </tbody>
                  </Table>
                </div>

              </div>
            </>

            :
            <Navigate to="/products" />
          : <Navigate to='/login' />


      }
    </>
  )

}

export default ProductList