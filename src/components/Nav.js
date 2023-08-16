import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <div>
            <img className='logo' src='/images/logo.jpg' alt='#logo' />
            <span className='brandName'>E-Commerce Dashboard</span>
            {  auth ? <ul className='nav-ul'>
                <li><Link to='/' >Products</Link></li>
                <li><Link to='/add' >Add Products</Link></li>
                <li><Link to='/update' >Update Products</Link></li>
                {/* <li><Link to='/profile' >Profie</Link></li> */}
                <li><Link to='/login' onClick={logout} >
                    Logout ( Signed in as : { JSON.parse(auth).name } )</Link></li>
            </ul>
            : <ul className='nav-ul'>
                <li><Link to='/signup' >Signup</Link></li>
                <li><Link to='/login' >Login</Link></li>
            </ul>
            }
        </div >
    )
}

export default Nav;