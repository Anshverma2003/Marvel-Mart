import pic1 from '../../Assets/homeCoverImage.png'
import ClothesList from '../ClothesList/ClothesList.jsx';
import './home.css'
import { useState, useEffect } from 'react';

const Home = () => {

    const [data, setdata] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            try {
                fetch('https://marvel-mart-gb8v.vercel.app/product',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                        throw new Error("Error fetching data from the cart");
                    })
                    .then((data)=>{
                        setdata(data.getAllProduct)
                    })
            }
            catch(error){
                console.log(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="home">
            <div className="coverImage">
                <img src={pic1} alt="cover imgage" />
            </div>
            <div className="content">

                <div className='categoryMenu'>
                    <div className="clothes">
                        <h3>CLOTHING</h3>

                        <div className="clothesDropdown">
                            <li><a href="/clothes">MARVEL T-SHIRTS</a></li>
                            <li><a href="/clothes">MARVEL POLOS</a></li>
                            <li><a href="/clothes">MARVEL FULL SLEEVES</a></li>
                            <li><a href="/clothes">MARVEL SWEATSHIRTS</a></li>
                            <li><a href="/clothes">MARVEL HOODIES</a></li>
                        </div>

                    </div>
                    <div className="accessories">
                        <h3>ACCESSORIES</h3>

                        <div className="accessoriesDropdown">

                            <li><a href="/accessories">MARVEL STICKERS</a></li>
                            <li><a href="/accessories">MARVEL BADGES</a></li>
                            <li><a href="/accessories">MARVEL BACKPACKS </a></li>
                            <li><a href="/accessories">MARVEL BACKPACK SKINS </a></li>
                            <li><a href="/accessories">MARVEL PINS </a></li>
                            <li><a href="/accessories">MARVEL MOBILE COVERS </a></li>
                            <li><a href="/accessories">MARVEL POSTERS </a></li>

                        </div>

                    </div>
                    <div className="comics">
                        <h3>COMICS</h3>

                        <div className="comicsDropdown">

                            <li><a href="/comics">IRONMAN COMICS</a></li>
                            <li><a href="/comics">CIVIL WAR COMICS</a></li>
                            <li><a href="/comics">THOR COMICS</a></li>
                            <li><a href="/comics">BLACK WIDOW COMICS</a></li>
                            <li><a href="/comics">HULK COMICS</a></li>
                            <li><a href="/comics">AGE OF ULTRON COMICS</a></li>
                            <li><a href="/comics">AVENGERS COMICS</a></li>
                            <li><a href="/comics">AGENTS OF SHIELD COMICS</a></li>
                        </div>
                    </div>
                    <div className="viewall">
                        <h3>VIEW ALL</h3>
                    </div>

                </div>

                <div className="storeDisplay">
                    <div className="storeMenu">
                        <div className='storeCategoryMenu'>
                            <div className="leftTag">
                                <h1>MARVEL MERCHANDISE</h1>
                            </div>
                            <div className="rightTag">
                                <button className='men'>MEN</button>
                                <button className='women'>WOMEN</button>
                                <button className="filter">FILTER</button>
                            </div>
                        </div>
                    </div>
                    <div className='StoreCards'>
                        {data && <ClothesList data={data} />}
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Home;