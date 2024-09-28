import { useState } from "react";

type ChatBubbleProps = {
  isServer?: boolean;
};

const ChatBubble = ({ isServer = true }: ChatBubbleProps) => {
  const [userInput, setUserInput] = useState("");
  return (
    <div className="w-96 min-h-14 outline-1 outline-black outline rounded-3xl px-6 py-2">
      {isServer ? (
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          consequuntur, voluptate soluta laudantium cupiditate dignissimos,
          magni explicabo atque enim provident, facilis quas vel nemo deserunt
          delectus non ratione eum quis?
        </div>
      ) : (
        <div>
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
export default ChatBubble;
