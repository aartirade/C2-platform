import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
// import Logo from 'frontend\images';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password));
    navigate("/adddetails");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        {/* <div class="brand_logo_container">
						<img src="\images\c2p.png" class="brand_logo" alt="Logo" />
					</div> */}
        {/* <img src="\images\c2p.png" alt="img" className="logo" /> */}
        <Typography variant="h3" className="title">
          C2P
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot/password" className="forgot-p">
          <Typography>Forgot Password?</Typography>
        </Link>

        <Button type="submit" className="btn">
          Login
        </Button>

        <Link to="/register" className="log-reg">
          <Typography>
            New user ?{" "}
            <span className="reg" style={{ color: "blue" }}>
              Sign Up
            </span>
          </Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
