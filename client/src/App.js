import "./index.css";
import { Switch, Route } from "react-router-dom";
import React, { Fragment, useEffect } from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {auth} from './firebase'
import { useDispatch } from 'react-redux'

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'

import {currentUser} from './actions/auth'



function App() {

  const dispatch = useDispatch()

  // Check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        currentUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              token: idTokenResult.token,
              _id: res.data._id,
            },
          });
        })
        .catch(err => console.log(err));
      }
    })
    return () => {
      unsubscribe();
    }
  }, [])
  return (
    <Fragment>
      <Header />
      <ToastContainer/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path = '/register/complete' component={RegisterComplete}/>
        <Route exact path = '/forgot/password' component={ForgotPassword}/>
      </Switch>
    </Fragment>
  );
}

export default App;
