import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(newPassword !== confirmPassword)
    {
      toast.error("Password does not match")
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/auth/forgot-password`, { email, newPassword })
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate('/login')
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="d-flex flex-column align-items-center py-4 bg-body-tertiary justify-content-center" style={{ height: "78.9vh" }}>
        <form className='w-25 w-half' onSubmit={handleSubmit}>
          <h1 className="h2 mb-3 fw-normal text-center">Reset Password</h1>
          <div className="form-floating my-1">
            <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" id="email" placeholder="name@example.com" value={email} />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating my-1">
            <input onChange={(e) => { setNewPassword(e.target.value) }} type="password" className="form-control" id="password" placeholder="name@example.com" value={newPassword} />
            <label htmlFor="email">New Password</label>
          </div>
          <div className="form-floating my-1">
            <input onChange={(e) => { setConfirmPassword(e.target.value) }} type="text" className="form-control" id="confirmpassword" placeholder="name@example.com" value={confirmPassword} />
            <label htmlFor="email">Confirm Password</label>
          </div>
          <div className='d-flex justify-content-center my-2'>
            <button className="btn btn-dark py-1 my-1" type="submit">RESET</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPasssword;