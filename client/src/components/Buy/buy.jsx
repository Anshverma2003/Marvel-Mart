import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pic1 from '../../Assets/delete.png'
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


    useEffect(() => {
        fetch('http://localhost:8080/getAddress', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                if (Array.isArray(data.response)) {
                    setaddressData(data.response);
                }
            })
            .catch((error) => {
                console.error('Error fetching address data:', error);
            });
    }, [showModal]);

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

    function handleDelete(pincode) {
        try {
            fetch('http://localhost:8080/removeaddress', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    pincode
                })
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Can not remove address");
                    }
                    setaddressData(prevAddress => prevAddress.filter(add => add.pincode !== pincode));
                });
        } catch (error) {
            console.log(error);

        }
    }

    return (
        token &&
        (<div className="buy">
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
                        {addressData.map((addr, index) => (
                            <div>
                                <div key={index} className="addressItem">
                                    <button className='delete' onClick={()=>handleDelete(addr.pincode)}><img src={pic1} alt="" /></button>
                                    <p> <strong>Address: </strong>{addr.address}</p>
                                    <p> <strong>City:</strong> {addr.city}</p>
                                    <p> <strong>State:</strong> {addr.state}</p>
                                    <p><strong>Mobile No:</strong> {addr.mobile_no}</p>
                                    <p> <strong>Postal Code:</strong> {addr.pincode}</p>
                                    <Link to='/payment' className="continue">CONTINUE</Link>
                                </div>
                            </div>
                        ))}
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
        </div>)
    );
};

export default Buy;
