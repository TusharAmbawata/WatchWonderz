import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../components/context/cauth'
import { useCart } from '../components/context/cart'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DropIn from "braintree-web-drop-in-react";
import toast from 'react-hot-toast'

const CartPage = () => {
    const [auth, sethAuth] = useAuth();
    const { cart, setCart} = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total += item.price * item.quantity; // Update for quantity
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
            toast.success("Product Removed from cart Successfully!")
        } catch (error) {
            console.log(error);
        }
    }


    const getToken = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/product/braintree/token`);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    const updateQuantity = (pid, action) => {
        try {
            let updatedCart = cart.map((item) => {
                if (item._id === pid) {
                    return {
                        ...item,
                        quantity: action === "increase" ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
                    };
                }
                return item;
            });
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        } catch (error) {
            console.log(error);
        }
    };

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/product/braintree/payment`, {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            toast.error("Some error occured");
            setLoading(false);
        }
    }

    return (
        <Layout title={"Cart Page"}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center p-2 mb-1 bg-light'>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
                        <h4 className='text-center'>
                            {cart?.length
                                ? `You have ${cart?.length} items in your Cart ${auth?.token ? "" : "Please Login to Checkout"}`
                                : "Your cart is Empty"
                            }
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">

                        {cart?.map((p) => (
                            <div key={p._id} className="row card m-4 p-3 flex-row text-center">
                                <div className="col-md-4">
                                    <img
                                        src={`${import.meta.env.VITE_REACT_APP_API}/api/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                </div>
                                <div className="card-body col-md-8">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <p className="card-text">$ {p.price}</p>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <button className='btn btn-outline-secondary me-2'
                                            onClick={() => updateQuantity(p._id, "decrease")}
                                        >
                                            -
                                        </button>
                                        <span>{p.quantity}</span>
                                        <button className='btn btn-outline-secondary ms-2'
                                            onClick={() => updateQuantity(p._id, "increase")}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button className='btn btn-danger my-3'
                                        onClick={() => removeCartItem(p._id)}
                                    >Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Please Login to checkout
                                    </button>
                                )}
                            </div>
                        )}
                        <div className='mt-2'>
                            {!clientToken || !cart?.length ? (
                                ""
                            ) : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: "vault",
                                            },
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />

                                    <button
                                        className="btn btn-primary my-3"
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Make Payment"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
