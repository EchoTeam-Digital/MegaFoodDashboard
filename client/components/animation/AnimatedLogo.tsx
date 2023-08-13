import React, { useState, useEffect } from "react";
import { useTrail, animated } from "react-spring";

const AnimatedLogo: React.FC = () => {
  const [play, setPlay] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPlay(!play);
    }, play ? 10000 : 1000); // 1s for fade in, 5s for stay, 1s for fade out

    return () => clearTimeout(timeout);
  }, [play]);

  const logoLetters = ["M", "E", "G", "A", " ", "F", "O", "O", "D"];

  const trail = useTrail(logoLetters.length, {
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: {
      opacity: play ? 1 : 0,
      transform: play ? "translateY(0)" : "translateY(20px)",
    },
    config: { mass: 1, tension: 300, friction: 20 },
  });

  return (
    <div className="flex">
      <div>
        {trail.map((styles, index) => (
          <animated.span key={index} style={styles} className="logo-letter">
            <span className="font-extrabold">{logoLetters[index]}</span>
          </animated.span>
        ))}
      </div>
    </div>
  );
};

export default AnimatedLogo;
