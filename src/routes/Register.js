import { useState } from "react";
import axios from "axios";

function Register() {
  let [id, setId] = useState("test");
  let [password, setPassword] = useState("password");
  let [passwordCheck, setPasswordCheck] = useState("password");
  let [name, setName] = useState("");
  let [content, setContent] = useState("");

  function CheckAccountAndCreateNewOne() {
    let newUser = {
      name: name,
      id: id,
      pw: password,
      content: content,
      profileUrl: "",
    };
    console.log(newUser);
    axios
      .post("http://localhost:8080/register", { newUser: newUser })
      .then((result) => {
        console.log(result.data);
      });
  }

  return (
    <div>
      <div className="mt-5">
        <div className="d-flex flex-column align-items-center bd-highlight">
          <input
            className="my-2 p-1"
            type="text"
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="my-2 p-1"
            type="text"
            placeholder="id"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
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
          <input
            className="my-2 p-1"
            type="password"
            placeholder="Password"
            value={passwordCheck}
            onChange={(e) => {
              setPasswordCheck(e.target.value);
            }}
          />
          <textarea
            className="my-2"
            name=""
            id=""
            cols="22"
            rows="3"
            placeholder="content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <button
            onClick={() => {
              CheckAccountAndCreateNewOne();
            }}
            className="my-2  btn btn-primary"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
