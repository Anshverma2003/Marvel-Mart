import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/context';
import './cart.css'
import pic1 from '../../Assets/wallpaperflare.com_wallpaper.jpg'
const Cart = () => {


    const { cart, removeFromCart } = useContext(cartContext);

    if (cart.length === 0) {
        return <div className="emptyCart">
            <div className='emptyCartImage'>
                <img src={pic1} alt="" />
            </div>
            <h1> YOUR CART IS EMPTY</h1>
            <Link to="/">
                <button>CONTINUE SHOPPING</button>
            </Link>
        </div>;
    }


    function handleRemove(itemId) {

        removeFromCart(itemId);
    }

    const totalPrice = cart.reduce((total, item) => total + parseInt(item.price), 0);


    return (
        <div className="cartDetails">
            <div className="cart">
                <h1>HERE'S WHAT'S IN YOUR CART</h1>

                {cart.map(item => (
                    <>

                        <div className="cartItems" key={item.id}>
                            <h2>{item.name}</h2>


                            <div className="cartLeft">

                                <img src={item.img} alt="Image" />
                                <div className="cartRight">
                                    <p>Style: Fullsleeves</p>
                                    <p>Size: {item.size}</p>
                                    <p>Quantity: {item.quantity} </p>
                                    <p>Price: {item.price} <del>{item.prevPrice}</del></p>
                                    <button onClick={() => handleRemove(item.id)}>REMOVE</button>
                                </div>
                            </div>

                        </div>
                    </>
                ))}
                <hr />
                <div className='totalPrice'>
                    <p>Total Price: {totalPrice}</p>
                    <Link to ='/buy'>
                        <button>BUY</button>
                    </Link>
                </div>

            </div>
        </div>



    )
}

export default Cart;