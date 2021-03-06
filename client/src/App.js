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
import History from './pages/user/History'
import UserRoute from './components/routes/UserRoute'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRoute from './components/routes/AdminRoute'



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
  }, [dispatch])
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
        <UserRoute exact path = '/user/history' component={History}/>
        <UserRoute exact path = '/user/password' component={Password}/>
        <UserRoute exact path = '/user/wishlist' component={Wishlist}/>
        <AdminRoute exact path = '/admin/dashboard' component={AdminDashboard}/>
      </Switch>
    </Fragment>
  );
}

export default App;
