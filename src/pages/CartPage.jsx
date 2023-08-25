import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../Context/AuthContext'
import { useCart } from '../Context/CartContext';
import { Card } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { BASE_URL } from './helper';

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [totalP, setTotalp] = useState([]);

  const navigate = useNavigate();

  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(clientToken)

  // Total Price 
  const totalPrice = async () => {
    try {
      let total = 0;
      cart?.map(item => {
        total = total + item.price;
      });
      setTotalp(total)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    totalPrice();
  }, [cart]);

  // Delete Product from cart
  const removeItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong")
    }
  }

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle Payment
  const handlePayment = async () => {
    try {
      setLoading(true)
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${BASE_URL}/api/v1/product/braintree/payment`, {
        nonce, cart
      });
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);

    }
  }



  return (
    <Layout title={"Ecommerce - Cart"}>
      <div className="container p-3 bg-light">
        <div className="row p-3">
          <div className="col-md-12">
            <h2 className='text-center bg-light p-3'>
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h2>
            <h4 className='text-center'>
              {cart.length > 1 ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please login to checkout"}` : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row checkout">
          {
            cart?.length > 0 &&
            <>
              <div className="col-md-8">
                {
                  cart?.map(p => (
                    <>
                      <div className="row mb-3 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <Card className='m-1 cardImg' height={"100px"} width={"100px"}>
                            <Card.Img className='cartImg' src={`${BASE_URL}/api/v1/product/product-img/${p._id}`} alt={p.name} />
                          </Card>
                        </div>
                        <div className="col-md-8 text-center">
                          <p className='my-1 p-0' style={{ fontWeight: "600" }}>{p.name}</p>
                          <p className='my-1 p-0' style={{ fontWeight: "600" }}>{p.description}</p>
                          <p className='my-1 p-0' style={{ fontWeight: "600" }}>Price : ₹{p.price}.00</p>
                          <button className='btn btn-danger mb-3 mt-2'
                            onClick={() => {
                              removeItem(p._id)
                              // setCart(cart.filter(c => c._id !== p._id));
                              // localStorage.setItem('cart', JSON.stringify(cart))
                            }}
                          >Remove</button>
                        </div>
                      </div>
                    </>
                  ))
                }
              </div>
              <div className="col-md-4 text-center">
                <h2>Cart Summary</h2>
                <p>Total | Checkout | Payment</p>
                <hr />
                <h4>Total : ₹{totalP}.00 </h4>
                {
                  auth?.user?.address ? (
                    <div className="mb-3">
                      <h4>Current Address</h4>
                      <h5>{auth?.user?.address}</h5>
                      <button
                        className='btn btn-outline-warning'
                        onClick={() => navigate("/dashboard/user/profile")}
                      >Update Address</button>
                    </div>
                  ) : (
                    <div className="mb-3">
                      {
                        auth?.token ? (
                          <button
                            className='btn btn-outline-warning'
                            onClick={() => navigate("/dashboard/user/profile")}
                          >Update Address</button>
                        ) : (
                          <button
                            className='btn btn-outline-warning'
                            onClick={() => navigate("/login", {
                              state: "/cart"
                            })}
                          >Please Login to checkout</button>
                        )}
                    </div>
                  )}
                <div className="mt-3">
                  {
                    !clientToken || !cart?.length ? "" :
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: 'vault'
                            }
                          }}
                          onInstance={instance => setInstance(instance)}
                        />
                        <button className='btn btn-success' disabled={!instance || !auth?.token || !auth?.user?.address} onClick={handlePayment}>
                          {
                            loading ? "Processing" : "Make Payment"
                          }
                        </button>
                      </>
                  }

                </div>
              </div>
            </>
          }
        </div>
      </div>
    </Layout>
  )
}

export default CartPage
