import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useCart } from '../components/context/cart';
import toast from 'react-hot-toast';

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const { cart, setCart } = useCart();

    useEffect(() => {
        if (params?.slug) getProductsbyCat()
    }, [params?.slug])

    const getProductsbyCat = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/product/product-category/${params.slug}`)
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong");
        }
    }

    // Update Add to Cart logic to avoid duplicate items
    const addToCart = (product) => {
        const existingCart = [...cart];
        const productIndex = existingCart.findIndex(item => item._id === product._id);

        if (productIndex !== -1) {
            existingCart[productIndex].quantity += 1;
        } else {
            if (product._id) { // Ensure the product has a valid _id
                existingCart.push({ ...product, quantity: 1 });
            } else {
                console.error('Invalid product:', product);
            }
        }

        setCart(existingCart);
        toast.success("Product Added to Cart Successfully!")
    };

    return (
        <Layout title={category?.name}>
            <div className="container mt-3">
                <h4 className="text-center">Category- {category?.name}</h4>
                <h6 className="text-center">{products?.length} result found</h6>
                <div className="row my-4">
                    <div className="col-md-12 offset-1">
                        <div className="d-flex flex-wrap just-cent text-center">
                            {products?.map((p) => (
                                <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={`${import.meta.env.VITE_REACT_APP_API}/api/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 20)}....</p>
                                        <p className="card-text">$ {p.price}</p>
                                        <button className='btn btn-primary ms-2'
                                            onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                        <button className='btn btn-secondary ms-2'
                                            onClick={() => addToCart(p)}
                                        >Add To Cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct
