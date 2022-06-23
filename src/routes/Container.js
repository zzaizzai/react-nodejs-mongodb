import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FetchPosts, ClearPosts } from "./../store.js";
import Card from "./Card.js";

function Container() {
  let postIncrease = 3;
  let [postCount, setPostCount] = useState(0);
  let dispatch = useDispatch();
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
        <button className="btn btn-danger"
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
