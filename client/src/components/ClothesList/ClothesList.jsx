import { Link } from "react-router-dom";
import './ClothesList.css'

const ClothesList = ({ data }) => {
    return (
        <div className="cards">
        
            {data.map(cloth => (

                <div className="cloth-preview" key={cloth.id}>

                    <Link to={`/data/${cloth.id}`}>

                        <img src={cloth.img} alt="Image" />
                        <br />
                        
                        <p>{cloth.price}</p>
                        <p>{cloth.img.slice(16,35)}...</p>

                    </Link>

                </div>
            ))}
        </div>
    )
}

export default ClothesList;