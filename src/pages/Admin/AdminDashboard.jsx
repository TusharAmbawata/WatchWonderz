import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../components/context/cauth'
import Layout from '../../components/Layout';

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="m-3 p-3" style={{height:"100vh"}}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 mx-auto text-center w-small">
              <h3> Admin Name : {auth?.user?.name}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
