import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useCart } from '../Context/CartContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { BASE_URL } from './helper';

const CategoryProduct = () => {

  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [auth, setAuth] = useAuth();

  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-category/${params.slug}`);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug])

  return (
    <Layout>
      <div className="container mt-3">
        <h2 className='text-center'>Category - {category?.name}</h2>
        <h4 className='text-center'>{products?.length} result found</h4>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {
              products?.map(p => (
                <Card className='m-1' style={{ width: "18rem" }}>
                  <Card.Img height={'300px'} src={`${BASE_URL}/api/v1/product/product-img/${p._id}`} alt={p.name} />
                  <Card.Body>
                    <Card.Title>{p.name}</Card.Title>
                    <Card.Subtitle>{p.description}</Card.Subtitle>
                    <Card.Subtitle className='my-2'>₹{p.price}.00</Card.Subtitle>
                    <button className='btn btn-success mx-2 mt-2' onClick={() => {
                      {
                        !auth?.token ? navigate("/login")
                          :
                          setCart([...cart, p]);
                          localStorage.setItem('cart', JSON.stringify([...cart, p]));
                        toast.success("Item added to cart");
                      }

                    }}
                    >
                      Add To Cart</button>
                  </Card.Body>
                </Card>
              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct
