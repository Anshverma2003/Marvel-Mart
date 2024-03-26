import './login.css'
import pic1 from '../../Assets/marvel-logo.png';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useHistory();


    async function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            if(data.error){
                throw new Error(data.error) ;
            }
            localStorage.setItem("Token" , data.token);
            setError('');
            navigate.push('/');
        })
        .catch((err)=>{
            setError(err.message);
        })
    }

    return (
        <div className="login">
            <img src={pic1} alt="" />
            <div className='marvelloginForm'>
                <h1>Good news, you already have an account</h1>
                <p>Since you’ve already used your email to sign up for one or more services within
                    The Walt Disney Family of Companies, you can now log into Marvel using <strong>Email</strong></p>
                <form action="" onSubmit={handleSubmit} method='POST'>

                    <input type="email" name="email" id="3" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required autoComplete='off' />
                    <input type="password" name="password" id="4" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required autoComplete='off' />
                    <input type="submit" name="create" id="5" />
                </form>
                {error && <div className="error">
                    <p>{error}</p>
                </div>}
                <p>New to Marvel-Mart? <a href="/signup">Join</a></p>
            </div>
        </div>
    )
}

export default Login;