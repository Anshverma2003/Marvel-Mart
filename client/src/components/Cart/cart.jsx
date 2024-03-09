import useFetch from "../../Hooks/useFetch";
import './cart.css'

const Cart = () => {

    const currentURL = window.location.href;
    const match = currentURL.match(/\/cart\/(\d+)/);
    const id = match ? match[1] : null;


    const { data, isPending, error } = useFetch('http://localhost:8000/Clothes/' + id);


    return (
        <div className="cart">
            Nothing added in the Cart
        </div>
    )
}

export default Cart;