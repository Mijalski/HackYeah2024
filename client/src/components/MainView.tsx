import ChatBubble from "./ChatBubble";

const MainView = () => {
  return (
    <main className="bg-background w-full h-[100vh] flex items-center flex-col z-10">
      <div className="z-10 mt-16 gap-y-8 flex flex-col">
        <ChatBubble />
        <ChatBubble isServer={false} />
      </div>
      <img
        src="https://svgshare.com/i/1Auq.svg"
        className="absolute -bottom-[140px] z-0 select-none"
      />
    </main>
  );
};

export default MainView;
