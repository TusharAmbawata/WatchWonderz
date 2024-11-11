import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout";
import axios from "axios";
import { useAuth } from "../../components/context/cauth";
import toast from "react-hot-toast";

const Profile = () => {
  const [auth,setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/auth/profile`, { name, email, password, address, phone });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form className='p-2 d-flex flex-column align-items-center' onSubmit={handleSubmit}>
                <h1 className="h2 mb-3 text-center">Update Profile</h1>
                <div className="form-floating my-1 w-50 w-full">
                  <input onChange={(e) => { setName(e.target.value) }} type="text" className="form-control" id="name" value={name} placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Name</label>
                </div>

                <div className="form-floating my-2 w-50 w-full">
                  <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" id="email" value={email} placeholder="name@example.com" disabled/>
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating my-2 w-50 w-full">
                  <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" id="password" value={password} placeholder="Password" />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating my-2 w-50 w-full">
                  <input onChange={(e) => { setPhone(e.target.value) }} type="text" className="form-control" id="confirmpass" value={phone} placeholder="Password" />
                  <label htmlFor="floatingPassword">Phone</label>
                </div>
                <div className="form-floating my-2 w-50 w-full">
                  <input onChange={(e) => { setAddress(e.target.value) }} type="text" className="form-control" id="address" value={address} placeholder="Password" />
                  <label htmlFor="floatingPassword">Address</label>
                </div>
                <div className='d-flex justify-content-center w-full my-2'>
                  <button className="btn btn-primary py-2" type="submit">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;