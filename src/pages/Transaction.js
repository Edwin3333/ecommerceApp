import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OrderImage from '../img/order.jpg'
import CartImage from '../img/cart.jpg'
import { NavLink, Navigate } from 'react-router-dom'
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import Nav from 'react-bootstrap/Nav';
const Transaction = () => {

  const { user } = useContext(UserContext);

  console.log(user)

  if (user.id == null) {
    Swal.fire({
      title: "User is not allowed to access this page!",
      icon: "error",
      text: "Please try again."
    })
  }


  if (user.isAdmin == true) {
    Swal.fire({
      title: "User is not allowed to access this page!",
      icon: "error",
      text: "Please try again."
    })
  }

  return (
    <>
      {
        (user.id !== null)
          ?
          (user.isAdmin == true)
            ?
            <Navigate to="/dashboard" />
            :
            <div className='transaction-section'>
              <h3 style={{ textAlign: 'center', marginTop: '2rem' }}>Transaction Page</h3>
              <div className='card-container'>
                <Card style={{ width: '18rem', height: '30rem' }}>
                  <Card.Img variant="top" src={OrderImage} />
                  <Card.Body>
                    <Card.Title>Orders</Card.Title>
                    <Card.Text>
                      All your order information. Happy Shopping.
                    </Card.Text>
                    <NavLink>
                      <Button variant="primary" as={NavLink} to="/transaction/order">

                        Check Order
                      </Button>
                    </NavLink>

                  </Card.Body>
                </Card>

                <Card style={{ width: '18rem', height: '30rem' }}>
                  <Card.Img variant="top" src={CartImage} />
                  <Card.Body>
                    <Card.Title>Carts</Card.Title>
                    <Card.Text>
                      All your order information. Happy Shopping.
                    </Card.Text>
                    <Button variant="primary" as={NavLink} to="/transaction/cart">Check Cart</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          : <Navigate to='/login' />
      }

    </>
  )
}

export default Transaction