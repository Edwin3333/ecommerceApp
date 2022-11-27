import { useState, useEffect, useContext } from 'react'
import { Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext.js'
import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'


const Login = () => {

  const { user, setUser, userAll, setUserAll } = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isActive, setIsActive] = useState(true)




  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  })

  function authenticate(e) {
    e.preventDefault()

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {

        if (typeof data.access !== "undefined") {
          if (data.login === true) {
            localStorage.setItem("token", data.access);

            Swal.fire({
              title: `Hi ${data.firstName} Welcome to our website`,
              icon: "success",
              text: "Enjoy your shopping!"
            });


            getAllUser(data.access)
            retrieveUserDetails(data.access);


          }
        }
        if (data.login === false) {
          Swal.fire({
            title: "Wrong username and password",
            icon: "error",
            text: "Please try again."
          });
        }

      })
  }

  const retrieveUserDetails = (token) => {

    fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {

        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin,
          firstName: data.user.firstName
        });
      })
  }

  const getAllUser = (token) => {

    fetch(`${process.env.REACT_APP_API_URL}/users/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {

        setUserAll({
          userLength: data.userAll.length,
        });
      })
  }





  return (
    (user.id) ?

      (user.isAdmin === true) ? <Navigate to="/dashboard" /> : <Navigate to="/products" />
      :
      <>
        <div className="container w-50 my-5">
          <h1>Login</h1>
          <Form onSubmit={e => authenticate(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            {/* use use effect */}

            {
              isActive ?
                <Button variant="primary" type="submit">
                  Log In
                </Button> :
                <Button variant="primary" type="submit" disabled>
                  Log In
                </Button>
            }
          </Form>
        </div>
      </>
  )
}

export default Login