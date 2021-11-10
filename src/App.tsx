import { useState, useEffect } from "react";
import Pusher from "pusher-js";

import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";

import axios from "./components/axios";

import "./App.css";

interface DocumentModel {
  name: string;
  message: string;
  timestamp: string;
  received: boolean;
}

const App = () => {
  const [messages, setMessages] = useState<DocumentModel[]>([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/messages/sync").then((res) => setMessages(res.data));
  }, []);

  useEffect(() => {
    const pusher = new Pusher("6fce6cf146bc0f88825a", { cluster: "us2" });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data: any) => {
      setMessages([...messages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

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
