import { useContext } from "react"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import UserContext from "../UserContext";
import Contact from "../pages/Contact"


import { NavLink } from "react-router-dom";

const Header = () => {

  const { user } = useContext(UserContext);
  console.log(user);
  return (

    <Navbar bg="light" expand="lg" className="header">
      <Container>
        <Navbar.Brand className="text-warning" as={NavLink} to="/">-WinShoP-</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/contactus">Contact Us</Nav.Link>
            {
              (user.id !== null)
                ?
                (user.isAdmin == true) ?
                  <>

                    <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>

                    <NavDropdown title={user.firstName} id="collasible-nav-dropdown">
                      <NavDropdown.Item as={NavLink} to="/users/profile">Admin Profile</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/logout">
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>

                  </>

                  :
                  <>
                    <Nav.Link as={NavLink} to="/transaction">Transaction</Nav.Link>
                    <NavDropdown title={user.firstName} id="collasible-nav-dropdown">
                      <NavDropdown.Item as={NavLink} to="/users/profile">User Profile</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/logout">
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                :
                <NavDropdown title="User" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/register">
                    Register
                  </NavDropdown.Item>
                </NavDropdown>
            }
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default Header