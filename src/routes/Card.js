import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LikeThisPost, ChangeLikedDatainStore } from "./../store.js";

function Card() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <div>
      {state.posts.map((item, i) => (
        <div key={i} className="card-box my-3">
          <div className="d-flex flex-row align-items-center bd-highlight">
            <img
              src={item.authoProfileUrl}
              className="post-proifle mx-2 cursur"
              alt="profile"
              onError={(e) => (e.target.src = "/images/profile.svg")}
              onClick={() => {
                navigate(`/profile/${item.authorID}`);
              }}
            />
            <h5
              className="p-3 cursur"
              onClick={() => {
                navigate(`/profile/${item.authorID}`);
              }}
            >
              {item.authorName} ({item.authorID}){" "}
            </h5>
          </div>
          <div>{item.content}</div>
          <div>{item.date}</div>
          <div className="d-flex">
            <div className="post-chat mx-2 pointer"></div>
            {item.liked === true ? (
              <div
                className="post-likes liked mx-2 pointer"
                onClick={() => {
                  if (state.login.isLoggedin === false) {
                    console.log("please login");
                    return;
                  }
                  ChangeLikedData(item);
                  dispatch(LikeThisPost(i));
                  axios
                    .post("http://localhost:8080/likethispost", {
                      post: item,
                      user: state.user,
                    })
                    .then((result) => {
                      console.log(result.data);
                    });
                }}
              />
            ) : (
              <div
                className="post-likes mx-2 pointer"
                onClick={() => {
                  if (state.login.isLoggedin === false) {
                    console.log("please login");
                    return;
                  }
                  ChangeLikedData(item);
                  dispatch(LikeThisPost(i));
                  axios
                    .post("http://localhost:8080/likethispost", {
                      post: item,
                      user: state.user,
                    })
                    .then((result) => {
                      console.log(result.data);
                    });
                }}
              />
            )}
            {item.likes}
          </div>
        </div>
      ))}
    </div>
  );
  function ChangeLikedData(item) {
    console.log(item);
    console.log(state.likedPosts);
    let targetIndex = state.likedPosts.findIndex((v) => v.post_id === item._id);
    console.log(targetIndex);
    dispatch(ChangeLikedDatainStore(targetIndex));
  }
}

export default Card;
