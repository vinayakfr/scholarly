import React from "react";
import { motion } from "framer-motion";

interface AchievementSliderProps {
  progress: number; // Progress percentage (0-100)
}

function AchievementSlider({ progress }: AchievementSliderProps) {
  const width = 400; // Total width of the slider
  const height = 20; // Height of the slider

  return (
    <div className="w-full flex flex-col items-center">
      <svg width={width} height={height} className="block">
        {/* Background Bar */}
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="#e5e5e5"
          rx="10"
        />
        {/* Progress Bar */}
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
      {/* <p className="text-sm font-medium mt-2">{progress}%</p> */}
    </div>
  );
}

export default AchievementSlider;
