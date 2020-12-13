import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from './LoadingToRedirect'
import { currentAdmin} from '../../actions/auth'

const AdminRoute = ({ children, ...rest }) => {

  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false)

  useEffect(() => {
    if(user && user.token){
      currentAdmin(user.token)
      .then(res => {
        console.log("Current admin response:", res)
        setOk(true)
      })
      .catch(err => {
        console.log("Admin route error:", err)
        setOk(false);
      })
    }
  }, [user])

  return ok ? (
    <Route {...rest} />
  ) : (
    <LoadingToRedirect/>
  );
};

export default AdminRoute;
