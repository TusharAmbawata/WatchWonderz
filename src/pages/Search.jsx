import React from 'react'
import Layout from '../components/Layout'
import { useSearch } from '../components/context/search'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../components/context/cart';

const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const { cart, setCart } = useCart();

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
        <Layout>
            <div className="container">
                <div className="text-center">
                    <h1 className='mt-4'>Search components</h1>
                    <h6 className='mt-4'>
                        {values?.results.length > 1
                            ? `Found ${values?.results.length}`
                            : "No Product Found"}
                    </h6>
                    <div className="d-flex flex-wrap my-4">
                        {values?.results.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`${import.meta.env.VITE_REACT_APP_API}/api/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="card-text"> $ {p.price}</p>
                                    <button class="btn btn-primary ms-1 my-2"
                                        onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button class="btn btn-secondary ms-1 my-2" onClick={() => addToCart(p)}>ADD TO CART</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search
