import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header.js'

/* import Footer from './components/Footer' */
import { Container } from "react-bootstrap";
import Home from "./pages/Home.js"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from './pages/Products.js';
import Validate from './pages/Validate.js';
import Logout from './pages/Logout.js';
import Dashboard from "./pages/Dashboard.js";
import RegisterUser from "./pages/RegisterUser.js";
import ProductList from "./pages/ProductList.js";
import ProductView from "./pages/ProductView";
import Transaction from "./pages/Transaction.js";
import Order from "./pages/Order.js";
import Cart from "./pages/Cart.js";
import OrderList from "./pages/Orderlist";
import UserProfile from "./pages/UserProfile.js";
import Entertainment from "./pages/Entertainment.js";
import Laptop from "./pages/Laptop.js";
import Mobile from "./pages/Mobile.js";
import Others from "./pages/Others.js";
import Contact from "./pages/Contact.js";
import CartList from "./pages/Cartlist.js"
import Error from './pages/Error.js';
import './App.css'


import { UserProvider } from "./UserContext";

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const [userAll, setUserAll] = useState({
    userLength: null
  })

  const unsetUserAll = () => {
    localStorage.clear()
  }

  const unsetUser = () => {
    localStorage.clear()
  }

  console.log(localStorage + " data")
  useEffect(() => {
    console.log(user)
    console.log(localStorage)
  }, [user])

  useEffect(() => {
    console.log(userAll)
    console.log(localStorage)
  }, [userAll])

  return (
    <UserProvider value={{ user, setUser, unsetUser, userAll, setUserAll, unsetUserAll }}>
      <Router>
        <Header />

        <Container fluid className="p-0">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/validate" element={<Validate />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/products/:productId" element={<ProductView />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/registerUser" element={<RegisterUser />} />
            <Route exact path="/productList" element={<ProductList />} />
            <Route exact path="/orderlist" element={<OrderList />} />
            <Route exact path="/cartlist" element={<CartList />} />
            <Route exact path="/transaction" element={<Transaction />} />
            <Route exact path="/transaction/order" element={<Order />} />
            <Route exact path="/transaction/cart" element={<Cart />} />
            <Route exact path="/users/profile" element={<UserProfile />} />
            <Route exact path="/entertainment" element={<Entertainment />} />
            <Route exact path="/laptop" element={<Laptop />} />
            <Route exact path="/mobile" element={<Mobile />} />
            <Route exact path="/others" element={<Others />} />
            <Route exact path="/contactus" element={<Contact />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
        {/*      <Footer /> */}
      </Router>
    </UserProvider>
  )
}

export default App;
