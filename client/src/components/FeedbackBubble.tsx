type FeedbackBubbleProps = {
  content: string;
  showButton?: boolean; // Option to show the button
  onButtonClick?: () => void; // Callback function for button click
};

const FeedbackBubble = ({
  content,
  showButton = false,
  onButtonClick,
}: FeedbackBubbleProps) => {
  const tailStyle = "chat-bubble-tail-left";

  return (
    <div className="relative mb-2 sm:w-96 w-80 flex flex-col items-start">
      <div
        className={`relative w-full rounded-3xl p-4 bg-[#F1FEFF] text-[#273237] flex items-center justify-center animate-fade-in-bottom`}
        style={{ wordBreak: "break-word" }}
      >
        <div className="text-[#273237]">
          {content ? (
            content
          ) : showButton ? (
            <div className="text-2xl scale-150 cursor-pointer">✅</div>
          ) : (
            <div className="dots font-bold text-base">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          )}
        </div>
        <div className={tailStyle}></div>
      </div>
      {showButton && (
        <button
          onClick={onButtonClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 self-center sm:mb-0 mb-32"
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default FeedbackBubble;
