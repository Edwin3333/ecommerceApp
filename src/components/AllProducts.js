import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import userAllImg from '../img/userimage.png'
import { NavLink } from "react-router-dom";
import productImg from '../img/productIMG.png'

const AllProducts = (data) => {
  const [allProducts, setAllProducts] = useState([]);
  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {



        setAllProducts(data)

      }
      )
  }
  useEffect(() => {
    fetchData();


  }, [])
  return (
    <div>

      <Card style={{ width: '18rem' }} className="p-3 text-center" >
        <Card.Img variant="top" src={productImg} alt="image card" />
        <Card.Body>
          <Card.Title>
            {allProducts.length}
          </Card.Title>
          <Card.Text>Total Products</Card.Text>
          <Nav.Link as={NavLink} to="/productList">

            <Button variant="primary" >Check Products</Button>
          </Nav.Link>

        </Card.Body>
      </Card>

    </div>


  )

}

export default AllProducts