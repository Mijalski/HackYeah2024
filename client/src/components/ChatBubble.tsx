import { useState } from "react";

type ChatBubbleProps = {
  isServer?: boolean;
};

const ChatBubble = ({ isServer = true }: ChatBubbleProps) => {
  const [userInput, setUserInput] = useState("");

  const bubbleStyle = isServer
    ? "bg-gray-200 text-black self-start"
    : "bg-blue-500 text-white self-end";

  return (
    <div className={`mb-2 w-96`}>
      <div
        className={`w-full rounded-3xl p-4 ${bubbleStyle}`}
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
          <textarea
            className="w-full bg-transparent outline-none resize-none"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            rows={3}
            style={{ minHeight: "3em", lineHeight: "1.5em" }}
          />
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
