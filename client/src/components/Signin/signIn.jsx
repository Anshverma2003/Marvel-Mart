import pic1 from '../../Assets/marvel-logo.png';
import './signIn.css';
import axios from 'axios';
import { useState } from 'react';

const Signin = () => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {

        e.preventDefault();

        // try {
        //     const response = await axios.post('http://localhost:8080/signup', {
        //         firstname,
        //         lastname,
        //         email,
        //         password,
        //     });
        //     if (response.status !== 200)
        //     {
        //         setError(response.data.error);
        //         console.log(error);
        //         throw response.data.error;
        //     }
        //         const result = response.data.token;
        //     console.log(result)
        // }
        // catch (err) {
        //     console.log(err);
        // }
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password,
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="signin">
            <img src={pic1} alt="" />
            <div className='marvelsigninForm'>
                <h1>Create Your Account</h1>
                <p>Marvel is part of The Walt Disney Family of Companies.
                    You'll be able to log into services and experiences using the same email and password.</p>
                <form action="" onSubmit={handleSubmit} method='POST'>
                    <input type="text" name="firstname" id="" placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" name="lastname" id="" placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
                    <input type="email" name="email" id="" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" id="" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" name="create" id="" />
                </form>
            </div>
        </div>
    )
}
export default Signin;
