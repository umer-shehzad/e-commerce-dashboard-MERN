import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () =>{
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    // if user id logged in, it should not visit Login Page
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if (auth){
            navigate('/')
        }
    });

    const handleSubmit = async () =>{
        // check validation
        if ( !password || !email ){
            setError(true);
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)){
            setError(true);
            return false;
        }

        // console.warn(email, password);
        let data = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type':'application/json'
            }
        });
        data = await data.json()
        // console.log(data.result);
        if (data.auth) {
            localStorage.setItem("user", JSON.stringify(data.result));
            localStorage.setItem("token", JSON.stringify(data.auth));
            navigate('/')
        } else {
            alert(data.result);
        }
    }

    return(
        <div className='register'>
            <h2>Login</h2>
            
            <input className='inputStyle' type='text' placeholder='Enter Email' 
            value={email} onChange={ (e)=>setEmail(e.target.value) } />
            { error && (!/\S+@\S+\.\S+/.test(email) || !email )
            && <span className="invalid-error" >Enter valid email</span> }
            
            
            <input className='inputStyle' type='password' placeholder='Enter Password' 
            value={password} onChange={ (e)=>setPassword(e.target.value) } />
            { error && !password && <span className="invalid-error" >Enter valid password</span>}
            
            <button className='appButton' type='button' onClick={handleSubmit}>Login</button>
        </div>
    )
}

export default Login;