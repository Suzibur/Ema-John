import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { loginInitialize, handleGoogleSignIn, handleGoogleSignOut, handleFacebookSignIn, createNewUser, signInWithEmailPass } from './LoginManager';

  
function Login() {
    loginInitialize();

    const [newUser, setNewUser] = useState(false);
    const [loginUser, setLoginUser] = useContext(UserContext)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        pass: '',
        photo: '',
        message: '',
        success: false
    })
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }
    const googleSignOut = () => {
        handleGoogleSignOut()
        .then(res => {
            handleResponse(res, false);
        })
    }
    const facebookSignIn = () => {
        handleFacebookSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }
    

    const inputStyle = {
        padding: '10px',
        margin: '5px 5px',
        outline: 'none'
    }
    const handleBlur = (e) => {
        let isValid = true;
        if (e.target.name === 'email') {
            isValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'pass') {
            const isLengthRequired = e.target.value.length > 5;
            const isCharRequired = /\d{1}/.test(e.target.value);
            isValid = isLengthRequired && isCharRequired;
        }
        if (isValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.pass) {
           createNewUser(user.name, user.email, user.pass)
           .then(res => {
               handleResponse(res, true);
           })
        }
        if (!newUser && user.email && user.pass) {
            signInWithEmailPass(user.email, user.pass)
            .then(res => {
                handleResponse(res, true);
            })
        }
        e.preventDefault();
    }
    const handleResponse = (res, redirect) => {
        if (redirect === true){
            setUser(res);
            setLoginUser(res);
            history.replace(from);
        }
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <header className="App-header">
                <h1>Account authentication</h1>
                <form onSubmit={handleSubmit}>
                    {
                        newUser && <input style={inputStyle} onBlur={handleBlur} type="text" name="name" id="" required placeholder="Username" />
                    }
                    <br />
                    <input style={inputStyle} onBlur={handleBlur} type="email" name="email" id="" required placeholder="name@gmail.com" />
                    <br />
                    <input style={inputStyle} onBlur={handleBlur} type="password" name="pass" id="" required placeholder="password" />
                    <br />
                    <div>
                        <input onChange={() => setNewUser(!newUser)} type="checkbox" name="switchForm" id="SwitchForm" />
                        <label htmlFor="switchForm" >Create Account</label>
                    </div>
                    {
                        newUser ? <input style={inputStyle} type="submit" value="Sign up" /> :
                            <input style={inputStyle} type="submit" value="Log in" />
                    }
                    {
                        user.isSignedIn ? <button onClick={googleSignOut} style={inputStyle}>Log out+</button> :
                            <button onClick={googleSignIn} style={inputStyle}>Google+</button>
                    }
                    <button onClick={facebookSignIn}>Facebook+</button>
                </form>
                <p style={{ color: 'red' }}>{user.message}</p>
                {user.success && <p style={{ color: 'green' }}>Account {newUser ? 'created' : 'log in'} successfully.</p>}
            </header>
        </div>
    );
}

export default Login;
