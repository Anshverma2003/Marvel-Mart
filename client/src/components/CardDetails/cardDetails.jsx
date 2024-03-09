import { cartContext } from "../../Context/context";
import useFetch from "../../Hooks/useFetch";
import "./cardDetails.css";
import pic1 from '../../Assets/return-eligibility-valid.webp'
import { useContext } from "react";

function CardDetails() {

    const currentURL = window.location.href;
    const match = currentURL.match(/\/Clothes\/(\d+)/);
    const id = match ? match[1] : null;

    const { data, isPending, error } = useFetch('http://localhost:8000/Clothes/' + id);

    const { addToCart } = useContext(cartContext);

    function handelAddToCart() {
        addToCart(data);
    }


    return (
        <div className="cardDetails">
            {isPending && <div>Loading....</div>}
            {error && <div>{error}</div>}
            {data && (
                <>
                    <h2>{data.name}</h2>
                    <hr />
                    <div className="details">

                        <div className="leftDetail">
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
                                <select name="Size" id="size">
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
                                <select name="Size" id="size">
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
                </>
            )}
        </div>
    )
}

export default CardDetails;