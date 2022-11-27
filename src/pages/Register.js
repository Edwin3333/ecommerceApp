import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import UserContext from "../UserContext";


const Register = () => {

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [isActive, setIsActive] = useState('')

  console.log(firstName)
  console.log(lastName)
  console.log(email)
  console.log(mobileNo)
  console.log(password)

  useEffect(() => {
    if ((firstName !== "" && lastName !== "" && email !== "" && address !== "" && mobileNo !== "" && password !== "" && password2 !== "") && (password === password2)) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [firstName, lastName, email, mobileNo, password, password2])


  function registerUser(e) {
    e.preventDefault()

    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        mobileNo: mobileNo,
        password, password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        if (data.successRegister == true) {
          Swal.fire({
            title: `Congratulation ${data.firstName} ${data.lastName} registration successfully`,
            icon: "success",
            text: "Thank your for your registration"
          });

          setFirstName('')
          setLastName('')
          setEmail('')
          setMobileNo('')
          setAddress('')
          setPassword('')
          navigate("/login");
        }

        if (data.invalidEmail === false) {
          Swal.fire({
            title: "Invalid Email",
            icon: "error",
            text: "Please enter valid email address"
          });
        }

        if (data.maxPhoneLength === false) {
          Swal.fire({
            title: "Invalid Phone Number",
            icon: "error",
            text: "The maximum number must be 11"
          });
        }

        if (data.duplicatePhoneNumber === false) {
          Swal.fire({
            title: "Dupplciate Phone Number",
            icon: "error",
            text: "Please enter another phone number"
          });
        }


        if (data.emailIsTaken === false) {
          Swal.fire({
            title: "Duplicate Email",
            icon: "error",
            text: "Email is already taken"
          });
        }

        if (data.passwordLength === false) {
          Swal.fire({
            title: "Password is invalid",
            icon: "error",
            text: "The password length must be greater than or equal to 8"
          });
        }

        if (data.noLowerCase === false) {
          Swal.fire({
            title: "Password is invalid",
            icon: "error",
            text: "The password must contain one or more lowercase characters"
          });
        }

        if (data.noUpperCase === false) {
          Swal.fire({
            title: "Password is invalid",
            icon: "error",
            text: "The password must contain one or more uppercase characters"
          });
        }

        if (data.noNumber === false) {
          Swal.fire({
            title: "Password is invalid",
            icon: "error",
            text: "The password must contain one or more numeric values"
          });
        }

        if (data.noSpecialCharater === false) {
          Swal.fire({
            title: "Password is invalid",
            icon: "error",
            text: "The password must contain one or more special characters"
          });
        }

      })

  }

  return (
    <div className="container w-50 my-5">
      <h1>Registration</h1>
      <Form onSubmit={e => registerUser(e)}>
        <Form.Group className="mb-3" controlId="formBasicFirstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMobileNo">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control type="number" placeholder="09xx-xxx-xxxx" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required maxLength={11} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Verify Password</Form.Label>
          <Form.Control type="password" placeholder="Verify Password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
        </Form.Group>

        {
          isActive ?
            <Button variant="primary" type="submit">
              Submit
            </Button> :

            <Button variant="primary" type="submit" disabled>
              Submit
            </Button>
        }

      </Form>
    </div>
  )
}

export default Register