import React from "react";
import { toast } from "react-toastify";
import { FormWrapper } from "./Login";
import useInput from "../hooks/useInput";
import AuthService from "../services/auth";
import logo from "../assets/logo.png";

const Signup = ({ login }) => {
  const email = useInput("");
  const nickname = useInput("");
  const password = useInput("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.value || !password.value || !nickname.value) {
      return toast.error("Please fill in all the fields");
    }

    if (nickname.value === "explore") {
      return toast.error(
        "The nickname you entered is not acceptable, try again"
      );
    }

    const re = /^[a-z0-9]+$/i;
    if (re.exec(nickname.value) === null) {
      return toast.error(
        "The nickname you entered is not acceptable, try again"
      );
    }

    const payload = {
      username: email.value,
      password: password.value,
      nickname: nickname.value,
    };

    await AuthService.signup(payload)

    nickname.setValue("");
    password.setValue("");
    email.setValue("");
  };

  return (
    <FormWrapper onSubmit={handleLogin}>
      <img src={logo} alt="logo" />

      <form>
        <input
          type="email"
          placeholder="Email"
          value={email.value}
          onChange={email.onChange}
        />
        <input
          type="text"
          placeholder="Nickname"
          value={nickname.value}
          onChange={nickname.onChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password.value}
          onChange={password.onChange}
        />
        <input type="submit" value="Sign up" className="signup-btn" />
      </form>

      <div>
        <p>
          Already have an account? <span onClick={login}>Login</span>
        </p>
      </div>
    </FormWrapper>
  );
};

export default Signup;
