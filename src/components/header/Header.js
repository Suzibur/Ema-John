import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from  '../../images/logo.png';
import './Header.css'

const Header = () => {
    const [loginUser, setLoginUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage">Manage Inventory Here</Link>
                <button onClick={() => setLoginUser('')} style={{padding:'10px'}}>Sign out</button>
            </nav>
        </div>
    );
};

export default Header;