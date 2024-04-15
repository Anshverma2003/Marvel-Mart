import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './cart.css';
import pic1 from '../../Assets/wallpaperflare.com_wallpaper.jpg';

const Cart = () => {
    const [newCart, setNewCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const history = useHistory();

    const token = localStorage.getItem('Token');

    useEffect(() => {
        if (!token) {
            history.push('/login');
        } else {
            fetchCartItems();
        }
    }, [token, history]);

    const fetchCartItems = () => {
        try {
            fetch('https://marvel-mart-alxi.vercel.app/cartItems', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Error fetching data from the cart");
            })
            .then((data) => {
                console.log(data.response);
                if (Array.isArray(data.response)) {
                    setNewCart(data.response);
                    const totalPrice = data.response.reduce((total, item) => total + parseInt(item.price), 0);
                    setTotalPrice(totalPrice);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemove = (productId) => {
        try {
            fetch('https://marvel-mart-alxi.vercel.app/deleteProduct', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: productId
                })
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Can not remove item from cart");
                }
                setNewCart(prevCart => prevCart.filter(item => item.product_id !== productId));
            });
        } catch (error) {
            console.log(error);
        }
    };

    if (!token) {
        return null;
    }

    if (!newCart || newCart.length === 0) {
        return (
            <div className="emptyCart">
                <div className='emptyCartImage'>
                    <img src={pic1} alt="" />
                </div>
                <h1> YOUR CART IS EMPTY</h1>
                <Link to="/">
                    <button>CONTINUE SHOPPING</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="cartDetails">
            <div className="cart">
                <h1>HERE'S WHAT'S IN YOUR CART</h1>
                {newCart.length > 0 && newCart.map(item => (
                    <div className="cartItems" key={item.id}>
                        <h2>{item.name}</h2>
                        <div className="cartLeft">
                            <img src={item.image} alt="Image" />
                            <div className="cartRight">
                                <p>Style: Fullsleeves</p>
                                <p>Size: {item.size}</p>
                                <p>Quantity: {item.quantity} </p>
                                <p>Price: {item.price}</p>
                                <button onClick={() => handleRemove(item.product_id)}>REMOVE</button>
                            </div>
                        </div>
                    </div>
                ))}
                <hr />
                <div className='totalPrice'>
                    <p>Total Price: {totalPrice}</p>
                    <Link to='/buy'>
                        <button>BUY</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
