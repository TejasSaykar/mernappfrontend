import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../Context/SearchContext'
import { Card } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { toast } from 'react-hot-toast';
import { useAuth } from '../Context/AuthContext';


const Search = () => {

  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();


  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <div className="container text-center">
        <h1>Search Result</h1>
        <h5>
          {values?.results?.length < 1 ? "No product found" : `Found ${values?.results?.length}`}
        </h5>

        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {
            values?.results?.map(p => (
              <Card className='m-1' style={{ width: "18rem" }}>
                <Card.Img height={'300px'} src={`http://localhost:8080/api/v1/product/product-img/${p._id}`} alt={p.name} />
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Subtitle>{p.description}</Card.Subtitle>
                  <Card.Subtitle className='my-2'>₹{p.price}.00</Card.Subtitle>
                  <button className='btn btn-success mx-2 mt-2' onClick={() => {
                    {
                      !auth?.token ? navigate("/login")
                        :
                        setCart([...cart, p]);
                        localStorage.setItem('cart', JSON.stringify([...cart, p]))
                      toast.success("Item added to cart");
                    }

                  }}
                  >Add To Cart</button>
                </Card.Body>
              </Card>
            ))
          }
        </div>

      </div>
    </Layout>
  )
}

export default Search
