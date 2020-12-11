import React, { useState, useEffect } from "react";
import { auth } from "../../firebase.js";
import { toast } from "react-toastify";

export const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href)
    // console.log(window.localStorage.getItem('emailForRegistration'))
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if(!email || !password){
      toast.error('Email and Password are required')
      return
    }

    if(password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }



    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log(result);

      if (result.user.emailVerified) {
        // Remove user email from localstorage
        window.localStorage.removeItem("emailForRegistration");
        // Get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // populate user in redux store (later)
        console.log('user', user, 'idTokenResult', idTokenResult)
        // Redirect
        history.push('/')
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control'
        id=''
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <input
        type='password'
        className='form-control'
        id=''
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Enter password'
        autoFocus
      />
      <br />
      <button type='submit' className='btn btn-raised'>
        COMPLETE REGISTRATION{email && "/ " + email.toUpperCase()}
      </button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register Complete</h4>
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
