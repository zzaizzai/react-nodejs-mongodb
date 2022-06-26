import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchPosts, ClearPosts, FetchLikes } from "./../store.js";
import Card from "./Card.js";

function Container() {
  let postIncrease = 3;
  let [postCount, setPostCount] = useState(0);
  let dispatch = useDispatch();
  let state = useSelector((state) => {
    return state;
  });

  let [likedPosts, setLikedPosts] = useState([
    // {
    //   _id: "000",
    //   post_id: "000",
    //   userId: "test",
    //   userName: "james",
    //   user_id: "62adff5b980565d6cad0b954",
    //   _id: "62b79e75cae1f599c0ad2eb6",
    // },
  ]);

  //Check liked when it mounted
  useEffect(() => {
    likedPosts.forEach((element) => {
      var likedPostIndex = state.posts.findIndex(
        (v) => v._id === element.post_id
      );
      dispatch(FetchLikes(likedPostIndex));
    });
  }, [likedPosts]);

  //Check liked when posts updated
  useEffect(() => {
    likedPosts.forEach((element) => {
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
        let newLikedPosts = [...likedPosts];
        result.data.liked.forEach((element) => {
          // console.log(element)
          newLikedPosts.push(element);
          setLikedPosts(newLikedPosts);
        });
        console.log("dd");
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
