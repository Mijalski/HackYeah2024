import { useContext, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import ChatBubble from "./ChatBubble";
import { icons } from "../assets/icons.const";
import { LanguageContext } from "../Contexts/LangSelectedContextProvider";
import { gcdService } from "../api/services/gcdService";

const MainView = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [apiQuestion, setApiQuestion] = useState("...");

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Enter") {
        shoot(Date.now() + 800);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("LanguageContext must be used within a LanguageProvider");
  }

  const { fromLanguage, toLanguage, toLevel } = languageContext;

  const emoji1 = confetti.shapeFromText({ text: "😍" });
  const emoji2 = confetti.shapeFromText({ text: "👏" });
  const emoji3 = confetti.shapeFromText({ text: "🎉" });
  const emoji4 = confetti.shapeFromText({ text: "💖" });
  const emoji5 = confetti.shapeFromText({ text: "😻" });
  const emoji6 = confetti.shapeFromText({ text: "🥳" });
  const emoji7 = confetti.shapeFromText({ text: "🙌" });
  const emoji8 = confetti.shapeFromText({ text: "💯" });

  const defaults = {
    shapes: [emoji1, emoji2, emoji3, emoji4, emoji5, emoji6, emoji7, emoji8],
  };

  function shoot(end: number) {
    (function frame() {
      confetti({
        ...defaults,
        particleCount: 1,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        scalar: 1.75,
      });
      confetti({
        ...defaults,
        particleCount: 1,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        scalar: 1.75,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  useEffect(() => {
    setIsPlaying(false);
    setApiQuestion("...");
  }, [fromLanguage, toLanguage, toLevel.level]);

  useEffect(() => {
    if (isPlaying) {
      gcdService
        .getPrompt(toLevel.level, fromLanguage.shortcut, toLanguage.shortcut)
        .then((response) => {
          setApiQuestion(response.data.question);
          console.log("data that came=>", response);
        });
    }
  }, [isPlaying]);

  console.log("content=>", apiQuestion);

  return (
    <main className="bg-background w-full h-[100vh] flex items-center flex-col z-10">
      <div className="z-10 mt-16 gap-y-8 flex flex-col">
        <ChatBubble
          isPlaying={isPlaying}
          onPlayClick={handlePlayClick}
          content={apiQuestion}
        />
        {isPlaying && (
          <ChatBubble
            isServer={false}
            isPlaying={isPlaying}
            onPlayClick={handlePlayClick}
          />
        )}
      </div>
      <img
        src={icons.LAND}
        className="fixed -bottom-[140px] z-0 select-none w-screen"
      />
    </main>
  );
};

export default MainView;
