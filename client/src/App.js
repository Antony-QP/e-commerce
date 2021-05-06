import "./index.css";
import { Switch, Route } from "react-router-dom";
import React, { Fragment, useEffect } from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {auth} from './firebase'
import { useDispatch } from 'react-redux'

import SideDrawer from './components/drawer/SideDrawer'
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
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import CreateCouponPage from './pages/admin/coupon/CreateCouponPage'
import SubCreate from './pages/admin/sub/SubCreate'
import SubUpdate from './pages/admin/sub/SubUpdate'
import ProductCreate from './pages/admin/product/ProductCreate'
import ProductUpdate from './pages/admin/product/ProductUpdate'
import AllProducts from './pages/admin/product/AllProducts'
import Product from './pages/Product'
import CategoryHome from './pages/category/CategoryHome'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'


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
      <SideDrawer/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path = '/register/complete' component={RegisterComplete}/>
        <Route exact path = '/forgot/password' component={ForgotPassword}/>
        <UserRoute exact path = '/user/history' component={History}/>
        <UserRoute exact path = '/user/password' component={Password}/>
        <UserRoute exact path = '/user/wishlist' component={Wishlist}/>
        <UserRoute exact path = '/checkout' component={Checkout}/>
        <AdminRoute exact path = '/admin/dashboard' component={AdminDashboard}/>
        <AdminRoute exact path = '/admin/coupon' component={CreateCouponPage}/>
        <AdminRoute exact path = '/admin/category' component={CategoryCreate}/>
        <AdminRoute exact path = '/admin/category/:slug' component={CategoryUpdate}/>
        <AdminRoute exact path = '/admin/sub' component={SubCreate}/>
        <AdminRoute exact path = '/admin/sub/:slug' component={SubUpdate}/>
        <AdminRoute exact path = '/admin/product/' component={ProductCreate}/>
        <AdminRoute exact path = '/admin/products/' component={AllProducts}/>
        <AdminRoute exact path = '/admin/product/:slug' component={ProductUpdate}/>
        <Route exact path='/product/:slug' component={Product} />
        <Route exact path='/category/:slug' component={CategoryHome} />
        <Route exact path='/shop' component={Shop} />
        <Route exact path='/cart' component={Cart} />
      </Switch>
    </Fragment>
  );
}

export default App;
