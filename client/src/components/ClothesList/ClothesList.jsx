import { Link } from "react-router-dom";
import './ClothesList.css'

const ClothesList = ({ data }) => {

    const isLogggedIn = localStorage.getItem('Token');

    return (
        <div className="cards">

            {data.map(cloth => (

                <div className="cloth-preview" key={cloth.product_id}>

                    {isLogggedIn ? (
                        <Link to={`/productID/${cloth.product_id}`}>

                            <img src={cloth.image} alt="Image" />
                            <p className="clothName"> {cloth.name.slice(0, 25)}...</p>

                            <span className="PriceTag">
                                <p>Rs.{cloth.price} <del>{cloth.prevprice}</del> </p>
                                <p className="percent">{cloth.offpercent}%off</p>
                            </span>

                        </Link>
                    ) : (
                        <Link to = '/login'>

                            <img src={cloth.image} alt="Image" />
                            <p className="clothName"> {cloth.name.slice(0, 25)}...</p>

                            <span className="PriceTag">
                                <p>Rs.{cloth.price} <del>{cloth.prevprice}</del> </p>
                                <p className="percent">{cloth.offpercent}%off</p>
                            </span>

                        </Link>
                    )}


                </div>
            ))}
        </div>
    )
}

export default ClothesList;