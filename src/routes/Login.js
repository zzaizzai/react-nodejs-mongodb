import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isLoggedinTrue, SetUserData } from "./../store.js";
import axios from "axios";

function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [inputId, setinputId] = useState("test");
  let [password, setPassword] = useState("password");

  function LoginAccount() {
    let id = inputId;
    let pw = password;

    axios.post("http://localhost:8080/login", { id, pw }).then((result) => {
      //   console.log(result.data.user);
      dispatch(isLoggedinTrue());
      dispatch(SetUserData(result.data.user));
      sessionStorage.setItem("user", JSON.stringify(result.data));
      console.log("logged in");
      navigate("/");
    });
  }

  return (
    <div>
      <div className="mt-5">
        <div className="d-flex flex-column align-items-center bd-highlight">
          <input
            className="my-2 p-1"
            type="text"
            placeholder="ID"
            value={inputId}
            onChange={(e) => {
              setinputId(e.target.value);
            }}
          />
          <input
            className="my-2 p-1"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            onClick={() => {
              LoginAccount();
            }}
            className="my-2  btn btn-primary"
          >
            login
          </button>
          <button className="my-2  btn btn-danger">log out</button>
          <Link className="nav-link" to="/register">
            Join us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
