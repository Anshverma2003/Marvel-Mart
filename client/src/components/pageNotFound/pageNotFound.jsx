import { useState, useEffect } from 'react';
import pic1 from '../../Assets/captain-marvel-char.c7a46c65.jpg';
import gif from '../../Assets/deadpool-char.2aea1ef9.gif';
import pic2 from '../../Assets/iron-man-char.9c97fc02.png';
import pic3 from '../../Assets/mjolnir-char.a573d738.jpg';
import pic4 from '../../Assets/captain-america-char.3e42c62f.png';
import './pageNotFound.css'

const PageNotFound = () => {
    const images = [pic1, gif, pic2, pic3, pic4];

    const [pic1Content, setPic1Content] = useState(false);
    const [pic2Content, setPic2Content] = useState(false);
    const [pic3Content, setPic3Content] = useState(false);
    const [pic4Content, setPic4Content] = useState(false);
    const [pic5Content, setPic5Content] = useState(false);
    

    useEffect(() => {
        const getRandom = () => {
            const i = Math.floor(Math.random() * images.length);
            const result = images[i];
            setPic1Content(result === pic1);
            setPic2Content(result === pic2);
            setPic3Content(result === pic3);
            setPic4Content(result === gif);
            setPic5Content(result === pic4);
        };

        getRandom();
    }, []);

    return (
        <div className="page404">

            {pic1Content && (
                <div className='pic2'>
                    <div className='p2'>
                        <div className="pic2leftCard">
                            <h1>404 PAGE NOT FOUND</h1>
                            <h2>Hydra has stolen this page from S.H.I.E.L.D. database!</h2>
                            <p>Check that you typed the address correctly, go back to your previous <br />page or try using our site search to find something specific.</p>
                        </div>
                    </div>
                    <div className='pic2rightCard'>
                        {pic1Content && <img src={pic1} alt="Random Image" />}

                    </div>

                </div>
            )}
            {pic2Content && (
                <div className='pic2'>
                    <div className='p2'>
                        <div className="pic2leftCard">
                            <h1>404 PAGE NOT FOUND</h1>
                            <h2>Protocol missing... Exiting program...</h2>
                            <p>Check that you typed the address correctly, go back to your previous <br />page or try using our site search to find something specific.</p>
                        </div>
                    </div>
                    <div className='pic2rightCard'>
                        {pic2Content && <img src={pic2} alt="Random Image" />}
                    </div>
                </div>

            )}
            {pic3Content && (

                <div className='pic2'>

                    <div className="p2">
                        <div className="pic2leftCard">
                            <h1>404 PAGE NOT FOUND</h1>
                            <h2>You are not Worthy...</h2>
                            <p>Check that you typed the address correctly, go back to your previous <br />page or try using our site search to find something specific.</p>
                        </div>
                    </div>

                    <div className='pic2rightCard'>
                        {pic3Content && <img src={pic3} alt="Random Image" />}

                    </div>

                </div>
            )}
            {pic4Content && (

                <div className="pic2">
                    <div className="p2">
                        <div className="pic2leftCard">
                            <h1>404 PAGE NOT FOUND</h1>
                            <h2>%#&%, You broke something! Just kidding...</h2>
                            <p>Check that you typed the address correctly, go back to your previous <br />page or try using our site search to find something specific.</p>
                        </div>
                    </div>
                    <div className="pic2rightCard">
                        {pic4Content && <img src={gif} alt="Random Image" />}

                    </div>
                </div>
            )}
            {pic5Content && (
                <div className="pic2">
                    <div className='p2'>
                        <div className="pic2leftCard">
                            <h1>404 PAGE NOT FOUND</h1>
                            <h2>Hydra is currently Attacking this page</h2>
                            <p>Check that you typed the address correctly, go back to your previous <br />page or try using our site search to find something specific.</p>
                        </div>
                    </div>
                    <div className="pic2rightCard">
                        {pic5Content && <img src={pic4}alt="Random Image" />}

                    </div>
                </div>
            )

            }
        </div>
    );
};

export default PageNotFound;
