import { useState, useEffect, useContext } from 'react';
import AllUsers from "../components/AllUsers"
import AllProducts from "../components/AllProducts"
import AllOrders from '../components/AllOrders';
import AllCart from '../components/AllCart';
import Swal from "sweetalert2";
import { Navigate } from 'react-router-dom'
import UserContext from "../UserContext";


const Dashboard = () => {


  const { user, userAll } = useContext(UserContext);

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






  return (


    <>
      {
        (user.id != null) ?
          (user.isAdmin == true) ?
            <>

              <div className="dashboard">

                <AllUsers length={userAll.userLength} />
                <AllProducts />
                <AllOrders />
                <AllCart />
              </div>

            </>

            :
            <Navigate to="/products" />

          :

          <Navigate to="/products" />
      }

    </>
  )
}

export default Dashboard