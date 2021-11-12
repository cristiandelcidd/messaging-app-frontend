import { FC, MouseEvent, useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";

import axios from "../axios";
import { DocumentModel } from "../types";

import "./Chat.css";

const Chat: FC<{ messages: DocumentModel[] }> = ({ messages }) => {
  const [seed, setSeed] = useState<null | number>(null);
  const [input, setInput] = useState<string>("");

  const sendMessage = async (e: MouseEvent<HTMLButtonElement>) => {
    if (input.trim().length === 0) {
      return;
    }

    e.preventDefault();

    const date = new Date();

    const postFields: DocumentModel = {
      message: input,
      name: "cristiandelcidd",
      timestamp: `${date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })} - ${date.toLocaleTimeString()}`,
      received: true,
    };

    await axios.post("/messages/new", postFields);

    setInput("");
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/
b${seed}.svg`}
        />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && "chat__receiver"}`}
            key={message._id}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          {input.trim().length > 0 && (
            <button onClick={sendMessage} type="submit">
              <SendIcon />
            </button>
          )}
        </form>
        {input.trim().length === 0 && <MicIcon />}
      </div>
    </div>
  );
};
export default Chat;
