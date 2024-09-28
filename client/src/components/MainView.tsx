import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import ChatBubble from './ChatBubble';
import { icons } from '../assets/icons.const';

const MainView = () => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        createEmojiConfetti();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const createEmojiConfetti = () => {
    const end = Date.now() + 100;
    const emojis = ['😍', '👏', '🎉', '💖', '😻', '🥳', '🙌', '💯'];

    (function frame() {
      emojis.forEach((emoji) => {
        confetti({
          particleCount: 10,
          startVelocity: 20,
          spread: 360,
          ticks: 100,
          origin: { x: Math.random() > 0.5 ? 0 : 1, y: 0 },
          shapes: ['text'],
          text: emoji,
          scalar: 10,
        });
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

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
