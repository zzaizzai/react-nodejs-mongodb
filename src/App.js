/* eslint-disable*/

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "./routes/Container.js";
import Write from "./routes/Write.js";
import Chat from "./routes/Chat.js";
import Login from "./routes/Login.js";
import Register from "./routes/Register.js";
import Profile from "./routes/Profile.js";
import { useEffect, useState } from "react";

import { isLoggedinFalse, SetUserData, isLoggedinTrue } from "./store.js";

function App() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData !== null) {
      dispatch(SetUserData(userData.user));
      dispatch(isLoggedinTrue());
    }
  });

  function GetData() {
    axios.get("http://localhost:8080/add").then((result) => {
      console.log(result.data);
    });
  }

  let state = useSelector((state) => {
    return state;
  });
  // console.log(a.user)

  return (
    <div className="App">
      <ul className="nav justify-content-center">
        <li className="nav-item" style={{ flexGrow: 2 }}></li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Reactagram
          </Link>
        </li>
        <li className="nav-item" style={{ flexGrow: 1 }}></li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/write">
            Write
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/chat">
            Chat
          </Link>
        </li>
        {state.login.isLoggedin === true ? (
          <ProfileDropdown />
        ) : (
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        )}

        <li className="nav-item" style={{ flexGrow: 2 }}></li>
      </ul>

      <Routes>
        <Route path="/" element={<Container></Container>} />
        <Route path="/write" element={<Write></Write>} />
        <Route path="/chat" element={<Chat></Chat>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/profile/:id" element={<Profile></Profile>} />
        <Route
          path="*"
          element={
            <div>
              <img src="/images/404.jpg" className="image404 mt-5" />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

function ProfileDropdown() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let state = useSelector((state) => {
    return state;
  });
  return (
    <div>
      <NavDropdown title="User" id="basic-nav-dropdown">
        <NavDropdown.Item
          onClick={() => {
            navigate(`/profile/${state.user.ID}`);
          }}
        >
          My Profile
        </NavDropdown.Item>
        <NavDropdown.Item>
          <div className="d-flex align-items-center">
            <img
              className="nav-profile-icon "
              src="/images/setting.svg"
              alt="icon"
            />
            Edit Profile
          </div>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          onClick={() => {
            ProfileLogout();
          }}
        >
          Log Out
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );

  function ProfileLogout() {
    dispatch(isLoggedinFalse());
    sessionStorage.removeItem("user");
    navigate("/");
  }
}

export default App;
