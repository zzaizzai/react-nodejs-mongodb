/* eslint-disable*/
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UploadPost } from "./../store.js";

function Write() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [content, setContent] = useState("");

  return (
    <div>
      <div>Write</div>
      <div>
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <button
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
