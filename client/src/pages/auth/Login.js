import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase.js";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type : "LOGGED_IN_USER",
            payload : {
              email : res.data.email,
              name : res.data.name
            }
          })
        })
        .catch();

      history.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const user = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => console.log(res))
          .catch();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          id=''
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder='Please enter your email address to register'
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          id=''
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Please enter your password'
        />
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        type='primary'
        block
        shape='round'
        icon={<MailOutlined />}
        size='large'
        disabled={!email || password.length < 6}>
        Login with email/password
      </Button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading ? <h4 className='text-danger'>Loading</h4> : <h4>Login</h4>}
          {LoginForm()}

          {/* Login with google */}

          <Button
            onClick={googleLogin}
            className='mb-3'
            type='danger'
            block
            shape='round'
            icon={<GoogleOutlined />}
            size='large'>
            Login with Google
          </Button>

          <Link to='/forgot/password' className='float-right text-danger'>
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
