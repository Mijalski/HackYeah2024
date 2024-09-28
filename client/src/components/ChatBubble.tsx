import { useState } from "react";

type ChatBubbleProps = {
  isServer?: boolean;
};

const ChatBubble = ({ isServer = true }: ChatBubbleProps) => {
  const [userInput, setUserInput] = useState("");

  // Styling for the chat bubble based on whether it's from the server or the user
  const bubbleStyle = isServer
    ? "bg-gray-200 text-black self-start"
    : "bg-blue-500 text-white self-end";

  return (
    <div className={`flex ${isServer ? "justify-start" : "justify-end"} mb-2`}>
      <div
        className={`max-w-xs min-h-10 rounded-3xl p-4 ${bubbleStyle}`}
        style={{ wordBreak: "break-word" }}
      >
        {isServer ? (
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            consequuntur, voluptate soluta laudantium cupiditate dignissimos,
            magni explicabo atque enim provident, facilis quas vel nemo deserunt
            delectus non ratione eum quis?
          </div>
        ) : (
          <input
            className="w-full bg-transparent outline-none"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
          />
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
