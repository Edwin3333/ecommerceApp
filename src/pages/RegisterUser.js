import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from "sweetalert2";
import Container from 'react-bootstrap/Container';

import { Navigate } from 'react-router-dom'
import UserContext from "../UserContext";

const RegisterUser = () => {
  const { user, userAll } = useContext(UserContext);
  const [allUserData, setAllUserData] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [userId, setUserId] = useState("");
  const [userFName, setUserFName] = useState("");
  const [userLName, setUserLName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobileNo, setUserMobileNo] = useState("");
  const [userAddress, setUserAddress] = useState("");


  const openEdit = (id) => {
    setUserId(id);
    console.log(" ang data ng id " + id)
    fetch(`${process.env.REACT_APP_API_URL}/users/profile/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {

        console.log(data);

        setUserFName(data.firstName);
        setUserLName(data.lastName);
        setUserEmail(data.email);
        setUserMobileNo(data.mobileNo);
        setUserAddress(data.address);
      });

    setModalEdit(true)
  };


  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/all`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setAllUserData(data.userAll.map(myUser => {
          return (
            <>
              <tr key={myUser._id}>
                <td>{myUser._id}</td>
                <td>{myUser.firstName}</td>
                <td>{myUser.lastName}</td>
                <td>{myUser.email}</td>
                <td>{myUser.mobileNo}</td>
                <td>{myUser.address}</td>
                <td>{myUser.isAdmin.toString()}</td>
                <td>

                  {
                    (myUser.isAdmin == true) ?

                      <Button variant="danger" size="sm" onClick={() => archive(myUser._id, myUser.name)}>Archive</Button> :
                      <>
                        <Button variant="success" className="mx-1" size="sm" onClick={() => unarchiveUser(myUser._id, myUser.name)}>Unnarchive</Button>
                        <Button variant="secondary" className="mx-1" size="sm" onClick={() => openEdit(myUser._id)}>Edit</Button>

                      </>
                  }

                </td>
              </tr>
            </>
          )


        }))
      })
  }


  const closeEdit = () => {


    setUserFName('');
    setUserLName('');
    setUserEmail('');
    setUserMobileNo('');
    setUserAddress('');

    setModalEdit(false);
  };


  /* ARCHIVE PRODUCT */
  const archive = (id, name) => {
    console.log(id);
    console.log(name);
    fetch(`${process.env.REACT_APP_API_URL}/users/${id}/archive`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          isActive: false
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data) {
          Swal.fire({
            title: "SUCCESS PRODUCT ARCHIVING!",
            icon: "success",
            text: `The product has bee hidden from active list`
          });

          fetchData();
        } else {
          Swal.fire({
            title: "Archive Unsuccessful",
            icon: "error",
            text: "Something went wrong. Please try again later"
          })
        }
      })
  }


  const unarchiveUser = (id, name) => {
    console.log(id);
    console.log(name);
    fetch(`${process.env.REACT_APP_API_URL}/users/${id}/admin`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          isAdmin: true
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data) {
          Swal.fire({
            title: "USER ARCHIVING SUCCESS!",
            icon: "success",
            text: `Is now an admin`
          });

          fetchData();
        } else {
          Swal.fire({
            title: "ARCHIVE UNSUCCESSFUL",
            icon: "error",
            text: "Something went wrong. Please try again later"
          })
        }
      })
  }

  useEffect(() => {
    fetchData();


  }, [])



  if (user.id == null) {
    Swal.fire({
      title: "User is not allowed to access this page!",
      icon: "error",
      text: "Please try again."
    })
  }


  if (user.isAdmin == false) {
    Swal.fire({
      title: "User is not allowed to access this page!",
      icon: "error",
      text: "Please try again."
    })
  }

  console.log("this register page is working")


  const editUser = (e) => {
    e.preventDefault();
    console.log(" this is my  " + userId)
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        firstName: userFName,
        lastName: userLName,
        mobileNo: userMobileNo,
        address: userAddress,
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data) {
          Swal.fire({
            title: "UPDATE SUCCESSFULLY!",
            icon: "success",
            text: `Product has been successfully updated.`,
          });

          fetchData();
          closeEdit();

        }
        else {
          Swal.fire({
            title: "PRODUCT EDIT UNSUCCESSFUL!",
            icon: "error",
            text: `The system is experiencing trouble at the moment. Please try again later.`,
          });

          closeEdit();
        }

      })

    setUserFName('');
    setUserLName('');
    setUserEmail('');
    setUserMobileNo('');
    setUserAddress('');
  }

  useEffect(() => {

    if (userFName != "" && userLName != "" && userEmail !== "" && userMobileNo !== "" && userAddress !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

  }, [userFName, userLName, userEmail, userMobileNo, userAddress]);



  return (

    (user.id != null) ?

      (user.isAdmin == true) ?

        <>

          <h3 className='tableData' style={{ marginTop: "1rem" }}>User Information</h3>

          <Table striped className='tableData' style={{ marginTop: "1rem" }} >
            <thead>
              <tr>
                <th>UserId</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>MobileNo</th>
                <th>Address</th>
                <th>IsAdmin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {allUserData}

            </tbody>

          </Table>

          {/* EDIT MODAL */}

          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalEdit}
          >
            <Form onSubmit={e => editUser(e)}>

              <Modal.Header className="banner-bg text-light">
                <Modal.Title>EDIT PRODUCT</Modal.Title>
              </Modal.Header>

              <Modal.Body>



                <Form.Group controlId="userFName" className="mb-3">
                  <Form.Label>Firstname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Firstname"
                    value={userFName}
                    onChange={e => setUserFName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="userLName" className="mb-3">
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Lastname"
                    value={userLName}
                    onChange={e => setUserLName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="userEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    required
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="userMobileNo" className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="09XX-XXX-XXXXX"
                    value={userMobileNo}
                    onChange={e => setUserMobileNo(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="userAddress" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={userAddress}
                    onChange={e => setUserAddress(e.target.value)}
                    required
                  />
                </Form.Group>



              </Modal.Body>

              <Modal.Footer>
                {isActive
                  ?
                  <Button variant="primary" type="submit" id="submitBtn">
                    Save
                  </Button>
                  :
                  <Button variant="danger" type="submit" id="submitBtn" disabled>
                    Save
                  </Button>
                }
                <Button variant="secondary" onClick={closeEdit}>
                  Close
                </Button>

              </Modal.Footer>

            </Form>
          </Modal>


        </>


        : <Navigate to="/products" />

      : <Navigate to="/products" />

  )
}

export default RegisterUser