import React from 'react'
import Layout from '../components/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
    return (
        <Layout title={"Contact US"}>
            <div className="row contactus" style={{height:"100vh"}}>
                <div className="col-md-6 d-big">
                    <img
                        src="/images/contactus.jpeg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4 text-center">
                    <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
                    <p className="text-justify mt-2">
                        Any query and info about product feel free to call anytime we are 24x7 available
                    </p>
                    <p className="mt-3">
                        <BiMailSend /> : www.help@ecommerceapp.com
                    </p>
                    <p className="mt-3">
                        <BiPhoneCall /> : 012-3456789
                    </p>
                    <p className="mt-3">
                        <BiSupport /> : 1800-0000-0000 (toll free)
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Contact
