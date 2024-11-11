import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../components/context/cauth';
import axios from "axios";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="p-3 m-3 margin-small">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            <div className="border shadow table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className='text-center' scope="col">#</th>
                    <th className='text-center' scope="col">Status</th>
                    <th className='text-center' scope="col">Buyer</th>
                    <th className='text-center' scope="col">Date</th>
                    <th className='text-center' scope="col">Payment</th>
                    <th className='text-center' scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((o, i) => (
                    <>
                      <tr key={o._id}>
                        <td className='text-center'>{i + 1}</td>
                        <td className='text-center'>{o?.status}</td>
                        <td className='text-center'>{o?.buyer?.name}</td>
                        <td className='text-center'>{moment(o?.createdAt).fromNow()}</td>
                        <td className='text-center'>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td className='text-center'>{o?.products?.length}</td>
                      </tr>

                      <tr>
                        <td colSpan="6">
                          <div className="container">
                            {o?.products?.map((p) => (
                              <div key={p._id} className="row m-4 p-3 flex-row">
                                <div className="col-md-4">
                                  <img
                                    src={`${import.meta.env.VITE_REACT_APP_API}/api/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                  />
                                </div>
                                <div className="card-body col-md-8 p-4">
                                  <h5 className="card-title">{p.name}</h5>
                                  <p className="card-text">{p.description}</p>
                                  <p className="card-text">$ {p.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders