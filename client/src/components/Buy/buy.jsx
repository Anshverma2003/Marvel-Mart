import React, { useState } from 'react';
import './buy.css';

const Buy = () => {
    const token = localStorage.getItem('Token');

    const [showModal, setShowModal] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [mobile_no, setMobile_no] = useState('');
    const [addressData, setaddressData] = useState([]);

    function handleClick() {
        setShowModal(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:8080/address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                address,
                city,
                state,
                pincode,
                mobile_no
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Can not save address");
            })
            .then((data) => {
                
                setShowModal(false);
                setShowAddress(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="buy">
            <div className='addressModal'>
                <div className="address">
                    <h4>ADDRESS DETAILS</h4>
                </div>
                <div className='addAddress'>
                    <h2>CHOOSE YOUR DELIVERY ADDRESS:</h2>
                </div>
                <div className='addressList'>
                    <div className='addressDetails'>
                        <button className='plus' onClick={handleClick}>➕</button>
                    </div>
                </div>

            </div>

            {showModal && (
                <div className="Buymodal">
                    <div className="modalContent">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>NEW ADDRESS</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputGroup">
                                <input type="text" placeholder='First Name' onChange={(e) => setAddress(e.target.value)} required />
                                <input type="text" placeholder='Last Name' onChange={(e) => setCity(e.target.value)} required />
                            </div>
                            <input type="text" placeholder='Address' onChange={(e) => setAddress(e.target.value)} required />
                            <div className="inputGroup">
                                <input type="text" placeholder='City' onChange={(e) => setCity(e.target.value)} required />
                                <input type="text" placeholder='State' onChange={(e) => setState(e.target.value)} required />
                            </div>
                            <div className="inputGroup">
                                <input type="text" placeholder='Postal Code' onChange={(e) => setPincode(e.target.value)} required />
                                <input type="text" placeholder='Mobile Number' onChange={(e) => setMobile_no(e.target.value)} required />
                            </div>
                            <button type="submit">Continue</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Buy;
