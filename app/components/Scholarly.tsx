import React, { useEffect, useState } from "react";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { playSound } from "./lib/utils";
import { motion } from "framer-motion";

function Scholarly() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const [trophyColor, setTrophyColor] = useState("white");

  const handleClick = (key: string) => {
    setActiveKey(key);
    playSound("/Click.mp3");

    setTimeout(() => {
      setActiveKey(null);
    }, 150);
  };

  const handleDoubleClick = () => {
    setTrophyColor(trophyColor === "white" ? "orange-400" : "white");
  };

  const letters = ["S", "C", "H", "O", "L", "A", "R", "L", "Y"];
  const allowedKeys = new Set(letters.map((l) => l.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (allowedKeys.has(key.toLowerCase())) {
        handleClick(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="grid grid-cols-3 grid-rows-3 place-content-center place-items-center lg:flex gap-2 rounded-xl border border-black p-3">
      {letters.map((letter, index) => (
        <KeyCap
          key={index}
          text={letter}
          isActive={activeKey === letter}
          onClick={() => handleClick("/Click.mp3")}
        />
      ))}
      <motion.button
        onClick={() => handleClick("/Click.mp3")}
        onDoubleClick={handleDoubleClick} // Handle double-click
        className={`hidden lg:flex items-center border-2 border-black place-content-center 
          bg-${trophyColor} rounded-lg w-20 h-20 hover:scale-95 transition duration-200`}
      >
        <MdOutlineEmojiEvents size={25} />
      </motion.button>
    </div>
  );
}

const KeyCap = ({
  text,
  onClick,
  isActive,
}: {
  text: string;
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <motion.button
      initial={{ scale: 1 }}
      animate={{ scale: isActive ? 0.95 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 0.95 }}
      onClick={onClick}
      className={`bg-[#222] border-2 border-black text-white 
      rounded-lg w-20 h-20 hover:bg-white hover:text-black 
      transition-colors duration-200`}
    >
      {text}
    </motion.button>
  );
};

export default Scholarly;
