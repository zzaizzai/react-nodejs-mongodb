import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Profile() {
  let { id } = useParams();
  let [profile, setProfile] = useState({
    _id: "0",
    name: "test",
    id: "test",
    content: "content",
    profileUrl: "https://placeimg.com/640/480/tech",
    role: "normal",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getprofile/id=${id}`)
      .then((result) => {
        let data = result?.data.profile;
        let date =
          new Date(data.joinDate).toLocaleDateString() +
          " " +
          new Date(data.joinDate).toLocaleTimeString();
        console.log(date);
        setProfile({
          _id: data._id,
          name: data.name,
          id: data.id,
          content: data.content,
          profileUrl: data.profileUrl,
          joinDate: date,
          role: data.role,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="profile-box mt-5 p-3">
          <div className="d-flex flex-row align-items-center bd-highlight">
            <img
              src={profile.profileUrl}
              className="userprofile-url m-2"
              alt="profile"
              onError={(e) => (e.target.src = "/images/profile.svg")}
            ></img>
            <div className="d-flex flex-column bd-highlight">
              <div className="p-1 mx-2 text-start">
                <h4>
                  {profile.name} ({profile.id})
                </h4>
              </div>
              <div className="p-1 mx-2 text-start">{profile.content}</div>
              <div className="p-1 mx-2 text-start">join date: {profile.joinDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
