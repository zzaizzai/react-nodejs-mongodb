function Profile() {
  return (
    <div>
      <div className="container">
        <div className="profile-box mt-5">
          <div>
            <h4>My Page</h4>
          </div>
          <div className="d-flex flex-row align-items-center bd-highlight">
            <div className="profile-url">image</div>
            <div className="d-flex flex-column bd-highlight">
              <div>my name</div>
              <div>content</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
