import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/product/get-product`);
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong!")
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <Layout>
            <div className="m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Products List</h1>
                        <div className="d-flex flex-wrap just-cent text-center">
                            {products.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/product/${p.slug}`}
                                    className='product-link'
                                >
                                    <div className="card m-2" style={{ width: "18rem" }}>
                                        <img
                                            src={`${import.meta.env.VITE_REACT_APP_API}/api/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0,20)}....</p>
                                            <p className="card-text">$ {p.price}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
