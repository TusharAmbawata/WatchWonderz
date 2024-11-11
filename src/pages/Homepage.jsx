import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { price } from '../components/Price';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/context/cart';
import { useAuth } from '../components/context/cauth';
import Banner from './Banner';

const Homepage = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {cart, setCart} = useCart();

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/product/product-list/${page}`);
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      filterproduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  const filterproduct = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/product/product-filters`, { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

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
    <Layout title={"All Products - Best offers "}>
      <Banner/>
      <div className="m-3 p-3">
        <div className="row">
          <div className="col-md-3 s-flex my-3">
            <div className="d-flex flex-column">
              <h4 className='text-center'>Filter By Category</h4>
              {categories?.map((c) => (
                <Checkbox className='' key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <div className="d-flex flex-column my-4">
              <h4 className='text-center'>Filter By Price</h4>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {price?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column mt-4 d-big text-center">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="d-flex flex-column mb-4 d-none">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
          <div className="col-md-9">
            <h2 className='text-center'>All Products</h2>
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
                    <button className='btn btn-primary my-2'
                      onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    <button className='btn btn-secondary ms-2'
                      onClick={() => addToCart(p)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center m-2 p-3 ">
              {products && products.length < total && (
                <button
                  className='btn btn-warning'
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}>
                  {loading ? "Loading ..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Homepage;
