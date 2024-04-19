import React, { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContextProvider";
const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",

    password: "",
  });
  const [err, setErr] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(input);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Chats On!</h1>
          <p>
            Originally from Latin, Lorem ipsum has no intelligible meaning. It
            is simply a display of letters to be viewed as a sample with given
            graphical elements in a file.
          </p>
          <span>Dont you have an account</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username.."
              name="username"
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password.."
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
