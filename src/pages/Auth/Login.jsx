import React, { useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast"
import { useAuth } from '../../components/context/cauth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();
    const location = useLocation();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/auth/login`, { email, password });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.authtoken,
                });
                localStorage.setItem("auth",JSON.stringify(res.data));
                navigate(location.state || "/");
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <Layout>
                <div className="d-flex flex-column align-items-center py-4 bg-body-tertiary justify-content-center" style={{ height: "78.9vh" }}>
                    <form className='w-25 w-half' onSubmit={handleSubmit}>
                        <h1 className="mb-3 fw-normal text-center">Login</h1>

                        <div className="form-floating my-1">
                            <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" id="email" placeholder="name@example.com" value={email} />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating my-1">
                            <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" id="password" placeholder="Password" value={password} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className='d-flex flex-column p-4 justify-content-center align-items-center'>
                            <button className="btn btn-dark py-1 my-1" type="submit" onClick={()=>{navigate('/forgotpassword')}}>Forgot Password</button>
                            <button className="btn btn-primary py-1 px-4 my-1" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    )
}

export default Login
