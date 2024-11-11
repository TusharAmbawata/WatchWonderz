import React, { useState } from 'react'
import Layout from '../../components/Layout'
import {toast} from "react-hot-toast"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/cauth';

const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/auth/createuser`,{name,email,password,address,phone});
            if(res && res.data.success)
            {
                toast.success(res.data && res.data.message);
                navigate("/login");
            }
            else
            {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

  return (
    <>
      <Layout>
                <div className="d-flex flex-column align-items-center py-4 bg-body-tertiary justify-content-center" >
                    <form className='w-50 w-half' onSubmit={handleSubmit}>
                        <h1 className="h2 mb-3 fw-normal text-center">Register</h1>
                        
                        <div className="form-floating my-1">
                            <input onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control" id="name" value={name} placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Name</label>
                        </div>

                        <div className="form-floating my-1">
                            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control" id="email" value={email} placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating my-1">
                            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control" id="password" value={password} placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating my-1">
                            <input onChange={(e)=>{setPhone(e.target.value)}} type="text" className="form-control" id="confirmpass" value={phone} placeholder="Password" />
                            <label htmlFor="floatingPassword">Phone</label>
                        </div>
                        <div className="form-floating my-1">
                            <input onChange={(e)=>{setAddress(e.target.value)}} type="text" className="form-control" id="address" value={address} placeholder="Password" />
                            <label htmlFor="floatingPassword">Address</label>
                        </div>
                    <div className='d-flex justify-content-center'>
                        <button className="btn btn-primary py-2 my-1" type="submit">Register</button>
                    </div>
                    </form>
                </div>
            </Layout>
    </>
  )
}

export default Register
