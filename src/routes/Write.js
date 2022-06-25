/* eslint-disable*/
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UploadPost } from "./../store.js";
import axios from "axios";

function Write() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let state = useSelector((state) => state);

  let [content, setContent] = useState("");
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData == null) {
      navigate("/login");
    }
  });

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
          NewPost();
        }}
      >
        upload
      </button>
    </div>
  );
  function NewPost() {
    if (content.length > 0) {
     
      let newPost = {
        authorName: state.user.displayName,
        authorID: state.user.id,
        author_id: state.user._id,
        authoProfileUrl: "https://placeimg.com/640/480/tech",
        content: content,
        contentImageUrl: "none",
      };
      axios
        .post("http://localhost:8080/addpost", { post: newPost })
        .then((result) => {
        //   console.log(result.data.newPost);
        //   dispatch(UploadPost(result.data.newPost));
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}

export default Write;
