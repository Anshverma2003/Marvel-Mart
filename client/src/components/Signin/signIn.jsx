import pic1 from '../../Assets/marvel-logo.png';
import './signIn.css';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const Signin = () => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useHistory();

    async function handleSubmit(e) {

        e.preventDefault();

        fetch('https://marvel-mart-gb8v.vercel.app/signup', {
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
                if (data.error) {
                    throw new Error(data.error);
                }
                localStorage.setItem("Token", data.token);
                setError('');
                navigate.push('/');
            })
            .catch((err) => {
                setError(err.message);
                console.log(err);
            })
    }

    return (
        <div className="signin">
            <div className='marvelsigninForm'>
                <h1>Create Your Account</h1>
                <p>Marvel is part of The Walt Disney Family of Companies.
                    You'll be able to log into services and experiences using the same email and password.</p>
                <form action="" onSubmit={handleSubmit} method='POST'>
                    <input type="text" name="firstname" id="1" placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} required autoComplete='off' />
                    <input type="text" name="lastname" id="2" placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} required autoComplete='off' />
                    <input type="email" name="email" id="3" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required autoComplete='off' />
                    <input type="password" name="password" id="4" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required autoComplete='off' />
                    <input type="submit" name="create" id="5" />
                </form>
                {error && <div className="error">
                    <p>{error}</p>
                </div>}
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    )
}
export default Signin;
