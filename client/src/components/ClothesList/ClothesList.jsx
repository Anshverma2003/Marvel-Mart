import { Link } from "react-router-dom";
import './ClothesList.css'

const ClothesList = ({ data }) => {
    return (
        <div className="cards">

            {data.map(cloth => (

                <div className="cloth-preview" key={cloth.id}>

                    <Link to={`/Clothes/${cloth.id}`}>

                        <img src={cloth.img} alt="Image" />
                        <p className="clothName">{cloth.img.slice(16, 38)}....</p>

                        <span className="PriceTag">
                            <p>Rs.{cloth.price} <del>{cloth.prevPrice}</del> </p>
                            <p className="percent">{cloth.offPercent}</p>
                        </span>

                    </Link>

                </div>
            ))}
        </div>
    )
}

export default ClothesList;