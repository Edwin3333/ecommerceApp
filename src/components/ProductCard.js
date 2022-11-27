import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import PropTypes from 'prop-types';
import { useContext } from 'react'
import { NavLink } from "react-router-dom";
import UserContext from "../UserContext";


export default function ProductCard({ productProp }) {

  const { user } = useContext(UserContext);

  const { productId, source, name, price, brand } = productProp


  ProductCard.propTypes = {
    productProp: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired
    })
  }



  return (
    <Card style={{ width: '16.3rem', height: '27rem' }} className="cardData p-3">
      <Card.Img variant="top" src={source} />
      <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <Card.Text> {brand}</Card.Text>
        <Card.Text> {name}</Card.Text>
        <Card.Text>
          &#x20B1;{price}
        </Card.Text>

        {

          (user.id !== null)
            ?
            (user.isAdmin == true) ?
              <Button variant="primary" disabled>Check now</Button>
              : <Nav.Link as={NavLink} to={"/products/" + productId} >
                <Button variant="primary" productId={productId}>Check now</Button>
              </Nav.Link>
            : <Nav.Link as={NavLink} to="/login">
              <Button variant="primary" >Check now</Button>
            </Nav.Link>
        }

      </Card.Body>
    </Card>
  )
}

