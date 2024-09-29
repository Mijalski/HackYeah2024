type FeedbackBubbleProps = {
  content: string;
};

const FeedbackBubble = ({
  content
}: FeedbackBubbleProps) => {

  const tailStyle = "chat-bubble-tail-left";

  return (
    <div className="relative mb-2 w-96 flex items-center">
      <div
        className={`relative w-full rounded-3xl p-4 bg-[#F1FEFF] text-[#273237] self-start flex items-center justify-center animate-fade-in-bottom`}
        style={{ wordBreak: "break-word" }}
      >
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
        <div className={tailStyle}></div>
        </div>
    </div>
  )
};

export default FeedbackBubble;
