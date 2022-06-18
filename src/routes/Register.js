function Register() {
  return (
    <div>
      <div className="mt-5">
        <div className="d-flex flex-column align-items-center bd-highlight">
          <input className="my-2 p-1" type="text" placeholder="Name" />
          <input
            className="my-2 p-1"
            type="text"
            placeholder="ID"
            value="test"
          />
          <input
            className="my-2 p-1"
            type="password"
            placeholder="Password"
            value="password"
          />
          <input
            className="my-2 p-1"
            type="password"
            placeholder="Password"
            value="password"
          />
          <textarea
            className="my-2"
            name=""
            id=""
            cols="22"
            rows="3"
            placeholder="content"
          ></textarea>
          <button className="my-2  btn btn-primary">Register</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
