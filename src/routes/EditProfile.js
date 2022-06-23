import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Profile() {
//   let { id } = useParams();
  let [userProfile, setUserProfile] = useState({
    _id: "0",
    displaName: "test",
    ID: "test",
    profileUrl: "https://placeimg.com/640/480/tech",
    role: "normal",
  });
  let state = useSelector((state) => {
    return state;
  });
  return (
    <div>
      <div className="container">
        <div className="profile-box mt-5 p-3">
          <div className="d-flex flex-row align-items-center bd-highlight">
            <img
              src={state.user.profileUrl}
              className="userprofile-url m-2"
              alt="profile"
            ></img>
            <div className="d-flex flex-column bd-highlight">
              <div className="p-1 mx-2 text-start">
                <h4>
                  {state.user.displaName} ({state.user.id})
                </h4>
              </div>
              <div className="p-1 mx-2 text-start">content</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
