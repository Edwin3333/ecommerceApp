import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import userAllImg from '../img/userimage.png'
import { NavLink } from "react-router-dom";
const AllUsers = (allUserProp) => {
  const dataCheck = Object.values(allUserProp)

  console.log(+ " :: ang bilang ng user ay ")



  return (
    <div>

      <Card style={{ width: '18rem' }} className="p-3 text-center" >
        <Card.Img variant="top" src={userAllImg} alt="image card" />
        <Card.Body>
          <Card.Title>
            {allUserProp.length}
          </Card.Title>
          <Card.Text>Total User</Card.Text>
          <Nav.Link as={NavLink} to="/registerUser">

            <Button variant="primary" >Check Users</Button>
          </Nav.Link>

        </Card.Body>
      </Card>

    </div>


  )

}

export default AllUsers