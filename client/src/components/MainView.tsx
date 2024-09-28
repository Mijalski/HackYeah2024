import { icons } from "../assets/icons.const";
import ChatBubble from "./ChatBubble";

const MainView = () => {
  return (
    <main className="bg-background w-full h-[100vh] flex items-center flex-col z-10">
      <div className="z-10 mt-16 gap-y-8 flex flex-col">
        <ChatBubble />
        <ChatBubble isServer={false} />
      </div>
      <img
        src={icons.LAND}
        className="fixed -bottom-[140px] z-0 select-none w-screen"
      />
    </main>
  );
};

export default MainView;
