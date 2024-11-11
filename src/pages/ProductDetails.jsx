import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCart } from '../components/context/cart';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { cart, setCart } = useCart();

  // Initial product details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);

      // Fetch similar products if product and category IDs are available
      if (data?.product._id && data?.product.category._id) {
        getSimilarProduct(data.product._id, data.product.category._id);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

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
    <Layout title={product.name || 'Product Details'}>
      <div className="row m-4">
        <div className="col-md-6">
          {product._id ? (
            <img
              src={`${import.meta.env.VITE_REACT_APP_API}/api/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name || 'Product Image'}
            />
          ) : (
            <p>Loading image...</p> // Optional placeholder while loading
          )}
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: {product.price}</h6>
          <h6>Category: {product?.category?.name}</h6>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => addToCart(product)}
          >
            ADD TO CART
          </button>
        </div>
        <hr className="my-4" />
        <div className="row container">
          <h6>Similar Products</h6>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedProducts.map((p) => (
              <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                <img
                  src={`${import.meta.env.VITE_REACT_APP_API}/api/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name || 'Related Product'}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => addToCart(p)}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
