import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LikeThisPost } from "./../store.js";

function Card() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let navigate = useNavigate();


  return (
    <div>ß
      {state.posts.map((item, i) => (
        <div key={i} className="card-box my-3">
          <div className="d-flex flex-row align-items-center bd-highlight">
            <img src={item.authoProfileUrl} className="post-proifle mx-2" alt="profile" />
            <h5 className="p-3" onClick={() => {
              navigate(`/profile/${item.authorID}`);
            }}>
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
                  dispatch(LikeThisPost(i));
                }}
              />
            ) : (
              <div
                className="post-likes mx-2 pointer"
                onClick={() => {
                  dispatch(LikeThisPost(i));
                }}
              />
            )}
            {item.likes}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
