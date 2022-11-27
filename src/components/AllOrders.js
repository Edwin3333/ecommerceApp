import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import OrderList from '../img/orderlist.jpg'
import { NavLink } from "react-router-dom";
import productImg from '../img/productIMG.png'

const AllOrders = () => {
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

        console.log(data.length)

        setOrderId({
          orderLength: data.length
        })

      }
      )
  }
  useEffect(() => {
    fetchData();


  }, [])

  return (
    <div>

      <Card style={{ width: '18rem' }} className="p-3 text-center" >
        <Card.Img variant="top" src={OrderList} alt="image card" />
        <Card.Body>
          <Card.Title>
            {orderId.orderLength}
          </Card.Title>
          <Card.Text>User Orders</Card.Text>
          <Nav.Link as={NavLink} to="/orderlist">

            <Button variant="primary" >Check Orders</Button>
          </Nav.Link>

        </Card.Body>
      </Card>

    </div>


  )

}

export default AllOrders