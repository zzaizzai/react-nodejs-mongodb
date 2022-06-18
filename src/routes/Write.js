/* eslint-disable*/
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UploadPost } from "./../store.js";
import axios from "axios";

function Write() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [content, setContent] = useState("");


  return (
    <div>
      <div className="container mt-5">
        <textarea
          className="write-content p-3"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <p>{content.length}</p>
      <button
        className="btn btn-success"
        onClick={() => {
          if (content.length > 0) {
            dispatch(UploadPost(content));
            navigate("/");
          }
        }}
      >
        upload
      </button>
    </div>
  );
}

export default Write;
