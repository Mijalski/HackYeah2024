import { Dispatch, LegacyRef, SetStateAction } from "react";

type ChatBubbleProps = {
  isServer?: boolean;
  isPlaying: boolean;
  onPlayClick: () => void;
  content?: string;
  userInputRef?: LegacyRef<HTMLTextAreaElement> | undefined;
  onSoundClick?: (content: string | undefined) => void;
  userInput: string;
  canSubmit?: boolean;
  setUserInput: Dispatch<SetStateAction<string>>;
};

const ChatBubble = ({
  isServer = true,
  isPlaying,
  onPlayClick,
  content,
  onSoundClick,
  canSubmit,
  userInput,
  setUserInput,
}: ChatBubbleProps) => {
  const bubbleStyle = isServer
    ? "bg-[#F1FEFF] text-[#273237] self-start"
    : "bg-blue-500 text-white self-end";

  const tailStyle = isServer
    ? "chat-bubble-tail-left"
    : "chat-bubble-tail-right";

  return isPlaying ? (
    <div className="relative mb-2 w-96 flex items-center">
      <div
        className={`relative w-full rounded-3xl p-4 ${bubbleStyle} flex items-center justify-center animate-fade-in-bottom`}
        style={{ wordBreak: "break-word" }}
      >
        {isServer ? (
          <div className="text-[#273237]">
            {content ? (
              content
            ) : (
              <div className="dots font-bold text-base">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            )}
          </div>
        ) : (
          <textarea
            className="w-full bg-transparent outline-none resize-none"
            value={userInput}
            disabled={!canSubmit}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            rows={3}
            style={{ minHeight: "3em", lineHeight: "1.5em" }}
          />
        )}
        <div className={tailStyle}></div>
      </div>
      {isServer && content && content.length > 1 && (
        <div
          className="absolute right-0 translate-x-4 flex items-center cursor-pointer"
          onClick={() => onSoundClick?.(content)}
        >
          <div className="text-2xl scale-150 cursor-pointer">🔊</div>
        </div>
      )}
    </div>
  ) : (
    <div
      className="bg-[#FFE53B] hover:bg-[#FFDE08] border-[#FFC024] border-2 w-full rounded-3xl p-4 text-[#F1FEFF] flex items-center justify-center cursor-pointer"
      onClick={onPlayClick}
    >
      <div className="select-none px-12 py-3 text-6xl text-center font-bold stroke-cyan-500 [text-shadow:_2px_2px_0_#FFC024]">
        PLAY
      </div>
    </div>
  );
};

export default ChatBubble;
