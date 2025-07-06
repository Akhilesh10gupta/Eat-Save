import React, { useEffect, useState } from 'react';
import { useLoading } from '../../context/LoadingContext';
import DonateImg from '../../assets/donate.png';
import ThankYouImg from '../../assets/thankyou.png';

const dotCount = 6;

const LoadingOverlay = () => {
  const { loading } = useLoading();
  const [emojiIndex, setEmojiIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const foodImages = [DonateImg, ThankYouImg];

  useEffect(() => {
    if (!loading) return;

    const imageInterval = setInterval(() => {
      setEmojiIndex((prev) => (prev + 1) % foodImages.length);
    }, 1000); // Change image every 1 second

    const rotateInterval = setInterval(() => {
      setRotation((prev) => prev + 2);
    }, 30); // Smooth rotation

    return () => {
      clearInterval(imageInterval);
      clearInterval(rotateInterval);
    };
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/90">
      <div className="relative w-52 h-52">
        {/* Center Image */}
        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 animate-fade">
          <img
            src={foodImages[emojiIndex]}
            alt="Loading"
            className="w-20 h-20 object-contain transition-opacity duration-500"
          />
        </div>

        {/* Orbiting Dots */}
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
            const x = 104 + r * Math.cos(rad);
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

      {/* Animations */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% {
            filter: drop-shadow(0 0 12px #facc15);
          }
          50% {
            filter: drop-shadow(0 0 24px #f59e0b);
          }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .animate-fade {
          animation: fadeInOut 1s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;
