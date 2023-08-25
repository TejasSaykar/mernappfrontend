import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout/Layout';
import { Card } from 'react-bootstrap';
import { useCart } from '../Context/CartContext';
import toast  from 'react-hot-toast';
import { BASE_URL } from './helper';

const ProductDetails = () => {

    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();
    // Get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    // Get Similar Product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error)

        }
    }




    return (
        <Layout>
            <div className="row container-fluid mt-3">
                <div className="col-md-6 ml-3" style={{ display: "flex", justifyContent: "center", padding: "20px 0", width: "50%" }}>
                    <Card>
                        <Card.Img src={`${BASE_URL}/api/v1/product/product-img/${product._id}`} alt={product.name} className='img img-responsive p-3' height={"400px"} />
                    </Card>
                </div>
                <div className="col-md-6 mt-4">
                    <h2 className='text-danger'>Product Details</h2>
                    <h4 className='text-bold' style={{ fontWeight: 'bold' }}>Name : <span style={{ fontSize: '20px', fontWeight: "400", color: "grey" }}>{product.name}</span></h4>
                    <h4 className='text-bold' style={{ fontWeight: 'bold' }}>Description : <span style={{ fontSize: '20px', fontWeight: "400", color: "grey" }}>{product.description}</span></h4>
                    <h4 className='text-bold' style={{ fontWeight: 'bold' }}>Price : <span style={{ fontSize: '20px', fontWeight: "400", color: "grey" }}>₹ {product.price}.00</span></h4>
                    <h4 className='text-bold' style={{ fontWeight: 'bold' }}>Category : <span style={{ fontSize: '20px', fontWeight: "400", color: "grey" }}>{product?.category?.name}</span></h4>
                    <button
                        className='btn btn-success'
                        onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem('cart', JSON.stringify([...cart, product]));
                            toast.success("Item added to cart")
                        }}
                    >Add To Cart</button>
                </div>
                <hr />
            </div>
            <div className="row m-2 container">
                <div className="col-md-12">
                    {relatedProducts.length > 0 &&
                        <h3 className='text-center text-danger'>Similar Products</h3>
                    }
                    <div className="d-flex flex-wrap ">
                        {
                            relatedProducts?.map(p => (
                                <>
                                    <div className="d-flex flex-column">

                                        <Card className='m-1' style={{ width: "18rem" }}>
                                            <Card.Img height={'300px'} src={`http://localhost:8080/api/v1/product/product-img/${p._id}`} alt={p.name} />
                                            <Card.Body>
                                                <Card.Title>{p.name}</Card.Title>
                                                <Card.Subtitle>{p.description}</Card.Subtitle>
                                                <Card.Subtitle className='my-2'>₹ {p.price}</Card.Subtitle>
                                                <button onClick={() => {
                                                    setCart([...cart, p]);
                                                    localStorage.setItem('cart', JSON.stringify([...cart, p]));
                                                    toast.success("Item added to cart")
                                                }}
                                                    className='btn btn-success mx-2 mt-2'
                                                >Add To Cart</button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails
