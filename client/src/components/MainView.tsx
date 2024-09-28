import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import ChatBubble from './ChatBubble';
import { icons } from '../assets/icons.const';

const MainView = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => {
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

    function frame() {
      emojis.forEach((emoji) => {
        // Display confetti
        confetti({
          particleCount: 10,
          startVelocity: 20,
          spread: 360,
          ticks: 100,
          origin: { x: Math.random() > 0.5 ? 0 : 1, y: 0 },
          scalar: 1, // Adjust as needed
        });
    
        // Create emoji overlay
        const emojiElement = document.createElement('div');
        emojiElement.style.position = 'absolute';
        emojiElement.style.fontSize = '24px'; // Adjust size as needed
        emojiElement.style.left = `${Math.random() * window.innerWidth}px`;
        emojiElement.style.top = `${Math.random() * window.innerHeight}px`;
        emojiElement.textContent = emoji;
        document.body.appendChild(emojiElement);
    
        // Optional: Animation or removal after some time
        setTimeout(() => {
          emojiElement.remove();
        }, end);
      });
    }
    
    frame();
    
  };

  return (
    <main className="bg-background w-full h-[100vh] flex items-center flex-col z-10">
      <div className="z-10 mt-16 gap-y-8 flex flex-col">
      <ChatBubble isPlaying={isPlaying} onPlayClick={handlePlayClick} />
      {isPlaying && <ChatBubble isServer={false} isPlaying={isPlaying} onPlayClick={handlePlayClick} />}
      </div>
      <img
        src={icons.LAND}
        className="fixed -bottom-[140px] z-0 select-none w-screen"
      />
    </main>
  );
};

export default MainView;
