import "./Login.css";
import Button from "@mui/material/Button";

import { auth, provider, signInWithPopup } from "../firebase";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).then(console.log).catch(console.log);
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="whatsapp.png" alt="whatsapp" draggable={false} />
        <div className="login__text">
          <h1>Sign in to WhatsApp Web</h1>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
};

export default Login;
