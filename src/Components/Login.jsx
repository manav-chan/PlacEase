import React, { useState } from 'react';
import './Login.css';
import { auth, provider } from '../firebase'; // Make sure to import "auth" from the correct path

function Login() {
  const login = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const signIn = () => {
   auth.signInWithPopup(provider).catch((err) => {
      alert(err);
    });
    console.log(auth);
  };

  const signUp = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          console.log(auth);
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='Login'>
      <div className="login-box">
        <h2>Sign In To PlacEase</h2>
        <form>
          <div className="user-box">
            <label className="label_email" htmlFor="username">Email Address</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // placeholder="Email"
              id="username"
            />
          </div>
          <div className="user-box">
          <label className="label_pass" htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // placeholder="Password"
              id="password"
            />
          </div>
          <button type='submit' onClick={login}>Login</button>
          <button onClick={signUp}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
