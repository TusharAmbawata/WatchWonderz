import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../components/context/cauth'
import Footer from '../../components/Layout/Footer'
import Navbar from '../../components/Layout/Navbar'

const dashboard = () => {
  const [auth] = useAuth();
  return (
    <>
    <Navbar/>
      <div className="m-3 p-3" style={{height:"100vh"}}>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 mx-auto text-center w-small">
              <h3> User Name : {auth?.user?.name}</h3>
              <h3> User Email : {auth?.user?.email}</h3>
              <h3> User Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default dashboard
