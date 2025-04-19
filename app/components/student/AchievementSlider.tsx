import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AchievementSliderProps {
  progress: number;
}

function AchievementSlider({ progress }: AchievementSliderProps) {
  const [width, setWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null); 
  const height = 20; 

  useEffect(() => {

    const updateWidth = () => {
      if (sliderRef.current) {
        setWidth(sliderRef.current.offsetWidth);
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div ref={sliderRef} className="w-full flex flex-col items-center">
      <svg width={width} height={height} className="block">
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="#e5e5e5"
          rx="10"
        />
        <motion.rect
          x="0"
          y="0"
          height={height}
          fill="#222"
          rx="10"
          initial={{ width: 0 }}
          animate={{ width: (progress / 100) * width }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export default AchievementSlider;
