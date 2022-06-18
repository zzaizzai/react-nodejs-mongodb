import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LogIn } from "./../store.js";

function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [ID, setID] = useState("test");
  let [password, setPassword] = useState("password");

  return (
    <div>
      <div className="mt-5">
        <div className="d-flex flex-column align-items-center bd-highlight">
          <input
            className="my-2 p-1"
            type="text"
            placeholder="ID"
            value={ID}
            onChange=
            {(e) => {
                setID(e.target.value);
              }}
          />
          <input
            className="my-2 p-1"
            type="password"
            placeholder="Password"
            value={password}
            onChange=
            {(e) => {
                setPassword(e.target.value);
              }}
          />
          <button
            onClick={() => {
              let user = {
                password: password,
                ID: ID,
              };
              dispatch(LogIn(user));
              navigate("/");
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
