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
  const [userInput, setUserInput] = useState("");
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
      document.body.style.cursor = "wait";
      gcdService.readPrompt(prompt).then((response) => {
        const audioUrl = URL.createObjectURL(response);
        const audio = new Audio(audioUrl);
        audio.play();
        setIsReading(true);
        document.body.style.cursor = "default";
        audio.onended = () => {
          setIsReading(false);
        };
      });
    }
  };

  type ImageType = {
    id: number;
    bottom: number;
    left: number;
  };

  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Enter") {
        if (evalResponseDataRef.current.response) {
          setCanSubmit(false);
          setShowFeedback(true);
          gcdService
            .evaluateResponse(evalResponseDataRef.current)
            .then((response) => {
              if (response.data.isValid) {
                handleWin();
              } else {
                setFeedback(response.data.evaluation);
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
    placeTree();
  }

  const placeTree = () => {
    const newBottom = Math.random() * (300 - 100); //TODO bottom calculation
    const newLeft = Math.random() * (window.innerWidth - 50);

    const newImage: ImageType = {
      id: Date.now(),
      bottom: newBottom,
      left: newLeft
    };

    setImages((prevImages) => [...prevImages, newImage]);
  };

  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("LanguageContext must be used within a LanguageProvider");
  }

  const { fromLanguage, toLanguage, toLevel } = languageContext;

  useEffect(() => {
    evalResponseDataRef.current = {
      prompt: apiQuestion,
      level: toLevel.level,
      from: fromLanguage.shortcut,
      to: toLanguage.shortcut,
      response: userInput,
    };
  }, [userInput]);

  const evalResponseDataRef = useRef({
    prompt: apiQuestion,
    level: toLevel.level,
    from: fromLanguage.shortcut,
    to: toLanguage.shortcut,
    response: userInput,
  });

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
          setCanSubmit(true);
          setApiQuestion(response.data.question);
        });
    }
  }, [fromLanguage, toLanguage, toLevel.level]);

  useEffect(() => {
    if (isPlaying) {
      gcdService
        .getPrompt(toLevel.level, fromLanguage.shortcut, toLanguage.shortcut)
        .then((response) => {
          setApiQuestion(response.data.question);
          setCanSubmit(true);
        });
    }
  }, [isPlaying]);

  return (
    <main className="bg-background w-full h-[100vh] flex items-center flex-col z-10">
      <div className="z-10 mt-16 gap-y-8 flex flex-col">
        <ChatBubble
          userInput={userInput}
          setUserInput={setUserInput}
          isPlaying={isPlaying}
          onPlayClick={handlePlayClick}
          content={apiQuestion}
          onSoundClick={handleSoundClick}
        />
        {isPlaying && (
          <ChatBubble
            isServer={false}
            isPlaying={isPlaying}
            canSubmit={canSubmit}
            onPlayClick={handlePlayClick}
            userInputRef={userInputRef}
            userInput={userInput}
            setUserInput={setUserInput}
          />
        )}
        {showFeedback && <FeedbackBubble content={feedback} />}
      </div>
      <div>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.id % 2 == 0 ? icons.CONIFER_TREE : icons.LEAF_TREE}
            style={{
              zIndex: 100,
              position: "fixed",
              bottom: `${image.bottom}px`,
              left: `${image.left}px`,
              scale: 2,
              transition: "top 0.5s, left 0.5s",
            }}
          />
        ))}
      </div>
      <img
        src={icons.LAND}
        className="fixed -bottom-[140px] z-0 select-none w-screen"
      />
    </main>
  );
};

export default MainView;
