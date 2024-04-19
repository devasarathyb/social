import React, { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", input);
    } catch (err) {
      setErr(err.response.data);
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Wanna Chat!</h1>
          <p>
            Originally from Latin, Lorem ipsum has no intelligible meaning. It
            is simply a display of letters to be viewed as a sample with given
            graphical elements in a file.
          </p>
          <span>Do you have an account</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username.."
              name="username"
              onChange={handleChange}
            />

            <input
              type="email"
              placeholder="Email.."
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password.."
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name.."
              name="name"
              onChange={handleChange}
            />
            {err && <div style={{ color: "red" }}>{err}</div>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
