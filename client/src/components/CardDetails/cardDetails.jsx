import { cartContext } from "../../Context/context";
import { Link } from 'react-router-dom'
import useFetch from "../../Hooks/useFetch";
import "./cardDetails.css";
import pic1 from '../../Assets/return-eligibility-valid.webp'
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function CardDetails() {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDataById = async () => {
            try {
                
                const currentURL = window.location.href;
                const match = currentURL.match(/\/productID\/(\d+)/);
                const id = match ? match[1] : null;

                const response = await axios.get(`http://localhost:8080/productID/${id}`);

                setData(response.data.getProductById);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataById();
    }, []);

    const { addToCart } = useContext(cartContext);
    const [modal, setModal] = useState(false);


    const [input, setInput] = useState({
        "Size": "S",
        "Quantity": "1"
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setInput({
            ...input,
            [name]: value
        })
    }

    function handelAddToCart() {
        addToCart(data, input.Size, input.Quantity);
        setModal(true);
    }


    return (
        <div className="cardDetails">
            {/* {isPending && <div>Loading....</div>}
            {error && <div>{error}</div>} */}
            {data && (
                <>
                    <h2>{data.name}</h2>
                    <hr />
                    <div className="details">

                        <div className="leftDetail" >
                            <img src={data.img} alt="" />
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

                            <h2>Rs. {data.price}.00 <del className="del">Rs. {data.prevPrice}</del> <span>{data.offPercent}</span> </h2>
                            <div className="selectSize">
                                <span>CLICK TO SELECT SIZE:</span>
                                <select name="Size" id="size" onChange={handleChange}>
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
                                <select name="Quantity" id="size" onChange={handleChange}>
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
                                <div className="closeBtn"><button onClick={() => setModal(false)}>X</button></div>
                                <h2>Item Added to Cart!</h2>
                                <img src={data.img} alt="" />
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
    )
}

export default CardDetails;
