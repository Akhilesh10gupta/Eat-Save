import React, { useEffect, useState } from 'react';
import { useLoading } from '../../context/LoadingContext';

const foodEmojis = ['🍕', '🍔', '🍱', '🥗', '🌮', '🍛'];
const dotCount = 6;

const LoadingOverlay = () => {
  const { loading } = useLoading();
  const [emojiIndex, setEmojiIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setRotation((prev) => {
        const newRotation = prev + 2;
        if (newRotation % 360 === 0) {
          setEmojiIndex((i) => (i + 1) % foodEmojis.length); // change emoji each full rotation
        }
        return newRotation;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/90">
      <div className="relative w-52 h-52">
        {/* 🍽 Center Emoji */}
        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-7xl animate-pulse-glow">
          {foodEmojis[emojiIndex]}
        </div>

        {/* 🔵 Orbiting Dots */}
        <div
          className="absolute w-full h-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 30ms linear',
          }}
        >
          {Array.from({ length: dotCount }).map((_, i) => {
            const angle = (360 / dotCount) * i;
            const rad = (angle * Math.PI) / 180;
            const r = 80;
            const x = 104 + r * Math.cos(rad); // 104 = center offset
            const y = 104 + r * Math.sin(rad);
            return (
              <div
                key={i}
                className="w-5 h-5 rounded-full absolute bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md"
                style={{
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ✨ Floating Glow Animation */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% {
            text-shadow: 0 0 12px #facc15, 0 0 24px #facc15;
          }
          50% {
            text-shadow: 0 0 24px #f59e0b, 0 0 48px #f59e0b;
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;
