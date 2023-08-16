import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    // if user id logged in, it should not visit Signup Page
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if (auth){
            navigate('/')
        }
    });

    const handleSubmit = async () => {
        // check validation
        if (!name || !password || !email){
            setError(true);
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email) || !isNaN(Number(name))){
            setError(true);
            return false;
        }

        // console.warn(name, email, password);
        let data = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        data = await data.json()
        console.log(data.result);
        if (data.result === 'User Register Successfully') {
            navigate('/login')
        }
    }

    return (
        <div className='register'>
            <h2>Register</h2>
            <input className='inputStyle' type='text' placeholder='Enter Name'
                value={name} onChange={(e) => setName(e.target.value)} />
            { error && (!name || !isNaN(Number(name)) ) && 
            <span className="invalid-error" > Enter valid name</span> }

            <input className='inputStyle' type='text' placeholder='Enter Email'
                value={email} onChange={(e) => setEmail(e.target.value)} />
            { error && ( !/\S+@\S+\.\S+/.test(email) || !email ) 
            && <span className="invalid-error" > Enter valid email</span> }

            <input className='inputStyle' type='password' placeholder='Enter Password'
                value={password} onChange={(e) => setPassword(e.target.value)} />
            { error && !password && 
            <span className="invalid-error" >Enter valid password</span> }

            <button className='appButton' type='button' onClick={handleSubmit}>Sign Up</button>
        </div>
    )
}

export default Register;