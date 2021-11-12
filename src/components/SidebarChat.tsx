import { useEffect, useState, FC } from "react";
import { Avatar } from "@mui/material";

import { Messages } from "../types/index";

import "./SidebarChat.css";

const SidebarChat: FC<Messages> = ({ messages }) => {
  const [seed, setSeed] = useState<number | null>(null);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="sidebarChat">
      <Avatar
        src={`https://avatars.dicebear.com/api/human/
b${seed}.svg`}
      />
      <div className="sidebarChat__info">
        <h2>Dev Help</h2>
        <p>{messages[messages.length - 1]?.message}</p>
      </div>
    </div>
  );
};

export default SidebarChat;
