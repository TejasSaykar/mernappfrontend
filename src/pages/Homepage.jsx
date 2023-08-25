import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../Context/AuthContext'
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Checkbox, Modal, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { GiLoad } from 'react-icons/gi';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { toast } from 'react-hot-toast';
import { BASE_URL } from './helper';


const Homepage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState(false);
  const navigate = useNavigate();

  const [cart, setCart] = useCart();




  // Get all Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/category/all-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);


  // Get total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-count`);
      setTotal(data?.total)
    } catch (error) {
      console.log(error)

    }
  }

  // Load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (page === 1) return;
    loadMore()
  }, [page])

  // Get all Products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data?.products);
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, [!checked.length, !radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filteredProduct()
  }, [checked.length, radio.length])

  // Filter by Category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c != id);
    }
    setChecked(all);
  }

  // Get filtered product
  const filteredProduct = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/product/product-filters`, { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);

    }
  }


  return (
    <Layout title="All Products - Best offers">
      <div className="row p-0 m-0 mt-3">
        {/* <div className="filters">
          <button className='btn btn-danger' onClick={()=> setFilter(true)}>Filters</button>
        </div> */}
        <Modal onCancel={() => setFilter(false)} footer={null} open={filter}>
          {/* <div className="col-md-12 justify-content-center align-items-center">
            <h4 className='text-center'>Filter by Category</h4>
            <div className="d-flex flex-column">
              {
                categories?.map(c => (
                  <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                ))
              }
            </div>

            <h4 className='text-center my-3'>Filter by Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map(p => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="d-flex flex-column col-md-12">
              <button className='btn btn-danger my-2 col-md-12' onClick={() => window.location.reload()}>Reset Filters</button>
            </div>
          </div> */}
        </Modal>
        <div className="col-md-3 justify-content-center align-items-center">
          <div className="filters">
            <div className="filter1">
              <h4 className='text-center text-danger'>Filter by Category</h4>
              <div className="d-flex flex-column">
                {
                  categories?.map(c => (
                    <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                  ))
                }
              </div>
            </div>

            <div className="filter2">
              <h4 className='text-center my-3 text-bold text-danger'>Filter by Price</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map(p => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>

          </div>


          <div className="d-flex flex-column col-md-12">
            <button className='btn btn-danger my-2 col-md-12' onClick={() => window.location.reload()}>Clear Filters</button>
          </div>
        </div>
        <div className="col-md-9 m-0 p-0">
          <h3 className='text-center text-danger'>All Products</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {
              products?.map(p => (
                <Card className='m-1' key={p._id} style={{ width: "19rem" }}>
                  <Card.Img height={'300px'} src={`http://localhost:8080/api/v1/product/product-img/${p._id}`} alt={p.name} />
                  <Card.Body>
                    <Card.Title>{p.name}</Card.Title>
                    <Card.Subtitle>{p.description}</Card.Subtitle>
                    <Card.Subtitle className='my-2'>₹ {p.price}.00</Card.Subtitle>
                    <button className='btn btn-danger mt-2' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    
                        <button
                          className='btn btn-success mx-2 mt-2'
                          onClick={() => {
                            !auth?.token ? 
                             navigate("/login")
                            :
                            setCart([...cart, p]);
                            localStorage.setItem("cart", JSON.stringify([...cart, p]))
                            toast.success("Item added to cart");
                          }}
                        >Add To Cart</button>
                    
                  </Card.Body>
                </Card>
              ))
            }
          </div>
          <div className="mt-2 p-2 text-center align-items-center">
            {products && products.length < total && (
              <button
                className='btn btn-warning col-md-6'
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : <span>Loadmore...<GiLoad /></span>}
              </button>
            )}
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default Homepage
