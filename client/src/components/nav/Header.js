import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Logout
import firebase from "firebase";

export const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));

  const { SubMenu, Item } = Menu;

  const handleClick = (e) => {
    // console.log(e.key)
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Item>

      {!user && (
        <Item key='Register' icon={<UserAddOutlined />} className='float-right'>
          <Link to='/register'>Register</Link>
        </Item>
      )}

      {!user && (
        <Item key='login' icon={<UserOutlined />} className='float-right'>
          <Link to='/login'>Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu key='SubMenu' icon={<SettingOutlined />} 
        title={user.name.split('@')[0]} 
        className="float-right">
          {user && user.role === 'subscriber' &&  <Item><Link to="/user/history">Dashboard</Link></Item>}
          {user && user.role === 'admin' &&  <Item><Link to="/admin/dashboard">Dashboard</Link></Item>}
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
