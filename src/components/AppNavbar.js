import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
const AppNavbar = () => {

  return (
    <Navbar variant="dark" className="AppNav justify-content-center" >
      <Nav activeKey="/home">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/entertainment">Entertainment</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/mobile">Mobile Phones</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/laptop">Laptops</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/others">Others</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  )

}


export default AppNavbar