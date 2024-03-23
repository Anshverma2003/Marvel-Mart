import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import pic1 from '../../Assets/return-eligibility-valid.webp';
import './cardDetails.css';

function CardDetails() {
    const [data, setData] = useState(null);
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState('S');
    const [quantity, setQuantity] = useState(1);

    const token = localStorage.getItem('Token');
    const currentURL = window.location.href;
    const match = currentURL.match(/\/productID\/(\d+)/);
    const id = match ? match[1] : null;

    useEffect(() => {

        if (id) {
            fetch(`http://localhost:8080/productID/${id}`)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error('Error fetching product data');
                })
                .then((data) => {
                    setData(data.getProductById);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, []);

    function handelAddToCart() {
        setModal(true);

        try {
            const price = data[0].price;
            const product_id = id;
            
            fetch('http://localhost:8080/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    product_id,
                    size,
                    quantity,
                    price
                })
            })
            .then((res)=>{
                if(res.ok){
                    return res.json()
                }
            })
            .then((data)=>{
                if(data){
                    console.log("Data Added To Cart");
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="cardDetails">
            {data && (
                <>
                    <h2>{data[0].name}</h2>
                    <hr />
                    <div className="details">
                        <div className="leftDetail" >
                            <img src={data[0].image} alt="" />
                        </div>

                        <div className="rightDetail">
                            <h2 className="productTitle">Marvel Mart Unisex T-SHirt</h2>
                            <h4 className="artwork-info">The artwork will be screen printed to perfection on our
                                <span className="semi-bold"> premium, regular fit </span>
                                branded tees that you know and love.
                            </h4>

                            <div className="return">
                                <img src={pic1} alt="" />
                                <p>This product is eligible for return under our easy 15 day return policy. No questions asked.</p>
                            </div>

                            <h2>Rs. {data[0].price}.00 <del className="del">Rs. {data[0].prevprice}</del> <span>{data[0].offpercent}% <span>OFF</span></span> </h2>
                            <div className="selectSize">
                                <span>CLICK TO SELECT SIZE:</span>
                                <select name="Size" id="size" onChange={(e) => { setSize(e.target.value) }}>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XS">XS</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                            </div>
                            <div className="quantity">
                                <span>Quantity</span>
                                <select name="Quantity" id="quantity" onChange={(e) => { setQuantity(e.target.value) }}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </select>
                            </div>
                            <button onClick={handelAddToCart} >ADD TO CART</button>
                        </div>
                    </div>
                    {modal && (
                        <div className="modal">
                            <div className="modal-content">
                                <div className="closeBtn">
                                    <button onClick={() => setModal(false)}>X</button>
                                </div>
                                <h2>Item Added to Cart!</h2>
                                <img src={data[0].image} alt="" />
                                <p>Your item has been successfully added to the cart.</p>
                                <div className="modalBtn">
                                    <Link to="/cart">
                                        <button className="viewBtn">VIEW CART</button>
                                    </Link>
                                    <Link to='/'>
                                        <button className="shopBtn">CONTINUE SHOPPING</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default CardDetails;
