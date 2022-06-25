import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetUserData } from "./../store.js";
import { useNavigate } from "react-router-dom";

function Profile() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let state = useSelector((state) => {
    return state;
  });

  let [newName, setNewName] = useState("");
  let [newProfileUrl, setNewProfileUrl] = useState("");
  let [newContent, setNewContent] = useState("");
  let [displayImageChoice, setDisplayImageChoice] = useState(true);

  useEffect(() => {
    setNewName(state.user.displayName);
    setNewProfileUrl(state.user.profileUrl);
    setNewContent(state.user.content);
    return () => {
      setNewName("");
      setNewProfileUrl("");
      setNewContent("");
    };
  }, [state.user]);

  return (
    <div>
      <div className="container">
        <div className="d-inline-flex flex-column mt-5">
          <input
            className="edit-size p-1 m-2"
            type="text"
            name=""
            id=""
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
          <input
            className="edit-size p-1 m-2"
            type="text"
            name=""
            id=""
            value={newProfileUrl}
            onChange={(e) => {
              setNewProfileUrl(e.target.value);
            }}
          />
          <textarea
            className="edit-size p-1 m-2"
            type="text"
            name=""
            id=""
            value={newContent}
            onChange={(e) => {
              setNewContent(e.target.value);
            }}
          />
          <button
            className="edit-size btn btn-danger m-2"
            onClick={ChangeProfile}
          >
            send
          </button>
          {/* <ChoiceImage></ChoiceImage> */}
        </div>
      </div>
    </div>
  );

  function ChoiceImage() {
    return (
      <div className="container">
        <div className="d-inline-flex justify-content-cente flex-column">
          <img
            className="image-choice"
            src="https://placeimg.com/640/480/tech"
            alt=""
          />
          tech
        </div>
        <div className="d-inline-flex flex-column">
          <img
            className="image-choice"
            src="https://placeimg.com/640/480/people"
            alt=""
          />
          people
        </div>
        <div className="d-inline-flex flex-column">
          <img
            className="image-choice"
            src="https://placeimg.com/640/480/nature"
            alt=""
          />
          nature
        </div>
        <div className="d-inline-flex flex-column">
          <img
            className="image-choice"
            src="https://placeimg.com/640/480/arch"
            alt=""
          />
          arch
        </div>
        <div className="d-inline-flex flex-column">
          <img
            className="image-choice"
            src="https://placeimg.com/640/480/animals"
            alt=""
          />
          animals
        </div>
      </div>
    );
  }

  function ChangeProfile() {
    let newProfile = {
      _id: state.user._id,
      name: newName,
      content: newContent,
      id: state.user.id,
      profileUrl: newProfileUrl,
    };
    // console.log(newProfile);
    axios
      .post("http://localhost:8080/changeprofile", { newProfile: newProfile })
      .then((result) => {
        dispatch(SetUserData(newProfile));
        sessionStorage.setItem("user", JSON.stringify(result.data));
        navigate("/");
      });
  }
}

export default Profile;
