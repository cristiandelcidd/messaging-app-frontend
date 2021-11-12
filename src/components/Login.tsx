import { FC } from "react";
import Button from "@mui/material/Button";

import { auth, provider, signInWithPopup } from "../firebase";

import { useStateValue } from "../context/auth/AuthState";

import "./Login.css";
import { ActionTypes } from "../types/index";

const Login: FC = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: ActionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch(console.log);
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://i.pinimg.com/originals/91/9d/f0/919df067a8fbd22ce7b6f401b7688b35.png"
          alt="whatsapp"
          draggable={false}
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp Web</h1>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
};

export default Login;
