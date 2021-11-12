import { FC, MouseEvent, useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";

import { useStateValue } from "../context/auth/AuthState";
import axios from "../axios";
import { Messages, DocumentModel } from "../types/index";

import "./Chat.css";

const Chat: FC<Messages> = ({ messages }) => {
  const [seed, setSeed] = useState<null | number>(null);
  const [input, setInput] = useState<string>("");

  const [{ user }, _] = useStateValue();

  const sendMessage = async (e: MouseEvent<HTMLButtonElement>) => {
    if (input.trim().length === 0) {
      return;
    }

    e.preventDefault();

    const date = new Date();

    const postFields: Pick<
      DocumentModel,
      "message" | "name" | "received" | "timestamp"
    > = {
      message: input,
      name: user?.displayName!,
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
          <h3>Dev Help</h3>
          <p>Last seen at {messages[messages.length - 1]?.timestamp}</p>
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
        {messages.map(({ name, message, timestamp }) => (
          <p
            className={`chat__message ${
              name === user?.displayName && "chat__receiver"
            }`}
            key={Math.random()}
          >
            <span className="chat__name">{name}</span>
            {message}
            <span className="chat__timestamp">{timestamp}</span>
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
