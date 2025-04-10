
import React, { useEffect, useState } from "react";
import { Hexagon } from "lucide-react";

interface AuthBackgroundProps {
  className?: string;
}

export const AuthBackground: React.FC<AuthBackgroundProps> = ({ className }) => {
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    setInitialized(true);
  }, []);

  // Generate hexagons with various sizes and positions - now with more green emphasis
  const hexagons = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 30) + 10,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    delay: Math.random() * 5,
    duration: Math.random() * 20 + 10,
    opacity: Math.random() * 0.5 + 0.1,
    // Changed color distribution to favor green (60%) over blue (40%)
    color: i % 10 <= 5 ? '#5d8430' : i % 10 <= 8 ? '#8ab454' : '#0a1c34',
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      {/* Gradient backdrop - modified to emphasize green over blue */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-light/60 to-green-light/20 dark:from-green-base/30 dark:to-darkblue-base/50"></div>

      {/* Animated hexagon pattern */}
      <div className="absolute inset-0">
        {hexagons.map(hex => (
          <div 
            key={hex.id}
            className={`absolute transition-all duration-1000 ${initialized ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: `${hex.x}%`,
              top: `${hex.y}%`,
              opacity: hex.opacity,
              transform: `scale(${initialized ? 1 : 0})`,
              transition: `all ${hex.duration}s ease-in-out ${hex.delay}s, opacity 1s ease-in-out ${hex.delay}s`,
              animation: `float ${hex.duration}s ease-in-out ${hex.delay}s infinite alternate`
            }}
          >
            <Hexagon 
              size={hex.size} 
              color={hex.color}
              fill={Math.random() > 0.6 ? hex.color : 'transparent'} // More filled hexagons
              strokeWidth={1} 
              className="transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
