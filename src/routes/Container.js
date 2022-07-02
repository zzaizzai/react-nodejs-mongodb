import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchPosts, ClearPosts, FetchLikes } from "./../store.js";
import { AddLikedData, ClearLikedData } from "./../store.js";
import Card from "./Card.js";

function Container() {
  let postIncrease = 3;
  let [postCount, setPostCount] = useState(0);
  let dispatch = useDispatch();
  let state = useSelector((state) => {
    return state;
  });

  //Check liked when it mounted
  useEffect(() => {
    state.likedPosts.forEach((element) => {
      var likedPostIndex = state.posts.findIndex(
        (v) => v._id === element.post_id
      );
      dispatch(FetchLikes(likedPostIndex));
    });
  }, [state.likedPosts]);

  //Check liked when posts updated
  useEffect(() => {
    state.likedPosts.forEach((element) => {
      var likedPostIndex = state.posts.findIndex(
        (v) => v._id === element.post_id
      );
      dispatch(FetchLikes(likedPostIndex));
    });
  }, [state.posts]);

  useEffect(() => {
    if (state.user._id === "0") {
      return;
    }
    axios
      .post("http://localhost:8080/getmylikes", { user: state.user })
      .then((result) => {
        dispatch(ClearLikedData());
        result.data.liked.forEach((element) => {
          dispatch(AddLikedData(element));
          console.log(state.likedPosts);
        });
      });
  }, [state.user._id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getposts/skip=${postCount}`)
      .then((result) => {
        //console.log(result.data);
        dispatch(FetchPosts(result.data));
      });
    return () => {
      dispatch(ClearPosts());
    };
  }, []);

  useEffect(() => {
    if (postCount > 0) {
      axios
        .get(`http://localhost:8080/getposts/skip=${postCount}`)
        .then((result) => {
          //   console.log(result.data);
          dispatch(FetchPosts(result.data));
        });
    }
  }, [postCount]);

  return (
    <div>
      <div className="container-box">
        <Card></Card>
        <button
          className="btn btn-danger"
          onClick={() => {
            setPostCount(postCount + postIncrease);
          }}
        >
          Show More
        </button>
        <div>{postCount}</div>
      </div>
    </div>
  );
}

export default Container;
