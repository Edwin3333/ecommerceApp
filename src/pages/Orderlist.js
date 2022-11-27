import { useState, useEffect, useContext } from 'react';

import Table from 'react-bootstrap/Table';

import Image from 'react-bootstrap/Image';
import { Navigate } from 'react-router-dom'

import UserContext from "../UserContext";

const ProductList = function () {
  const { user, userAll } = useContext(UserContext);
  const [allProducts, setAllProducts] = useState([]);
  const [orderId, setOrderId] = useState("");

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/all`, {
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
  return (
    <>
      {
        (user.id !== null)
          ?
          (user.isAdmin == true)
            ? <>
              <div>
                <h3 className='tableData' style={{ marginTop: "1rem" }}> Order List Information</h3>
                <div>
                  <Table striped bordered hover className='tableData' style={{ marginTop: "1rem" }}>
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
                      </tr>
                    </thead>
                    <tbody>
                      {allProducts}
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