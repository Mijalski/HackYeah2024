import { useContext, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import ChatBubble from "./ChatBubble";
import { icons } from "../assets/icons.const";
import { LanguageContext } from "../Contexts/LangSelectedContextProvider";
import { gcdService } from "../api/services/gcdService";
import { BalanceContext } from "../Contexts/BalanceContextProvider";
import FeedbackBubble from "./FeedbackBubble";

const MainView = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [apiQuestion, setApiQuestion] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [feedback, setFeedback] = useState("");
  const userInputRef = useRef<HTMLTextAreaElement>(null);
  const balanceContext = useContext(BalanceContext);

  if (!balanceContext) {
    throw new Error("BalanceContext must be used within a BalanceProvider");
  }

  const { balance, setBalance } = balanceContext;

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleSoundClick = (prompt: string | undefined) => {
    if (prompt && !isReading) {
      gcdService.readPrompt(prompt).then((response) => {
        const audioUrl = URL.createObjectURL(response);
        const audio = new Audio(audioUrl);
        audio.play();
        setIsReading(true);
        audio.onended = () => {
          setIsReading(false);
        };
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Enter") {
        if (userInputRef?.current) {
          setCanSubmit(false);
          gcdService.evaluateResponse(userInputRef?.current.value).then((response) => {
            if (response.isValid) {
              handleWin();
            } else {
              setShowFeedback(true);
              setFeedback(response.evaluation);
            }
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  function handleWin() {
    shoot(Date.now() + 800);
    setBalance((prev) => prev + 1);
  }

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
    setApiQuestion("");
    setShowFeedback(false);
    setFeedback("");
    if (isPlaying) {
      gcdService
        .getPrompt(toLevel.level, fromLanguage.shortcut, toLanguage.shortcut)
        .then((response) => {
          setApiQuestion(response.data.question);
          setCanSubmit(true);
        });
    }
  }, [fromLanguage, toLanguage, toLevel.level]);

  useEffect(() => {
    if (isPlaying) {
      gcdService
        .getPrompt(toLevel.level, fromLanguage.shortcut, toLanguage.shortcut)
        .then((response) => {
          setApiQuestion(response.data.question);
        });
    }
  }, [isPlaying]);

  return (
    <main className="bg-background w-full h-[100vh] flex items-center flex-col z-10">
      <div className="z-10 mt-16 gap-y-8 flex flex-col">
        <ChatBubble
          isPlaying={isPlaying}
          onPlayClick={handlePlayClick}
          content={apiQuestion}
          canSubmit={canSubmit}
          onSoundClick={handleSoundClick}
        />
        {isPlaying && (
          <ChatBubble
            isServer={false}
            isPlaying={isPlaying}
            canSubmit={canSubmit}
            onPlayClick={handlePlayClick}
            userInputRef={userInputRef}
          />
        )}
        {showFeedback && (
          <FeedbackBubble content={feedback} />
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
