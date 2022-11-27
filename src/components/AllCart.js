import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import OrderList from '../img/orderlist.jpg'
import { NavLink } from "react-router-dom";
import cartList from '../img/cartlist.png'

const AllOrders = () => {

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

        console.log(data.length)

        setCartId(data.length)

      }
      )
  }
  useEffect(() => {
    fetchData();


  }, [])

  return (
    <div>

      <Card style={{ width: '18rem' }} className="p-3 text-center" >
        <Card.Img variant="top" src={cartList} alt="image card" />
        <Card.Body>
          <Card.Title>
            {cartId}
          </Card.Title>
          <Card.Text>User Cart</Card.Text>
          <Nav.Link as={NavLink} to="/cartlist">

            <Button variant="primary" >Check Carts</Button>
          </Nav.Link>

        </Card.Body>
      </Card>

    </div>


  )

}

export default AllOrders