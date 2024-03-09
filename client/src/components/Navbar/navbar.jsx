import { Link } from "react-router-dom/cjs/react-router-dom.min";
import pic1 from '../../Assets/marvelLogo.png'
import pic2 from '../../Assets/search.png'
import pic3 from '../../Assets/cart.png'
import './navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar">

            <div className="left">
                <div className="LSbtn">
                    <Link to="login">LOG IN</Link>
                    <div className="vertical"></div>
                    <Link to="signup"> JOIN</Link>
                </div>
                <div className="marvellogo">
                    <a href="/">
                        <img src={pic1} alt="logo" />
                    </a>
                </div>
            </div>

            <div className="right">
                <div className="searchBar">
                    <label htmlFor="search">
                        <img src={pic2} alt="" />
                        <input type="text" id="search" placeholder="Search" />
                    </label>
                </div>
                <div className="cartBtn">
                    <Link to="/cart">
                        <img src={pic3} alt="cart" />
                    </Link>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;
