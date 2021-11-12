import { useState, useEffect } from "react";
import Pusher from "pusher-js";

import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";

import axios from "./axios";

import "./App.css";
import { useStateValue } from "./context/auth/AuthState";
import { DocumentModel } from "./types";

const App = () => {
  const [messages, setMessages] = useState<DocumentModel[]>([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    axios.get("/messages/sync").then((res) => setMessages(res.data));
  }, []);

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APPKEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data: any) => {
      setMessages([...messages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Chat messages={messages} />
        </div>
      )}
    </div>
  );
};

export default App;
