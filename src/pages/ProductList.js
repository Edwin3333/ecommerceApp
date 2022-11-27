import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Swal from "sweetalert2";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Navigate } from 'react-router-dom'

import UserContext from "../UserContext";

const ProductList = function () {
  const { user, userAll } = useContext(UserContext);

  const [allProducts, setAllProducts] = useState([]);

  const [productId, setProductId] = useState("");
  const [productCategories, setProductCategories] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [productScreenSize, setProductScreenSize] = useState("");
  const [productCPU, setProductCPU] = useState("");
  const [productVideoCard, setProductVideoCard] = useState("");
  const [productRAM, setProductRAM] = useState("");
  const [productStorage, setProductStorage] = useState("");
  const [productOS, setProductOS] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imgSource, setImgSource] = useState("");

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [isActive, setIsActive] = useState(false);

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);


  const addProductOpen = () => setModalAdd(true);
  const addProductClose = () => setModalAdd(false);

  const handlePrevious = () => {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;


    });
  }

  const handleNext = () => {
    setPage((p) => {
      if (p === pageCount) return p
      return p + 1;
    })
  }

  const openEdit = (id) => {

    setProductId(id)
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {

        setProductCategories(data.categories);
        setProductBrand(data.brand);
        setProductName(data.name);
        setProductScreenSize(data.screenSize);
        setProductCPU(data.cpu);
        setProductVideoCard(data.videoCard);
        setProductRAM(data.ram);
        setProductStorage(data.storage);
        setDescription(data.description);
        setProductOS(data.OS);
        setProductPrice(data.price);
        setImgSource(data.source);

      });

    setModalEdit(true)
  };

  const closeEdit = () => {

    setImgSource('');

    setModalEdit(false);
  };

  const fetchPage = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {




      });
  }

  useEffect(() => {
    fetchPage();


  }, [])



  /* GET ALL PRODUCTS */
  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {


        setAllProducts(data.map(products => {
          console.log(products.isActive)
          return (
            <>

              <tr key={products._id}>
                <td>{products._id}</td>
                <td>{products.categories}</td>
                <td>{products.brand}</td>
                <td>{products.name}</td>
                <td>{products.screenSize}</td>
                <td>{products.cpu}</td>
                <td>{products.videoCard}</td>
                <td>{products.ram}</td>
                <td>{products.storage}</td>
                <td>{products.OS}</td>
                <td>{products.price}</td>
                <td>{products.isActive.toString()}</td>
                <td>
                  {(products.isActive)
                    ?
                    <Button variant="danger" size="sm" onClick={() => archive(products._id, products.name)}>Archive</Button>
                    :
                    <>
                      <Button variant="success" className="mx-1" size="sm" onClick={() => unarchive(products._id, products.name)}>Unarchive</Button>
                      <Button variant="secondary" className="mx-1" size="sm" onClick={() => openEdit(products._id)}   >Edit</Button>

                    </>}

                </td>
              </tr>
            </>
          )
        }));


      });
  }

  useEffect(() => {
    fetchData();


  }, [])

  /* ARCHIVE PRODUCT */
  const archive = (id, name) => {
    console.log(id);
    console.log(name);
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}/archive`,
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
            title: "PRODUCT ARCHIVING SUCCESS!",
            icon: "success",
            text: `The product is now in archive`
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



  const unarchive = (id, name) => {
    console.log(id);
    console.log(name);
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}/unarchive`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          isActive: true
        })

      })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data) {
          Swal.fire({
            title: "Unarchive Successful",
            icon: "success",
            text: `The product is now inactive`
          });

          fetchData();
        } else {
          Swal.fire({
            title: "Unarchive Unsuccessful",
            icon: "error",
            text: "Something went wrong. Please try again later"
          })
        }
      })
  }

  useEffect(() => {
    fetchData();


  }, [])



  if (user.id === null) {
    Swal.fire({
      title: "User is not allowed to access this page!",
      icon: "error",
      text: "Please try again."
    })
  }


  if (user.isAdmin === false) {
    Swal.fire({
      title: "User is not allowed to access this page!",
      icon: "error",
      text: "Please try again."
    })
  }

  const addProduct = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        categories: productCategories,
        brand: productBrand,
        name: productName,
        screenSize: productScreenSize,
        cpu: productCPU,
        videoCard: productVideoCard,
        ram: productRAM,
        storage: productStorage,
        OS: productOS,
        description: description,
        source: imgSource,
        price: parseInt(productPrice, 10)
      })
    })
      .then(res => res.json())
      .then(data => {


        if (data) {
          Swal.fire({
            title: "PRODUCT ADDED SUCCESSFULLY!",
            icon: "success",
            text: `"The new product was added to the product list.`,
          });


          fetchData();
          addProductClose();
        }
        else {
          Swal.fire({
            title: "ADD PRODUCT UNSSUCCESSFUL!",
            icon: "error",
            text: `The system is experiencing trouble at the moment. Please try again later.`,
          });
          addProductClose();
        }

      })

    setProductCategories('');
    setProductBrand('');
    setProductName('');
    setProductScreenSize('');
    setProductCPU('');
    setProductVideoCard('');
    setProductRAM('');
    setProductStorage('')
    setProductOS('')
    setImgSource('');
    setProductPrice(0)
  }


  useEffect(() => {

    if (productCategories !== "" && productBrand !== "" &&
      productName !== "" && productScreenSize !== "" &&
      productCPU !== "" && productVideoCard !== "" &&
      productRAM !== "" && productStorage !== "" &&
      productOS !== "" && description !== "" && productPrice > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

  }, [
    productCategories, productBrand, productName, productScreenSize,
    productCPU, productVideoCard, productRAM, productStorage,
    productOS, description, productPrice
  ]);


  const editProduct = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        categories: productCategories,
        brand: productBrand,
        name: productName,
        screenSize: productScreenSize,
        cpu: productCPU,
        videoCard: productVideoCard,
        ram: productRAM,
        storage: productStorage,
        OS: productOS,
        description: description,
        source: imgSource,
        price: parseInt(productPrice, 10)
      })
    })
      .then(res => res.json())
      .then(data => {


        if (data) {
          Swal.fire({
            title: "PRODUCT EDIT SUCCESSFUL!",
            icon: "success",
            text: `Product was edited successfully.`,
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

    setProductCategories('');
    setProductBrand('');
    setProductName('');
    setProductScreenSize('');
    setProductCPU('');
    setProductVideoCard('');
    setProductRAM('');
    setProductStorage('')
    setProductOS('')
    setImgSource('');
    setProductPrice(0)
  }








  return (
    (user.id !== null) ?

      (user.isAdmin === true) ?

        <>
          <div className="createProductDiv">
            <h3> Create Product</h3>
            <Button onClick={addProductOpen}>Add Product</Button>
          </div>
          <Table striped className='tableData'>
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Category</th>
                <th>Brand</th>
                <th> Name</th>
                <th>ScreenSize</th>
                <th> CPU</th>
                <th> VideoCard</th>
                <th> Ram</th>
                <th> Storage</th>
                <th>OS</th>
                <th> Price</th>
                <th> isActive</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>

              {allProducts}


            </tbody>

          </Table>

          {/* Add product modal */}
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalAdd}
          >
            <Form onSubmit={e => addProduct(e)}>

              <Modal.Header className="banner-bg text-light bg-primary">
                <Modal.Title>ADD PRODUCT</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Row>
                  <Col xs={12} md={12} lg={12}>
                    <Image className="editModal-img-fit mb-2"
                      src={imgSource} style={{ width: "15rem" }}
                    />

                    <Form.Group controlId="productCategories" className="mb-3">
                      <Form.Label>Product Category</Form.Label>
                      {/*                       <Form.Control
                        type="text"
                        placeholder="Product Category"
                        value={productCategories}
                        onChange={e => setProductCategories(e.target.value)}
                        required
                      /> */}

                      <Form.Select aria-label="Product Category" value={productCategories} onChange={e => setProductCategories(e.target.value)}
                        required>
                        <option>Product Category</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Peripheral">Peripheral</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="productBrand" className="mb-3">
                      <Form.Label>Product Brand</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product brand"
                        value={productBrand}
                        onChange={e => setProductBrand(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="productName" className="mb-3">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="productScreenSize" className="mb-3">
                      <Form.Label>Product Screen Size</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product ScreenSize"
                        value={productScreenSize}
                        onChange={e => setProductScreenSize(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="PproductCPU" className="mb-3">
                      <Form.Label>Product CPU</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product CPU"
                        value={productCPU}
                        onChange={e => setProductCPU(e.target.value)}
                        required
                      />
                    </Form.Group>


                    <Form.Group controlId="ProductVideoCard" className="mb-3">
                      <Form.Label>Product Video Card</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product Video Card"
                        value={productVideoCard}
                        onChange={e => setProductVideoCard(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="ProductRAM" className="mb-3">
                      <Form.Label>Product RAM</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product RAM"
                        value={productRAM}
                        onChange={e => setProductRAM(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="ProductRAM" className="mb-3">
                      <Form.Label>Product Storage</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product Storage"
                        value={productStorage}
                        onChange={e => setProductStorage(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="ProductOS" className="mb-3">
                      <Form.Label>Product OS</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product OS"
                        value={productOS}
                        onChange={e => setProductOS(e.target.value)}
                        required
                      />
                    </Form.Group>






                    <Form.Group controlId="description" className="mb-3">
                      <Form.Label>Product Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Product Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                      />
                    </Form.Group>



                    <Form.Group controlId="productPrice" className="mb-3">
                      <Form.Label>Product Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Product Price"
                        value={productPrice}
                        onChange={e => setProductPrice(e.target.value)}
                        required
                      />
                    </Form.Group>

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




                <Button variant="secondary" onClick={addProductClose}>
                  Close
                </Button>
              </Modal.Footer>

            </Form>
          </Modal>

          {/* EDIT MODAL */}

          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalEdit}
          >
            <Form onSubmit={e => editProduct(e)}>

              <Modal.Header className="banner-bg text-light bg-primary" bg="primary">
                <Modal.Title >EDIT PRODUCT</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Image className="editModal-img-fit mb-2"
                  src={imgSource}
                  style={{ width: "15rem" }}
                />
                <Col xs={6} md={6} lg={12}>
                  <Form.Group controlId="productCategories" className="mb-3">
                    <Form.Label>Product Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product Category"
                      value={productCategories}
                      onChange={e => setProductCategories(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="productBrand" className="mb-3">
                    <Form.Label>Product Brand</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product brand"
                      value={productBrand}
                      onChange={e => setProductBrand(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="productName" className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product Name"
                      value={productName}
                      onChange={e => setProductName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="productScreenSize" className="mb-3">
                    <Form.Label>Product Screen Size</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product ScreenSize"
                      value={productScreenSize}
                      onChange={e => setProductScreenSize(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="PproductCPU" className="mb-3">
                    <Form.Label>Product CPU</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product CPU"
                      value={productCPU}
                      onChange={e => setProductCPU(e.target.value)}
                      required
                    />
                  </Form.Group>


                  <Form.Group controlId="ProductVideoCard" className="mb-3">
                    <Form.Label>Product Video Card</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product Video Card"
                      value={productVideoCard}
                      onChange={e => setProductVideoCard(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="ProductRAM" className="mb-3">
                    <Form.Label>Product RAM</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product RAM"
                      value={productRAM}
                      onChange={e => setProductRAM(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="ProductRAM" className="mb-3">
                    <Form.Label>Product Storage</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product Storage"
                      value={productStorage}
                      onChange={e => setProductStorage(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="ProductOS" className="mb-3">
                    <Form.Label>Product OS</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product OS"
                      value={productOS}
                      onChange={e => setProductOS(e.target.value)}
                      required
                    />
                  </Form.Group>







                  <Form.Group controlId="description" className="mb-3">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Product Description"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      required
                    />
                  </Form.Group>



                  <Form.Group controlId="productPrice" className="mb-3">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Product Price"
                      value={productPrice}
                      onChange={e => setProductPrice(e.target.value)}
                      required
                    />
                  </Form.Group>

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


export default ProductList