import { Link } from "react-router-dom/cjs/react-router-dom.min";
import pic1 from '../../Assets/marvelLogo.png';
import pic2 from '../../Assets/search.png';
import pic3 from '../../Assets/cart.png';
import './navbar.css';
import { useState, useEffect } from "react";

const Navbar = () => {
    const [token, setToken] = useState(() => localStorage.getItem("Token") || '');

    function handleLogOut() {
        setToken('');
        localStorage.removeItem("Token");
    }

    // useEffect(() => {
    //     if (localStorage.getItem("Token")) {
    //         setToken(localStorage.getItem("Token"));
    //     }
    // }, [token]);

    return (
        <nav className="navbar">
            <div className="left">
                {!localStorage.getItem("Token") && (
                    <div className="LSbtn">
                        <Link to="login">LOG IN</Link>
                        <div className="vertical"></div>
                        <Link to="signup"> JOIN</Link>
                    </div>
                )}

                {localStorage.getItem("Token") && (
                    <div className="LSbtn">
                        <Link to="/" onClick={handleLogOut}>
                            LOG OUT
                        </Link>
                    </div>
                )}

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
    );
};

export default Navbar;
