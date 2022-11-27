import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom'
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'


const UserProfile = () => {
  const { user, userAll } = useContext(UserContext);
  const [imgSource, setImgSource] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isActive, setIsActive] = useState(false);


  const [passwordId, setPasswordId] = useState("")
  const [passIsActive, setPassIsActive] = useState(false);

  const [modalEdit, setModalEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const addProductOpen = () => setModalAdd(true);
  const addProductClose = () => setModalAdd(false);

  const [modalPassword, setModalPassword] = useState(false);
  const updatePasswordOpen = () => setModalPassword(true);
  const updatePasswordClose = () => setModalPassword(false);

  const [allUser, setAllUser] = useState([]);

  if (user.id == null) {
    Swal.fire({
      title: "Authentication Error",
      icon: "error",
      text: `You are not allow to access this page`,
    });

  }

  const closeEdit = () => {

    setImgSource('');

    setModalEdit(false);
  };

  const closePassword = () => {

    setPassword('');
    setPassword2('');


    setModalPassword(false);
  };


  useEffect(() => {
    if ((password !== "" && password2 !== "") && (password === password2)) {
      setPassIsActive(true)
    } else {
      setPassIsActive(false)
    }
  }, [password, password2])



  const openEdit = () => {

    fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {

        setImgSource(data.user.source);

      });

    setModalEdit(true)
  };



  const openUpdatePassword = () => {
    setPasswordId(user.id)
    console.log(user.id + " this is my user id")
    setModalPassword(true)
  }


  const updateUserPassword = (e) => {

    e.preventDefault()

    fetch(`${process.env.REACT_APP_API_URL}/users/update/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.passwordLength + " ang laman ng data ay")


        if (data.passwordLength == false) {
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

        if (data === true) {
          Swal.fire({
            title: "Password Updating Successfully!",
            icon: "success",
            text: `Password already update!`
          });

          fetchData();
          setModalPassword(false);
        }


        if (!data) {
          Swal.fire({
            title: "Password is invalid",
            icon: "error",
            text: "The password must contain one or more special characters"
          });
        }

      });


    setPassword('');
    setPassword2('');
    setModalPassword(true)
  };



  const editProfile = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/update/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        source: imgSource,
      })
    })
      .then(res => res.json())
      .then(data => {


        if (data) {
          Swal.fire({
            title: "Added profile picture successfully!",
            icon: "success",
            text: `Enjoy shopping!`,
          });

          fetchData();
          closeEdit();

        }
        else {
          Swal.fire({
            title: "Added profile picture unsuccessful!",
            icon: "error",
            text: `The system is experiencing trouble at the moment. Please try again later.`,
          });

          closeEdit();
        }

      })

    setImgSource('');
  }


  useEffect(() => {

    if (imgSource !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

  }, [
    imgSource
  ]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setAllUser({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          mobileNo: data.user.mobileNo,
          address: data.user.address,
          source: data.user.source
        }

        );

      }
      )
  }
  useEffect(() => {
    fetchData();


  }, [])




  return (
    <>
      {
        (user.id !== null)
          ?
          <>
            <div className="userProfile-Container">

              <div>
                <div style={{ width: "15rem", height: "17rem" }} className="bg-secondary">
                  <Image className="editModal-img-fit mb-2"
                    src={allUser.source} style={{ width: "15rem", height: "17rem" }}
                  />
                </div>
                <br />
                <Button variant="primary" onClick={openEdit}>Add Profile Picure</Button>
                <br />
                <Button variant="primary" onClick={openUpdatePassword} style={{ marginTop: "1rem" }}>Update password</Button>
              </div>
              <div>
                <h3>{allUser.firstName} {allUser.lastName}</h3>
                <p>{allUser.email}</p>
                <p>{allUser.mobileNo}</p>
                <p>{allUser.address}</p>
              </div>

            </div>

            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={modalEdit}
            >
              <Form onSubmit={e => editProfile(e)}>

                <Modal.Header className="banner-bg text-light bg-primary">
                  <Modal.Title>Add Profile Picture</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <Form.Group controlId="imgSource" className="mb-3">
                        <Form.Label>Image Link</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Product Image Link"
                          value={imgSource}
                          onChange={e => setImgSource(e.target.value)}
                          required
                        />

                      </Form.Group>
                    </Col>
                  </Row>
                </Modal.Body>

                <Modal.Footer>


                  {
                    (isActive === true)
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


            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={modalPassword}
            >
              <Form onSubmit={e => updateUserPassword(e)}>

                <Modal.Header className="banner-bg text-light bg-primary">
                  <Modal.Title>Update User Password</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <Form.Group controlId="password" className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="enter new password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          required
                        />

                      </Form.Group>

                      <Form.Group controlId="password2" className="mb-3">
                        <Form.Label>Verify Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter verify password"
                          value={password2}
                          onChange={e => setPassword2(e.target.value)}
                          required
                        />

                      </Form.Group>
                    </Col>
                  </Row>
                </Modal.Body>

                <Modal.Footer>


                  {
                    (passIsActive === true)
                      ?
                      <Button variant="primary" type="submit" id="submitBtn">
                        Save
                      </Button>
                      :
                      <Button variant="danger" type="submit" id="submitBtn" disabled>
                        Save
                      </Button>
                  }




                  <Button variant="secondary" onClick={closePassword}>
                    Close
                  </Button>
                </Modal.Footer>

              </Form>
            </Modal>



          </>
          :
          <Navigate to='/login' />
      }


    </>
  )
}

export default UserProfile